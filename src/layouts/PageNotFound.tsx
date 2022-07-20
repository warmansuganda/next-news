import Link from 'next/link';

import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import HomeIcon from '@mui/icons-material/Home';
import CloudOffIcon from '@mui/icons-material/CloudOff';

import Header from '@components/Header';

function DefaultLayout() {
  return (
    <>
      <Header
        accessoryRight={
          <Link href="/">
            <IconButton color="inherit">
              <HomeIcon />
            </IconButton>
          </Link>
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
