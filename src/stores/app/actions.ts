import { createAction } from '@reduxjs/toolkit';
import { ThemeType, AppActionTypes, AlertOptions } from './types';

export const changeTheme = createAction<ThemeType>(AppActionTypes.CHANGE_THEME);

export const changeThemeSuccess = createAction(
  AppActionTypes.CHANGE_THEME_SUCCESS
);

export const loadingStart = createAction(AppActionTypes.LOADING_START);

export const loadingEnd = createAction(AppActionTypes.LOADING_END);

export const createAlert = createAction<AlertOptions>(
  AppActionTypes.CREATE_ALERT
);

export const removeAlert = createAction<string>(AppActionTypes.REMOVE_ALERT);
export const clearAlert = createAction(AppActionTypes.CLEAR_ALERT);

export const resetApp = createAction(AppActionTypes.RESET);
