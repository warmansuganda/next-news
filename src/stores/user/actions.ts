import { createAction } from '@reduxjs/toolkit';
import { QueryParams } from '@services/types';

import {
  UserActionTypes,
  Library,
  WalletTransaction,
  Wallet,
  AddLibrary,
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
