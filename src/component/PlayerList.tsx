
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useQuery, useMutation, useSubscription } from '@apollo/client';
import type { RootState } from '../store';
import type { Player } from '../gql/graphql';
import { getAllPlayersSuccess } from '../features/playersSlice';
import { logout } from '../features/loginSlice';
import { GET_ALL_PLAYERS } from '../graqhql/Query';
import { CREATE_PLAYER, DELETE_PLAYER, UPDATE_PLAYER } from '../graqhql/Mutations';
import { UPSERT_PLAYER_SUBSCRIPTION, DELETE_PLAYER_SUBSCRIPTION } from '../graqhql/Subscription';
import Snackbar, { type SnackbarState } from './common/Snackbar';
import Loading from './common/Loading';
import PlayerRow from './PlayerRow';
import PlayerAddRow from './PlayerAddRow';

export interface PlayerType {
    name: string; score: number; playerId: string | undefined;
}

const PlayerList: React.FC = () => {
    const dispatch = useDispatch();
    const { data, loading, error } = useQuery(GET_ALL_PLAYERS);
    const players: Player[] = useSelector((state: RootState) => state.players.players);
    const isLoggedIn = useSelector((state: RootState) => state.login.isLoggedIn);
    const [adding, setAdding] = useState(false);
    const [snackbar, setSnackbar] = useState<SnackbarState>({
        message: '',
        open: false,
        type: 'info',
    });

    const handleError = (err: any) => {
        const code = err?.graphQLErrors?.[0]?.status;
        setSnackbar({ message: err?.graphQLErrors?.[0]?.message || err?.message || 'An error occurred', open: true, type: 'error' });
        if (code === 401) {
            dispatch(logout());
        }
    };

    const [createPlayer, { loading: creating }] = useMutation(CREATE_PLAYER, {
        onError: (err) => handleError(err),
        onCompleted: () => {
            setSnackbar({ message: '', open: false });
            setAdding(false);
        }
    });
    const [updatePlayer, { loading: updating }] = useMutation(UPDATE_PLAYER, {
        onError: (err) => handleError(err),
        onCompleted: () => {
            setSnackbar({ message: '', open: false });
        }
    });
    const [deletePlayer, { loading: deleting }] = useMutation(DELETE_PLAYER, {
        onError: (err) => handleError(err),
        onCompleted: () => {
            setSnackbar({ message: '', open: false });
        }
    });

    useEffect(() => {
        if (error) {
            handleError(error);
        }
        if (data?.getAllPlayers) {
            dispatch(getAllPlayersSuccess(data.getAllPlayers));
        }
    }, [data, error, dispatch]);

    // Subscribe to playerUpdated
    useSubscription(UPSERT_PLAYER_SUBSCRIPTION, {
        onData: ({ data }: {data: {data: {upsertPlayer: Player}}}) => {
            const updatedPlayer = data.data.upsertPlayer;
            if (updatedPlayer) {
                const exists = players.some(p => p.playerId === updatedPlayer.playerId);
                let updatedPlayers;
                if (exists) {
                    updatedPlayers = players.map(p =>
                        p.playerId === updatedPlayer.playerId ? updatedPlayer : p
                    );
                } else {
                    updatedPlayers = [...players, updatedPlayer];
                }
                dispatch(getAllPlayersSuccess(updatedPlayers));
            }
        }
    });

    // Subscribe to playerDeleted
    useSubscription(DELETE_PLAYER_SUBSCRIPTION, {
        onData: ({ data }: {data: {data: {deletePlayer: Player}}}) => {
            const deletedPlayerId = data?.data?.deletePlayer.playerId;
            if (deletedPlayerId) {
                const updatedPlayers = players.filter(p => p.playerId !== deletedPlayerId);
                dispatch(getAllPlayersSuccess(updatedPlayers));
            }
        }
    });

    const handleCancel = () => {
        setAdding(false);
    };

    const isFormValid = (player: PlayerType) => {
        if (!player.name.trim()) {
            setSnackbar({ message: 'Player name cannot be empty.', open: true, type: 'error' });
            return false;
        }
        if (player.score === null || player.score <= 0) {
            setSnackbar({ message: 'Score must be greater than zero.', open: true, type: 'error' });
            return;
        }
        return true;
    };

    // Save for add or edit
    const handleSave = (player: PlayerType) => {
        if (!isFormValid(player)) return
        if (!player.playerId) {
            createPlayer({ variables: { playerInput: { name: player.name, score: player.score } } });
        } else {
            updatePlayer({ variables: { playerInput: { name: player.name, score: player.score, playerId: player.playerId } } });
        }
    };

    const handleDelete = (playerId: string) => {
        deletePlayer({ variables: { playerId } });
    };
    
    const handleAdd = () => {
        setAdding(true);
    };
    // Show loading spinner if any mutation or query is loading
    if (loading || creating || updating || deleting) {
        return (
            <Loading/>
        );
    }

    const AddPlayerButton = () => (
        <button
            className="text-green-600 font-semibold px-2 py-1 rounded hover:underline focus:outline-none bg-transparent"
            onClick={handleAdd}
            type="button"
        >
            Add Player
        </button>
    );

    if (players.length === 0 && !adding) {
        return (
            <>
                <Snackbar snackbar={snackbar} />
                <div className="flex flex-col items-center justify-center h-[calc(100vh-120px)] px-2 sm:px-6 py-2 sm:py-4">
                    <div className="text-gray-500 text-lg font-semibold mb-4">
                        There are not players.
                    </div>
                    {isLoggedIn && <AddPlayerButton />}
                </div>
            </>
        );
    }

    return (
        <>
            <Snackbar snackbar={snackbar} />
            <div className="overflow-x-auto h-[calc(100vh-120px)] px-2 sm:px-6 py-2 sm:py-4">
                <div className="h-full overflow-y-auto">
                    {isLoggedIn && (
                        <div className="mb-2 flex justify-end">
                            <AddPlayerButton />
                        </div>
                    )}
                    <table className="min-w-full">
                        <thead className="sticky top-0 bg-white z-10 border-b-[2px] border-grey-border hidden sm:table-header-group">
                            <tr className="p-2">
                                <th className="py-2 min-w-[100px] sm:w-[20%] text-left font-semibold text-header-text bg-white border-b-[1.5px] border-grey-border">
                                    Name
                                </th>
                                <th className="py-2 min-w-[80px] sm:w-[25%] text-left font-semibold text-header-text bg-white border-b-[1.5px] border-grey-border">
                                    Score
                                </th>
                                <th className="py-2 min-w-[180px] sm:w-[45%] text-left font-semibold text-header-text bg-white border-b-[1.5px] border-grey-border">
                                    Last Updated
                                </th>
                                {isLoggedIn && (
                                    <th className="py-2 min-w-[80px] sm:w-[15%] text-left font-semibold text-header-text bg-white border-b-[1.5px] border-grey-border">
                                        Actions
                                    </th>
                                )}
                            </tr>
                        </thead>
                        <tbody>
                            {adding && (
                                <PlayerAddRow
                                    isLoggedIn={!!isLoggedIn}
                                    onSave={handleSave}
                                    onCancel={handleCancel}
                                />
                            )}
                            {players.slice(0, 10).map((player) => (
                                <PlayerRow
                                    key={player.playerId}
                                    player={player}
                                    isLoggedIn={!!isLoggedIn}
                                    onDelete={handleDelete}
                                    onSave={handleSave}
                                    onCancel={handleCancel}
                                />
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
};

export default PlayerList;
