
import { render, screen } from '@testing-library/react';
import { vi } from 'vitest';
import ErrorBoundary from '../ErrorBoundary';

function ProblemChild() {
  throw new Error('Test error!');
  // Return null to satisfy React component type
  return null;
}

describe('ErrorBoundary', () => {
  test('renders children when no error', () => {
    render(
      <ErrorBoundary>
        <div>Safe Child</div>
      </ErrorBoundary>
    );
    expect(screen.getByText('Safe Child')).toBeInTheDocument();
  });

  test('catches error and displays fallback UI', () => {
    const spy = vi.spyOn(console, 'error').mockImplementation(() => {});
    render(
      <ErrorBoundary>
        <ProblemChild />
      </ErrorBoundary>
    );
    expect(screen.getByText(/Something went wrong:/)).toBeInTheDocument();
    expect(screen.getByText(/Test error!/)).toBeInTheDocument();
    spy.mockRestore();
  });
});
