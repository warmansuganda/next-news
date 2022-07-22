import { News } from '@services/news/types';

export interface WalletTransaction {
  type: 'expense' | 'income';
  amount: number;
  note: string;
}

export interface WalletLog extends WalletTransaction {
  id: number;
  date: Date;
  isRead: boolean;
}

export interface Library {
  id: number;
  price: number;
  date: Date;
  news: News;
}

export interface AddLibrary {
  price: number;
  news: News;
}

export interface Wallet {
  balance: number;
  logs: WalletLog[];
}

export interface UserState {
  search: string;
  wallet: Wallet;
  library: Library[];
}

export enum UserActionTypes {
  SEARCH = 'user/search',
  ADD_LIBARY = 'user/addLibrary',
  UPDATE_LIBARY = 'user/updateLibrary',
  UPDATE_LIBARY_SUCCCESS = 'user/updateLibrarySuccess',
  WALLET_TRANSACTION = 'user/walletTransaction',
  UPDATE_WALLET = 'user/updateWallet',
  UPDATE_WALLET_SUCCESS = 'user/updateWalletSuccess',
  UPDATE_WALLET_SKIP = 'user/updateWalletSkip',
}
