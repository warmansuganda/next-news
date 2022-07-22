import { AnyAction } from '@reduxjs/toolkit';
import { ofType, Epic, combineEpics } from 'redux-observable';
import { map, tap, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { v4 as uuidv4 } from 'uuid';
import numeral from 'numeral';

import { createAlert } from '@stores/app';
import i18n from '@locales/i18n';

import { Coupon, Redeem, UserActionTypes } from './types';
import {
  editCoupon,
  updateCoupon,
  updateCouponSuccess,
  updateLibrary,
  updateLibrarySuccess,
  updateRedeem,
  updateRedeemSuccess,
  updateWallet,
  updateWalletSkip,
  updateWalletSuccess,
  walletTransaction,
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

const walletTransactionEpic: Epic<AnyAction, AnyAction> = (action$, state$) =>
  action$.pipe(
    ofType(UserActionTypes.WALLET_TRANSACTION),
    map(({ payload }) => {
      if (payload.amount > 0) {
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
        if (payload.type === 'income') {
          newBalance += payload.amount;
        } else {
          newBalance -= payload.amount;
        }
        return updateWallet({
          balance: newBalance,
          logs: newLog,
        });
      }

      return updateWalletSkip();
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

const addCouponEpic: Epic<AnyAction, AnyAction> = (action$, state$) =>
  action$.pipe(
    ofType(UserActionTypes.ADD_COUPON),
    map(({ payload }) => {
      const coupon = [...state$.value.user.coupon];

      coupon.push({
        id: uuidv4(),
        date: new Date(),
        note: payload,
        chance: 3,
      });
      return updateCoupon(coupon);
    })
  );

const editCouponEpic: Epic<AnyAction, AnyAction> = (action$, state$) =>
  action$.pipe(
    ofType(UserActionTypes.EDIT_COUPON),
    map(({ payload }) => {
      const coupon = [...state$.value.user.coupon];
      const index = coupon.findIndex((item: Coupon) => item.id === payload.id);

      if (index > -1) {
        const element = coupon[index];
        coupon[index] = {
          ...payload,
          chance: element.chance - 1,
        };

        return updateCoupon(coupon);
      }

      return updateCouponSuccess();
    })
  );

const updateCouponEpic: Epic<AnyAction, AnyAction> = (action$) =>
  action$.pipe(
    ofType(UserActionTypes.UPDATE_COUPON),
    tap(({ payload }) => {
      localStorage.setItem('app:coupon', JSON.stringify(payload));
    }),
    map(() => updateCouponSuccess())
  );

const addRedeemEpic: Epic<AnyAction, AnyAction> = (action$, state$) =>
  action$.pipe(
    ofType(UserActionTypes.ADD_REDEEM),
    switchMap(({ payload }) => {
      const redeem = [...state$.value.user.redeem];
      const coins = [0, 20000];

      // check rules
      const rules = redeem.findIndex((item: Redeem) => item.coin === 50000);
      if (rules === -1) {
        coins.push(50000);
      }

      // get random coin
      const prize = coins[Math.floor(Math.random() * coins.length)];

      // push redeem
      const id = uuidv4();
      redeem.push({
        id,
        date: new Date(),
        coupon: payload,
        coin: prize,
      });

      return of(
        updateRedeem(redeem),
        editCoupon(payload),
        prize > 0
          ? walletTransaction({
              type: 'income',
              amount: prize,
              note: i18n.t('Prize from redeem #{{id}}', { id }),
            })
          : updateWalletSkip(),
        prize > 0
          ? createAlert({
              severity: 'success',
              message: i18n.t('Congratulation, you have {{coin}} coin.', {
                coin: numeral(prize).format('0,0'),
              }),
            })
          : createAlert({
              severity: 'error',
              message: i18n.t("Opps, you're out of luck, let's try again!", {
                coin: prize,
              }),
            })
      );
    })
  );

const updateRedeemEpic: Epic<AnyAction, AnyAction> = (action$) =>
  action$.pipe(
    ofType(UserActionTypes.UPDATE_REDEEM),
    tap(({ payload }) => {
      localStorage.setItem('app:redeem', JSON.stringify(payload));
    }),
    map(() => updateRedeemSuccess())
  );

export const userEpic = combineEpics(
  addLibraryEpic,
  updateLibraryEpic,
  walletTransactionEpic,
  updateWalletSuccessEpic,
  addCouponEpic,
  editCouponEpic,
  updateCouponEpic,
  addRedeemEpic,
  updateRedeemEpic
);
