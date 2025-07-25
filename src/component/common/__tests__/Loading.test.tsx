
import { render, screen } from '@testing-library/react';
import Loading from '../Loading';

describe('Loading', () => {
  test('renders loading spinner and text', () => {
    render(<Loading />);
    expect(screen.getByRole('loading')).toBeInTheDocument();
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });
});


