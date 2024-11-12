import { render, screen } from '@testing-library/react';
import { BookStoreThemeProvider } from '../../context/themeContext';
import Button from './Button';

describe('Button 컴포넌트 테스트', () => {
  // 1 렌더
  it('렌더를 확인', () => {
    render(
      <BookStoreThemeProvider>
        <Button size="large" scheme="primary">
          버튼
        </Button>
      </BookStoreThemeProvider>
    );

    // 2 확인
    expect(screen.getByText('버튼')).toBeInTheDocument();
  });

  it('size props 적용', () => {
    const { container } = render(
      <BookStoreThemeProvider>
        <Button size="large" scheme="primary">
          버튼
        </Button>
      </BookStoreThemeProvider>
    );

    expect(container?.firstChild).toHaveStyle({ fontSize: '1.5rem' });
  });

  it('color props 적용', () => {
    const { container } = render(
      <BookStoreThemeProvider>
        <Button size="large" scheme="primary">
          제목
        </Button>
      </BookStoreThemeProvider>
    );

    expect(container?.firstChild).toHaveStyle({ color: 'white' });
  });

  it('backgroundColor props 적용', () => {
    const { container } = render(
      <BookStoreThemeProvider>
        <Button size="large" scheme="primary">
          제목
        </Button>
      </BookStoreThemeProvider>
    );

    expect(container?.firstChild).toHaveStyle({
      backgroundColor: 'midnightblue',
    });
  });
});
