import { createReducer } from '@reduxjs/toolkit';
import {
  changeTheme,
  loadingStart,
  loadingEnd,
  createAlert,
  removeAlert,
  clearAlert,
} from './actions';

import { AppState } from './types';

const initialState: AppState = {
  theme: 'light',
  loading: false,
  alerts: [],
};

export const appReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(changeTheme, (state, action) => ({
      ...state,
      theme: action.payload,
    }))
    .addCase(loadingStart, (state) => ({
      ...state,
      loading: true,
    }))
    .addCase(loadingEnd, (state) => ({
      ...state,
      loading: false,
    }))
    .addCase(createAlert, (state, action) => {
      const alert = {
        id: `alert-${Math.floor(Math.random() * 101 + 1)}`,
        createdAt: new Date(),
        duration: 4000,
        autoDismiss: true,
        closeable: false,
        ...action.payload,
      };

      return {
        ...state,
        alerts: [...state.alerts, alert],
      };
    })
    .addCase(removeAlert, (state, action) => {
      const index = state.alerts.findIndex(
        (item) => item.id === action.payload
      );

      if (index > -1) {
        state.alerts.splice(index, 1);
      }

      return state;
    })
    .addCase(clearAlert, (state) => ({
      ...state,
      alerts: [],
    }));
});
