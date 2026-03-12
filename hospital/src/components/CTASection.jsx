import { motion } from 'framer-motion';

const CTASection = () => {
  return (
    <section id="cta" className="py-20 relative overflow-hidden">
      {/* Animated gradient background */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-blue-700 via-blue-900 to-gray-900"
        animate={{
          backgroundPosition: ['0% 0%', '100% 100%'],
        }}
        transition={{ duration: 15, repeat: Infinity, repeatType: 'reverse' }}
      />

      {/* Animated geometric shapes background */}
      <motion.div className="absolute top-0 left-0 w-96 h-96 bg-blue-500 rounded-full opacity-10 blur-3xl" animate={{ x: [0, 30, 0] }} transition={{ duration: 8, repeat: Infinity }} />
      <motion.div className="absolute bottom-0 right-0 w-96 h-96 bg-teal-500 rounded-full opacity-10 blur-3xl" animate={{ x: [0, -30, 0] }} transition={{ duration: 10, repeat: Infinity }} />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          className="text-center max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-5xl md:text-6xl font-bold text-white font-poppins mb-8">
            Be Part of the Smart Healthcare Network
          </h2>

          <p className="text-xl text-blue-100 font-inter mb-12">Join thousands of hospitals and healthcare providers transforming emergency response.</p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <motion.button
              className="px-8 py-4 bg-white text-blue-700 rounded-lg font-bold text-lg"
              whileHover={{
                scale: 1.05,
                boxShadow: '0 0 40px rgba(255, 255, 255, 0.4)',
              }}
              whileTap={{ scale: 0.95 }}
            >
              Register Hospital
            </motion.button>

            <motion.button
              className="px-8 py-4 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-lg font-bold text-lg border-2 border-white/30"
              whileHover={{
                scale: 1.05,
                boxShadow: '0 0 40px rgba(239, 68, 68, 0.6)',
              }}
              whileTap={{ scale: 0.95 }}
            >
              Emergency Access
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;
