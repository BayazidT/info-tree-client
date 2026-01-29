import api from './axiosInstance';
import type { Civic, CivicCreate, PaginatedResponse } from '../types/civic.types';

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

export const createCivic = async (civicData: CivicCreate): Promise<CivicCreate> => {
  const res = await api.post<Civic>('/v1/private/civic', civicData);
  return res.data;
};

export const updateCivic = async (id: string | number, civicData: Partial<Civic>): Promise<Civic> => {
  const res = await api.put<Civic>(`/v1/private/civic/${id}`, civicData);
  return res.data;
};

export const deleteCivic = async (id: string | number): Promise<void> => {
  await api.delete(`/v1/private/civic/${id}`);
};

export const getCivic = async (id: string | number): Promise<Civic> => {
  const res = await api.get<Civic>(`/v1/private/civic/${id}`);
  return res.data;
};
