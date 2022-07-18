import { ofType, Epic, combineEpics } from 'redux-observable';
import { from, of } from 'rxjs';
import {
  map,
  switchMap,
  startWith,
  endWith,
  catchError,
  tap,
} from 'rxjs/operators';

import { AnyAction } from '@reduxjs/toolkit';
import {
  fetchUsers,
  fetchUserFollowers,
  fetchUserFollowings,
  fetchUserRepositories,
  findConcurrentUser,
} from '@services/users';
import { ErrorResponse } from '@services/types';

import { loadingStart, loadingEnd, createAlert } from '@stores/app';

import { UserActionTypes } from './types';
import {
  fetchFollowerSuccess,
  searchUserSucess,
  fetchFollowingSuccess,
  fetchRepoSuccess,
  updateUserList,
  updateFollowerList,
  updateFollowingList,
  updateLikeUser,
  updateLikeUserSuccess,
} from './actions';

const searchUserEpic: Epic<AnyAction, AnyAction> = (action$) =>
  action$.pipe(
    ofType(UserActionTypes.SEARCH),
    switchMap((action) =>
      from(fetchUsers(action.payload.query, action.payload.page)).pipe(
        map(({ data }) =>
          searchUserSucess({
            total: data.total_count,
            items: data.items,
            nextPage: data.incomplete_results,
          })
        ),
        catchError((error: ErrorResponse) => {
          return of(
            loadingEnd(),
            createAlert({
              severity: 'error',
              message: error.response?.data.message,
            })
          );
        }),
        startWith(loadingStart()),
        endWith(loadingEnd())
      )
    )
  );

const updateUserEpic: Epic<AnyAction, AnyAction> = (action$) =>
  action$.pipe(
    ofType(UserActionTypes.SEARCH_SUCCESS),
    switchMap((action) =>
      from(findConcurrentUser(action.payload.items)).pipe(
        map((result) => updateUserList(result.map((item) => item.data))),
        catchError((error: ErrorResponse) => {
          return of(
            createAlert({
              severity: 'error',
              message: error.response?.data.message,
            })
          );
        })
      )
    )
  );

const fetchFollowerEpic: Epic<AnyAction, AnyAction> = (action$) =>
  action$.pipe(
    ofType(UserActionTypes.FETCH_FOLLOWER),
    switchMap((action) =>
      from(fetchUserFollowers(action.payload)).pipe(
        map(({ data }) =>
          fetchFollowerSuccess({
            total: data.length,
            items: data,
            nextPage: false,
          })
        ),
        catchError((error: ErrorResponse) => {
          return of(
            loadingEnd(),
            createAlert({
              severity: 'error',
              message: error.response?.data.message,
            })
          );
        }),
        startWith(loadingStart()),
        endWith(loadingEnd())
      )
    )
  );

const updateFollowerEpic: Epic<AnyAction, AnyAction> = (action$) =>
  action$.pipe(
    ofType(UserActionTypes.FETCH_FOLLOWER_SUCCESS),
    switchMap((action) =>
      from(findConcurrentUser(action.payload.items)).pipe(
        map((result) => updateFollowerList(result.map((item) => item.data))),
        catchError((error: ErrorResponse) => {
          return of(
            createAlert({
              severity: 'error',
              message: error.response?.data.message,
            })
          );
        })
      )
    )
  );

const fetchFollowingEpic: Epic<AnyAction, AnyAction> = (action$) =>
  action$.pipe(
    ofType(UserActionTypes.FETCH_FOLLOWING),
    switchMap((action) =>
      from(fetchUserFollowings(action.payload)).pipe(
        map(({ data }) =>
          fetchFollowingSuccess({
            total: data.length,
            items: data,
            nextPage: false,
          })
        ),
        catchError((error: ErrorResponse) => {
          return of(
            loadingEnd(),
            createAlert({
              severity: 'error',
              message: error.response?.data.message,
            })
          );
        }),
        startWith(loadingStart()),
        endWith(loadingEnd())
      )
    )
  );

const updateFollowingEpic: Epic<AnyAction, AnyAction> = (action$) =>
  action$.pipe(
    ofType(UserActionTypes.FETCH_FOLLOWING_SUCCESS),
    switchMap((action) =>
      from(findConcurrentUser(action.payload.items)).pipe(
        map((result) => updateFollowingList(result.map((item) => item.data))),
        catchError((error: ErrorResponse) => {
          return of(
            createAlert({
              severity: 'error',
              message: error.response?.data.message,
            })
          );
        })
      )
    )
  );

const fetchRepoEpic: Epic<AnyAction, AnyAction> = (action$) =>
  action$.pipe(
    ofType(UserActionTypes.FETCH_REPO),
    switchMap((action) =>
      from(fetchUserRepositories(action.payload)).pipe(
        map(({ data }) =>
          fetchRepoSuccess({
            total: data.length,
            items: data,
            nextPage: false,
          })
        ),
        catchError((error: ErrorResponse) => {
          return of(
            loadingEnd(),
            createAlert({
              severity: 'error',
              message: error.response?.data.message,
            })
          );
        }),
        startWith(loadingStart()),
        endWith(loadingEnd())
      )
    )
  );

const likeEpic: Epic<AnyAction, AnyAction> = (action$, state$) =>
  action$.pipe(
    ofType(UserActionTypes.LIKE),
    map(({ payload }) => {
      const liked = [...state$.value.user.liked];
      const index = liked.findIndex((item) => item.id === payload.id);

      if (index === -1) {
        liked.push(payload);
      }

      return updateLikeUser(liked);
    })
  );

const unlikeEpic: Epic<AnyAction, AnyAction> = (action$, state$) =>
  action$.pipe(
    ofType(UserActionTypes.UNLIKE),
    map(({ payload }) => {
      const liked = [...state$.value.user.liked];
      const index = liked.findIndex((item) => item.id === payload.id);

      if (index > -1) {
        liked.splice(index, 1);
      }

      return updateLikeUser(liked);
    })
  );

const updateLikeEpic: Epic<AnyAction, AnyAction> = (action$) =>
  action$.pipe(
    ofType(UserActionTypes.UPDATE_LIKE),
    tap(({ payload }) => {
      localStorage.setItem('app:liked', JSON.stringify(payload));
    }),
    map(() => updateLikeUserSuccess())
  );

export const userEpic = combineEpics(
  searchUserEpic,
  updateUserEpic,
  fetchFollowerEpic,
  updateFollowerEpic,
  fetchFollowingEpic,
  updateFollowingEpic,
  fetchRepoEpic,
  likeEpic,
  unlikeEpic,
  updateLikeEpic
);
