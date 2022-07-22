import { AnyAction } from '@reduxjs/toolkit';
import { ofType, Epic, combineEpics } from 'redux-observable';
import { map, tap } from 'rxjs/operators';

import { UserActionTypes } from './types';
import { updateLibrarySuccess } from './actions';

const updateLibraryEpic: Epic<AnyAction, AnyAction> = (action$) =>
  action$.pipe(
    ofType(UserActionTypes.UPDATE_LIBARY),
    tap(({ payload }) => {
      localStorage.setItem('app:library', JSON.stringify(payload));
    }),
    map(() => updateLibrarySuccess())
  );

export const userEpic = combineEpics(updateLibraryEpic);
