// src/components/public/Footer.tsx
import { Heart, Globe, Mail, Phone, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/context/LanguageContext';

export default function Footer() {
  const { t, language } = useLanguage();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-b from-gray-900 to-black text-gray-300">
      <div className="max-w-7xl mx-auto px-6 pt-16 pb-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12">
          <div>
            <h3 className="text-2xl font-bold text-white mb-4">InfoTreeBD</h3>
            <p className="text-gray-400 mb-6 leading-relaxed">
              {t('reliablePlatform')}
            </p>
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <Heart className="w-4 h-4 text-red-500 fill-red-500" />
              <span>{t('madeWithCare')}</span>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-semibold text-white mb-6">{t('quickLinks')}</h4>
            <ul className="space-y-3">
              <li><Link to="/" className="hover:text-sky-400 transition-colors">{t('home')}</Link></li>
              <li><Link to="/emergency" className="hover:text-sky-400 transition-colors">{t('emergencyInfo')}</Link></li>
              <li><Link to="/doctors" className="hover:text-sky-400 transition-colors">{t('findDoctors')}</Link></li>
              <li><Link to="/contact" className="hover:text-sky-400 transition-colors">{t('contact')}</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold text-white mb-6">{t('emergencyNumbers')}</h4>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-sky-400 mt-0.5" />
                <div>
                  <div className="font-medium text-white">999</div>
                  <div className="text-gray-500">{t('nationalEmergency')}</div>
                </div>
              </li>
              {/* ... other items */}
            </ul>
          </div>

          {/* ... rest remains mostly the same, translate static texts */}
        </div>

        <div className="mt-16 pt-8 border-t border-gray-800 text-center text-sm text-gray-500">
          <p>© {currentYear} InfoTreeBD. {t('allRightsReserved')}</p>
          <div className="mt-3 flex flex-wrap justify-center gap-x-6 gap-y-2">
            <Link to="/privacy" className="hover:text-sky-400">{t('privacyPolicy')}</Link>
            <Link to="/terms" className="hover:text-sky-400">{t('termsOfUse')}</Link>
            <Link to="/disclaimer" className="hover:text-sky-400">{t('disclaimer')}</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}