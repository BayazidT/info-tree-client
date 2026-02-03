// src/pages/public/DoctorsPage.tsx
import { useState, useEffect } from 'react';
import { Search, ChevronLeft, ChevronRight, Star, Building, MapPin, Phone, Stethoscope } from 'lucide-react';
import { getDoctors } from '@/api/doctorApi'; // your public GET api
import type { Doctor, PaginatedResponse } from '@/types/doctor.types';
import DoctorCard from '@/components/public/DoctorCard';
export default function DoctorsPage() {
  const [doctorsData, setDoctorsData] = useState<PaginatedResponse<Doctor> | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(0);
  const pageSize = 12; // adjust as needed

  useEffect(() => {
    const fetchDoctorsList = async () => {
      try {
        setLoading(true);
        setError(null);

        const res = await getDoctors({
          page: currentPage,
          size: pageSize,
          search: searchTerm.trim() || undefined,
        });

        if (!res) throw new Error('Failed to load doctors');
        setDoctorsData(res);
      } catch (err: any) {
        console.error(err);
        setError(err?.message || 'ডাক্তারের তথ্য লোড করতে সমস্যা হয়েছে');
      } finally {
        setLoading(false);
      }
    };

    fetchDoctorsList();
  }, [currentPage, searchTerm]);
  
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setCurrentPage(0); // reset to first page on new search
  };

  const totalPages = doctorsData?.totalPages ?? 1;

  return (
    <div className="min-h-screen bg-gray-50 py-12">
        
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header + Search */}
        <div className="mb-10 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            ডাক্তার খুঁজুন
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            বিশেষজ্ঞ ডাক্তারদের তালিকা দেখুন – বিভাগ, শহর ও হাসপাতাল অনুযায়ী
          </p>
        </div>

        {/* Search Bar */}
        <div className="max-w-2xl mx-auto mb-12">
          <div className="relative">
            <input
              type="text"
              value={searchTerm}
              onChange={handleSearch}
              placeholder="ডাক্তারের নাম, বিশেষত্ব বা শহর লিখুন..."
              className="w-full pl-12 pr-4 py-4 rounded-xl border border-gray-300 focus:border-sky-500 focus:ring-2 focus:ring-sky-200 outline-none text-lg shadow-sm transition"
            />
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-6 h-6 text-gray-400" />
          </div>
        </div>

        {/* Loading / Error / Content */}
        {loading ? (
          <div className="text-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-sky-600 mx-auto mb-4"></div>
            <p className="text-gray-600">ডাক্তারদের তালিকা লোড হচ্ছে...</p>
          </div>
        ) : error ? (
          <div className="text-center py-16 text-red-600">
            <p className="text-xl font-medium">{error}</p>
            <button
              onClick={() => {
                setError(null);
                setCurrentPage(0);
              }}
              className="mt-6 px-6 py-3 bg-sky-600 text-white rounded-lg hover:bg-sky-700"
            >
              আবার চেষ্টা করুন
            </button>
          </div>
        ) : doctorsData?.content.length === 0 ? (
          <div className="text-center py-20 text-gray-600">
            <p className="text-2xl">কোনো ডাক্তার পাওয়া যায়নি</p>
            <p className="mt-2">অন্য নাম বা বিশেষত্ব দিয়ে চেষ্টা করুন</p>
          </div>
        ) : (
          <>
            {/* Grid of Doctors */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
              {doctorsData?.content.map((doctor) => (
                <DoctorCard key={doctor.id} doctor={doctor} />
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center gap-4 mt-12">
                <button
                  onClick={() => setCurrentPage((p) => Math.max(0, p - 1))}
                  disabled={currentPage === 0}
                  className="p-3 rounded-lg bg-white border disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-50 transition"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>

                <span className="text-lg font-medium">
                  পৃষ্ঠা {currentPage + 1} / {totalPages}
                </span>

                <button
                  onClick={() => setCurrentPage((p) => Math.min(totalPages - 1, p + 1))}
                  disabled={currentPage === totalPages - 1}
                  className="p-3 rounded-lg bg-white border disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-50 transition"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}