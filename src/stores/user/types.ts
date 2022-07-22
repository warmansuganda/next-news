import { News } from '@services/news/types';

export interface WalletTransaction {
  type: 'expense' | 'income';
  amount: number;
  note: string;
}

export interface WalletLog extends WalletTransaction {
  id: string;
  date: Date;
  hasRead: boolean;
}

export interface Library {
  id: string;
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

export interface Coupon {
  id: string;
  date: Date;
  note: string;
  chance: number;
}

export interface Redeem {
  id: string;
  date: Date;
  coupon: Coupon;
  coin: number;
}

export interface UserState {
  search: string;
  wallet: Wallet;
  library: Library[];
  coupon: Coupon[];
  redeem: Redeem[];
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
  ADD_COUPON = 'user/addCoupon',
  EDIT_COUPON = 'user/editCoupon',
  SKIP_COUPON = 'user/skipCoupon',
  UPDATE_COUPON = 'user/updateCoupon',
  UPDATE_COUPON_SUCCCESS = 'user/updateCouponSuccess',
  ADD_REDEEM = 'user/addRedeem',
  UPDATE_REDEEM = 'user/updateRedeem',
  UPDATE_REDEEM_SUCCCESS = 'user/updateRedeemSuccess',
}
