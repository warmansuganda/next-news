import { createAction } from '@reduxjs/toolkit';
import { QueryParams } from '@services/types';

import {
  UserActionTypes,
  Library,
  WalletTransaction,
  Wallet,
  AddLibrary,
  Coupon,
  Redeem,
} from './types';

export const searchUser = createAction<QueryParams>(UserActionTypes.SEARCH);

export const addLibrary = createAction<AddLibrary>(UserActionTypes.ADD_LIBARY);

export const updateLibrary = createAction<Library[]>(
  UserActionTypes.UPDATE_LIBARY
);

export const updateLibrarySuccess = createAction(
  UserActionTypes.UPDATE_LIBARY_SUCCCESS
);

export const walletTransaction = createAction<WalletTransaction>(
  UserActionTypes.WALLET_TRANSACTION
);

export const updateWallet = createAction<Wallet>(UserActionTypes.UPDATE_WALLET);

export const updateWalletSuccess = createAction(
  UserActionTypes.UPDATE_WALLET_SUCCESS
);

export const updateWalletSkip = createAction(
  UserActionTypes.UPDATE_WALLET_SKIP
);

export const addCoupon = createAction<string>(UserActionTypes.ADD_COUPON);

export const editCoupon = createAction<Coupon>(UserActionTypes.EDIT_COUPON);

export const updateCoupon = createAction<Coupon[]>(
  UserActionTypes.UPDATE_COUPON
);

export const updateCouponSuccess = createAction(
  UserActionTypes.UPDATE_COUPON_SUCCCESS
);

export const skipCoupon = createAction(UserActionTypes.SKIP_COUPON);

export const addRedeem = createAction<Coupon>(UserActionTypes.ADD_REDEEM);

export const updateRedeem = createAction<Redeem[]>(
  UserActionTypes.UPDATE_REDEEM
);

export const updateRedeemSuccess = createAction(
  UserActionTypes.UPDATE_REDEEM_SUCCCESS
);

export const resetUser = createAction(UserActionTypes.RESET);
