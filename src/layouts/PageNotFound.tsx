import Link from 'next/link';

import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Switch from '@mui/material/Switch';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import HomeIcon from '@mui/icons-material/Home';
import CloudOffIcon from '@mui/icons-material/CloudOff';

import Header from '@components/Header';

import { useAppSelector, useAppDispatch } from '@hooks/index';
import { changeTheme, ThemeType } from '@stores/app';

function DefaultLayout() {
  const { app } = useAppSelector((state) => state);
  const dispatch = useAppDispatch();

  const handleChangeTheme = (theme: ThemeType) => dispatch(changeTheme(theme));

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    handleChangeTheme(event.target.checked ? 'dark' : 'light');
  };

  return (
    <>
      <Header
        accessoryLeft={
          <Link href="/">
            <IconButton color="inherit">
              <HomeIcon />
            </IconButton>
          </Link>
        }
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
          justifyContent: 'center',
          alignItems: 'center',
        }}
        elevation={0}
        square
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
          <div>
            <CloudOffIcon sx={{ fontSize: '60px' }} />
          </div>
          <div>
            <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
              404
            </Typography>
            <Typography variant="h6">Page Not Found</Typography>
          </div>
        </Box>
      </Paper>
    </>
  );
}

export default DefaultLayout;
