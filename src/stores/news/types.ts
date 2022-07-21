import { News } from '@services/news/types';

export interface NewsDataState {
  loading?: boolean;
  items: News[];
  nextPage: boolean;
}

export interface NewsState {
  search: string;
  data: NewsDataState;
}

export enum NewsActionTypes {
  FETCH = 'news/fetch',
  FETCH_MOSTPOPULAR = 'news/mostPopular',
  FETCH_LOADING = 'news/fetchLoading',
  FETCH_SUCCESS = 'news/fetchSuccess',
  FETCH_MORE = 'news/fetchMore',
}
