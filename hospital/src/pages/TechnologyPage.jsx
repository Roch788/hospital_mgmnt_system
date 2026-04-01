import { useEffect, useState } from 'react';
import { Ambulance, Bot, Cloud, Hospital, Layers, Lock, Map, Network, Shield, UserRound } from 'lucide-react';
import FloatingNavbar from '../components/FloatingNavbar';
import Footer from '../components/Footer';

const architectureCards = [
  {
    icon: <UserRound className="text-2xl text-blue-600" />,
    title: 'Patient Interface',
    description: 'Patients can instantly request emergency resources through the MediSync platform.',
  },
  {
    icon: <Hospital className="text-2xl text-blue-600" />,
    title: 'Hospital Dashboard',
    description: 'Hospitals publish live bed, ventilator, doctor, and emergency readiness data in real time.',
  },
  {
    icon: <Ambulance className="text-2xl text-blue-600" />,
    title: 'Ambulance System',
    description: 'Dispatch teams receive optimized routes and case details the moment matching is complete.',
  },
  {
    icon: <Layers className="text-2xl text-blue-600" />,
    title: 'Admin Control Center',
    description: 'Admins monitor network-wide activity, verification health, and response performance.',
  },
];

const securityCards = [
  { icon: <Lock className="text-2xl text-blue-600" />, title: 'Data Encryption', text: 'End-to-end protection for emergency records in transit and at rest.' },
  { icon: <Shield className="text-2xl text-blue-600" />, title: 'Secure Authentication', text: 'Role-based access and protected login flows across user types.' },
  { icon: <Hospital className="text-2xl text-blue-600" />, title: 'Hospital Verification', text: 'Only verified and trusted medical institutions join the active network.' },
  { icon: <Cloud className="text-2xl text-blue-600" />, title: 'Reliable Cloud Infrastructure', text: 'Cloud-native architecture built for high availability and failover readiness.' },
];

const workflowSteps = [
  'Patient activates SOS request.',
  'System finds nearest hospital with available ICU.',
  'Ambulance is dispatched automatically.',
  'Hospital prepares emergency response.',
];

