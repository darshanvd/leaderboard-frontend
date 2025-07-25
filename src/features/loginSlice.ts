import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { User as LoginState } from '../gql/graphql';

const initialState: LoginState = {
  isLoggedIn: false,
  userId: '',
  email: '',
  name: '',
};

const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    loginSuccess: (state, action: PayloadAction<LoginState>) => {
      state.isLoggedIn = true;
      state.userId = action.payload.userId;
      state.email = action.payload.email;
      state.name = action.payload.name;
    },
    logout: (state) => {
      state.isLoggedIn = false;
      state.userId = '';
      state.email = '';
      state.name = '';
    },
  },
});

export const { loginSuccess, logout } = loginSlice.actions;
export default loginSlice.reducer;
