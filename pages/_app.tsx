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
import { initLikeUser } from '@stores/user';

import { useAppSelector, useAppDispatch } from '@hooks/index';

import Footer from '@components/Footer';
import Loader from '@components/Loader';
import Alert from '@components/Alert';

import { getDesignTokens } from '@styles/theme';
import createEmotionCache from '@styles/createEmotionCache';

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
    const defaultLiked = localStorage.getItem('app:liked');

    dispatch(changeTheme((defaultTheme || 'light') as ThemeType));
    dispatch(initLikeUser(defaultLiked ? JSON.parse(defaultLiked) : []));
  }, []);

  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
        <title>GitHub Search Console</title>
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
