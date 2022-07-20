import { combineReducers } from 'redux';
import { combineEpics } from 'redux-observable';
import { appReducer, appEpic } from './app';
import { userReducer, userEpic } from './user';
import { newsReducer, newsEpic } from './news';

export const rootEpic = combineEpics(appEpic, userEpic, newsEpic);

export const rootReducer = combineReducers({
  app: appReducer,
  user: userReducer,
  news: newsReducer,
});
