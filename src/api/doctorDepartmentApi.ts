import api from './axiosInstance';
import { DoctorDepartment } from '@/types/doctorDepartment.typs';

export const getDoctorDepartments = async (
): Promise<DoctorDepartment[]> => {
  const res = await api.get<DoctorDepartment[]>('/v1/private/doctor-departments');
  return res.data;
};
