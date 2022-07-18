import { AnyAction } from '@reduxjs/toolkit';
import { ofType, Epic, combineEpics } from 'redux-observable';
import { map, tap } from 'rxjs/operators';

import { changeThemeSuccess } from './actions';
import { AppActionTypes } from './types';

const changeThemeEpic: Epic<AnyAction, AnyAction> = (action$) =>
  action$.pipe(
    ofType(AppActionTypes.CHANGE_THEME),
    tap(({ payload }) => {
      localStorage.setItem('app:theme', payload);
    }),
    map(() => changeThemeSuccess())
  );

export const appEpic = combineEpics(changeThemeEpic);
