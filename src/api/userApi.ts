import { UserPage, UserRequest } from '@/types/user.types';
import api from './axiosInstance';
import { User } from '@/types/user.types';


interface GetUserParams {
  page?: number;
  size?: number;
  // status?: string;
}

export const getUsers = async (
  params: GetUserParams = {}
): Promise<UserPage> => {
  const res = await api.get<UserPage>('/v1/private/users', {params});
  return res.data;
};

export const createUser = async (data: UserRequest): Promise<User> => {
  const res = await api.post('/v1/private/users', data);
  return res.data;
};
export const getUserById = async (id: string): Promise<User> => {
  const res =  await api.get(`/v1/private/users/${id}`);
  return res.data;
}

export const deleteUser = async (id: string):Promise<string> => {
  const res = await api.delete<string>(`/v1/private/users/${id}`)
  return res.data;
}
