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
export const createDoctor = async (doctor: Partial<Doctor>): Promise<Doctor> => {
  const res = await api.post<Doctor>('/v1/private/doctor', doctor);
  return res.data;
};

export const updateDoctor = async (id: string | number, doctor: Partial<Doctor>): Promise<Doctor> => {
  const res = await api.put<Doctor>(`/v1/private/doctor/${id}`, doctor);
  return res.data;
};

export const deleteDoctor = async (id: string | number): Promise<void> => {
  await api.delete(`/v1/private/doctor/${id}`);
};
export const findDoctorById = async (id: string | number): Promise<Doctor> => {
  const res = await api.get<Doctor>(`/v1/private/doctor/${id}`);
  return res.data;
};