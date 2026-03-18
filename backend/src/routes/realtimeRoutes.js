import { Router } from "express";
import { subscribeRealtime } from "../realtime/eventBus.js";
import { verifyAccessToken } from "../services/tokenService.js";
import { env } from "../config/env.js";

export const realtimeRouter = Router();

function resolveToken(req) {
  const header = req.headers.authorization || "";
  if (header.startsWith("Bearer ")) {
    return header.slice(7);
  }
  const queryToken = typeof req.query.token === "string" ? req.query.token : null;
  return queryToken;
}

function isAllowedRole(role) {
  return ["super_admin", "admin", "hospital_admin_staff", "dispatch_operator", "doctor", "nurse"].includes(role);
}

realtimeRouter.get("/events", (req, res) => {
    const token = resolveToken(req);
    const user = token ? verifyAccessToken(token) : null;
    if (!user || !isAllowedRole(user.role)) {
      res.status(401).json({ error: { message: "Unauthorized", code: "UNAUTHORIZED" } });
      return;
    }

    res.setHeader("Content-Type", "text/event-stream");
    res.setHeader("Cache-Control", "no-cache");
    res.setHeader("Connection", "keep-alive");
    res.flushHeaders?.();

    const role = user.role;
    const hospitalId = user.hospitalId || null;
    const hospitalCode = user.hospitalCode || null;
    const isGlobalObserver = ["super_admin", "admin"].includes(role) || env.GLOBAL_OBSERVER_HOSPITAL_CODES.includes(hospitalCode);

    const send = (event) => {
      const scopedHospitalId = event?.payload?.assignedHospitalId || event?.payload?.hospitalId || null;
      if (!isGlobalObserver && hospitalId && scopedHospitalId && scopedHospitalId !== hospitalId) {
        return;
      }
      res.write(`data: ${JSON.stringify(event)}\n\n`);
    };

    const unsubscribe = subscribeRealtime(send);

    const heartbeat = setInterval(() => {
      res.write(`data: ${JSON.stringify({ type: "heartbeat", payload: { ts: Date.now() } })}\n\n`);
    }, 20000);

    req.on("close", () => {
      clearInterval(heartbeat);
      unsubscribe();
      res.end();
    });
  }
);
