// src/context/LanguageContext.tsx
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type Language = 'en' | 'bn';

interface LanguageContextType {
  language: Language;
  toggleLanguage: () => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>(() => {
    const saved = localStorage.getItem('language') as Language | null;
    return saved || 'en';
  });

  useEffect(() => {
    localStorage.setItem('language', language);
  }, [language]);

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'en' ? 'bn' : 'en');
  };

  // You can later split this into separate files per page/section
  const translations: Record<Language, Record<string, string>> = {
    en: {
      // Navbar
      home: 'Home',
      emergencyInfo: 'Emergency Info',
      findDoctors: 'Find Doctors',
      contact: 'Contact',

      // Landing page
      reliablePublicHealth: 'Reliable Public Health & Emergency Information',
      accessVerified: 'Access verified doctor lists, emergency guidelines, hospital locations, and critical helplines — all in one place.',
      emergencyInformation: 'Emergency Information',
      emergencyDesc: 'Important emergency contacts, hospital locations, and first aid guidance.',
      findDoctorsTitle: 'Find Doctors',
      doctorsDesc: 'Search registered doctors by specialty, location, and availability.',
      helplines24_7: '24/7 Helplines',
      helplinesDesc: 'National emergency numbers, ambulance services, and support lines.',
      exploreImportant: 'Explore Important Information',
      nationwideCoverage: 'Nationwide Coverage across Bangladesh',

      // Footer
      reliablePlatform: 'Reliable public health and emergency information platform for the people of Bangladesh.',
      madeWithCare: 'Made with care for community safety',
      quickLinks: 'Quick Links',
      emergencyNumbers: 'Emergency Numbers',
      nationalEmergency: 'National Emergency Service',
      ambulanceFire: 'Ambulance & Fire Service',
      healthHotline: 'Health Information Hotline',
      getInTouch: 'Get in Touch',
      allRightsReserved: 'All rights reserved.',
      privacyPolicy: 'Privacy Policy',
      termsOfUse: 'Terms of Use',
      disclaimer: 'Disclaimer',

      // ... add keys from Doctors page, Emergency page, Footer, etc.
    },
    bn: {
      home: 'হোম',
      emergencyInfo: 'জরুরি তথ্য',
      findDoctors: 'ডাক্তার খুঁজুন',
      contact: 'যোগাযোগ',

      reliablePublicHealth: 'নির্ভরযোগ্য জনস্বাস্থ্য ও জরুরি তথ্য',
      accessVerified: 'যাচাইকৃত ডাক্তারের তালিকা, জরুরি নির্দেশিকা, হাসপাতালের অবস্থান এবং গুরুত্বপূর্ণ হেল্পলাইন — সব এক জায়গায়।',
      emergencyInformation: 'জরুরি তথ্য',
      emergencyDesc: 'গুরুত্বপূর্ণ জরুরি যোগাযোগ, হাসপাতালের অবস্থান এবং প্রাথমিক চিকিৎসা নির্দেশনা।',
      findDoctorsTitle: 'ডাক্তার খুঁজুন',
      doctorsDesc: 'বিশেষত্ব, অবস্থান এবং উপলব্ধতার ভিত্তিতে নিবন্ধিত ডাক্তারদের খুঁজুন।',
      helplines24_7: '২৪/৭ হেল্পলাইন',
      helplinesDesc: 'জাতীয় জরুরি নম্বর, অ্যাম্বুলেন্স সেবা এবং সহায়তা লাইন।',
      exploreImportant: 'গুরুত্বপূর্ণ তথ্য অন্বেষণ করুন',
      nationwideCoverage: 'সারা বাংলাদেশ জুড়ে কভারেজ',
      reliablePlatform: 'বাংলাদেশের জনগণের জন্য নির্ভরযোগ্য জনস্বাস্থ্য ও জরুরি তথ্য প্ল্যাটফর্ম।',
      madeWithCare: 'সম্প্রদায়ের নিরাপত্তার জন্য যত্ন সহকারে তৈরি',
      quickLinks: 'দ্রুত লিঙ্কসমূহ',
      emergencyNumbers: 'জরুরি নম্বরসমূহ',
      nationalEmergency: 'জাতীয় জরুরি সেবা',
      ambulanceFire: 'অ্যাম্বুলেন্স ও ফায়ার সার্ভিস',
      healthHotline: 'স্বাস্থ্য তথ্য হেল্পলাইন',
      getInTouch: 'যোগাযোগ করুন',
      allRightsReserved: 'সর্বস্বত্ব সংরক্ষিত।',
      privacyPolicy: 'গোপনীয়তা নীতি',
      termsOfUse: 'ব্যবহারের শর্তাবলী',
      disclaimer: 'দাবি পরিত্যাগ',
    },
  };

  const t = (key: string) => translations[language][key] || key;

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) throw new Error('useLanguage must be used within LanguageProvider');
  return context;
};