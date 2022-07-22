import { ChangeEvent, useMemo, useState } from 'react';
import PlainLayout from '@layouts/PlainLayout';
import { useTranslation } from 'react-i18next';
import numeral from 'numeral';
import Link from 'next/link';

import Switch from '@mui/material/Switch';
import Tooltip from '@mui/material/Tooltip';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Dialog from '@mui/material/Dialog';
import Button from '@mui/material/Button';

import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
import CloudUpload from '@mui/icons-material/CloudUpload';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import VerifiedIcon from '@mui/icons-material/Verified';

import { useAppSelector, useAppDispatch } from '@hooks/index';
import { changeTheme, ThemeType } from '@stores/app';
import { WALLET, LIBRARY, COUPON } from '@constants/path';

import {
  ProfileCard,
  ProfileContact,
  SectionTitle,
  Content,
  SectionCard,
  ItemCard,
  ResetButton,
  CouponCard,
  CouponCaption,
  LinkDetail,
} from './styles';

function Account() {
  const { t } = useTranslation();
  const { app, user } = useAppSelector((state) => state);
  const dispatch = useAppDispatch();
  const [open, setOpen] = useState(false);

  const handleClickOpenDialog = () => {
    setOpen(true);
  };

  const handleCloseDialog = () => {
    setOpen(false);
  };

  const handleClearData = () => {
    setOpen(false);
  };

  const handleChangeTheme = (theme: ThemeType) => dispatch(changeTheme(theme));

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    handleChangeTheme(event.target.checked ? 'dark' : 'light');
  };

  const wallet = useMemo(() => {
    let income = 0;
    let expense = 0;

    for (let index = 0; index < user.wallet.logs.length; index += 1) {
      const element = user.wallet.logs[index];
      if (element.type === 'expense') {
        expense += element.amount;
      } else {
        income += element.amount;
      }
    }

    return {
      balance: user.wallet.balance,
      income,
      expense,
    };
  }, [user.wallet]);

  const subscription = useMemo(() => {
    let premium = 0;
    let free = 0;

    for (let index = 0; index < user.library.length; index += 1) {
      const element = user.library[index];
      if (element.price > 0) {
        premium += 1;
      } else {
        free += 1;
      }
    }

    return {
      library: user.library.length,
      premium,
      free,
    };
  }, [user.wallet]);

  return (
    <PlainLayout
      accessoryRight={
        <Tooltip title="Toggle dark mode" arrow>
          <Switch
            checked={app.theme === 'dark'}
            onChange={handleChange}
            inputProps={{ 'aria-label': 'controlled' }}
          />
        </Tooltip>
      }
    >
      <ProfileCard>
        <Avatar sx={{ width: 160, height: 160 }} />
        <ProfileContact>
          <Typography variant="h6">Warman Suganda</Typography>
          <div>warman.suganda@gmail.com</div>
        </ProfileContact>
      </ProfileCard>
      <Content>
        <SectionTitle>
          <Typography variant="h6">{t('Wallet')}</Typography>
          <Link href={WALLET} passHref>
            <LinkDetail>
              {t('View Transaction')} <ChevronRightIcon />
            </LinkDetail>
          </Link>
        </SectionTitle>
        <SectionCard>
          <ItemCard>
            <div>
              <MonetizationOnIcon color="primary" />
            </div>
            <Typography variant="h6">
              {numeral(wallet.balance).format('$ 0,0a')}
            </Typography>
            <Typography variant="body2" color="GrayText">
              {t('Balance')}
            </Typography>
          </ItemCard>
          <ItemCard>
            <div>
              <CloudDownloadIcon color="primary" />
            </div>
            <Typography variant="h6">
              {numeral(wallet.income).format('0,0a')}
            </Typography>
            <Typography variant="body2" color="GrayText">
              {t('Income')}
            </Typography>
          </ItemCard>
          <ItemCard>
            <div>
              <CloudUpload color="primary" />
            </div>
            <Typography variant="h6">
              {numeral(wallet.expense).format('0,0a')}
            </Typography>
            <Typography variant="body2" color="GrayText">
              {t('Expense')}
            </Typography>
          </ItemCard>
        </SectionCard>

        <SectionTitle>
          <Typography variant="h6">{t('Subscription')}</Typography>
          <Link href={LIBRARY} passHref>
            <LinkDetail>
              {t('View Library')} <ChevronRightIcon />
            </LinkDetail>
          </Link>
        </SectionTitle>
        <SectionCard>
          <ItemCard>
            <Typography variant="h6">
              {numeral(subscription.library).format('0,0a')}
            </Typography>
            <Typography variant="body2" color="GrayText">
              {t('Library')}
            </Typography>
          </ItemCard>
          <ItemCard>
            <Typography variant="h6">
              {numeral(subscription.premium).format('0,0a')}
            </Typography>
            <Typography variant="body2" color="GrayText">
              {t('Premium')}
            </Typography>
          </ItemCard>
          <ItemCard>
            <Typography variant="h6">
              {numeral(subscription.free).format('0,0a')}
            </Typography>
            <Typography variant="body2" color="GrayText">
              {t('Free')}
            </Typography>
          </ItemCard>
        </SectionCard>

        <CouponCard>
          <VerifiedIcon color="success" sx={{ fontSize: 35 }} />
          <CouponCaption>
            <Typography variant="h6">{t('Coupon')}</Typography>
            <Typography variant="body2" color="GrayText">
              {t('Redeem your coupon, and get the prize')}
            </Typography>
          </CouponCaption>
          <Link href={COUPON}>
            <IconButton>
              <ChevronRightIcon />
            </IconButton>
          </Link>
        </CouponCard>

        <ResetButton
          size="large"
          color="error"
          fullWidth
          onClick={handleClickOpenDialog}
        >
          {t('Clear All Data')}
        </ResetButton>

        <Dialog
          open={open}
          onClose={handleCloseDialog}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {t('Delete app data?')}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              {t(
                'All data on this apps will be deleted permanently. This includes Library, Wallet, Setting, etc.'
              )}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog}>{t('Cancel')}</Button>
            <Button onClick={handleClearData} autoFocus color="error">
              Yes, Delete
            </Button>
          </DialogActions>
        </Dialog>
      </Content>
    </PlainLayout>
  );
}

export default Account;
