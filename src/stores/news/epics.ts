import { ofType, Epic, combineEpics } from 'redux-observable';
import { from, of } from 'rxjs';
import { map, switchMap, startWith, catchError } from 'rxjs/operators';

import { AnyAction } from '@reduxjs/toolkit';
import { fetchNews, fetchMostPopularNews } from '@services/news';
import { MostPopularNews } from '@services/news/types';
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

const fetchMostPopularNewsEpic: Epic<AnyAction, AnyAction> = (action$) =>
  action$.pipe(
    ofType(NewsActionTypes.FETCH_MOSTPOPULAR),
    switchMap((action) =>
      from(
        fetchMostPopularNews(action.payload.filter, action.payload.period)
      ).pipe(
        map(({ data }) => {
          const items = data.results
            .filter((item: MostPopularNews) => {
              const { query } = action.payload;
              if (query) {
                return (
                  item.title.toLowerCase().includes(query.toLowerCase()) ||
                  item.abstract.toLowerCase().includes(query.toLowerCase())
                );
              }

              return true;
            })
            .map((item: MostPopularNews) => ({
              uri: item.uri,
              pub_date: item.published_date,
              headline: {
                main: item.title,
              },
              section_name: item.section,
              byline: {
                original: item.byline,
              },
              multimedia: item.media.length
                ? item.media[0]['media-metadata'].map((media) => ({
                    subtype: media.format,
                    url: media.url,
                  }))
                : [],
            }));

          return fetchNewsSucess({
            loading: false,
            items,
            nextPage: false,
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

export const newsEpic = combineEpics(
  fetchNewsEpic,
  fetchMoreNewsEpic,
  fetchMostPopularNewsEpic
);
