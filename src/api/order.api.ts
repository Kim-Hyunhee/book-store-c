import { OrderSheet } from '../models/order.model';
import { getToken } from '../store/authStore';
import { httpClient } from './http';

export const order = async (orderData: OrderSheet) => {
  const token = getToken();

  const response = await httpClient.post('/orders', orderData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};
