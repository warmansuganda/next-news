import { ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import numeral from 'numeral';
import Link from 'next/link';

import Paper from '@mui/material/Paper';
import Tooltip from '@mui/material/Tooltip';
import Button from '@mui/material/Button';

import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import Header from '@components/Header';

import { useAppSelector } from '@hooks/index';
import { WALLET } from '@constants/path';

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
            <Link href={WALLET}>
              <Button startIcon={<MonetizationOnIcon />}>
                {numeral(user.wallet.balance).format('0,0a')}
              </Button>
            </Link>
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
