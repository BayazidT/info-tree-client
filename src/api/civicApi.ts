import api from './axiosInstance';
import type { Civic, PaginatedResponse } from '../types/civic.types';

interface GetCivicsParams {
  page?: number;
  size?: number;
  search?: string;
  cityName?: string;
  categoryName?: string;
  sort?: string; // e.g. "title,asc"
}

export const getCivics = async (
  params: GetCivicsParams = {}
): Promise<PaginatedResponse<Civic>> => {
  const res = await api.get<PaginatedResponse<Civic>>('/v1/private/civic', { params });
  return res.data;
};

export const getCivic = async (id: string | number): Promise<Civic> => {
  const res = await api.get<Civic>(`/v1/private/civic/${id}`);
  return res.data;
};
