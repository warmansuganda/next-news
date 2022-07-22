import { createReducer } from '@reduxjs/toolkit';

import {
  fetchNews,
  fetchNewsLoading,
  fetchNewsSucess,
  fetchMostPopularNews,
  resetNews,
} from './actions';
import { NewsState } from './types';

const initialState: NewsState = {
  search: '',
  data: {
    loading: true,
    items: [],
    nextPage: true,
  },
};

export const newsReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(fetchNews, (state, action) => ({
      ...state,
      search: action.payload.query,
    }))
    .addCase(fetchMostPopularNews, (state, action) => ({
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
    }))
    .addCase(resetNews, () => initialState);
});
