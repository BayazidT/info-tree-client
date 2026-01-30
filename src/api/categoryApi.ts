import { Category } from '@/types/category.types';
import api from './axiosInstance';

export const getCategories = async (
): Promise<Category[]> => {
  const res = await api.get<Category[]>('/v1/private/categories');
  return res.data;
};
