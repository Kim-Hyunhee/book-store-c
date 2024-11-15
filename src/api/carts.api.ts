import { Cart } from '../models/cart.model';
import { getToken } from '../store/authStore';
import { httpClient } from './http';

interface AddCartParams {
  bookId: number;
  quantity: number;
}

export const addCart = async (params: AddCartParams) => {
  const token = getToken();
  const response = await httpClient.post('/carts', params, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

export const fetchCart = async () => {
  const token = getToken();
  const response = await httpClient.get<Cart[]>('/carts', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

export const deleteCart = async (cartId: number) => {
  const token = getToken();
  const response = await httpClient.delete(`/carts/${cartId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};
