import { Book, BookDetail } from '../models/book.model';
import { Pagination } from '../models/pagination.model';
import { getToken } from '../store/authStore';
import { httpClient } from './http';

interface FetchBooksParams {
  categoryId?: number;
  news?: boolean;
  currentPage?: number;
  limit: number;
}

interface FetchBooksResponse {
  books: Book[];
  pagination: Pagination;
}

export const fetchBooks = async (params: FetchBooksParams) => {
  try {
    const response = await httpClient.get<FetchBooksResponse>('/books', {
      params: params,
    });

    return response.data;
  } catch (error) {
    return {
      books: [],
      pagination: {
        totalCount: 0,
        currentPage: 1,
      },
    };
  }
};

export const fetchBook = async (bookId: string) => {
  const response = await httpClient.get<BookDetail>(`/books/${bookId}`);

  return response.data;
};

export const likeBook = async (bookId: number) => {
  const token = getToken();

  const response = await httpClient.post(
    `/likes/${bookId}`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};

export const unlikeBook = async (bookId: number) => {
  const token = getToken();
  const response = await httpClient.delete(`/likes/${bookId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};
