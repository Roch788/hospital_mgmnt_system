import { useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { FaHospital, FaBars, FaTimes } from 'react-icons/fa';

const FloatingNavbar = () => {
  const [open, setOpen] = useState(false);
  const { scrollY } = useScroll();
  const menuItems = ['Home', 'Features', 'Hospitals', 'Technology', 'Contact'];

  const navbarScale = useTransform(scrollY, [0, 100], [1, 0.95]);
  const blurValue = useTransform(scrollY, [0, 100], [10, 20]);

  return (
    <motion.nav
      style={{ scale: navbarScale }}
      className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50"
    >
      <motion.div className="bg-white/60 backdrop-blur-lg rounded-full shadow-lg px-6 py-3">
        <div className="flex items-center justify-between space-x-6">
          <motion.div
            className="flex items-center space-x-2"
            whileHover={{ scale: 1.05 }}
          >
            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <FaHospital className="text-2xl text-blue-600" />
            </motion.div>
            <span className="text-lg font-bold text-blue-600 font-poppins">MediLink</span>
          </motion.div>

          <ul className="hidden md:flex space-x-6 text-gray-700">
            {menuItems.map((item, i) => (
              <motion.li key={item} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.1 }}>
                <motion.a
                  href={`#${item.toLowerCase()}`}
                  className="relative font-inter"
                  whileHover={{ color: '#2563EB' }}
                >
                  {item}
                  <motion.div className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-blue-600 origin-center" whileHover={{ width: '100%', x: '-50%' }} transition={{ duration: 0.3 }} />
                </motion.a>
              </motion.li>
            ))}
          </ul>

          <div className="hidden md:flex space-x-2">
            <motion.button className="px-4 py-2 border border-blue-600 text-blue-600 rounded-full" whileHover={{ scale: 1.05, y: -2 }}>
              Login
            </motion.button>
            <motion.button className="px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-full" whileHover={{ scale: 1.05, y: -2 }}>
              Register
            </motion.button>
          </div>

          <button className="md:hidden text-gray-700" onClick={() => setOpen(!open)}>
            {open ? <FaTimes /> : <FaBars />}
          </button>
        </div>

        {open && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="md:hidden mt-4 bg-white rounded-lg">
            <ul className="flex flex-col space-y-2 p-4">
              {menuItems.map((item) => (
                <li key={item}>
                  <a href={`#${item.toLowerCase()}`} className="text-gray-700 hover:text-blue-600" onClick={() => setOpen(false)}>
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </motion.div>
    </motion.nav>
  );
};

export default FloatingNavbar;
