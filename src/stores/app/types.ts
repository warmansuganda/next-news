import { ReactNode } from 'react';
import { ActionPayload } from '@stores/types';
import type { AlertColor } from '@mui/material/Alert';

export type ThemeType = 'light' | 'dark';

export interface AlertOptions {
  id?: string;
  createdAt?: Date;
  severity?: AlertColor;
  title?: string;
  message: ReactNode;
  duration?: number;
  autoDismiss?: boolean;
  closeable?: boolean;
  visible?: boolean;
}

export type AppState = {
  theme: ThemeType;
  loading: boolean;
  alerts: AlertOptions[];
};

export enum AppActionTypes {
  CHANGE_THEME = 'app/changeTheme',
  CHANGE_THEME_SUCCESS = 'app/changeThemeSuccess',
  LOADING_START = 'app/loadingStart',
  LOADING_END = 'app/loadingEnd',
  CREATE_ALERT = 'app/createAlert',
  REMOVE_ALERT = 'app/removeAlert',
  CLEAR_ALERT = 'app/clearAlert',
}

export type LoadingActions =
  | ActionPayload<AppActionTypes.LOADING_START, undefined>
  | ActionPayload<AppActionTypes.LOADING_END, undefined>;
