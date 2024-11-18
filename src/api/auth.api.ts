import { SignupProps } from '../pages/Signup';
import { requestHandler } from './http';

export const signup = async (userData: SignupProps) => {
  return await requestHandler('post', '/join', userData);
};

export const resetRequest = async (data: SignupProps) => {
  return await requestHandler('post', '/reset', data);
};

export const resetPassword = async (data: SignupProps) => {
  return await requestHandler('put', '/reset', data);
};

export const login = async (data: SignupProps) => {
  return await requestHandler('post', '/login', data);
};
