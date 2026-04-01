import { Router } from "express";
import { supabaseAdmin } from "../config/supabase.js";

export const opdPublicRouter = Router();

// Public — list all active hospitals (no auth required, for lobby display boards)
opdPublicRouter.get("/hospitals", async (req, res, next) => {
  try {
    const { data, error } = await supabaseAdmin
      .from("hospitals")
      .select("id, name, code, address, is_active")
      .eq("is_active", true)
      .order("name");

    if (error) throw error;
    res.json({ data: data || [] });
  } catch (err) {
    next(err);
  }
});

// Public — OPD display board for a specific hospital
// Returns departments → doctors with live assignment metrics
opdPublicRouter.get("/display/:hospitalId", async (req, res, next) => {
  try {
    const { hospitalId } = req.params;

    const { data: doctors, error: doctorError } = await supabaseAdmin
      .from("doctors")
      .select("id, first_name, last_name, department, specialization, email")
      .eq("hospital_id", hospitalId)
      .order("department");

    if (doctorError) throw doctorError;

    // Count currently active emergency assignments per doctor
    const doctorIds = (doctors || []).map((d) => d.id).filter(Boolean);
    const assignmentCounts = {};

    if (doctorIds.length > 0) {
      const { data: assignments } = await supabaseAdmin
        .from("emergency_requests")
        .select("assigned_doctor_id")
        .in("assigned_doctor_id", doctorIds)
        .in("status", ["accepted", "pending_hospital_response"]);

      for (const row of assignments || []) {
        if (row.assigned_doctor_id) {
          assignmentCounts[row.assigned_doctor_id] =
            (assignmentCounts[row.assigned_doctor_id] || 0) + 1;
        }
      }
    }

    // Group by department
    const byDept = {};
    for (const doc of doctors || []) {
      const dept = doc.department || "General Medicine";
      if (!byDept[dept]) byDept[dept] = [];
      const activeCount = assignmentCounts[doc.id] || 0;
      byDept[dept].push({
        id: doc.id,
        name: `Dr. ${(doc.first_name || "").trim()} ${(doc.last_name || "").trim()}`.trim(),
        email: doc.email || "",
        specialization: doc.specialization || "",
        room: `R-${doc.id.slice(-3).toUpperCase()}`,
        nowServing: activeCount,
        totalWaiting: 0,
        completedToday: 0,
        isOnline: true
      });
    }

    const departments = Object.entries(byDept).map(([name, drs]) => ({
      name,
      doctors: drs
    }));

    const nowServing = Object.values(assignmentCounts).reduce((sum, v) => sum + v, 0);

    res.json({
      hospitalId,
      departments,
      totalDoctors: doctors?.length ?? 0,
      nowServing,
      totalWaiting: 0,
      completedToday: 0
    });
  } catch (err) {
    next(err);
  }
});

// Public — all hospitals with their full doctor roster
// Used by HMS "OPD Doctors" and "Hospital Network" pages
opdPublicRouter.get("/network", async (req, res, next) => {
  try {
    const { data: hospitals, error: hospitalError } = await supabaseAdmin
      .from("hospitals")
      .select("id, name, code")
      .eq("is_active", true)
      .order("name");

    if (hospitalError) throw hospitalError;

    const { data: doctors, error: doctorError } = await supabaseAdmin
      .from("doctors")
      .select("id, first_name, last_name, department, specialization, email, hospital_id");

    if (doctorError) throw doctorError;

    const doctorMap = {};
    for (const doc of doctors || []) {
      const hId = doc.hospital_id;
      if (!doctorMap[hId]) doctorMap[hId] = [];
      doctorMap[hId].push({
        id: doc.id,
        name: `Dr. ${(doc.first_name || "").trim()} ${(doc.last_name || "").trim()}`.trim(),
        email: doc.email || "",
        department: doc.department || "General Medicine",
        specialization: doc.specialization || "",
        room: `R-${doc.id.slice(-3).toUpperCase()}`
      });
    }

    const data = (hospitals || []).map((h) => ({
      id: h.id,
      name: h.name,
      code: h.code,
      doctors: doctorMap[h.id] || []
    }));

    res.json({ data });
  } catch (err) {
    next(err);
  }
});
