import { describe, expect, test, vi,  } from "vitest";
import { render, screen, fireEvent } from '@testing-library/react';
import PlayerRow from '../PlayerRow';
import { Player } from '../../gql/graphql';


const mockPlayer: Player = {
  playerId: '1',
  name: 'Test Player',
  score: 42,
  updatedAt: new Date().toISOString(),
  createdAt: new Date().toISOString(),
};

function renderPlayerRow(props = {}) {
  return (
        <PlayerRow
          player={mockPlayer}
          isLoggedIn={true}
          onDelete={vi.fn()}
          onSave={vi.fn()}
          onCancel={vi.fn()}
          {...props}
        />
  );
}

describe('PlayerRow', () => {
  test('renders player data in display mode', () => {
    render(renderPlayerRow());
    expect(screen.getByText('Test Player')).toBeInTheDocument();
    expect(screen.getByText('42')).toBeInTheDocument();
    expect(screen.getByText(/Last Updated:/i)).toBeInTheDocument();
    expect(screen.getByText('Edit')).toBeInTheDocument();
    expect(screen.getByText('Delete')).toBeInTheDocument();
  });

  test('calls onDelete when Delete button is clicked', () => {
    const onDelete = vi.fn();
    render(renderPlayerRow({ onDelete }));
    fireEvent.click(screen.getByText('Delete'));
    expect(onDelete).toHaveBeenCalledWith('1');
  });

  test('does not show actions if not logged in', () => {
    render(renderPlayerRow({ isLoggedIn: false }));
    expect(screen.queryByText('Edit')).not.toBeInTheDocument();
    expect(screen.queryByText('Delete')).not.toBeInTheDocument();
  });
});