import { BookReviewItem } from '../models/book.model';
import { http, HttpResponse } from 'msw';
import { fakerKO as faker } from '@faker-js/faker';

export const reviewById = http.get(
  'http://localhost:9999/reviews/:bookId',
  () => {
    // const data: BookReviewItem[] = [
    //   {
    //     id: 1,
    //     userName: 'Bob',
    //     content: '감사합니다',
    //     createdAt: '2024-11-19',
    //     score: 4,
    //   },
    //   {
    //     id: 2,
    //     userName: 'Bob2',
    //     content: '감사합니다2',
    //     createdAt: '2024-11-19',
    //     score: 3,
    //   },
    // ];

    const mockReviewData: BookReviewItem[] = Array.from({ length: 8 }).map(
      (_, index) => ({
        id: index,
        userName: `${faker.person.lastName()}${faker.person.firstName()}`,
        content: faker.lorem.paragraph(),
        createdAt: faker.date.past().toISOString(),
        score: faker.number.int({ min: 1, max: 5 }),
      })
    );

    return HttpResponse.json(mockReviewData, {
      status: 200,
    });
  }
);

export const addReview = http.post(
  'http://localhost:9999/reviews/:bookId',
  () => {
    return HttpResponse.json(
      { message: '리뷰가 등록되었습니다.' },
      { status: 200 }
    );
  }
);
