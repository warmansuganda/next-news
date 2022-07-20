import { combineEpics } from 'redux-observable';
// import { ofType, Epic, combineEpics } from 'redux-observable';
// import { from, of } from 'rxjs';
// import { map, switchMap, startWith, endWith, catchError } from 'rxjs/operators';

// import { AnyAction } from '@reduxjs/toolkit';
// import { fetchUsers } from '@services/users';
// import { ErrorResponse } from '@services/types';

// import { loadingStart, loadingEnd, createAlert } from '@stores/app';

// import { UserActionTypes } from './types';
// import { searchUserSucess } from './actions';

export const userEpic = combineEpics();
