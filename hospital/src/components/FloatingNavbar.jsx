import { useState } from 'react';
import { Hospital, Menu, X } from 'lucide-react';

const NAV_ITEMS = [
  { label: 'Home',          key: 'onHomeClick' },
  { label: 'Features',      key: 'onFeaturesClick' },
  { label: 'Find Doctor',   key: 'onFindDoctorClick' },
  { label: 'Find Medicine', key: 'onFindMedicineClick' },
  { label: 'Hospitals',     key: 'onHospitalsClick' },
  { label: 'Technology',    key: 'onTechnologyClick' },
  { label: 'Contact',       key: 'onContactClick' },
];

const FloatingNavbar = (props) => {
  const { onSOSClick, onLoginClick, onRegisterClick, activeItem } = props;
  const [open, setOpen] = useState(false);

  const go = (item) => {
    props[item.key]?.();
    setOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 w-full">
      <div className="bg-white/70 backdrop-blur-lg shadow-lg px-8 py-4 w-full">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <button type="button" onClick={() => go(NAV_ITEMS[0])} className="flex items-center gap-2 group">
            <Hospital className="w-6 h-6 text-blue-600 group-hover:scale-110 transition-transform" />
            <span className="text-lg font-bold text-blue-600 font-poppins">MediSync</span>
          </button>

          <ul className="hidden md:flex gap-6 text-gray-700">
            {NAV_ITEMS.map((item) => (
              <li key={item.label}>
                <button
                  type="button"
                  onClick={() => go(item)}
                  className={`relative font-inter hover:text-blue-600 transition-colors after:absolute after:bottom-0 after:left-0 after:h-0.5 after:bg-blue-600 after:transition-all ${
                    activeItem === item.label ? 'text-blue-700 font-semibold after:w-full' : 'after:w-0 hover:after:w-full'
                  }`}
                >
                  {item.label}
                </button>
              </li>
            ))}
          </ul>

          <div className="hidden md:flex gap-2">
            <button onClick={onLoginClick} className="px-4 py-2 border border-blue-600 text-blue-600 rounded-full hover:bg-blue-50 transition">Login</button>
            <button onClick={onRegisterClick} className="px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-full hover:opacity-90 transition">Register</button>
            <button onClick={onSOSClick} className="ml-2 px-4 py-2 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-full font-bold text-sm animate-sos-glow">🚨 SOS</button>
          </div>

          <button className="md:hidden text-gray-700" onClick={() => setOpen(!open)}>
            {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {open && (
          <div className="md:hidden mt-4 bg-white rounded-lg animate-fade-in">
            <ul className="flex flex-col gap-2 p-4">
              {NAV_ITEMS.map((item) => (
                <li key={item.label}>
                  <button type="button" onClick={() => go(item)} className={`w-full text-left py-2 hover:text-blue-600 ${activeItem === item.label ? 'text-blue-700 font-semibold' : 'text-gray-700'}`}>
                    {item.label}
                  </button>
                </li>
              ))}
              <button onClick={() => { onLoginClick?.(); setOpen(false); }} className="mt-2 w-full rounded-lg border border-blue-200 px-4 py-3 text-blue-700">Login</button>
              <button onClick={() => { onRegisterClick?.(); setOpen(false); }} className="w-full rounded-lg bg-gradient-to-r from-blue-600 to-blue-700 px-4 py-3 text-white">Register</button>
              <button onClick={() => { onSOSClick?.(); setOpen(false); }} className="w-full py-3 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-lg font-bold animate-sos-glow">🚨 Activate SOS</button>
            </ul>
          </div>
        )}
      </div>
    </nav>
  );
};

export default FloatingNavbar;
