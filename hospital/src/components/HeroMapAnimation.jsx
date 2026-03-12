import { motion } from 'framer-motion';
import { FaAmbulance, FaHospital, FaMapMarkerAlt } from 'react-icons/fa';

const HeroMapAnimation = () => {
  const ambulancePath = { x: [0, 100, 200, 300], y: [0, 30, -20, 0] };

  return (
    <div className="relative w-full h-full min-h-screen flex items-center justify-center">
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 300">
        {/* Hospital nodes */}
        <g>
          <circle cx="80" cy="100" r="15" fill="rgba(37, 99, 235, 0.1)" />
          <circle cx="80" cy="100" r="12" fill="none" stroke="#2563EB" strokeWidth="2" />
          <circle cx="320" cy="150" r="15" fill="rgba(37, 99, 235, 0.1)" />
          <circle cx="320" cy="150" r="12" fill="none" stroke="#2563EB" strokeWidth="2" />
          <circle cx="150" cy="250" r="15" fill="rgba(37, 99, 235, 0.1)" />
          <circle cx="150" cy="250" r="12" fill="none" stroke="#2563EB" strokeWidth="2" />
        </g>

        {/* Connection lines */}
        <g stroke="rgba(37, 99, 235, 0.2)" strokeWidth="1" strokeDasharray="5,5">
          <line x1="80" y1="100" x2="320" y2="150" />
          <line x1="80" y1="100" x2="150" y2="250" />
          <line x1="320" y1="150" x2="150" y2="250" />
        </g>
      </svg>

      {/* Hospital icons */}
      <motion.div
        className="absolute top-20 left-10"
        animate={{ y: [0, -20, 0] }}
        transition={{ duration: 3, repeat: Infinity }}
      >
        <FaHospital className="text-4xl text-blue-600 opacity-70" />
      </motion.div>

      <motion.div
        className="absolute bottom-32 right-10"
        animate={{ y: [0, -20, 0] }}
        transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}
      >
        <FaHospital className="text-4xl text-blue-600 opacity-70" />
      </motion.div>

      <motion.div
        className="absolute top-1/2 left-1/4"
        animate={{ y: [0, -20, 0] }}
        transition={{ duration: 3, repeat: Infinity, delay: 1 }}
      >
        <FaHospital className="text-4xl text-blue-600 opacity-70" />
      </motion.div>

      {/* Emergency pin - pulsing */}
      <motion.div
        className="absolute top-1/3 right-1/3"
        animate={{ scale: [1, 1.3, 1] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      >
        <motion.div className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center">
          <FaMapMarkerAlt className="text-white text-2xl" />
        </motion.div>
      </motion.div>

      {/* Ambulance moving */}
      <motion.div
        className="absolute"
        animate={{ x: [0, 200, 280], y: [0, 50, 120] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        style={{ top: '40%', left: '10%' }}
      >
        <motion.div animate={{ rotate: [0, 0, 45] }} transition={{ duration: 6, repeat: Infinity }}>
          <FaAmbulance className="text-4xl text-blue-500 drop-shadow-lg" />
        </motion.div>
      </motion.div>

      {/* Glow effect for hospitals */}
      <motion.div
        className="absolute top-20 left-10 w-20 h-20 bg-blue-400 rounded-full blur-3xl opacity-20"
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 2, repeat: Infinity }}
      />
    </div>
  );
};

export default HeroMapAnimation;
