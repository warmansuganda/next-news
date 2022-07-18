import { ReactNode } from 'react';
import Paper from '@mui/material/Paper';
import Switch from '@mui/material/Switch';
import Tooltip from '@mui/material/Tooltip';

import Header from '@components/Header';

import { useAppSelector, useAppDispatch } from '@hooks/index';
import { changeTheme, ThemeType } from '@stores/app';

interface DefaultLayoutProps {
  children: ReactNode | ReactNode[];
  title?: string;
  accessoryLeft?: ReactNode;
}

function DefaultLayout({ children, title, accessoryLeft }: DefaultLayoutProps) {
  const { app } = useAppSelector((state) => state);
  const dispatch = useAppDispatch();

  const handleChangeTheme = (theme: ThemeType) => dispatch(changeTheme(theme));

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    handleChangeTheme(event.target.checked ? 'dark' : 'light');
  };

  return (
    <>
      <Header
        title={title}
        accessoryLeft={accessoryLeft}
        accessoryRight={
          <Tooltip title="Toggle dark mode" arrow>
            <Switch
              checked={app.theme === 'dark'}
              onChange={handleChange}
              inputProps={{ 'aria-label': 'controlled' }}
            />
          </Tooltip>
        }
      />
      <Paper
        sx={{
          minHeight: '100vh',
          padding: '72px 16px',
          display: 'flex',
          flexDirection: 'column',
        }}
        elevation={0}
        square
      >
        {children}
      </Paper>
    </>
  );
}

export default DefaultLayout;
