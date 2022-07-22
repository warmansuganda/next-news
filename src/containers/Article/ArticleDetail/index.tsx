import React, { useMemo, useCallback } from 'react';
import getConfig from 'next/config';
import { useTranslation } from 'react-i18next';
import type { NextPageContext } from 'next';
import numeral from 'numeral';

import Avatar from '@mui/material/Avatar';
import AvatarGroup from '@mui/material/AvatarGroup';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import ShareIcon from '@mui/icons-material/Share';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import Image from '@components/Image';

import { DefaultLayout, PageNotFound } from '@layouts/index';
import { News } from '@services/news/types';
import { findNews } from '@services/news';
import { dateAdapter, getPrice, base64Decode } from '@utils/index';
import { useAppSelector, useAppDispatch } from '@hooks/index';
import { purchaseNews } from '@stores/news';

import {
  ArticleMedia,
  ArticleTitle,
  ArticleContent,
  ArticleActions,
  ArticleSection,
  PurchaseButton,
  ArticleFooter,
  ArticleAuthor,
  ArticleWraper,
} from './styles';

const { publicRuntimeConfig: config } = getConfig();

interface ArticleDetailProps {
  data: News;
}

function ArticleDetail({ data }: ArticleDetailProps) {
  if (!data) return <PageNotFound />;

  const { t } = useTranslation();
  const { user } = useAppSelector((state) => state);
  const dispatch = useAppDispatch();

  const media = useMemo(() => {
    const image = data.multimedia.find(
      (item) => item.subtype === 'mediumThreeByTwo440'
    );

    if (image?.url) {
      return image.url.includes(config.CDN_URL)
        ? image.url
        : [config.CDN_URL, image.url].join('/');
    }

    return '/static/default-image.png';
  }, [data.multimedia]);

  const dateDiff = useMemo(
    () => dateAdapter.datePublished(data.pub_date),
    [data.pub_date]
  );

  const price = useMemo(() => getPrice(data), [data]);

  const hasNews = useMemo(() => {
    const index = user.library.findIndex((item) => item.news.uri === data.uri);
    return index > -1;
  }, [data, user.library]);

  const handlePurchase = useCallback(() => {
    dispatch(purchaseNews({ price, news: data }));
  }, [price, data]);

  return (
    <DefaultLayout>
      <ArticleMedia>
        <Image src={media} alt={data?.headline.main} />
      </ArticleMedia>
      <ArticleActions>
        <ArticleAuthor>
          <Stack direction="row">
            <AvatarGroup max={4}>
              {data.byline.person.map((_, index) => (
                <Avatar key={index} sx={{ width: 20, height: 20 }} />
              ))}
            </AvatarGroup>
          </Stack>
          <div>{data.byline.original}</div>
        </ArticleAuthor>
        <Stack spacing={1} direction="row">
          <IconButton>
            <ShareIcon />
          </IconButton>
          <a target="_blank" href={data.web_url} rel="noreferrer">
            <IconButton>
              <OpenInNewIcon />
            </IconButton>
          </a>
        </Stack>
      </ArticleActions>
      <ArticleTitle>
        <Typography gutterBottom variant="h6" component="div">
          {data.headline.main}
        </Typography>
      </ArticleTitle>
      <ArticleSection>
        <div>{data.section_name}</div>
        <div>{dateDiff}</div>
      </ArticleSection>
      <ArticleContent>
        <Typography gutterBottom variant="body1" component="div">
          {data.abstract}
        </Typography>
        <Typography gutterBottom variant="body1" component="div">
          {data.lead_paragraph}
        </Typography>
      </ArticleContent>
      {!hasNews && (
        <>
          <ArticleWraper maxWidth="xs" disableGutters />
          <ArticleFooter maxWidth="xs" disableGutters>
            <Paper
              sx={{
                flex: 1,
                padding: '16px',
              }}
              elevation={3}
            >
              <PurchaseButton size="large" fullWidth onClick={handlePurchase}>
                {price ? numeral(price).format('$ 0,0') : t('Free')} |{' '}
                {t('Purchase')}
              </PurchaseButton>
            </Paper>
          </ArticleFooter>
        </>
      )}
    </DefaultLayout>
  );
}

ArticleDetail.getInitialProps = async ({ query }: NextPageContext) => {
  let data = null;

  try {
    if (query.id) {
      const url = base64Decode(query.id as string);
      const result = await findNews(url);
      if (result.data.response.docs?.length) {
        const [news] = result.data.response.docs;
        data = news;
      }
    }
  } catch (error) {
    data = null;
  }

  return {
    data,
    hideFooter: true,
  };
};

export default ArticleDetail;
