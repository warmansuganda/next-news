import { createReducer } from '@reduxjs/toolkit';

import { searchUser } from './actions';
import { UserState } from './types';

const initialState: UserState = {
  search: '',
  wallet: {
    balance: 100000,
    logs: [],
  },
  library: [],
};

export const userReducer = createReducer(initialState, (builder) => {
  builder.addCase(searchUser, (state, action) => ({
    ...state,
    search: action.payload.query,
  }));
});
