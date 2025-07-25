import React, { useState } from 'react';
import type { PlayerType } from './PlayerList';

interface PlayerAddRowProps {
  isLoggedIn: boolean;
  onSave: (player: PlayerType) => void;
  onCancel: () => void;
}

const PlayerAddRow: React.FC<PlayerAddRowProps> = ({
  isLoggedIn, onSave, onCancel
}) => {
  const [editValues, setEditValues] = useState<PlayerType>({ name: '', score: 0, playerId: '' });
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditValues((prev) => ({ ...prev, [name]: name === 'score' ? Number(value) : value }));
  };

  return (
    <tr className="border rounded border-b-2 border-grey-border hover:bg-grey-light-hover sm:table-row block sm:contents">
      {/* Add header centered for mobile */}
      <td colSpan={isLoggedIn ? 4 : 3} className="block sm:hidden py-2 px-2">
        <div className="text-center text-lg text-green-600 mb-2">
          Add Player
        </div>
      </td>
      <td className="py-2 px-2 sm:table-cell block w-full">
        <span className="sm:hidden font-semibold block text-center">Name: </span>
        <input
          className="border-0 border-b-2 border-gray-300 rounded-none px-0 py-2 py-1 w-full focus:outline-none focus:border-blue-400 bg-transparent"
          name="name"
          value={editValues.name}
          onChange={handleChange}
          placeholder="Name"
        />
      </td>
      <td className="py-2 px-2 sm:table-cell block w-full">
        <span className="sm:hidden font-semibold block text-center">Score: </span>
        <input
          className="border-0 border-b-2 border-gray-300 rounded-none px-0 py-2 py-1 w-full focus:outline-none focus:border-blue-400 bg-transparent"
          name="score"
          type="number"
          value={editValues.score ?? ''}
          onChange={handleChange}
          placeholder="Score"
        />
      </td>
      <td className="py-2 px-2 sm:table-cell block w-full" />
      {isLoggedIn && (
        <td className="py-2 px-2 sm:table-cell block w-full">
          <span className="sm:hidden font-semibold block text-center">Actions: </span>
          <div className="flex gap-2 justify-center">
            <button
              role='button'
              className="text-green-600 font-semibold px-2 py-1 rounded hover:underline focus:outline-none bg-transparent"
              onClick={() => onSave(editValues)}
            >
              Save
            </button>
            <button
              className="text-gray-500 font-semibold px-2 py-1 rounded hover:underline focus:outline-none bg-transparent"
              onClick={onCancel}
            >
              Cancel
            </button>
          </div>
        </td>
      )}
    </tr>
  );
};

export default PlayerAddRow;