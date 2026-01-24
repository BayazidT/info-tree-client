export type ConsultationHours = Record<string, string>; // e.g. { Mo: "08:00-12:00", Sa: "nach Vereinbarung" }

export type DoctorExtraAttributes = {
  yearsOfExperience?: number;
  patientReviewsAvg?: number;
  focusAreas?: string[];
  technikerKrankenkasseAccepted?: boolean;
  barmerAccepted?: boolean;
  [key: string]: any;
};

export type Doctor = {
  id: number | string;
  title?: string;
  firstName?: string;
  lastName?: string;
  fullName?: string;
  address?: string;
  cityName?: string;
  acceptsNewPatients?: boolean;
  telemedicineAvailable?: boolean;
  appointmentUrl?: string;
  consultationHours?: ConsultationHours;
  extraAttributes?: DoctorExtraAttributes;
  // allow extension for backend-specific fields
  [key: string]: any;
};

export type PaginatedResponse<T> = {
  totalElements: number;
  totalPages: number;
  pageNumber: number;
  pageSize: number;
  first: boolean;
  last: boolean;
  content: T[];
};