import { render, screen } from '@testing-library/react';
import { vi } from 'vitest';
import Snackbar from '../Snackbar';

beforeEach(() => {
  vi.useFakeTimers();
});

describe('Snackbar', () => {
  test('renders message and correct type', () => {
    render(
      <Snackbar snackbar={{ message: 'Test success', open: true, type: 'success' }} />
    );
    expect(screen.getByRole('alert')).toBeInTheDocument();
    expect(screen.getByText('Test success')).toBeInTheDocument();
  });

  test('does not render when open is false', () => {
    render(
      <Snackbar snackbar={{ message: 'Should not show', open: false, type: 'info' }} />
    );
    expect(screen.queryByText('Should not show')).not.toBeInTheDocument();
  });
});