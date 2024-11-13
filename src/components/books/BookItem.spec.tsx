import { getByAltText, render, screen } from '@testing-library/react';
import { BookStoreThemeProvider } from '../../context/themeContext';
import React from 'react';
import BookItem from './BookItem';
import exp from 'constants';

const dummyBook = {
  id: 1,
  title: 'Dummy Book',
  img: 5,
  category_id: 1,
  summary: 'Dummy summary',
  author: 'Dummy author',
  price: 10000,
  likes: 1,
  form: 'paperback',
  isbn: 'Dummy isbn',
  detail: 'Dummy detail',
  pages: 100,
  contents: 'Dummy contents',
  pubDate: '2024-11-14',
};

describe('BookItem', () => {
  it('렌더 여부', () => {
    const { getByText, getByAltText } = render(
      <BookStoreThemeProvider>
        <BookItem book={dummyBook} />
      </BookStoreThemeProvider>
    );

    expect(getByText(dummyBook.title)).toBeInTheDocument();
    expect(getByText(dummyBook.summary)).toBeInTheDocument();
    expect(getByText(dummyBook.author)).toBeInTheDocument();
    expect(getByText('10,000원')).toBeInTheDocument();
    expect(getByText(dummyBook.likes)).toBeInTheDocument();
    expect(getByAltText(dummyBook.title)).toHaveAttribute(
      'src',
      `https://picsum.photos/id/${dummyBook.img}/600/600`
    );
  });
});
