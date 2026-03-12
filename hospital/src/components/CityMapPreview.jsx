import { motion } from 'framer-motion';
import { FaMapMarkerAlt, FaExclamationTriangle } from 'react-icons/fa';

const CityMapPreview = () => {
  return (
    <section id="citymap" className="py-20 bg-gradient-to-br from-blue-50 to-cyan-50">
      <div className="container mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl font-bold text-center text-gray-900 font-poppins mb-12"
        >
          Interactive City Emergency Map
        </motion.h2>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
          {/* Map area */}
          <motion.div
            className="lg:col-span-2 relative bg-gradient-to-br from-blue-200 to-cyan-200 rounded-3xl p-8 shadow-2xl min-h-96"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
          >
            {/* Hospital markers */}
            {[
              { top: '20%', left: '20%', label: 'St. Mary Hospital' },
              { top: '40%', left: '70%', label: 'City Medical Center' },
              { top: '70%', left: '30%', label: 'Emergency Clinic' },
            ].map((h, i) => (
              <motion.div
                key={i}
                className="absolute"
                style={{ top: h.top, left: h.left }}
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
              >
                <motion.div className="w-8 h-8 bg-blue-500 rounded-full shadow-lg flex items-center justify-center text-white text-lg cursor-pointer hover:text-2xl transition">
                  🏥
                </motion.div>
                <div className="text-xs text-gray-700 mt-1 whitespace-nowrap font-inter">{h.label}</div>
              </motion.div>
            ))}

            {/* Emergency location */}
            <motion.div
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
              animate={{ scale: [1, 1.3, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <FaExclamationTriangle className="text-5xl text-red-500 drop-shadow-lg" />
            </motion.div>

            {/* Animated ambulance */}
            <motion.div
              className="absolute"
              animate={{
                top: ['20%', '50%', '70%'],
                left: ['20%', '60%', '30%'],
              }}
              transition={{ duration: 8, repeat: Infinity }}
            >
              🚑
            </motion.div>
          </motion.div>

          {/* Alert panel */}
          <motion.div
            className="bg-white/80 backdrop-blur-lg rounded-2xl p-6 shadow-xl border border-white/40"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            whileHover={{ y: -10 }}
          >
            <div className="flex items-center space-x-3 mb-4">
              <motion.div animate={{ scale: [1, 1.3, 1] }} transition={{ duration: 1, repeat: Infinity }}>
                <FaExclamationTriangle className="text-3xl text-red-500" />
              </motion.div>
              <h3 className="text-2xl font-bold text-gray-900 font-poppins">Emergency Alert</h3>
            </div>

            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-600 font-inter">Alert Type</p>
                <p className="text-lg font-semibold text-gray-900">Traffic Accident Detected</p>
              </div>

              <div>
                <p className="text-sm text-gray-600 font-inter">Distance</p>
                <p className="text-lg font-semibold text-gray-900">2.1 km away</p>
              </div>

              <div>
                <p className="text-sm text-gray-600 font-inter">Assigned Hospital</p>
                <motion.p className="text-lg font-semibold text-blue-600">St. Mary Hospital</motion.p>
              </div>

              <motion.button
                className="w-full mt-6 bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3 rounded-lg font-semibold"
                whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(37, 99, 235, 0.6)' }}
                whileTap={{ scale: 0.95 }}
              >
                View Details
              </motion.button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default CityMapPreview;
