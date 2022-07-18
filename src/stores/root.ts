import { combineReducers } from 'redux';
import { combineEpics } from 'redux-observable';
import { appReducer, appEpic } from './app';
import { userReducer, userEpic } from './user';

export const rootEpic = combineEpics(appEpic, userEpic);

export const rootReducer = combineReducers({
  app: appReducer,
  user: userReducer,
});
