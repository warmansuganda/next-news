import { createAction } from '@reduxjs/toolkit';
import { QueryParams } from '@services/types';

import { NewsActionTypes, NewsDataState } from './types';

export const fetchNews = createAction<QueryParams>(NewsActionTypes.FETCH);

export const fetchNewsSucess = createAction<NewsDataState>(
  NewsActionTypes.FETCH_SUCCESS
);
