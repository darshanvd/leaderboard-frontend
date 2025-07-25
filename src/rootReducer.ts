import { combineReducers } from '@reduxjs/toolkit';
import playersReducer from './features/playersSlice';
import loginReducer from './features/loginSlice';

const rootReducer = combineReducers({
  players: playersReducer,
  login: loginReducer
});

export default rootReducer;
