// src/components/public/Footer.tsx
import { Heart, Globe, Mail, Phone, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-b from-gray-900 to-black text-gray-300">
      <div className="max-w-7xl mx-auto px-6 pt-16 pb-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12">
          {/* Brand & Description */}
          <div>
            <h3 className="text-2xl font-bold text-white mb-4">InfoTreeBD</h3>
            <p className="text-gray-400 mb-6 leading-relaxed">
              Reliable public health and emergency information platform for the people of Bangladesh.
            </p>
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <Heart className="w-4 h-4 text-red-500 fill-red-500" />
              <span>Made with care for community safety</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-6">Quick Links</h4>
            <ul className="space-y-3">
              <li>
                <Link
                  to="/"
                  className="hover:text-sky-400 transition-colors flex items-center gap-2"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/emergency"
                  className="hover:text-sky-400 transition-colors flex items-center gap-2"
                >
                  Emergency Information
                </Link>
              </li>
              <li>
                <Link
                  to="/doctors"
                  className="hover:text-sky-400 transition-colors flex items-center gap-2"
                >
                  Find Doctors
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="hover:text-sky-400 transition-colors flex items-center gap-2"
                >
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Emergency Contacts */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-6">Emergency Numbers</h4>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-sky-400 mt-0.5" />
                <div>
                  <div className="font-medium text-white">999</div>
                  <div className="text-gray-500">National Emergency Service</div>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-sky-400 mt-0.5" />
                <div>
                  <div className="font-medium text-white">199</div>
                  <div className="text-gray-500">Ambulance & Fire Service</div>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-sky-400 mt-0.5" />
                <div>
                  <div className="font-medium text-white">16263</div>
                  <div className="text-gray-500">Health Information Hotline</div>
                </div>
              </li>
            </ul>
          </div>

          {/* Contact & Location */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-6">Get in Touch</h4>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-sky-400 mt-1" />
                <span>support@infotreebd.org</span>
              </li>
              <li className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-sky-400 mt-1" />
                <span>+880 96 1234 5678</span>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-sky-400 mt-1" />
                <span>Dhaka, Bangladesh</span>
              </li>
              <li className="flex items-start gap-3">
                <Globe className="w-5 h-5 text-sky-400 mt-1" />
                <a
                  href="https://infotreebd.org"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-sky-400 transition-colors"
                >
                  www.infotreebd.org
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-gray-800 text-center text-sm text-gray-500">
          <p>
            © {currentYear} InfoTreeBD. All rights reserved.
          </p>
          <div className="mt-3 flex flex-wrap justify-center gap-x-6 gap-y-2">
            <Link to="/privacy" className="hover:text-sky-400 transition-colors">
              Privacy Policy
            </Link>
            <Link to="/terms" className="hover:text-sky-400 transition-colors">
              Terms of Use
            </Link>
            <Link to="/disclaimer" className="hover:text-sky-400 transition-colors">
              Disclaimer
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}