import { useState } from 'react';
import { Hospital, Menu, X } from 'lucide-react';
const Navbar = () => {
  const [open, setOpen] = useState(false);
  const menuItems = ['Home', 'Features', 'Hospitals', 'Dashboard', 'Contact'];

  return (
    <nav
      className="fixed top-0 w-full bg-white/70 backdrop-blur-lg shadow-sm z-50"
    >
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <div
          className="flex items-center space-x-2"
        >
          <div
          >
            <Hospital className="text-2xl text-primary" />
          </div>
          <span className="text-xl font-bold text-primary font-poppins">
            MediSync AI
          </span>
        </div>

        {/* desktop menu */}
        <ul className="hidden md:flex space-x-6 text-gray-700">
          {menuItems.map((item, index) => (
            <li
              key={item}
            >
              <a
                href={`#${item.toLowerCase()}`}
                className="relative font-inter hover:text-primary transition-colors"
              >
                {item}
                <div
                  className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary"
                />
              </a>
            </li>
          ))}
        </ul>

        {/* actions */}
        <div className="hidden md:flex space-x-2">
          <button
            className="px-4 py-2 border border-primary text-primary rounded hover:bg-blue-50 transition"
          >
            Login
          </button>
          <button
            className="px-4 py-2 bg-gradient-to-r from-primary to-blue-700 text-white rounded hover:from-blue-700 hover:to-primary transition"
          >
            Register
          </button>
        </div>

        {/* mobile hamburger */}
        <button
          className="md:hidden text-gray-700"
          onClick={() => setOpen(!open)}
        >
          {open ? <X /> : <Menu />}
        </button>
      </div>

      {/* mobile menu drawer */}
      {open && (
        <div
          className="md:hidden bg-white shadow"
        >
          <ul className="flex flex-col space-y-2 px-4 py-3">
            {menuItems.map((item) => (
              <li key={item}>
                <a
                  href={`#${item.toLowerCase()}`}
                  className="block text-gray-700 hover:text-primary transition"
                  onClick={() => setOpen(false)}
                >
                  {item}
                </a>
              </li>
            ))}
            <li className="flex space-x-2 pt-2">
              <button className="flex-1 px-4 py-2 border border-primary text-primary rounded hover:bg-blue-50 transition">
                Login
              </button>
              <button className="flex-1 px-4 py-2 bg-gradient-to-r from-primary to-blue-700 text-white rounded hover:from-blue-700 hover:to-primary transition">
                Register
              </button>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
