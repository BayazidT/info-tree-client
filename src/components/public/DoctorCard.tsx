// src/components/public/DoctorCard.tsx
import { Star, Building, MapPin, Phone, Stethoscope } from 'lucide-react';
import type { Doctor } from '@/types/doctor.types';

interface DoctorCardProps {
  doctor: Doctor;
}

export default function DoctorCard({ doctor }: DoctorCardProps) {
    const { fullName, address, cityName, extraAttributes } = doctor;
    const extra = doctor.extraAttributes ?? {}; 
    const hospitals = extra.hospitals ?? [];
    const focusAreas = extra.focusAreas ?? [];
    const departmentNameEn = doctor.departmentNameEn;;
    const departmentNameBn = doctor.departmentNameBn;
    const patientReviewsAvg = extra.patientReviewsAvg; 
    const primaryHospital = hospitals[0];

  return (
    <div className="bg-white rounded-2xl shadow-md border border-gray-200 overflow-hidden hover:shadow-xl hover:border-sky-200 transition-all duration-300 flex flex-col h-full">
      {/* Header / Name */}
      <div className="bg-gradient-to-r from-sky-600 to-sky-700 px-6 py-5 text-white">
        <h3 className="text-xl font-bold">{fullName}</h3>
        {doctor.title && <p className="text-sky-100 mt-1">{doctor.title}</p>}
      </div>

      {/* Body */}
      <div className="p-6 flex-1 flex flex-col">
        {/* Specialties */}
        {focusAreas.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-5">
             { departmentNameBn || departmentNameEn || 'বিভাগ নেই' } : 
            {focusAreas.map((area, i) => (
              <span
                key={i}
                className="inline-flex items-center gap-1.5 px-3 py-1 bg-sky-50 text-sky-700 rounded-full text-sm font-medium"
              >
                <Stethoscope className="w-4 h-4" />
                {area}
              </span>
            ))}
          </div>
        )}

        {/* Rating */}
        {patientReviewsAvg && (
          <div className="flex items-center gap-2 mb-4">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-5 h-5 ${i < Math.floor(patientReviewsAvg) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
                />
              ))}
            </div>
            <span className="text-gray-700 font-medium">{patientReviewsAvg.toFixed(1)}</span>
          </div>
        )}

        {/* Hospital */}
        {primaryHospital && (
          <div className="flex items-start gap-3 mb-4">
            <Building className="w-5 h-5 text-sky-600 mt-0.5 flex-shrink-0" />
            <div>
              <p className="font-medium text-gray-900">{primaryHospital?.hospitalName}</p>
              <p className="text-sm text-gray-600">{primaryHospital?.availability}</p>
            </div>
          </div>
        )}

        {/* Address */}
        <div className="flex items-start gap-3 mb-4">
          <MapPin className="w-5 h-5 text-sky-600 mt-0.5 flex-shrink-0" />
          <p className="text-gray-700">{address}</p>
        </div>

        {/* Contact (if available) */}
        {primaryHospital?.contactDetails && (
          <div className="flex items-center gap-3 mt-auto pt-4 border-t border-gray-100">
            <Phone className="w-5 h-5 text-green-600" />
            <a
              href={`tel:${primaryHospital.contactDetails}`}
              className="text-green-600 hover:underline font-medium"
            >
              {primaryHospital.contactDetails}
            </a>
          </div>
        )}
      </div>

      {/* Footer / Action */}
      <div className="px-6 py-4 bg-gray-50 border-t border-gray-100 mt-auto">
        <a href={`/doctors/${doctor.id}`} className="w-full py-3 bg-sky-600 text-white rounded-lg hover:bg-sky-700 transition font-medium block text-center">
          বিস্তারিত দেখুন
        </a>
      </div>
    </div>
  );
}