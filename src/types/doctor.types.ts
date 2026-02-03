export type ConsultationHours = Record<string, string>; // e.g. { Mo: "08:00-12:00", Sa: "nach Vereinbarung" }

export type HospitalAffiliation = {
  hospitalName: string;
  availability: string;
  contactDetails?: string;
};

export type DoctorExtraAttributes = {
  patientReviewsAvg?: number;
  hospitals?: HospitalAffiliation[];
  focusAreas?: string[];
  yearsOfExperience?: number;
  // [key: string]: any;  // ← consider removing if you can
};

export type Doctor = {
  id?: number | string;
  idNumber?: string;
  title?: string;
  firstName?: string;
  lastName?: string;
  fullName?: string;
  gender?: 'M' | 'F' | 'O' | string;
  address?: string;
  cityId?: number;
  departmentId?: number;
  departmentNameBn?: string;
  departmentNameEn?: string;
  cityName?: string;
  categoryId?: number;
  privatePatientsOnly?: boolean;
  acceptsNewPatients?: boolean;
  telemedicineAvailable?: boolean;
  appointmentUrl?: string;
  emergencyAppointments?: boolean;
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