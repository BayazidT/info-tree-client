// src/pages/public/LandingPage.tsx
import { ShieldAlert, Stethoscope, PhoneCall, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/context/LanguageContext';

export default function LandingPage() {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">

      {/* Hero */}
      <section className="relative bg-gradient-to-br from-sky-600 to-sky-800 text-white flex-1">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-6">
              {t('reliablePublicHealth')}
            </h1>
            <p className="text-xl md:text-2xl text-sky-100 mb-10">
              {t('accessVerified')}
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                to="/emergency"
                className="inline-flex items-center justify-center px-8 py-4 bg-white text-sky-700 font-semibold rounded-xl hover:bg-sky-50 transition shadow-lg text-lg"
              >
                {t('emergencyInformation')}
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
              <Link
                to="/doctors"
                className="inline-flex items-center justify-center px-8 py-4 bg-sky-900/30 border border-sky-300 text-white font-semibold rounded-xl hover:bg-sky-900/50 transition text-lg"
              >
                {t('findDoctorsTitle')}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {t('exploreImportant')}
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: t('emergencyInformation'),
                desc: t('emergencyDesc'),
                icon: ShieldAlert,
                link: '/emergency',
                color: 'bg-red-50 text-red-700 border-red-200 hover:border-red-400'
              },
              {
                title: t('findDoctorsTitle'),
                desc: t('doctorsDesc'),
                icon: Stethoscope,
                link: '/doctors',
                color: 'bg-sky-50 text-sky-700 border-sky-200 hover:border-sky-400'
              },
              {
                title: t('helplines24_7'),
                desc: t('helplinesDesc'),
                icon: PhoneCall,
                link: '/emergency',
                color: 'bg-green-50 text-green-700 border-green-200 hover:border-green-400'
              },
            ].map((cat) => (
              <Link
                key={cat.title}
                to={cat.link}
                className={`group block p-8 rounded-2xl border ${cat.color} transition-all hover:shadow-xl hover:-translate-y-1`}
              >
                <cat.icon className="w-12 h-12 mb-6 opacity-90" />
                <h3 className="text-2xl font-bold mb-3">{cat.title}</h3>
                <p className="text-gray-700">{cat.desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ... other sections ... */}

    </div>
  );
}