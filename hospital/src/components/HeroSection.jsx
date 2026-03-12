import { motion } from 'framer-motion';
import { FaCheckCircle } from 'react-icons/fa';
import HeroMapAnimation from './HeroMapAnimation';

const HeroSection = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8 },
    },
  };

  const trustItems = [
    'Real-time hospital network',
    'AI emergency routing',
    'Instant ambulance dispatch',
  ];

  return (
    <section id="home" className="relative min-h-screen overflow-hidden pt-32 pb-20">
      {/* Animated gradient background */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-blue-600 via-teal-500 to-cyan-400 opacity-15"
        animate={{
          backgroundPosition: ['0% 0%', '100% 100%'],
        }}
        transition={{ duration: 15, repeat: Infinity, repeatType: 'reverse' }}
      />

      {/* Floating icons background */}
      <motion.div className="absolute top-20 left-10 text-6xl opacity-10" animate={{ y: [0, -30, 0] }} transition={{ duration: 4, repeat: Infinity }}>
        🚑
      </motion.div>
      <motion.div className="absolute bottom-32 right-10 text-6xl opacity-10" animate={{ y: [0, 30, 0] }} transition={{ duration: 5, repeat: Infinity, delay: 1 }}>
        🏥
      </motion.div>
      <motion.div className="absolute top-1/2 right-1/4 text-5xl opacity-10" animate={{ y: [0, -20, 0] }} transition={{ duration: 6, repeat: Infinity, delay: 2 }}>
        ❤️
      </motion.div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Left content */}
          <motion.div variants={containerVariants} initial="hidden" animate="visible">
            <motion.h1 variants={itemVariants} className="text-5xl md:text-6xl font-bold text-gray-900 font-poppins leading-tight">
              Smart Emergency Healthcare Network
            </motion.h1>

            <motion.p variants={itemVariants} className="mt-6 text-lg text-gray-700 font-inter">
              Connecting patients, hospitals, and ambulances in real-time to save lives during emergencies.
            </motion.p>

            {/* Buttons */}
            <motion.div variants={itemVariants} className="mt-8 flex flex-col sm:flex-row gap-4">
              <motion.button
                className="px-8 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg font-semibold shadow-lg"
                whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(37, 99, 235, 0.6)' }}
                whileTap={{ scale: 0.95 }}
              >
                Find Emergency Care
              </motion.button>

              <motion.button
                className="px-8 py-3 bg-red-500 text-white rounded-lg font-semibold shadow-lg"
                whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(239, 68, 68, 0.6)' }}
                whileTap={{ scale: 0.95 }}
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                Activate SOS
              </motion.button>
            </motion.div>

            {/* Trust indicators */}
            <motion.div variants={itemVariants} className="mt-10 space-y-3">
              {trustItems.map((item, i) => (
                <motion.div
                  key={item}
                  className="flex items-center space-x-3"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 + i * 0.1 }}
                >
                  <FaCheckCircle className="text-green-500 text-xl" />
                  <span className="text-gray-700 font-inter">{item}</span>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right side - Map animation */}
          <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8, delay: 0.3 }}>
            <HeroMapAnimation />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
