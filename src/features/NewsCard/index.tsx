import React, { useMemo, useCallback, MouseEvent } from 'react';
import getConfig from 'next/config';
import numeral from 'numeral';
import { useTranslation } from 'react-i18next';

import Typography from '@mui/material/Typography';

import { News } from '@services/news/types';
import Image from '@components/Image';
import { dateAdapter, getPrice } from '@utils/index';
import { useAppSelector, useAppDispatch } from '@hooks/index';
import { purchaseNews } from '@stores/news';

import {
  Card,
  CardMedia,
  CardContent,
  CardActions,
  CardSection,
  PurchaseButton,
} from './styles';
import NewsCardPlaceHolder from './placeholder';

const { publicRuntimeConfig: config } = getConfig();

interface NewsCardProps {
  data: News;
}

function NewsCard({ data }: NewsCardProps) {
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

  const handlePurchase = useCallback(
    (event: MouseEvent<HTMLButtonElement>) => {
      event.preventDefault();
      dispatch(purchaseNews({ price, news: data }));
    },
    [price, data]
  );

  return (
    <Card>
      <CardMedia>
        <Image src={media} alt={data?.headline.main} />
      </CardMedia>
      <CardContent>
        <Typography gutterBottom variant="h6" component="div">
          {data.headline.main}
        </Typography>
      </CardContent>
      <CardActions>
        <CardSection>
          <div>{data.section_name}</div>
          <div>{dateDiff}</div>
        </CardSection>
        {!hasNews && (
          <PurchaseButton onClick={handlePurchase}>
            {price ? numeral(price).format('$ 0,0') : t('Free')} |{' '}
            {t('Purchase')}
          </PurchaseButton>
        )}
      </CardActions>
    </Card>
  );
}

export default Object.assign(NewsCard, {
  Placeholder: NewsCardPlaceHolder,
});
