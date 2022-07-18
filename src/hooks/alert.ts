import { ReactNode } from 'react';
import {
  AlertOptions,
  createAlert,
  removeAlert,
  clearAlert,
} from '@stores/app';
import type { AlertColor } from '@mui/material/Alert';
import { useAppDispatch } from '@hooks/index';

export const useAlert = () => {
  const dispatch = useAppDispatch();

  const show = (
    severity: AlertColor,
    title?: string,
    message?: ReactNode,
    options?: AlertOptions
  ) => {
    dispatch(
      createAlert({
        severity,
        title,
        message,
        ...options,
      })
    );
  };

  const remove = (id: string) => dispatch(removeAlert(id));
  const clear = () => dispatch(clearAlert());

  return { show, clear, remove };
};
