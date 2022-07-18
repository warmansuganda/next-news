import { createAction } from '@reduxjs/toolkit';
import { User } from '@services/users/types';
import { QueryParams } from '@services/types';

import { UserActionTypes, UserDataState, UserRepoState } from './types';

export const searchUser = createAction<QueryParams>(UserActionTypes.SEARCH);

export const searchUserSucess = createAction<UserDataState>(
  UserActionTypes.SEARCH_SUCCESS
);

export const updateUserList = createAction<User[]>(UserActionTypes.UPDATE_LIST);

export const resetUserData = createAction(UserActionTypes.RESET_DATA);

export const selectedUser = createAction<User>(UserActionTypes.SELECTED);

export const likeUser = createAction<User>(UserActionTypes.LIKE);

export const updateLikeUser = createAction<User[]>(UserActionTypes.UPDATE_LIKE);

export const initLikeUser = createAction<User[]>(UserActionTypes.INIT_LIKE);

export const updateLikeUserSuccess = createAction(
  UserActionTypes.UPDATE_LIKE_SUCCESS
);

export const unLikeUser = createAction<User>(UserActionTypes.UNLIKE);

export const fetchRepo = createAction<string>(UserActionTypes.FETCH_REPO);

export const fetchRepoSuccess = createAction<UserRepoState>(
  UserActionTypes.FETCH_REPO_SUCCESS
);

export const fetchFollower = createAction<string>(
  UserActionTypes.FETCH_FOLLOWER
);

export const fetchFollowerSuccess = createAction<UserDataState>(
  UserActionTypes.FETCH_FOLLOWER_SUCCESS
);

export const updateFollowerList = createAction<User[]>(
  UserActionTypes.UPDATE_FOLLOWER_LIST
);

export const fetchFollowing = createAction<string>(
  UserActionTypes.FETCH_FOLLOWING
);

export const fetchFollowingSuccess = createAction<UserDataState>(
  UserActionTypes.FETCH_FOLLOWING_SUCCESS
);

export const updateFollowingList = createAction<User[]>(
  UserActionTypes.UPDATE_FOLLOWING_LIST
);
