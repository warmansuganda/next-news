import { createAction } from '@reduxjs/toolkit';
import { QueryParams } from '@services/types';

import { NewsActionTypes, NewsDataState } from './types';

export const fetchNews = createAction<QueryParams>(NewsActionTypes.FETCH);

export const fetchMostPopularNews = createAction<QueryParams>(
  NewsActionTypes.FETCH_MOSTPOPULAR
);

export const fetchNewsLoading = createAction<boolean>(
  NewsActionTypes.FETCH_LOADING
);

export const fetchNewsSucess = createAction<NewsDataState>(
  NewsActionTypes.FETCH_SUCCESS
);

export const fetchMoreNews = createAction<QueryParams>(
  NewsActionTypes.FETCH_MORE
);
