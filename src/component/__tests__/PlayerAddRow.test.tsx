import { describe, expect, test, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import PlayerAddRow from '../PlayerAddRow';

// Helper to render the component with required props
const setup = ({ isLoggedIn = true }) => {
  const onSave = vi.fn();
  const onCancel = vi.fn();
  render(
    <table>
      <tbody>
        <PlayerAddRow onSave={onSave} onCancel={onCancel} isLoggedIn={isLoggedIn} />
      </tbody>
    </table>
  );
    return { onSave, onCancel, isLoggedIn };
};

describe('PlayerAddRow', () => {
  test('renders input fields and Save button', () => {
    setup({ isLoggedIn: true });
    expect(screen.getByPlaceholderText(/Name/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Score/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Save/i })).toBeInTheDocument();
  });

  test('calls onSave with name and score when Save is clicked', () => {
    const { onSave } = setup({ isLoggedIn: true });
    fireEvent.change(screen.getByPlaceholderText(/Name/i), { target: { value: 'Alice' } });
    fireEvent.change(screen.getByPlaceholderText(/Score/i), { target: { value: '99' } });
    fireEvent.click(screen.getByRole('button', { name: /Save/i }));
    expect(onSave).toHaveBeenCalledWith({ name: 'Alice', score: 99, playerId: '' });
  });

  test('does not render Save/Cancel buttons if not logged in', () => {
    setup({ isLoggedIn: false });
    expect(screen.queryByRole('button', { name: /Save/i })).not.toBeInTheDocument();
    expect(screen.queryByRole('button', { name: /Cancel/i })).not.toBeInTheDocument();
  });
});
