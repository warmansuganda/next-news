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

export interface PurchaseNews {
  price: number;
  news: News;
}

export enum NewsActionTypes {
  FETCH = 'news/fetch',
  FETCH_MOSTPOPULAR = 'news/mostPopular',
  FETCH_LOADING = 'news/fetchLoading',
  FETCH_SUCCESS = 'news/fetchSuccess',
  FETCH_MORE = 'news/fetchMore',
  PURCHASE = 'news/purchase',
  RESET = 'news/reset',
}
