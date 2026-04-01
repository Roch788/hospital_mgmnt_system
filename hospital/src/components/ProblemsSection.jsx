import { useRef } from 'react';
import { useInView } from '../utils/useInView';
import { Ambulance, Bed, Network } from 'lucide-react';
const ProblemsSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  const problems = [
    {
      title: 'Ambulance Delays',
      description: 'Patients struggle to find ambulances quickly.',
      icon: <Ambulance className="text-5xl text-blue-600" />,
    },
    {
      title: 'ICU Bed Shortage',
      description: 'Hospitals lack real-time bed availability.',
      icon: <Bed className="text-5xl text-blue-600" />,
    },
    {
      title: 'Hospital Disconnection',
      description: 'Healthcare systems operate independently.',
      icon: <Network className="text-5xl text-blue-600" />,
    },
  ];

  return (
    <section ref={ref} id="problems" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <h2
          className="text-4xl font-bold text-center text-gray-900 font-poppins mb-12"
        >
          Why Emergency Healthcare Needs Innovation
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {problems.map((p, i) => (
            <div
              key={p.title}
              className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition"
            >
              <div
                className="mb-6"
              >
                {p.icon}
              </div>
              <h3 className="text-2xl font-bold text-gray-900 font-poppins mb-3">{p.title}</h3>
              <p className="text-gray-700 font-inter">{p.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProblemsSection;
