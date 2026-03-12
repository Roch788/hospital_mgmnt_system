import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { FaExclamationCircle, FaBrain, FaHospital, FaAmbulance } from 'react-icons/fa';

const WorkflowSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  const steps = [
    { title: 'Emergency Detected', icon: <FaExclamationCircle /> },
    { title: 'AI Analyzes Location', icon: <FaBrain /> },
    { title: 'Best Hospital Selected', icon: <FaHospital /> },
    { title: 'Ambulance Dispatched', icon: <FaAmbulance /> },
  ];

  return (
    <section ref={ref} id="workflow" className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="container mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : { opacity: 0 }}
          className="text-4xl font-bold text-center text-gray-900 font-poppins mb-16"
        >
          How MediLink AI Works
        </motion.h2>

        <div className="relative">
          {/* Horizontal progress line */}
          <motion.div
            className="absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-blue-600 to-teal-500"
            style={{ transform: 'translateY(-50%)' }}
            initial={{ scaleX: 0 }}
            animate={inView ? { scaleX: 1 } : { scaleX: 0 }}
            transition={{ duration: 1.5, delay: 0.3 }}
            origin="left"
          />

          {/* Steps */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative z-10">
            {steps.map((step, i) => (
              <motion.div
                key={step.title}
                className="flex flex-col items-center"
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ delay: 0.5 + i * 0.15, duration: 0.6 }}
              >
                <motion.div
                  className="w-16 h-16 rounded-full bg-white shadow-lg flex items-center justify-center text-3xl text-blue-600 border-4 border-blue-600 font-bold font-poppins"
                  whileHover={{ scale: 1.15, boxShadow: '0 0 30px rgba(37, 99, 235, 0.6)' }}
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 2, repeat: Infinity, delay: i * 0.2 }}
                >
                  {step.icon}
                </motion.div>
                <p className="mt-4 text-center font-semibold text-gray-900 font-poppins">{step.title}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default WorkflowSection;
