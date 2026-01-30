import { City } from '@/types/city.types';
import api from './axiosInstance';

export const getCities = async (
): Promise<City[]> => {
  const res = await api.get<City[]>('/v1/private/cities');
  return res.data;
};
