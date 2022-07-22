import { AnyAction } from '@reduxjs/toolkit';
import { ofType, Epic, combineEpics } from 'redux-observable';
import { map, tap } from 'rxjs/operators';
import { v4 as uuidv4 } from 'uuid';

import { UserActionTypes } from './types';
import {
  updateLibrary,
  updateLibrarySuccess,
  updateWallet,
  updateWalletSuccess,
} from './actions';

const addLibraryEpic: Epic<AnyAction, AnyAction> = (action$, state$) =>
  action$.pipe(
    ofType(UserActionTypes.ADD_LIBARY),
    map(({ payload }) => {
      const library = [...state$.value.user.library];

      library.push({
        id: uuidv4(),
        date: new Date(),
        ...payload,
      });
      return updateLibrary(library);
    })
  );

const updateLibraryEpic: Epic<AnyAction, AnyAction> = (action$) =>
  action$.pipe(
    ofType(UserActionTypes.UPDATE_LIBARY),
    tap(({ payload }) => {
      localStorage.setItem('app:library', JSON.stringify(payload));
    }),
    map(() => updateLibrarySuccess())
  );

const updateWalletEpic: Epic<AnyAction, AnyAction> = (action$, state$) =>
  action$.pipe(
    ofType(UserActionTypes.WALLET_TRANSACTION),
    map(({ payload }) => {
      const { balance, logs } = state$.value.user.wallet;

      // push logs
      const newLog = [...logs];
      newLog.push({
        id: uuidv4(),
        date: new Date(),
        isRead: false,
        ...payload,
      });

      // upddate balance
      let newBalance = balance;
      if (payload.type === 'credit') {
        newBalance += payload.amount;
      } else {
        newBalance -= payload.amount;
      }
      return updateWallet({
        balance: newBalance,
        logs: newLog,
      });
    })
  );

const updateWalletSuccessEpic: Epic<AnyAction, AnyAction> = (action$) =>
  action$.pipe(
    ofType(UserActionTypes.UPDATE_WALLET),
    tap(({ payload }) => {
      localStorage.setItem('app:wallet', JSON.stringify(payload));
    }),
    map(() => updateWalletSuccess())
  );

export const userEpic = combineEpics(
  addLibraryEpic,
  updateLibraryEpic,
  updateWalletEpic,
  updateWalletSuccessEpic
);
