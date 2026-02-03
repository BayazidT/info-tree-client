// src/pages/public/DoctorDetailsPage.tsx
import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  Star,
  Building,
  MapPin,
  Phone,
  Clock,
  Stethoscope,
  User,
  Calendar,
  Video,
} from 'lucide-react';
import { findDoctorById } from '@/api/doctorApi'; // ← implement or mock this
import type { Doctor } from '@/types/doctor.types';
export default function DoctorDetailsPublicPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [doctor, setDoctor] = useState<Doctor | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    const fetchDoctor = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await findDoctorById(id); // your API call
        if (!data) throw new Error('Doctor not found');
        setDoctor(data);
      } catch (err: any) {
        setError(err?.message || 'ডাক্তারের তথ্য পাওয়া যায়নি');
      } finally {
        setLoading(false);
      }
    };

    fetchDoctor();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-sky-600 mx-auto mb-4"></div>
          <p className="text-gray-600">তথ্য লোড হচ্ছে...</p>
        </div>
      </div>
    );
  }

  if (error || !doctor) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
        <div className="text-center max-w-md">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">কিছু ভুল হয়েছে</h2>
          <p className="text-gray-600 mb-6">{error || 'ডাক্তার পাওয়া যায়নি'}</p>
          <button
            onClick={() => navigate('/doctors')}
            className="inline-flex items-center gap-2 px-6 py-3 bg-sky-600 text-white rounded-lg hover:bg-sky-700"
          >
            <ArrowLeft className="w-5 h-5" />
            ডাক্তারের তালিকায় ফিরে যান
          </button>
        </div>
      </div>
    );
  }

  const {
    fullName,
    title,
    address,
    cityName,
    departmentNameEn,
    departmentNameBn,
    telemedicineAvailable,
    acceptsNewPatients,
    appointmentUrl,
    extraAttributes = {},
  } = doctor;

  const {
    patientReviewsAvg,
    hospitals = [],
    focusAreas = [],
    yearsOfExperience,
  } = extraAttributes;

  const primaryHospital = hospitals[0];

  return (
    <div className="min-h-screen bg-gray-50 pb-16">
      {/* Back Button + Header */}
      <div className="top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-sky-600 hover:text-sky-800 font-medium"
          >
            <ArrowLeft className="w-5 h-5" />
            ফিরে যান
          </button>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-1 lg:pt-1">
        <div className="grid lg:grid-cols-3 gap-8 lg:gap-12">
          {/* Left Column - Main Info */}
          <div className="lg:col-span-2 space-y-8">
            {/* Doctor Card / Intro */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 lg:p-8">
              <div className="flex flex-col sm:flex-row sm:items-start gap-6">
                <div className="w-24 h-24 lg:w-32 lg:h-32 bg-sky-100 rounded-full flex items-center justify-center flex-shrink-0 text-4xl lg:text-5xl font-bold text-sky-700">
                  {fullName?.[0]?.toUpperCase() || '?'}
                </div>

                <div className="flex-1">
                  <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
                    {/* {title ? `${title} ` : ''} */}
                    {fullName}
                  </h1>

                  {focusAreas.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-4">
                      { departmentNameBn || departmentNameEn || 'বিভাগ নেই' } : 
                      {focusAreas.map((area, i) => (
                        <span
                          key={i}
                          className="inline-flex items-center gap-1.5 px-4 py-1.5 bg-sky-50 text-sky-700 rounded-full text-sm font-medium"
                        >
                          <Stethoscope className="w-4 h-4" />
                          {area}
                        </span>
                      ))}
                    </div>
                  )}

                  <div className="flex flex-wrap gap-6 text-gray-700 mt-4">
                    {yearsOfExperience && (
                      <div className="flex items-center gap-2">
                        <Calendar className="w-5 h-5 text-sky-600" />
                        <span>{yearsOfExperience} বছরের অভিজ্ঞতা</span>
                      </div>
                    )}

                    {patientReviewsAvg && (
                      <div className="flex items-center gap-2">
                        <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                        <span className="font-medium">{patientReviewsAvg.toFixed(1)}</span>
                        <span className="text-gray-500">রেটিং</span>
                      </div>
                    )}

                    {acceptsNewPatients !== undefined && (
                      <div className="flex items-center gap-2">
                        <User className="w-5 h-5 text-green-600" />
                        <span className={acceptsNewPatients ? 'text-green-700' : 'text-amber-700'}>
                          {acceptsNewPatients ? 'নতুন রোগী গ্রহণ করেন' : 'বর্তমানে নতুন রোগী নেন না'}
                        </span>
                      </div>
                    )}

                    {telemedicineAvailable && (
                      <div className="flex items-center gap-2">
                        <Video className="w-5 h-5 text-sky-600" />
                        <span className="text-sky-700">টেলিমেডিসিন সুবিধা আছে</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Hospitals / Chambers */}
            {hospitals.length > 0 && (
              <section className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 lg:p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                  <Building className="w-6 h-6 text-sky-600" />
                  চেম্বার / হাসপাতাল
                </h2>

                <div className="space-y-6">
                  {hospitals.map((hosp, index) => (
                    <div
                      key={index}
                      className="border-l-4 border-sky-500 pl-5 py-2 bg-sky-50/30 rounded-r-lg"
                    >
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">
                        {hosp.hospitalName}
                      </h3>
                      <p className="text-gray-700 mb-2">{hosp.availability}</p>
                      {hosp.contactDetails && (
                        <a
                          href={`tel:${hosp.contactDetails}`}
                          className="inline-flex items-center gap-2 text-green-600 hover:text-green-800 font-medium"
                        >
                          <Phone className="w-5 h-5" />
                          {hosp.contactDetails}
                        </a>
                      )}
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Address */}
            <section className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 lg:p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <MapPin className="w-6 h-6 text-sky-600" />
                ঠিকানা
              </h2>
              <p className="text-lg text-gray-700 leading-relaxed">{address}</p>
              {cityName && <p className="text-gray-600 mt-2">জেলা: {cityName}</p>}
            </section>
          </div>

          {/* Right Column - Sidebar / Quick Actions */}
          <div className="space-y-6 lg:sticky lg:top-24 lg:h-fit">
            {/* Action Card */}
            <div className="bg-white rounded-2xl shadow-md border border-sky-200 p-6 text-center">
              <h3 className="text-xl font-bold text-gray-900 mb-4">অ্যাপয়েন্টমেন্ট নিন</h3>

              {appointmentUrl ? (
                <a
                  href={appointmentUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full py-4 bg-sky-600 text-white rounded-xl hover:bg-sky-700 transition font-semibold text-lg mb-4"
                >
                  অনলাইনে অ্যাপয়েন্টমেন্ট বুক করুন
                </a>
              ) : (
                <div className="space-y-4">
                  {primaryHospital?.contactDetails && (
                    <a
                      href={`tel:${primaryHospital.contactDetails}`}
                      className="block w-full py-4 bg-green-600 text-white rounded-xl hover:bg-green-700 transition font-semibold text-lg"
                    >
                      {primaryHospital.contactDetails} এ কল করুন
                    </a>
                  )}
                  <p className="text-sm text-gray-600">
                    সরাসরি যোগাযোগ করুন অথবা হাসপাতালে যান
                  </p>
                </div>
              )}
            </div>

            {/* Quick Info Cards */}
            <div className="bg-white rounded-2xl shadow-sm border p-6">
              <h3 className="text-lg font-semibold mb-4">দ্রুত তথ্য</h3>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-center gap-3">
                  <Clock className="w-5 h-5 text-sky-600" />
                  <span>সময়সূচী: হাসপাতাল অনুযায়ী</span>
                </li>
                {telemedicineAvailable && (
                  <li className="flex items-center gap-3">
                    <Video className="w-5 h-5 text-sky-600" />
                    <span>টেলিমেডিসিন উপলব্ধ</span>
                  </li>
                )}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}