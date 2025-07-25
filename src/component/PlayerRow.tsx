import React, { useState } from 'react';
import type { Player } from '../gql/graphql';
import { formatDate } from '../utils/formatDate';
import type { PlayerType } from './PlayerList';

interface PlayerRowProps {
    player: Player;
    editValues?: { name: string; score: number | null };
    isLoggedIn: boolean;
    onDelete: (playerId: string) => void;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onSave: (player: PlayerType) => void;
    onCancel: () => void;
}

const PlayerRow: React.FC<PlayerRowProps> = ({
    player, isLoggedIn,
    onDelete, onSave, onCancel
}) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editValues, setEditValues] = useState<PlayerType>({ name: '', score: 0, playerId: '' });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setEditValues((prev) => ({ ...prev, [name]: name === 'score' ? Number(value) : value }));
    };

    const handleEdit = (player: PlayerType) => {
        setEditValues({ playerId: player.playerId, name: player.name, score: player.score });
        setIsEditing(true);
    };

    // Responsive edit view
    if (isEditing) {
        return (
            <tr className="border-b-2 border-grey-border hover:bg-grey-light-hover sm:table-row block sm:contents">
                <td className="py-2 px-2 sm:table-cell block w-full">
                    <span className="sm:hidden font-semibold">Name: </span>
                    <input
                        className="border-0 border-b-2 border-gray-300 rounded-none px-0 py-2 py-1 w-full focus:outline-none focus:border-blue-400 bg-transparent"
                        name="name"
                        value={editValues.name}
                        onChange={handleChange}
                        placeholder="Name"
                    />
                </td>
                <td className="py-2 px-2 sm:table-cell block w-full">
                    <span className="sm:hidden font-semibold">Score: </span>
                    <input
                        className="border-0 border-b-2 border-gray-300 rounded-none px-0 py-2 py-1 w-full focus:outline-none focus:border-blue-400 bg-transparent"
                        name="score"
                        type="number"
                        value={editValues.score ?? ''}
                        onChange={handleChange}
                        placeholder="Score"
                    />
                </td>
                <td className="py-2 px-2 sm:table-cell block w-full">
                    <span className="sm:hidden font-semibold">Last Updated: </span>
                    {formatDate(player.updatedAt)}
                </td>
                {isLoggedIn && (
                    <td className="py-2 px-2 sm:table-cell block w-full">
                        <span className="sm:hidden font-semibold">Actions: </span>
                        <div className="flex gap-2">
                            <button
                                className="text-green-600 px-2 py-1 rounded hover:underline focus:outline-none bg-transparent"
                                onClick={() => {
                                    onSave({ ...editValues, playerId: editValues.playerId ?? '' });
                                    setIsEditing(false);
                                }}
                            >
                                Save
                            </button>
                            <button
                                className="text-gray-500 px-2 py-1 rounded hover:underline focus:outline-none bg-transparent"
                                onClick={() => {
                                    setIsEditing(false);
                                    onCancel();
                                }}
                            >
                                Cancel
                            </button>
                        </div>
                    </td>
                )}
            </tr>
        );
    }
    return (
        <tr className="border-b-2 border-grey-border hover:bg-grey-light-hover sm:table-row block sm:contents">
            <td className="py-2 px-2 sm:table-cell block w-full text-grey-text">
                <span className="sm:hidden font-semibold text-header-text">Name: </span>
                {player.name}
            </td>
            <td className="py-2 px-2 sm:table-cell block w-full text-grey-text">
                <span className="sm:hidden font-semibold text-header-text">Score: </span>
                {player.score}
            </td>
            <td className="py-2 px-2 sm:table-cell block w-full text-grey-text">
                <span className="sm:hidden font-semibold text-header-text">Last Updated: </span>
                {formatDate(player.updatedAt)}
            </td>
            {isLoggedIn && (
                <td className="py-2 px-2 sm:table-cell block w-full">
                    <span className="sm:hidden font-semibold text-header-text">Actions: </span>
                    <div className="flex gap-2">
                        <button
                            className="text-blue-text px-2 py-1 rounded hover:underline focus:outline-none bg-transparent"
                            onClick={() => handleEdit(player)}
                        >
                            Edit
                        </button>
                        <button
                            className="text-red-text px-2 py-1 rounded hover:underline focus:outline-none bg-transparent"
                            onClick={() => onDelete(player.playerId ?? '')}
                        >
                            Delete
                        </button>
                    </div>
                </td>
            )}
        </tr>
    );
};

export default PlayerRow;