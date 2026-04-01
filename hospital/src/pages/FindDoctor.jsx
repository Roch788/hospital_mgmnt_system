import React, { useEffect, useMemo, useState } from "react";
import {
  Users,
  Heart,
  Stethoscope,
  Star,
  Search,
  MapPin,
  Clock,
  Building2,
  Activity,
  DoorOpen,
} from "lucide-react";
import FloatingNavbar from "../components/FloatingNavbar";
import Footer from "../components/Footer";

const OPD_API = import.meta.env.VITE_OPD_API_URL || "http://localhost:3900/api";

const DEPT_LABELS = {
  CARD: "Cardiology",
  ORTH: "Orthopedics",
  NEUR: "Neurology",
  PEDI: "Pediatrics",
  GENM: "General Medicine",
};

const DEPT_COLORS = {
  CARD: "text-red-600 bg-red-50 border-red-200",
  ORTH: "text-blue-600 bg-blue-50 border-blue-200",
  NEUR: "text-purple-600 bg-purple-50 border-purple-200",
  PEDI: "text-green-600 bg-green-50 border-green-200",
  GENM: "text-slate-600 bg-slate-50 border-slate-200",
};

export default function FindDoctor({ onBack, onSOSClick, onLoginClick, onRegisterClick, onHospitalsClick, onTechnologyClick, onContactClick, onFindMedicineClick, onFindDoctorClick, onHomeClick, onFeaturesClick }) {
  const [hospitals, setHospitals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDept, setSelectedDept] = useState("ALL");
  const [selectedHospital, setSelectedHospital] = useState("ALL");

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch(`${OPD_API}/auth/options`);
        if (!res.ok) throw new Error("Failed to load doctors");
        const data = await res.json();
        if (!cancelled) setHospitals(data);
      } catch (err) {
        if (!cancelled) setError(err.message);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => { cancelled = true; };
  }, []);

  const allDoctors = useMemo(() => {
    const list = [];
    for (const h of hospitals) {
      for (const d of h.doctors || []) {
        list.push({ ...d, hospitalShort: h.short, hospitalCode: h.code });
      }
    }
    return list;
  }, [hospitals]);

  const filtered = useMemo(() => {
    let list = allDoctors;
    if (selectedDept !== "ALL") list = list.filter((d) => d.deptCode === selectedDept);
    if (selectedHospital !== "ALL") list = list.filter((d) => d.hospitalCode === selectedHospital);
    if (searchTerm.trim()) {
      const q = searchTerm.toLowerCase();
      list = list.filter((d) =>
        d.name.toLowerCase().includes(q) ||
        (DEPT_LABELS[d.deptCode] || "").toLowerCase().includes(q) ||
        d.qualification.toLowerCase().includes(q)
      );
    }
    return list;
  }, [allDoctors, selectedDept, selectedHospital, searchTerm]);

  const stats = useMemo(() => ({
    totalDoctors: allDoctors.length,
    hospitals: hospitals.length,
    specializations: new Set(allDoctors.map((d) => d.deptCode)).size,
  }), [allDoctors, hospitals]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="flex flex-col items-center gap-3">
          <div className="h-10 w-10 rounded-full border-4 border-blue-200 border-t-blue-600 animate-spin" />
          <p className="text-slate-600 font-medium">Loading doctors...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <FloatingNavbar
        onSOSClick={onSOSClick}
        onLoginClick={onLoginClick}
        onRegisterClick={onRegisterClick}
        onHospitalsClick={onHospitalsClick}
        onTechnologyClick={onTechnologyClick}
        onContactClick={onContactClick}
        onFindMedicineClick={onFindMedicineClick}
        onFindDoctorClick={onFindDoctorClick}
        onHomeClick={onHomeClick}
        onFeaturesClick={onFeaturesClick}
        activeItem="Find Doctor"
      />

      {/* Hero stats */}
      <section className="bg-gradient-to-br from-slate-50 to-blue-50 py-16 pt-20 md:pt-24">
        <div className="max-w-6xl mx-auto text-center px-4">
          <Stethoscope className="mx-auto mb-4 w-10 h-10 text-blue-600" />
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Our Doctors Network</h2>
          <p className="mt-2 text-lg text-gray-600">Real doctors across {stats.hospitals} partner hospitals — same doctors that serve you in OPD</p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-10">
            <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-100">
              <Users className="mx-auto w-8 h-8 mb-2 text-blue-600" />
              <p className="text-3xl font-bold text-gray-900">{stats.totalDoctors}</p>
              <p className="mt-1 text-gray-500">Verified Doctors</p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-100">
              <Building2 className="mx-auto w-8 h-8 mb-2 text-emerald-600" />
              <p className="text-3xl font-bold text-gray-900">{stats.hospitals}</p>
              <p className="mt-1 text-gray-500">Partner Hospitals</p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-100">
              <Activity className="mx-auto w-8 h-8 mb-2 text-purple-600" />
              <p className="text-3xl font-bold text-gray-900">{stats.specializations}</p>
              <p className="mt-1 text-gray-500">Specializations</p>
            </div>
          </div>
        </div>
      </section>

      {/* Search + Filter + Doctor Cards */}
      <section className="bg-white py-12">
        <div className="max-w-6xl mx-auto px-4">
          {/* Search & Filters */}
          <div className="bg-white border border-slate-200 rounded-2xl shadow-sm p-5 -mt-10 relative z-10">
            <div className="flex flex-col md:flex-row gap-3">
              <div className="flex-1 flex items-center gap-3 border rounded-lg px-4 py-3 bg-gray-50">
                <Search className="w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search by name, specialty, or qualification..."
                  className="flex-1 bg-transparent outline-none text-sm"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <select
                value={selectedDept}
                onChange={(e) => setSelectedDept(e.target.value)}
                className="border rounded-lg px-4 py-3 bg-gray-50 text-sm text-slate-700"
              >
                <option value="ALL">All Specialties</option>
                {Object.entries(DEPT_LABELS).map(([code, label]) => (
                  <option key={code} value={code}>{label}</option>
                ))}
              </select>
              <select
                value={selectedHospital}
                onChange={(e) => setSelectedHospital(e.target.value)}
                className="border rounded-lg px-4 py-3 bg-gray-50 text-sm text-slate-700"
              >
                <option value="ALL">All Hospitals</option>
                {hospitals.map((h) => (
                  <option key={h.code} value={h.code}>{h.code}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Results */}
          <div className="mt-10">
            <h3 className="text-2xl font-semibold text-gray-900">Available Doctors</h3>
            <p className="text-sm mt-1 text-gray-500">{filtered.length} doctor{filtered.length !== 1 ? "s" : ""} found</p>

            {error && <p className="mt-4 text-red-600 bg-red-50 rounded-lg px-4 py-3 text-sm">{error}</p>}

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 mt-6">
              {filtered.map((doc) => {
                const deptColor = DEPT_COLORS[doc.deptCode] || DEPT_COLORS.GENM;
                return (
                  <div key={doc.email} className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex items-start gap-4">
                      <div className={`w-14 h-14 rounded-full flex items-center justify-center text-lg font-bold border ${deptColor}`}>
                        {doc.name.split(" ").pop()?.[0] || "D"}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-base font-semibold text-slate-800 truncate">{doc.name}</h4>
                        <span className={`inline-block mt-1 text-xs font-semibold px-2 py-0.5 rounded-full border ${deptColor}`}>
                          {DEPT_LABELS[doc.deptCode] || doc.deptCode}
                        </span>
                      </div>
                    </div>
                    <div className="mt-4 space-y-2 text-sm text-slate-600">
                      <p className="flex items-center gap-2">
                        <Stethoscope className="w-4 h-4 text-slate-400" />
                        {doc.qualification}
                      </p>
                      <p className="flex items-center gap-2">
                        <DoorOpen className="w-4 h-4 text-slate-400" />
                        Room {doc.room}
                      </p>
                      <p className="flex items-center gap-2">
                        <Building2 className="w-4 h-4 text-slate-400" />
                        {doc.hospitalCode}
                      </p>
                      <p className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-slate-400" />
                        OPD: 9:00 AM – 5:00 PM
                      </p>
                    </div>
                    <div className="mt-4 flex gap-2">
                      <button className="flex-1 text-sm py-2 rounded-lg bg-gradient-to-r from-blue-600 to-blue-700 text-white font-medium hover:opacity-90 transition">
                        Book OPD
                      </button>
                      <button className="text-sm py-2 px-4 rounded-lg border border-slate-200 text-slate-700 hover:bg-slate-50 transition">
                        View Profile
                      </button>
                    </div>
                  </div>
                );
              })}
              {filtered.length === 0 && (
                <div className="md:col-span-3 text-center py-12 text-gray-500">
                  No doctors found matching your search.
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}