import { createReducer } from '@reduxjs/toolkit';

import { fetchNews, fetchNewsLoading, fetchNewsSucess } from './actions';
import { NewsState } from './types';

const initialState: NewsState = {
  search: '',
  data: {
    loading: true,
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
    .addCase(fetchNewsLoading, (state, action) => ({
      ...state,
      data: {
        ...state.data,
        loading: action.payload,
      },
    }))
    .addCase(fetchNewsSucess, (state, action) => ({
      ...state,
      data: action.payload,
    }));
});
