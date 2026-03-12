import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { FaMapMarkerAlt, FaTruck, FaBed, FaHeartbeat, FaChartLine, FaRobot } from 'react-icons/fa';

const FeaturesGrid = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  const features = [
    { title: 'Live Hospital Map', icon: <FaMapMarkerAlt /> },
    { title: 'Ambulance Tracking', icon: <FaTruck /> },
    { title: 'ICU Bed Monitoring', icon: <FaBed /> },
    { title: 'Emergency SOS', icon: <FaHeartbeat /> },
    { title: 'Healthcare Analytics', icon: <FaChartLine /> },
    { title: 'AI Medical Assistant', icon: <FaRobot /> },
  ];

  return (
    <section ref={ref} id="features" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
          className="text-4xl font-bold text-center text-gray-900 font-poppins mb-12"
        >
          Platform Features
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              className="bg-white/40 backdrop-blur-md rounded-2xl p-8 border border-white/60 shadow-lg hover:shadow-xl transition"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              whileHover={{
                y: -15,
                background: 'linear-gradient(135deg, rgba(37, 99, 235, 0.2), rgba(20, 184, 166, 0.2))',
              }}
            >
              <motion.div
                className="text-5xl text-blue-600 mb-4"
                whileHover={{ scale: 1.2, rotate: 10 }}
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 2, repeat: Infinity, delay: i * 0.2 }}
              >
                {feature.icon}
              </motion.div>
              <h3 className="text-xl font-bold text-gray-900 font-poppins">{feature.title}</h3>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesGrid;
