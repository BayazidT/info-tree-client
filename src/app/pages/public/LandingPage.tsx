// src/pages/public/LandingPage.tsx
import { ShieldAlert, Stethoscope, PhoneCall, Clock, MapPin, ArrowRight } from 'lucide-react';
import PublicNavbar from '@/components/public/Navbar';
import { Link } from 'react-router-dom';

export default function LandingPage() {
  const categories = [
    {
      title: 'Emergency Information',
      description: 'Important emergency contacts, hospital locations, and first aid guidance.',
      icon: ShieldAlert,
      link: '/emergency',
      color: 'bg-red-50 text-red-700 border-red-200 hover:border-red-400',
    },
    {
      title: 'Find Doctors',
      description: 'Search registered doctors by specialty, location, and availability.',
      icon: Stethoscope,
      link: '/doctors',
      color: 'bg-sky-50 text-sky-700 border-sky-200 hover:border-sky-400',
    },
    {
      title: '24/7 Helplines',
      description: 'National emergency numbers, ambulance services, and support lines.',
      icon: PhoneCall,
      link: '/emergency',
      color: 'bg-green-50 text-green-700 border-green-200 hover:border-green-400',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <PublicNavbar />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-sky-600 to-sky-800 text-white">
        <div className="absolute inset-0 opacity-10 bg-[url('/pattern-medical.svg')] bg-repeat"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-6">
              Reliable Public Health & Emergency Information
            </h1>
            <p className="text-xl md:text-2xl text-sky-100 mb-10">
              Access verified doctor lists, emergency guidelines, hospital locations, and critical helplines — all in one place.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                to="/emergency"
                className="inline-flex items-center justify-center px-8 py-4 bg-white text-sky-700 font-semibold rounded-xl hover:bg-sky-50 transition shadow-lg text-lg"
              >
                View Emergency Info
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
              <Link
                to="/doctors"
                className="inline-flex items-center justify-center px-8 py-4 bg-sky-900/30 backdrop-blur-sm border border-sky-300 text-white font-semibold rounded-xl hover:bg-sky-900/50 transition text-lg"
              >
                Find a Doctor
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Access Categories */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Explore Important Information
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Verified and up-to-date public health resources for citizens of Bangladesh
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {categories.map((cat) => (
              <Link
                key={cat.title}
                to={cat.link}
                className={`group block p-8 rounded-2xl border ${cat.color} transition-all hover:shadow-xl hover:-translate-y-1`}
              >
                <div className="flex items-center justify-between mb-6">
                  <cat.icon className="w-12 h-12 opacity-90" />
                  <ArrowRight className="w-6 h-6 opacity-0 group-hover:opacity-100 transform group-hover:translate-x-2 transition" />
                </div>
                <h3 className="text-2xl font-bold mb-3">{cat.title}</h3>
                <p className="text-gray-700">{cat.description}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Stats / Features */}
      <section className="py-16 bg-sky-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-10 text-center">
            <div>
              <div className="text-5xl font-bold text-sky-700 mb-3">24/7</div>
              <p className="text-gray-600 text-lg">Emergency Information Available</p>
            </div>
            <div>
              <div className="text-5xl font-bold text-sky-700 mb-3">
                <Clock className="inline-block w-10 h-10 mr-2" />
                Updated
              </div>
              <p className="text-gray-600 text-lg">Regularly verified data</p>
            </div>
            <div>
              <div className="text-5xl font-bold text-sky-700 mb-3">
                <MapPin className="inline-block w-10 h-10 mr-2" />
                Nationwide
              </div>
              <p className="text-gray-600 text-lg">Coverage across Bangladesh</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-10">
            <div>
              <h3 className="text-white text-xl font-bold mb-4">InfoTreeBD</h3>
              <p className="text-gray-400">
                Public health & emergency information platform for Bangladesh.
              </p>
            </div>

            <div>
              <h4 className="text-white font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li><Link to="/emergency" className="hover:text-white transition">Emergency Info</Link></li>
                <li><Link to="/doctors" className="hover:text-white transition">Find Doctors</Link></li>
                <li><Link to="/contact" className="hover:text-white transition">Contact Us</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-semibold mb-4">Emergency Numbers</h4>
              <ul className="space-y-2">
                <li>999 – National Emergency</li>
                <li>199 – Ambulance Service</li>
                <li>16263 – Health Hotline</li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-semibold mb-4">Important</h4>
              <p className="text-sm text-gray-400">
                This is a public information portal. Always verify critical information with official sources in emergencies.
              </p>
            </div>
          </div>

          <div className="mt-12 pt-8 border-t border-gray-800 text-center text-sm">
            © {new Date().getFullYear()} InfoTreeBD – All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}