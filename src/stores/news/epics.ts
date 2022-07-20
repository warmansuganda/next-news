import { ofType, Epic, combineEpics } from 'redux-observable';
import { from, of } from 'rxjs';
import { map, switchMap, startWith, endWith, catchError } from 'rxjs/operators';

import { AnyAction } from '@reduxjs/toolkit';
import { fetchNews } from '@services/news';
import { ErrorResponse } from '@services/types';

import { loadingStart, loadingEnd, createAlert } from '@stores/app';

import { NewsActionTypes } from './types';
import { fetchNewsSucess } from './actions';

const fetchNewsEpic: Epic<AnyAction, AnyAction> = (action$) =>
  action$.pipe(
    ofType(NewsActionTypes.FETCH),
    switchMap((action) =>
      from(fetchNews(action.payload.query, action.payload.page)).pipe(
        map(({ data }) =>
          fetchNewsSucess({
            items: data.response.docs,
            nextPage: data.response.docs.length > 0,
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

export const newsEpic = combineEpics(fetchNewsEpic);
