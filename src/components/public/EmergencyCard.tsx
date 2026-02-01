// src/components/public/EmergencyCard.tsx
import { Phone, Mail, Clock, MapPin, Building, AlertTriangle } from 'lucide-react';
import type { Civic } from '@/types/civic.types';

interface EmergencyCardProps {
  civic: Civic;
}

export default function EmergencyCard({ civic }: EmergencyCardProps) {
  const {
    title,
    description,
    address,
    cityName,
    categoryName,
    contactPhone,
    contactEmail,
    is24h7,
    extraAttributes = {},
  } = civic;

  const { nonEmergencyPhone } = extraAttributes;

  return (
    <div className="bg-white rounded-2xl shadow-md border border-gray-200 overflow-hidden hover:shadow-xl hover:border-red-200 transition-all duration-300 flex flex-col h-full">
      {/* Header */}
      <div className="bg-gradient-to-r from-red-600 to-red-700 px-6 py-5 text-white">
        <div className="flex items-start justify-between">
          <h3 className="text-xl font-bold">{title}</h3>
          {is24h7 && (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-sm font-medium">
              <Clock className="w-4 h-4" />
              ২৪/৭
            </span>
          )}
        </div>
        <p className="text-red-100 mt-1 text-sm">{categoryName}</p>
      </div>

      {/* Body */}
      <div className="p-6 flex-1 flex flex-col">
        {/* Description */}
        {description && (
          <p className="text-gray-700 mb-5 line-clamp-3">{description}</p>
        )}

        {/* Address */}
        <div className="flex items-start gap-3 mb-4">
          <MapPin className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
          <div>
            <p className="font-medium text-gray-900">{address}</p>
            {cityName && <p className="text-sm text-gray-600">জেলা: {cityName}</p>}
          </div>
        </div>

        {/* Primary Contact */}
        {contactPhone && (
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-full bg-red-50 flex items-center justify-center flex-shrink-0">
              <Phone className="w-5 h-5 text-red-600" />
            </div>
            <div>
              <a
                href={`tel:${contactPhone}`}
                className="text-lg font-bold text-red-700 hover:underline block"
              >
                {contactPhone}
              </a>
              <p className="text-sm text-gray-600">জরুরি যোগাযোগ</p>
            </div>
          </div>
        )}

        {/* Non-emergency / Email */}
        <div className="space-y-2 mt-auto pt-4 border-t border-gray-100">
          {nonEmergencyPhone && (
            <div className="flex items-center gap-3 text-sm">
              <Building className="w-4 h-4 text-gray-600" />
              <span>অ-জরুরি: {nonEmergencyPhone}</span>
            </div>
          )}

          {contactEmail && (
            <div className="flex items-center gap-3 text-sm">
              <Mail className="w-4 h-4 text-gray-600" />
              <a
                href={`mailto:${contactEmail}`}
                className="text-sky-700 hover:underline break-all"
              >
                {contactEmail}
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}