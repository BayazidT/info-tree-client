import api from './axiosInstance';
import type { Doctor, PaginatedResponse } from '../types/doctor.types';

interface GetDoctorsParams {
  page?: number;
  size?: number;
  search?: string;
  cityName?: string;
  specialty?: string;
  sort?: string; // e.g. "fullName,asc"
}

export const getDoctors = async (
  params: GetDoctorsParams = {}
): Promise<PaginatedResponse<Doctor>> => {
  const res = await api.get<PaginatedResponse<Doctor>>('/v1/private/doctor', { params });
  return res.data;
};

export const getDoctor = async (id: string | number): Promise<Doctor> => {
  const res = await api.get<Doctor>(`/v1/private/doctor/${id}`);
  return res.data;
};