import { ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import numeral from 'numeral';

import Paper from '@mui/material/Paper';
import Tooltip from '@mui/material/Tooltip';
import Button from '@mui/material/Button';

import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import Header from '@components/Header';

import { useAppSelector } from '@hooks/index';

interface DefaultLayoutProps {
  children: ReactNode | ReactNode[];
}

function DefaultLayout({ children }: DefaultLayoutProps) {
  const { t } = useTranslation();
  const { user } = useAppSelector((state) => state);

  return (
    <>
      <Header
        accessoryRight={
          <Tooltip title={t('Your balance')} arrow>
            <Button startIcon={<MonetizationOnIcon />}>
              {numeral(user.wallet.balance).format('0,0a')}
            </Button>
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
