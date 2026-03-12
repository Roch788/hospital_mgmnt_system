import { motion } from 'framer-motion';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';

const Footer = () => {
  // Heartbeat animation line
  const heartbeatPath = 'M 0 50 L 20 50 L 30 20 L 40 80 L 50 50 L 100 50';

  return (
    <footer className="bg-gradient-to-b from-gray-900 to-black text-white py-16 relative overflow-hidden">
      {/* Animated heartbeat line background */}
      <motion.svg className="absolute top-0 left-0 w-full h-20 opacity-20" viewBox="0 0 100 100" preserveAspectRatio="none">
        <motion.path
          d={heartbeatPath}
          stroke="currentColor"
          strokeWidth="2"
          fill="none"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      </motion.svg>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* About */}
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h3 className="text-2xl font-bold font-poppins mb-4">About MediLink</h3>
            <p className="text-gray-400 font-inter">MediLink AI is revolutionizing emergency healthcare by connecting patients, hospitals, and ambulances in real-time using AI-powered routing.</p>
          </motion.div>

          {/* Quick Links */}
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}>
            <h3 className="text-2xl font-bold font-poppins mb-4">Quick Links</h3>
            <ul className="space-y-2 text-gray-400">
              <li>
                <a href="#home" className="hover:text-white transition">
                  Home
                </a>
              </li>
              <li>
                <a href="#features" className="hover:text-white transition">
                  Features
                </a>
              </li>
              <li>
                <a href="#hospitals" className="hover:text-white transition">
                  Hospitals
                </a>
              </li>
              <li>
                <a href="#technology" className="hover:text-white transition">
                  Technology
                </a>
              </li>
            </ul>
          </motion.div>

          {/* Contact */}
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}>
            <h3 className="text-2xl font-bold font-poppins mb-4">Contact</h3>
            <div className="text-gray-400 font-inter space-y-2">
              <p>📍 123 Health Tower, Medical City</p>
              <p>📞 +1 (555) 123-4567</p>
              <p>📧 support@medilink.ai</p>
            </div>
          </motion.div>

          {/* Social */}
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.3 }}>
            <h3 className="text-2xl font-bold font-poppins mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              {[
                { icon: <FaFacebook />, label: 'Facebook' },
                { icon: <FaTwitter />, label: 'Twitter' },
                { icon: <FaInstagram />, label: 'Instagram' },
                { icon: <FaLinkedin />, label: 'LinkedIn' },
              ].map((social, i) => (
                <motion.a
                  key={i}
                  href="#"
                  className="text-2xl hover:text-blue-400 transition"
                  whileHover={{ scale: 1.3, rotate: 10 }}
                  whileTap={{ scale: 0.9 }}
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Divider */}
        <motion.div className="border-t border-gray-800 pt-8" initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }} />

        {/* Bottom */}
        <motion.div className="text-center text-gray-500 font-inter" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.4 }}>
          <p>&copy; 2026 MediLink AI. All rights reserved. | Saving Lives Through Smart Technology</p>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
