import { useCallback, useEffect, useState } from 'react';
import { Activity, Users, CheckCircle, Clock, RefreshCw, Stethoscope, Building2 } from 'lucide-react';

const OPD_API = import.meta.env.VITE_OPD_API_URL || 'http://localhost:3900/api';

const DEPT_COLORS = {
  CARD: 'bg-red-50 border-red-200 text-red-700',
  ORTH: 'bg-blue-50 border-blue-200 text-blue-700',
  NEUR: 'bg-purple-50 border-purple-200 text-purple-700',
  PEDI: 'bg-green-50 border-green-200 text-green-700',
  GENM: 'bg-slate-50 border-slate-200 text-slate-700',
};

function OpdLivePanel() {
  const [hospitals, setHospitals] = useState([]);
  const [selectedHospital, setSelectedHospital] = useState(null);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState(null);

  const loadHospitals = useCallback(async () => {
    try {
      const res = await fetch(`${OPD_API}/hospitals`);
      if (!res.ok) throw new Error();
      const data = await res.json();
      setHospitals(data);
      if (!selectedHospital && data.length > 0) {
        setSelectedHospital(data[0].id);
      }
    } catch {
      // OPD server might not be running — fail silently
    }
  }, [selectedHospital]);

  const loadStats = useCallback(async (hospitalId) => {
    if (!hospitalId) return;
    try {
      const res = await fetch(`${OPD_API}/display/${hospitalId}`);
      if (!res.ok) throw new Error();
      const data = await res.json();
      setStats(data);
      setLastUpdated(new Date());
    } catch {
      // Fail silently
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { loadHospitals(); }, [loadHospitals]);
  useEffect(() => {
    if (!selectedHospital) return undefined;
    setLoading(true);
    loadStats(selectedHospital);
    const t = setInterval(() => loadStats(selectedHospital), 15000);
    return () => clearInterval(t);
  }, [selectedHospital, loadStats]);

  return (
    <div className="mt-6 rounded-2xl border border-emerald-100 bg-gradient-to-br from-emerald-50 to-teal-50 p-5">
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
        <div className="flex items-center gap-2">
          <Stethoscope className="w-5 h-5 text-emerald-600" />
          <p className="text-sm font-bold text-emerald-800">OPD Live Queue</p>
          {lastUpdated && (
            <span className="text-[10px] text-emerald-600 bg-emerald-100 px-2 py-0.5 rounded-full">
              Live · {lastUpdated.toLocaleTimeString()}
            </span>
          )}
        </div>
        <div className="flex items-center gap-2">
          {hospitals.length > 0 && (
            <select
              className="text-xs border border-emerald-200 rounded-lg px-3 py-1.5 bg-white text-slate-700"
              value={selectedHospital || ''}
              onChange={(e) => setSelectedHospital(e.target.value)}
            >
              {hospitals.map((h) => (
                <option key={h.id} value={h.id}>{h.name}</option>
              ))}
            </select>
          )}
          <button
            type="button"
            onClick={() => loadStats(selectedHospital)}
            className="text-xs border border-emerald-200 rounded-lg px-3 py-1.5 bg-white text-slate-700 flex items-center gap-1 hover:bg-emerald-50"
          >
            <RefreshCw className="w-3 h-3" /> Refresh
          </button>
        </div>
      </div>

      {loading && !stats ? (
        <p className="text-sm text-emerald-700 py-4 text-center">Loading OPD data...</p>
      ) : !stats ? (
        <p className="text-sm text-slate-500 py-4 text-center">OPD server offline — start the OPD server on port 3900</p>
      ) : (
        <>
          {/* Summary stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
            {[
              { icon: Users, label: 'Waiting', value: stats.active?.filter(t => t.status === 'waiting').length ?? 0, color: 'text-amber-600' },
              { icon: Activity, label: 'In Consultation', value: stats.nowServing?.length ?? 0, color: 'text-emerald-600' },
              { icon: CheckCircle, label: 'Completed Today', value: stats.completedToday ?? 0, color: 'text-blue-600' },
              { icon: Clock, label: 'Total Today', value: stats.totalToday ?? 0, color: 'text-purple-600' },
            ].map(({ icon: Icon, label, value, color }) => (
              <div key={label} className="bg-white rounded-xl border border-white/60 p-3 text-center">
                <Icon className={`mx-auto w-5 h-5 mb-1 ${color}`} />
                <p className={`text-2xl font-bold ${color}`}>{value}</p>
                <p className="text-xs text-slate-500 mt-0.5">{label}</p>
              </div>
            ))}
          </div>

          {/* Now Serving */}
          {stats.nowServing?.length > 0 && (
            <div className="mb-4 rounded-xl border border-emerald-200 bg-white p-3">
              <p className="text-xs font-bold text-emerald-700 mb-2 flex items-center gap-1">
                <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                NOW SERVING
              </p>
              <div className="flex flex-wrap gap-2">
                {stats.nowServing.slice(0, 6).map((t) => (
                  <div key={t.id} className={`text-xs rounded-lg border px-3 py-1.5 font-semibold ${DEPT_COLORS[t.department_code] || DEPT_COLORS.GENM}`}>
                    {t.token_number} · {t.doctor_name} · Rm {t.room_number}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Per-department queue summary */}
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
            {(stats.departments || []).map((dept) => {
              const deptTokens = stats.active?.filter(t => t.department_id === dept.id) || [];
              const waiting = deptTokens.filter(t => t.status === 'waiting').length;
              const inConsult = deptTokens.filter(t => t.status === 'in_consultation').length;
              const color = DEPT_COLORS[dept.code] || DEPT_COLORS.GENM;
              return (
                <div key={dept.id} className={`rounded-xl border p-3 text-center ${color}`}>
                  <p className="text-xs font-bold truncate">{dept.code}</p>
                  <p className="text-lg font-extrabold mt-1">{waiting}</p>
                  <p className="text-[10px]">waiting</p>
                  {inConsult > 0 && (
                    <span className="inline-block mt-1 text-[9px] bg-white/60 rounded-full px-1.5 py-0.5 font-bold">
                      {inConsult} active
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}

const statusOptions = [
  'pending_hospital_response',
  'accepted',
  'rejected_retrying',
  'failed_no_match',
  'cancelled'
];

function severityFromPriority(priority) {
  const value = String(priority || '').toLowerCase();
  if (value === 'critical') return 'Critical';
  if (value === 'high' || value === 'medium') return 'Moderate';
  return 'Low';
}

function severityClass(priority) {
  const severity = severityFromPriority(priority);
  if (severity === 'Critical') return 'bg-rose-100 text-rose-700 border-rose-200';
  if (severity === 'Moderate') return 'bg-amber-100 text-amber-700 border-amber-200';
  return 'bg-emerald-100 text-emerald-700 border-emerald-200';
}

export const HospitalDashboardApp = ({
  role,
  dashboardCards,
  prettyStatus,
  activeStatus,
  setActiveStatus,
  loadRequests,
  canManualCreate,
  manualForm,
  setManualForm,
  handleManualCreate,
  isCreatingManual,
  error,
  isLoading,
  items,
  renderActionButtons,
  statusClass,
  recentActivity,
  mediaByRequest
}) => {
  return (
    <>
      <div className="mt-6 grid grid-cols-2 gap-3 lg:grid-cols-4">
        {dashboardCards.map((card) => (
          <div key={card.label} className="rounded-xl border border-slate-200 bg-white p-4">
            <p className="text-xs font-bold uppercase tracking-wide text-slate-500">{card.label}</p>
            <p className={`mt-2 text-3xl font-extrabold ${card.tone}`}>{card.value}</p>
          </div>
        ))}
      </div>

      <div className="mt-6 rounded-2xl border border-cyan-100 bg-cyan-50/70 p-4">
        <p className="text-sm font-bold uppercase tracking-wide text-cyan-800">Hospital Dashboard</p>
        <p className="text-xs text-cyan-700/90">Emergency request queue, response actions, and live OPD monitoring</p>
      </div>

      {/* OPD Live Queue Panel */}
      <OpdLivePanel />

      <div className="mt-6 flex flex-wrap gap-2">
        {statusOptions.map((status) => (
          <button
            key={status}
            type="button"
            onClick={() => setActiveStatus(status)}
            className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
              status === activeStatus ? 'bg-blue-600 text-white' : 'bg-white text-slate-700 border border-slate-200'
            }`}
          >
            {prettyStatus(status)}
          </button>
        ))}
        <button
          type="button"
          onClick={loadRequests}
          className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700"
        >
          Refresh
        </button>
      </div>

      {canManualCreate ? (
        <div className="mt-6 rounded-2xl border border-slate-200 bg-white/80 p-4">
          <p className="text-sm font-bold text-slate-800">Hospital Manual Emergency Create</p>
          <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <input
              value={manualForm.patientName}
              onChange={(event) => setManualForm((prev) => ({ ...prev, patientName: event.target.value }))}
              placeholder="Patient name"
              className="rounded-lg border border-slate-200 px-3 py-2 text-sm"
            />
            <input
              value={manualForm.callerPhone}
              onChange={(event) => setManualForm((prev) => ({ ...prev, callerPhone: event.target.value }))}
              placeholder="Caller phone"
              className="rounded-lg border border-slate-200 px-3 py-2 text-sm"
            />
            <input
              value={manualForm.address}
              onChange={(event) => setManualForm((prev) => ({ ...prev, address: event.target.value }))}
              placeholder="Address"
              className="rounded-lg border border-slate-200 px-3 py-2 text-sm"
            />
            <button
              type="button"
              disabled={isCreatingManual}
              onClick={handleManualCreate}
              className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-bold text-white disabled:opacity-60"
            >
              {isCreatingManual ? 'Creating...' : 'Create Manual Request'}
            </button>
          </div>
        </div>
      ) : null}

      {error ? <p className="mt-4 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">{error}</p> : null}

      <div className="mt-6 grid gap-4 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <div className="rounded-2xl border border-slate-200 bg-white/80 p-4 shadow-sm">
            <p className="text-sm font-bold text-slate-800">Hospital Request Queue</p>

            <div className="mt-4 grid gap-4">
              {isLoading ? <p className="text-slate-600">Loading emergency requests...</p> : null}
              {!isLoading && items.length === 0 ? <p className="text-slate-600">No requests found for this status.</p> : null}
              {items.map((item) => (
                <div key={item.id} className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Assignment</p>
                      <p className="text-sm font-semibold text-slate-700">Room {item.assignedRoomNumber || 'Pending room'} | Doctor {item.assignedDoctorName || 'Pending doctor'}</p>
                    </div>
                    <span className={`inline-flex w-fit rounded-full border px-3 py-1 text-xs font-bold ${statusClass(item.status)}`}>
                      {prettyStatus(item.status)}
                    </span>
                  </div>
                  <div className="mt-3 grid grid-cols-1 gap-3 text-sm text-slate-700 sm:grid-cols-2 lg:grid-cols-4">
                    <div>
                      <p className="text-slate-500">Patient</p>
                      <p className="font-semibold">{item.patientName}</p>
                    </div>
                    <div>
                      <p className="text-slate-500">Emergency Type</p>
                      <p className="font-semibold">{item.emergencyType}</p>
                    </div>
                    <div>
                      <p className="text-slate-500">Severity</p>
                      <span className={`inline-flex rounded-full border px-2 py-0.5 text-xs font-bold ${severityClass(item.priority)}`}>
                        {severityFromPriority(item.priority)}
                      </span>
                    </div>
                    <div>
                      <p className="text-slate-500">Assigned Hospital</p>
                      <p className="font-semibold">{item.assignedHospitalName || 'Pending allocation'}</p>
                    </div>
                    <div>
                      <p className="text-slate-500">Ambulance</p>
                      <p className="font-semibold">{item.assignedAmbulanceVehicleNumber || 'Pending dispatch'}</p>
                    </div>
                    <div>
                      <p className="text-slate-500">Created</p>
                      <p className="font-semibold">{new Date(item.createdAt).toLocaleString()}</p>
                    </div>
                  </div>

                  <div className="mt-3 rounded-xl border border-indigo-100 bg-indigo-50 p-3">
                    <p className="text-xs font-bold uppercase tracking-wide text-indigo-700">Previous Records</p>
                    <p className="mt-1 text-xs text-slate-700">
                      Total previous requests: {item.previousRecords?.totalPreviousRequests ?? 0}
                      {item.previousRecords?.lastRequestAt ? ` | Last: ${new Date(item.previousRecords.lastRequestAt).toLocaleString()}` : ''}
                    </p>
                    {(item.previousRecords?.recentHistory || []).length > 0 ? (
                      <ul className="mt-2 space-y-1 text-xs text-slate-700">
                        {(item.previousRecords.recentHistory || []).slice(0, 3).map((history) => (
                          <li key={history.id}>
                            {history.emergencyType} | {history.status} | {new Date(history.createdAt).toLocaleString()}
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="mt-1 text-xs text-slate-600">No prior records found for this patient/caller.</p>
                    )}
                  </div>

                  {role === 'doctor' && item.status === 'accepted' ? (
                    <div className="mt-3 rounded-xl border border-blue-100 bg-blue-50 p-3">
                      <p className="text-xs font-bold uppercase tracking-wide text-blue-700">Uploaded Media + Guidance</p>
                      {(mediaByRequest?.[item.id] || []).length === 0 ? (
                        <p className="mt-1 text-xs text-slate-600">No media uploaded yet for this case.</p>
                      ) : (
                        (mediaByRequest?.[item.id] || []).slice(0, 2).map((media) => (
                          <div key={media.id} className="mt-2 rounded-lg border border-blue-200 bg-white p-2 text-xs text-slate-700">
                            <p className="font-semibold">{String(media.mediaType || '').toUpperCase()} | {new Date(media.createdAt).toLocaleTimeString()}</p>
                            <p className="mt-1">Note: {media.note || 'No note provided'}</p>
                            <p className="mt-1">AI Guidance: {media.aiGuidance || 'No guidance generated'}</p>
                          </div>
                        ))
                      )}
                    </div>
                  ) : null}

                  {renderActionButtons(item)}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white/80 p-4 shadow-sm">
          <p className="text-sm font-bold text-slate-800">Recent Activity Feed</p>
          <p className="mt-1 text-xs text-slate-500">Latest requests from command-center snapshot</p>
          <div className="mt-3 space-y-2">
            {recentActivity.slice(0, 10).map((entry) => (
              <div key={entry.id} className="rounded-lg border border-slate-100 bg-white p-3">
                <p className="line-clamp-1 font-mono text-xs text-slate-600">{entry.id}</p>
                <div className="mt-1 flex items-center justify-between gap-2">
                  <span className={`inline-flex rounded-full border px-2 py-0.5 text-[10px] font-bold ${statusClass(entry.status)}`}>
                    {prettyStatus(entry.status)}
                  </span>
                  <span className="text-[10px] text-slate-500">{new Date(entry.createdAt).toLocaleTimeString()}</span>
                </div>
                <p className="mt-1 text-xs text-slate-700">{entry.patientName || 'Unknown patient'}</p>
              </div>
            ))}
            {recentActivity.length === 0 ? <p className="text-xs text-slate-500">No activity available yet.</p> : null}
          </div>
        </div>
      </div>
    </>
  );
};

export default HospitalDashboardApp;
