// src/components/public/Navbar.tsx
import { NavLink } from 'react-router-dom';
import { Home, ShieldAlert, Stethoscope, Phone, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';

const publicNavItems = [
  { to: '/', key: 'home', icon: Home },
  { to: '/emergency', key: 'emergencyInfo', icon: ShieldAlert },
  { to: '/doctors', key: 'findDoctors', icon: Stethoscope },
  { to: '/contact', key: 'contact', icon: Phone },
];

export default function PublicNavbar() {
  const { t, toggleLanguage, language } = useLanguage();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow-sm border-b border-sky-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <h1 className="text-2xl font-bold text-sky-700">InfoTreeBD</h1>
            <span className="ml-2 text-sm font-medium text-sky-600 hidden sm:block">
              {language === 'en' ? 'Public Health Information' : 'জনস্বাস্থ্য তথ্য'}
            </span>
          </div>

          {/* Desktop Nav + Language Toggle */}
          <div className="hidden md:flex items-center gap-8">
            <nav className="flex items-center space-x-8">
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
                  {t(item.key)}
                </NavLink>
              ))}
            </nav>

            {/* Language Toggle - Desktop */}
            <button
              onClick={toggleLanguage}
              className="flex items-center gap-2 px-3 py-1.5 bg-gray-100 hover:bg-gray-200 rounded-full text-sm font-medium transition"
              title="ভাষা পরিবর্তন করুন"
            >
              <span className={language === 'en' ? 'font-bold text-sky-700' : 'text-gray-600'}>
                EN
              </span>
              <div className="w-10 h-5 bg-sky-200 rounded-full relative">
                <div
                  className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow transition-all duration-300 ${
                    language === 'bn' ? 'left-5' : 'left-0.5'
                  }`}
                />
              </div>
              <span className={language === 'bn' ? 'font-bold text-sky-700' : 'text-gray-600'}>
                বাংলা
              </span>
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center gap-3">
            {/* Small toggle for mobile */}
            <button
              onClick={toggleLanguage}
              className="text-sm font-medium px-2.5 py-1 bg-gray-100 rounded"
            >
              {language === 'en' ? 'বাংলা' : 'EN'}
            </button>

            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
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
                  {t(item.key)}
                </div>
              </NavLink>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}