const TechnologyPage = ({ onHomeClick, onSOSClick, onLoginClick, onRegisterClick, onHospitalsClick, onTechnologyClick, onContactClick, onFindMedicineClick, onFindDoctorClick, onFeaturesClick }) => {
  const [counters, setCounters] = useState({
    liveICU: 0,
    connectedHospitals: 0,
    requestsProcessed: 0,
  });

  useEffect(() => {
    const targets = { liveICU: 1280, connectedHospitals: 340, requestsProcessed: 12400 };
    const durationMs = 1200;
    const start = performance.now();

    let frameId;
    const animate = (time) => {
      const progress = Math.min((time - start) / durationMs, 1);
      const ease = 1 - Math.pow(1 - progress, 3);

      setCounters({
        liveICU: Math.round(targets.liveICU * ease),
        connectedHospitals: Math.round(targets.connectedHospitals * ease),
        requestsProcessed: Math.round(targets.requestsProcessed * ease),
      });

      if (progress < 1) frameId = requestAnimationFrame(animate);
    };

    frameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frameId);
  }, []);

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-gray-50 text-gray-900">
      <FloatingNavbar
        onSOSClick={onSOSClick}
        onLoginClick={onLoginClick}
        onRegisterClick={onRegisterClick}
        onHospitalsClick={onHospitalsClick}
        onHomeClick={onHomeClick}
        onTechnologyClick={onTechnologyClick}
        onContactClick={onContactClick}
        onFindMedicineClick={onFindMedicineClick}
        onFindDoctorClick={onFindDoctorClick}
        onFeaturesClick={onFeaturesClick}
        activeItem="Technology"
      />

      <main className="relative z-10 mx-auto max-w-7xl px-4 pt-28 pb-16 md:px-6 space-y-16">
        <section className="rounded-3xl border border-blue-100 bg-white p-6 shadow-sm md:p-10">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:items-center">
            <div>
              <p className="text-blue-600 uppercase tracking-[0.2em] text-xs mb-3">Technology</p>
              <h1 className="text-3xl font-extrabold leading-tight md:text-5xl">
                Technology Powering Real-Time Healthcare Coordination
              </h1>
              <p className="mt-5 text-gray-600 text-base md:text-lg">
                MediSync AI integrates hospitals, ambulances, and medical resources into a unified intelligent network using modern cloud and real-time technologies.
              </p>
            </div>

            <div
              className="relative h-[320px] rounded-2xl border border-blue-100 bg-gradient-to-br from-blue-50 to-cyan-50"
            >
              {[{ left: '16%', top: '24%' }, { left: '68%', top: '20%' }, { left: '45%', top: '68%' }].map((node, index) => (
                <div
                  key={`node-${index}`}
                  className="absolute"
                  style={{ left: node.left, top: node.top }}
                >
                  <div className="w-14 h-14 rounded-full bg-blue-100 border border-blue-200 flex items-center justify-center">
                    <Hospital className="text-blue-600 text-xl" />
                  </div>
                </div>
              ))}

              <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                <path
                  d="M20 26 L72 22 L47 70 Z"
                  fill="transparent"
                  stroke="rgba(37,99,235,0.65)"
                  strokeWidth="0.8"
                />
              </svg>

              <div
                className="absolute left-[34%] top-[43%] text-2xl"
              >
                🚑
              </div>

              <div className="absolute left-8 bottom-8 text-blue-600">
                <Map className="text-2xl" />
              </div>
              <div className="absolute right-8 bottom-10 text-blue-600">
                <Network className="text-2xl" />
              </div>
            </div>
          </div>
        </section>

        <section id="architecture" className="space-y-6">
          <h2 className="text-2xl md:text-4xl font-bold">
            Platform Architecture
          </h2>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {architectureCards.map((card) => (
              <article
                key={card.title}
                className="rounded-2xl border border-blue-100 bg-white p-6"
              >
                <div className="mb-4">{card.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{card.title}</h3>
                <p className="text-gray-600">{card.description}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:items-start">
          <div>
            <h2 className="text-2xl md:text-4xl font-bold">Real-Time Healthcare Resource Visibility</h2>
            <p className="mt-4 text-gray-600">
              Hospitals continuously update ICU beds, ventilators, doctors, and ambulance availability so emergency teams always see current capacity.
            </p>
            <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-3">
              <StatCard label="Live ICU Updates" value={counters.liveICU.toLocaleString()} />
              <StatCard label="Connected Hospitals" value={counters.connectedHospitals.toLocaleString()} />
              <StatCard label="Emergency Requests Processed" value={counters.requestsProcessed.toLocaleString()} />
            </div>
          </div>

          <div
            className="rounded-2xl border border-blue-100 bg-white p-6 shadow-sm"
          >
            <div className="grid grid-cols-2 gap-4">
              {[['ICU Beds', '42'], ['Ventilators', '67'], ['Doctors Online', '119'], ['Ambulances', '28']].map(([label, value], index) => (
                <div key={label} className="rounded-xl border border-blue-100 bg-blue-50/60 p-4">
                  <p className="text-xs uppercase tracking-wide text-blue-700">{label}</p>
                  <p className="mt-2 text-2xl font-bold">{value}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="space-y-6">
          <h2 className="text-2xl md:text-4xl font-bold">
            AI-Powered Emergency Matching
          </h2>
          <p className="text-gray-600 max-w-3xl">
            The matching engine selects the best hospital using patient distance, resource availability, medical specialization, and ambulance readiness.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { title: 'Patient Request', icon: <Ambulance className="text-xl text-blue-600" /> },
              { title: 'AI Processing', icon: <Bot className="text-xl text-blue-600" /> },
              { title: 'Best Hospital Match', icon: <Hospital className="text-xl text-blue-600" /> },
            ].map((item, idx) => (
              <div key={item.title} className="rounded-2xl border border-blue-100 bg-white p-5 text-center">
                <div className="mx-auto mb-3 w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">{item.icon}</div>
                <h3 className="font-semibold">{item.title}</h3>
                {idx < 2 && (
                  <div className="hidden md:block absolute" />
                )}
              </div>
            ))}
          </div>

          <div className="flex items-center justify-center gap-3 text-blue-700 text-sm">
            <span>Patient Request</span>
            <AnimatedArrow />
            <span>AI Processing</span>
            <AnimatedArrow />
            <span>Best Hospital Match</span>
          </div>
        </section>

        <section className="space-y-6">
          <h2 className="text-2xl md:text-4xl font-bold">Security & Reliability</h2>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {securityCards.map((card) => (
              <article
                key={card.title}
                className="rounded-2xl border border-blue-100 bg-white p-6"
              >
                <div className="mb-3 flex items-center gap-3">{card.icon}<h3 className="font-semibold text-lg">{card.title}</h3></div>
                <p className="text-gray-600">{card.text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="space-y-6">
          <h2 className="text-2xl md:text-4xl font-bold">System Workflow</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {workflowSteps.map((step, index) => (
              <div key={step} className="rounded-2xl border border-blue-100 bg-white p-5 relative">
                <p className="text-blue-700 text-sm font-semibold mb-2">Step {index + 1}</p>
                <p className="text-gray-700">{step}</p>
                {index < workflowSteps.length - 1 && (
                  <div className="hidden md:flex absolute -right-3 top-1/2 -translate-y-1/2 text-blue-600">
                    ➜
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-2xl border border-blue-100 bg-white p-6 md:p-8 shadow-sm">
          <h2 className="text-2xl md:text-4xl font-bold">Impact</h2>
          <p className="mt-4 text-gray-600 text-lg">
            MediSync AI reduces emergency response time and improves healthcare resource coordination across hospitals.
          </p>
          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4 text-gray-800">
            <div className="rounded-xl border border-blue-100 bg-blue-50/70 p-4">⏱ faster response</div>
            <div className="rounded-xl border border-blue-100 bg-blue-50/70 p-4">🏥 connected hospitals</div>
            <div className="rounded-xl border border-blue-100 bg-blue-50/70 p-4">🚑 quicker ambulance dispatch</div>
          </div>
        </section>

        <section id="contact" className="rounded-3xl border border-cyan-300/30 bg-gradient-to-r from-cyan-600/20 to-blue-600/20 p-8 text-center md:p-12">
          <h2 className="text-3xl md:text-5xl font-extrabold">Experience the Future of Emergency Healthcare</h2>
          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <button
              onClick={onSOSClick}
              className="rounded-full bg-gradient-to-r from-red-600 to-red-700 px-6 py-3 font-semibold"
            >
              🚨 Activate SOS
            </button>
            <button
              onClick={onHospitalsClick}
              className="rounded-full border border-cyan-300/40 bg-white/80 px-6 py-3 font-semibold"
            >
              🏥 Explore Hospitals
            </button>
          </div>
        </section>
      </main>

      <Footer onNavigateHome={onHomeClick} />
    </div>
  );
};

const StatCard = ({ label, value }) => (
  <div className="rounded-xl border border-blue-100 bg-white p-4 shadow-sm">
    <p className="text-xs uppercase tracking-wide text-blue-700">{label}</p>
    <p className="mt-2 text-2xl font-bold">{value}</p>
  </div>
);

const AnimatedArrow = () => (
  <span>
    ➜
  </span>
);

export default TechnologyPage;
