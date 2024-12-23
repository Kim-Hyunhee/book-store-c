import { Cart } from '../models/cart.model';
import { requestHandler } from './http';

interface AddCartParams {
  bookId: number;
  quantity: number;
}

export const addCart = async (params: AddCartParams) => {
  return await requestHandler('post', '/carts', {
    tokenRequired: true,
  });
};

export const fetchCart = async () => {
  return await requestHandler('get', '/carts', {
    tokenRequired: true,
  });
};

export const deleteCart = async (cartId: number) => {
  return await requestHandler('delete', `/carts/${cartId}`, {
    tokenRequired: true,
  });
};
