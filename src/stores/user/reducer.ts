import { createReducer } from '@reduxjs/toolkit';

import {
  searchUser,
  updateCoupon,
  updateLibrary,
  updateRedeem,
  updateWallet,
} from './actions';
import { UserState } from './types';

const initialState: UserState = {
  search: '',
  wallet: {
    balance: 100000,
    logs: [],
  },
  library: [],
  coupon: [],
  redeem: [],
};

export const userReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(searchUser, (state, action) => ({
      ...state,
      search: action.payload.query,
    }))
    .addCase(updateLibrary, (state, action) => ({
      ...state,
      library: action.payload,
    }))
    .addCase(updateWallet, (state, action) => ({
      ...state,
      wallet: action.payload,
    }))
    .addCase(updateCoupon, (state, action) => ({
      ...state,
      coupon: action.payload,
    }))
    .addCase(updateRedeem, (state, action) => ({
      ...state,
      redeem: action.payload,
    }));
});
