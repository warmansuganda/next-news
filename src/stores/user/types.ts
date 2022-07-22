import { News } from '@services/news/types';

export interface WalletLog {
  id: number;
  date: Date;
  type: 'debit' | 'crdit';
  amount: number;
  note: string;
  isRead: boolean;
}

export interface Library {
  id: number;
  price: number;
  date: Date;
  news: News;
}

export interface UserState {
  search: string;
  wallet: {
    balance: number;
    logs: WalletLog[];
  };
  library: Library[];
}

export enum UserActionTypes {
  SEARCH = 'user/search',
  UPDATE_LIBARY = 'user/updateLibrary',
  UPDATE_LIBARY_SUCCCESS = 'user/updateLibrarySuccess',
}
