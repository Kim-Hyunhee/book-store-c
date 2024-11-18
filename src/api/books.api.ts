import { Book, BookDetail } from '../models/book.model';
import { Pagination } from '../models/pagination.model';
import { requestHandler } from './http';

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
    return await requestHandler<FetchBooksParams>('get', '/books', params);
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
  return await requestHandler<FetchBooksResponse>('get', `/books/${bookId}`);
};

export const likeBook = async (bookId: number) => {
  return await requestHandler('post', `/likes/${bookId}`, {
    tokenRequired: true,
  });
};

export const unlikeBook = async (bookId: number) => {
  return await requestHandler('delete', `/likes/${bookId}`, {
    tokenRequired: true,
  });
};
