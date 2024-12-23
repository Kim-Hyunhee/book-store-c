import { Book, BookDetail } from '../models/book.model';
import { Pagination } from '../models/pagination.model';
import { httpClient, requestHandler } from './http';

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

export const fetchBooks = async (
  params: FetchBooksParams
): Promise<FetchBooksResponse> => {
  try {
    const updatedParams = {
      ...params,
      news: params.news !== undefined ? params.news : undefined,
    };

    return await requestHandler<FetchBooksParams>(
      'get',
      '/books',
      updatedParams
    );
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
  return await requestHandler<BookDetail>('get', `/books/${bookId}`);
};

export const likeBook = async (bookId: number) => {
  return await requestHandler(
    'post',
    `/likes/${bookId}`,
    {},
    {
      tokenRequired: true,
    }
  );
};

export const unlikeBook = async (bookId: number) => {
  return await requestHandler(
    'delete',
    `/likes/${bookId}`,
    {},
    {
      tokenRequired: true,
    }
  );
};

export const fetchBestBooks = async () => {
  const response = await httpClient.get<Book[]>('/books/best');

  return response.data;
};
