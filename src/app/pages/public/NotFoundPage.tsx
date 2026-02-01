// src/pages/public/NotFoundPage.tsx
import { useNavigate } from 'react-router-dom';
import { Home, ArrowLeft, Search, AlertTriangle } from 'lucide-react';
export default function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 flex flex-col">
      <div className="flex-1 flex items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
        <div className="max-w-3xl w-full text-center">
          {/* Large 404 */}
          <div className="relative mb-8">
            <h1 className="text-8xl sm:text-9xl font-extrabold text-gray-200 select-none">404</h1>
            <div className="absolute inset-0 flex items-center justify-center">
              <AlertTriangle className="w-24 h-24 sm:w-32 sm:h-32 text-red-500 opacity-20" />
            </div>
          </div>

          {/* Message */}
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            পৃষ্ঠাটি খুঁজে পাওয়া যায়নি
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 mb-8 max-w-xl mx-auto">
            আপনি যে লিঙ্কে ক্লিক করেছেন তা ভুল হতে পারে অথবা পৃষ্ঠাটি সরিয়ে ফেলা হয়েছে।
          </p>

          {/* Quick actions */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
            <button
              onClick={() => navigate(-1)}
              className="inline-flex items-center gap-2 px-6 py-3 bg-white border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition font-medium shadow-sm"
            >
              <ArrowLeft className="w-5 h-5" />
              পূর্ববর্তী পৃষ্ঠায় ফিরে যান
            </button>

            <button
              onClick={() => navigate('/')}
              className="inline-flex items-center gap-2 px-8 py-3 bg-sky-600 text-white rounded-lg hover:bg-sky-700 transition font-medium shadow-md"
            >
              <Home className="w-5 h-5" />
              হোম পেজে যান
            </button>
          </div>

          {/* Search suggestion */}
          <div className="max-w-md mx-auto">
            <p className="text-gray-600 mb-4">
              আপনি যা খুঁজছেন তা খুঁজে দেখতে পারেন:
            </p>

            <div className="relative">
              <input
                type="text"
                placeholder="ডাক্তার, জরুরি সেবা, শহর..."
                className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-300 focus:border-sky-500 focus:ring-2 focus:ring-sky-200 outline-none"
              />
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            </div>

            <div className="mt-6 text-sm text-gray-500">
              অথবা সরাসরি দেখুন:
              <div className="flex flex-wrap justify-center gap-4 mt-3">
                <a href="/emergency" className="text-sky-600 hover:underline">
                  জরুরি তথ্য
                </a>
                <a href="/doctors" className="text-sky-600 hover:underline">
                  ডাক্তার খুঁজুন
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      </div>
  );
}