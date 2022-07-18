import { createReducer } from '@reduxjs/toolkit';
import { User } from '@services/users/types';

import {
  searchUser,
  searchUserSucess,
  resetUserData,
  fetchFollowerSuccess,
  fetchFollowingSuccess,
  fetchRepoSuccess,
  updateUserList,
  updateFollowerList,
  updateFollowingList,
  updateLikeUser,
  initLikeUser,
} from './actions';
import { UserState } from './types';

const initialState: UserState = {
  search: '',
  data: {
    total: 0,
    items: [],
    nextPage: false,
  },
  liked: [],
  followers: {
    total: 0,
    items: [],
    nextPage: false,
  },
  following: {
    total: 0,
    items: [],
    nextPage: false,
  },
  repo: {
    total: 0,
    items: [],
    nextPage: false,
  },
  selected: {} as User,
};

export const userReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(searchUser, (state, action) => ({
      ...state,
      search: action.payload.query,
    }))
    .addCase(searchUserSucess, (state, action) => ({
      ...state,
      data: action.payload,
    }))
    .addCase(updateUserList, (state, action) => ({
      ...state,
      data: {
        ...state.data,
        items: action.payload,
      },
    }))
    .addCase(resetUserData, (state) => ({
      ...state,
      search: initialState.search,
      data: initialState.data,
    }))
    .addCase(updateLikeUser, (state, action) => ({
      ...state,
      liked: action.payload,
    }))
    .addCase(initLikeUser, (state, action) => ({
      ...state,
      liked: action.payload,
    }))
    .addCase(fetchFollowerSuccess, (state, action) => ({
      ...state,
      followers: action.payload,
    }))
    .addCase(updateFollowerList, (state, action) => ({
      ...state,
      followers: {
        ...state.followers,
        items: action.payload,
      },
    }))
    .addCase(fetchFollowingSuccess, (state, action) => ({
      ...state,
      following: action.payload,
    }))
    .addCase(updateFollowingList, (state, action) => ({
      ...state,
      following: {
        ...state.following,
        items: action.payload,
      },
    }))
    .addCase(fetchRepoSuccess, (state, action) => ({
      ...state,
      repo: action.payload,
    }));
});
