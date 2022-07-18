import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit';
import { createWrapper } from 'next-redux-wrapper';
import { createEpicMiddleware } from 'redux-observable';
import createQueue from 'rxjs-queued';

import { rootEpic, rootReducer } from './root';

const epicMiddleware = createEpicMiddleware();

export const store = configureStore({
  reducer: rootReducer,
  middleware: [epicMiddleware],
  devTools: process.env.NODE_ENV !== 'production',
});

const makeStore = () => {
  epicMiddleware.run(rootEpic);
  return store;
};

export const wrapper = createWrapper(makeStore, {
  debug: process.env.NODE_ENV !== 'production',
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

export const queue = createQueue();
