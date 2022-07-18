import { User, Repo } from '@services/users/types';

export interface UserDataState {
  total: number;
  items: User[];
  nextPage: boolean;
}

export interface UserRepoState {
  total: number;
  items: Repo[];
  nextPage: boolean;
}

export interface UserState {
  search: string;
  data: UserDataState;
  liked: User[];
  selected: User;
  followers: UserDataState;
  following: UserDataState;
  repo: UserRepoState;
}

export enum UserActionTypes {
  SEARCH = 'user/search',
  SELECTED = 'user/selected',
  UPDATE_LIST = 'user/updateList',
  SEARCH_SUCCESS = 'user/searchSuccess',
  RESET_DATA = 'user/resetData',
  LIKE = 'user/like',
  UNLIKE = 'user/unlike',
  UPDATE_LIKE = 'user/updateLike',
  INIT_LIKE = 'user/initLike',
  UPDATE_LIKE_SUCCESS = 'user/updateLikeSuccess',
  FETCH_REPO = 'user/fetchRepo',
  FETCH_REPO_SUCCESS = 'user/fetchRepoSuccess',
  FETCH_FOLLOWER = 'user/fetchFollower',
  FETCH_FOLLOWER_SUCCESS = 'user/fetchFollowerSuccess',
  UPDATE_FOLLOWER_LIST = 'user/updateFollowerList',
  FETCH_FOLLOWING = 'user/fetchFollowing',
  FETCH_FOLLOWING_SUCCESS = 'user/fetchFollowingSuccess',
  UPDATE_FOLLOWING_LIST = 'user/updateFollowingList',
}
