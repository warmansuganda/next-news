import { ofType, Epic, combineEpics } from 'redux-observable';
import { from, of } from 'rxjs';
import { map, switchMap, startWith, endWith, catchError } from 'rxjs/operators';

import { AnyAction } from '@reduxjs/toolkit';
import { fetchNews } from '@services/news';
import { ErrorResponse } from '@services/types';

import { createAlert } from '@stores/app';

import { NewsActionTypes } from './types';
import { fetchNewsSucess, fetchNewsLoading } from './actions';

const fetchNewsEpic: Epic<AnyAction, AnyAction> = (action$) =>
  action$.pipe(
    ofType(NewsActionTypes.FETCH),
    switchMap((action) =>
      from(fetchNews(action.payload.query, action.payload.page)).pipe(
        map(({ data }) =>
          fetchNewsSucess({
            loading: false,
            items: data.response.docs,
            nextPage: data.response.docs.length > 0,
          })
        ),
        catchError((error: ErrorResponse) => {
          return of(
            fetchNewsLoading(false),
            createAlert({
              severity: 'error',
              message: error.response?.data.message,
            })
          );
        }),
        startWith(fetchNewsLoading(true))
      )
    )
  );

const fetchMoreNewsEpic: Epic<AnyAction, AnyAction> = (action$, state$) =>
  action$.pipe(
    ofType(NewsActionTypes.FETCH_MORE),
    switchMap((action) =>
      from(fetchNews(action.payload.query, action.payload.page)).pipe(
        map(({ data }) => {
          const items = [
            ...state$.value.news.data.items,
            ...data.response.docs,
          ];

          return fetchNewsSucess({
            loading: false,
            items,
            nextPage: data.response.docs.length > 0,
          });
        }),
        catchError((error: ErrorResponse) => {
          return of(
            fetchNewsLoading(false),
            createAlert({
              severity: 'error',
              message: error.response?.data.message,
            })
          );
        }),
        startWith(fetchNewsLoading(true))
      )
    )
  );

export const newsEpic = combineEpics(fetchNewsEpic, fetchMoreNewsEpic);
