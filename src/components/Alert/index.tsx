import { useEffect } from 'react';
import MuiAlert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import { useAppSelector, useAppDispatch } from '@hooks/index';
import dateAdapter from '@utils/dateAdapter';
import { removeAlert } from '@stores/app';

function Alert() {
  const { app } = useAppSelector((state) => state);
  const dispatch = useAppDispatch();

  const handleClose = (id?: string) => {
    if (id) dispatch(removeAlert(id));
  };

  useEffect(() => {
    const now = new Date();
    const timeouts = app.alerts.map((item) => {
      if (!item.autoDismiss) {
        return;
      }

      const timeToLife = dateAdapter.getDiff(
        now,
        item.createdAt || new Date(),
        'milliseconds'
      );

      const durationLeft = (item.duration || 0) - timeToLife;

      if (durationLeft < 0) {
        if (item.visible) {
          handleClose(item.id);
        }
        return;
      }
      // eslint-disable-next-line consistent-return
      return setTimeout(() => handleClose(item.id), durationLeft);
    });

    return () => {
      timeouts.forEach((timeout) => timeout && clearTimeout(timeout));
    };
  }, [app.alerts]);

  return (
    <>
      {app.alerts.map((item) => (
        <Snackbar
          key={item.id}
          open
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        >
          <MuiAlert
            onClose={() => handleClose(item.id)}
            severity={item.severity}
            sx={{ width: '100%' }}
          >
            {item.message}
          </MuiAlert>
        </Snackbar>
      ))}
    </>
  );
}

export default Alert;
