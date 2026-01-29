export type PublicCounterHours = Record<string, string>; // e.g. { "Mo-Fr": "08:00-16:00", "Sa": "geschlossen" }

export type CivicExtraAttributes = {
  nonEmergencyPhone?: string;
  stationNumber?: string;
  publicCounterHours?: PublicCounterHours;
  services?: string[];
  hasLostPropertyOffice?: boolean;
  wheelchairAccessible?: boolean;
  hasK9Unit?: boolean;
  emergencyPhone?: string;
  jurisdictionArea?: string;
  [key: string]: any;
};

export type Civic = {
  id: number | string;
  title?: string;
  description?: string;
  address?: string;
  cityName?: string;
  categoryName?: string;
  contactPhone?: string;
  contactEmail?: string;
  is24h7?: boolean;
  lastVerified?: string; // ISO date string
  extraAttributes?: CivicExtraAttributes;
  [key: string]: any;
};
export type CivicCreate ={
  title?: string;
  description?: string;
  address?: string;
  cityId?: number;
  categoryId?: number;
  contactPhone?: string;
  contactEmail?: string;
  is24h7?: boolean;
  lastVerified?: string;
  isActive?: boolean;
  extraAttributes?: CivicExtraAttributes;
  [key: string]: any;
}
export type PaginatedResponse<T> = {
  totalElements: number;
  totalPages: number;
  pageNumber: number;
  pageSize: number;
  first: boolean;
  last: boolean;
  content: T[];
};