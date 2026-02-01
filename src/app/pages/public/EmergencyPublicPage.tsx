// src/pages/public/EmergencyPage.tsx
import { useState, useEffect } from 'react';
import {
  Search,
  ChevronLeft,
  ChevronRight,
  Phone,
  Mail,
  Clock,
  MapPin,
  AlertTriangle,
  Building,
} from 'lucide-react';
import { getCivics } from '@/api/civicApi'; // your public GET api
import type { Civic, PaginatedResponse } from '@/types/civic.types';
import EmergencyCard from '@/components/public/EmergencyCard';
export default function EmergencyPublicPage() {
  const [pageData, setPageData] = useState<PaginatedResponse<Civic> | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(0);
  const pageSize = 12;

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        const res = await getCivics({
          page: currentPage,
          size: pageSize,
          search: searchTerm.trim() || undefined,
        });

        if (!res) throw new Error('Failed to load emergency information');
        setPageData(res);
      } catch (err: any) {
        console.error(err);
        setError(err?.message || 'জরুরি তথ্য লোড করতে সমস্যা হয়েছে');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [currentPage, searchTerm]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setCurrentPage(0); // reset pagination on new search
  };

  const totalPages = pageData?.totalPages ?? 1;

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-3 mb-4">
            <AlertTriangle className="w-10 h-10 text-red-600" />
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
              জরুরি তথ্য ও সেবা
            </h1>
          </div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            ২৪ ঘণ্টা সহায়তা, ফায়ার সার্ভিস, হাসপাতাল, অ্যাম্বুলেন্স ও অন্যান্য জরুরি যোগাযোগ
          </p>
        </div>

        {/* Search */}
        <div className="max-w-2xl mx-auto mb-12">
          <div className="relative">
            <input
              type="text"
              value={searchTerm}
              onChange={handleSearchChange}
              placeholder="শহর, সেবার নাম বা বিভাগ লিখুন (যেমন: ফায়ার সার্ভিস, ব্রাহ্মণবাড়িয়া)"
              className="w-full pl-12 pr-4 py-4 rounded-xl border border-gray-300 focus:border-red-500 focus:ring-2 focus:ring-red-100 outline-none text-lg shadow-sm transition"
            />
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-6 h-6 text-gray-400" />
          </div>
        </div>

        {/* Content states */}
        {loading ? (
          <div className="text-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto mb-4"></div>
            <p className="text-gray-600">তথ্য লোড হচ্ছে...</p>
          </div>
        ) : error ? (
          <div className="text-center py-16 text-red-600">
            <p className="text-xl font-medium">{error}</p>
            <button
              onClick={() => {
                setError(null);
                setCurrentPage(0);
              }}
              className="mt-6 px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700"
            >
              আবার চেষ্টা করুন
            </button>
          </div>
        ) : pageData?.content.length === 0 ? (
          <div className="text-center py-20 text-gray-600">
            <AlertTriangle className="w-12 h-12 mx-auto mb-4 text-amber-500" />
            <p className="text-2xl font-medium">কোনো তথ্য পাওয়া যায়নি</p>
            <p className="mt-2">অন্য কীওয়ার্ড দিয়ে চেষ্টা করুন</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
              {pageData?.content.map((item) => (
                <EmergencyCard key={item.id} civic={item} />
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
                  disabled={currentPage >= totalPages - 1}
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