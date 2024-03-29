import { useMemo, useEffect } from 'react';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { useRouter } from 'next/router';

import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import { CacheProvider, EmotionCache } from '@emotion/react';

import { wrapper } from '@stores/index';
import { changeTheme, ThemeType, loadingStart, loadingEnd } from '@stores/app';
import {
  Coupon,
  Library,
  Redeem,
  updateCoupon,
  updateLibrary,
  updateRedeem,
  updateWallet,
  Wallet,
} from '@stores/user';

import { useAppSelector, useAppDispatch } from '@hooks/index';

import Footer from '@components/Footer';
import Loader from '@components/Loader';
import Alert from '@components/Alert';

import { getDesignTokens } from '@styles/theme';
import createEmotionCache from '@styles/createEmotionCache';

import 'locales/i18n';

const clientSideEmotionCache = createEmotionCache();

interface MyAppProps extends AppProps {
  emotionCache: EmotionCache;
}

function MyApp({
  Component,
  pageProps,
  emotionCache = clientSideEmotionCache,
}: MyAppProps) {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const { app } = useAppSelector((state) => state);
  const theme = useMemo(
    () => createTheme(getDesignTokens(app.theme)),
    [app.theme]
  );

  useEffect(() => {
    const handleStart = () => {
      dispatch(loadingStart());
    };

    const handleComplete = () => {
      setTimeout(() => {
        dispatch(loadingEnd());
      }, 500);
    };

    router.events.on('routeChangeStart', handleStart);
    router.events.on('routeChangeComplete', handleComplete);
    router.events.on('routeChangeError', handleComplete);

    return () => {
      router.events.off('routeChangeStart', handleStart);
      router.events.off('routeChangeComplete', handleComplete);
      router.events.off('routeChangeError', handleComplete);
    };
  });

  useEffect(() => {
    const defaultTheme = localStorage.getItem('app:theme');
    const defaultLibrary = localStorage.getItem('app:library');
    const defaultWallet = localStorage.getItem('app:wallet');
    const defaultCoupon = localStorage.getItem('app:coupon');
    const defaultRedeem = localStorage.getItem('app:redeem');

    dispatch(changeTheme((defaultTheme || 'light') as ThemeType));

    if (defaultLibrary) {
      dispatch(updateLibrary(JSON.parse(defaultLibrary) as Library[]));
    }

    if (defaultWallet) {
      dispatch(updateWallet(JSON.parse(defaultWallet) as Wallet));
    }

    if (defaultCoupon) {
      dispatch(updateCoupon(JSON.parse(defaultCoupon) as Coupon[]));
    }

    if (defaultRedeem) {
      dispatch(updateRedeem(JSON.parse(defaultRedeem) as Redeem[]));
    }
  }, []);

  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
        <title>Next News</title>
      </Head>
      <ThemeProvider theme={theme}>
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <CssBaseline />
        <Container disableGutters maxWidth="xs">
          {app.loading && <Loader />}
          <Component {...pageProps} />
          {!pageProps.hideFooter && <Footer />}
        </Container>
        <Alert />
      </ThemeProvider>
    </CacheProvider>
  );
}

export default wrapper.withRedux(MyApp);
