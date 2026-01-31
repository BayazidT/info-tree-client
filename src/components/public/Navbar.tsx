// src/components/public/Navbar.tsx
import { NavLink } from 'react-router-dom';
import { Home, Info, Phone, ShieldAlert, Menu, X } from 'lucide-react';
import { useState } from 'react';

const publicNavItems = [
  { to: '/', label: 'Home', icon: Home },
  { to: '/emergency', label: 'Emergency Info', icon: ShieldAlert },
  { to: '/doctors', label: 'Find Doctors', icon: Info },
  { to: '/contact', label: 'Contact', icon: Phone },
];

export default function PublicNavbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow-sm border-b border-sky-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <h1 className="text-2xl font-bold text-sky-700">InfoTreeBD</h1>
            <span className="ml-2 text-sm font-medium text-sky-600 hidden sm:block">
              Public Health Information
            </span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {publicNavItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `flex items-center gap-2 text-gray-700 hover:text-sky-600 transition font-medium ${
                    isActive ? 'text-sky-600 font-semibold' : ''
                  }`
                }
              >
                <item.icon className="w-5 h-5" />
                {item.label}
              </NavLink>
            ))}
          </nav>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-gray-700 hover:text-sky-600 focus:outline-none"
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-sky-100">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {publicNavItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                onClick={() => setMobileMenuOpen(false)}
                className={({ isActive }) =>
                  `block px-3 py-2 rounded-md text-base font-medium ${
                    isActive
                      ? 'bg-sky-50 text-sky-700'
                      : 'text-gray-700 hover:bg-sky-50 hover:text-sky-700'
                  }`
                }
              >
                <div className="flex items-center gap-3">
                  <item.icon className="w-5 h-5" />
                  {item.label}
                </div>
              </NavLink>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}