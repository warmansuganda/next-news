import { createReducer } from '@reduxjs/toolkit';

import { fetchNews, fetchNewsSucess } from './actions';
import { NewsState } from './types';

const initialState: NewsState = {
  search: '',
  data: {
    items: [],
    nextPage: false,
  },
};

export const newsReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(fetchNews, (state, action) => ({
      ...state,
      search: action.payload.query,
    }))
    .addCase(fetchNewsSucess, (state, action) => ({
      ...state,
      data: action.payload,
    }));
});
