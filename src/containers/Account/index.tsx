import { ChangeEvent } from 'react';
import DefaultLayout from '@layouts/DefaultLayout';
// import { useTranslation } from 'react-i18next';

import Switch from '@mui/material/Switch';
import Tooltip from '@mui/material/Tooltip';

import { useAppSelector, useAppDispatch } from '@hooks/index';
import { changeTheme, ThemeType } from '@stores/app';

function Account() {
  // const { t } = useTranslation();
  const { app } = useAppSelector((state) => state);
  const dispatch = useAppDispatch();

  const handleChangeTheme = (theme: ThemeType) => dispatch(changeTheme(theme));

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    handleChangeTheme(event.target.checked ? 'dark' : 'light');
  };

  return (
    <DefaultLayout>
      <Tooltip title="Toggle dark mode" arrow>
        <Switch
          checked={app.theme === 'dark'}
          onChange={handleChange}
          inputProps={{ 'aria-label': 'controlled' }}
        />
      </Tooltip>
    </DefaultLayout>
  );
}

export default Account;
