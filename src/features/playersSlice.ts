import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { Player as GqlPlayerType } from '../gql/graphql';
export type Player = GqlPlayerType;

interface PlayersState {
  players: Player[];
}

const initialState: PlayersState = {
  players: [],
};

export const GET_ALL_PLAYERS_REQUEST = 'players/getAllPlayersRequest';
const playersSlice = createSlice({
  name: 'players',
  initialState,
  reducers: {
    getAllPlayersSuccess(state, action: PayloadAction<Player[]>) {
      state.players = [...action.payload].sort((a, b) => (b.score ?? 0) - (a.score ?? 0));
    },
  },
});

export const { getAllPlayersSuccess } = playersSlice.actions;
export default playersSlice.reducer;
