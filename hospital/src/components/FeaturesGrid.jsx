import { useRef } from 'react';
import { useInView } from '../utils/useInView';
import { Ambulance, Bed, Brain, HeartPulse, MapPin, TrendingUp } from 'lucide-react';
const FeaturesGrid = ({ modal = false }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  const features = [
    {
      title: 'Real-Time Resource Tracking',
      description: 'Monitor ICU beds, ventilators, and medical equipment across all hospitals in real-time.',
      icon: <MapPin />,
      color: 'bg-blue-600',
    },
    {
      title: 'Ambulance Dispatch System',
      description: 'Intelligent routing algorithm that dispatches nearest ambulance within seconds.',
      icon: <Ambulance />,
      color: 'bg-red-600',
    },
    {
      title: 'ICU Bed Availability Monitoring',
      description: 'Live dashboard showing available beds, equipment, and specialties across network.',
      icon: <Bed />,
      color: 'bg-green-600',
    },
    {
      title: 'AI Smart Hospital Matching',
      description: 'Machine learning algorithm matches patients with the best available hospital resources.',
      icon: <Brain />,
      color: 'bg-purple-600',
    },
    {
      title: 'Healthcare Analytics Dashboard',
      description: 'Comprehensive analytics for hospital administrators and emergency coordinators.',
      icon: <TrendingUp />,
      color: 'bg-indigo-600',
    },
    {
      title: 'Multi-Hospital Integration',
      description: 'Seamlessly connect multiple hospital systems into a unified coordination platform.',
      icon: <HeartPulse />,
      color: 'bg-teal-600',
    },
  ];

  return modal ? (
    <div className="w-full">
      {/* Section header */}
      <div className="text-center mb-8">
        <h2 className="text-3xl md:text-4xl font-bold font-poppins mb-4 text-gray-900">
          Platform Features That<span className="text-blue-600"> Save Lives</span>
        </h2>
        <p className="text-gray-600 text-lg max-w-2xl mx-auto">
          Comprehensive healthcare coordination platform with cutting-edge technology
        </p>
      </div>

      {/* Features Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {features.map((feature, i) => (
          <div
            key={feature.title}
            className="group relative overflow-hidden"
          >
            {/* Card */}
            <div className="relative h-full bg-white rounded-2xl p-6 border border-gray-200 shadow-lg flex flex-col hover:shadow-xl transition-shadow">

              {/* Icon */}
              <div className={`w-14 h-14 rounded-xl ${feature.color} text-white flex items-center justify-center text-2xl mb-4 shadow-lg`}>
                {feature.icon}
              </div>

              {/* Title */}
              <h3 className="text-lg font-bold text-gray-900 font-poppins mb-2">
                {feature.title}
              </h3>

              {/* Description */}
              <p className="text-gray-600 font-inter text-sm flex-grow">
                {feature.description}
              </p>

              {/* Bottom line animation */}
              <div className={`mt-4 h-1 ${feature.color} rounded-full w-0 group-hover:w-full transition-all duration-300`} />
            </div>
          </div>
        ))}
      </div>
    </div>
  ) : (
    <section ref={ref} id="features" className="py-20 px-4 bg-white relative overflow-hidden">
      <div className="container mx-auto relative z-10">

        {/* Section header */}
        <div className="text-center mb-14">
          <h2 className="text-4xl md:text-5xl font-bold font-poppins mb-4 text-gray-900">
            Platform Features That<span className="text-blue-600"> Save Lives</span>
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Comprehensive healthcare coordination platform with cutting-edge technology
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, i) => (
            <div
              key={feature.title}
              className="group relative overflow-hidden"
            >
              {/* Card */}
              <div className="relative h-full bg-white rounded-2xl p-8 border border-gray-200 shadow-lg flex flex-col hover:shadow-xl transition-shadow">

                {/* Icon */}
                <div className={`w-16 h-16 rounded-xl ${feature.color} text-white flex items-center justify-center text-3xl mb-6 shadow-lg`}>
                  {feature.icon}
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold text-gray-900 font-poppins mb-3">
                  {feature.title}
                </h3>

                {/* Description */}
                <p className="text-gray-600 font-inter flex-grow">
                  {feature.description}
                </p>

                {/* Bottom line animation */}
                <div className={`mt-6 h-1 ${feature.color} rounded-full w-0 group-hover:w-full transition-all duration-300`} />
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default FeaturesGrid;