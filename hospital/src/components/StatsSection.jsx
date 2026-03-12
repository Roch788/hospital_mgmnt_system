import { motion, useInView } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';

const CountUpNumber = ({ end, duration = 2.5 }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const increment = end / (duration * 60);
    const interval = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(interval);
      } else {
        setCount(Math.floor(start));
      }
    }, 1000 / 60);
    return () => clearInterval(interval);
  }, [end, duration]);

  return <span>{count}+</span>;
};

const StatsSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  const stats = [
    { label: 'Hospitals Connected', value: 250 },
    { label: 'Ambulances Active', value: 120 },
    { label: 'ICU Beds Available', value: 900 },
    { label: 'Doctors On Duty', value: 500 },
  ];

  return (
    <section ref={ref} id="hospitals" className="py-20 bg-gradient-to-br from-blue-50 to-cyan-50">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              className="bg-white/30 backdrop-blur-md rounded-2xl p-8 shadow-lg border border-white/40"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              whileHover={{ y: -10, boxShadow: '0 20px 40px rgba(37, 99, 235, 0.3)' }}
            >
              <motion.p className="text-4xl md:text-5xl font-bold text-blue-600 font-poppins">
                {inView && <CountUpNumber end={stat.value} />}
              </motion.p>
              <p className="mt-4 text-gray-700 font-inter">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
