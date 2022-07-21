import React, { useMemo } from 'react';
import getConfig from 'next/config';
import numeral from 'numeral';
import { useTranslation } from 'react-i18next';

import Typography from '@mui/material/Typography';

import { News } from '@services/news/types';
import Image from '@components/Image';
import { dateAdapter, getPrice } from '@utils/index';

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

  const media = useMemo(() => {
    const image = data.multimedia.find(
      (item) => item.subtype === 'largeWidescreen573'
    );
    return image
      ? [config.CDN_URL, image.url].join('/')
      : '/static/default-image.png';
  }, [data.multimedia]);

  const dateDiff = useMemo(
    () => dateAdapter.datePublished(data.pub_date),
    [data.pub_date]
  );

  const price = useMemo(() => getPrice(data), [data]);

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
          <div>{data.news_desk}</div>
          <div>{dateDiff}</div>
        </CardSection>
        <PurchaseButton>
          {price ? numeral(price).format('$ 0,0') : t('FREE')} | {t('Purchase')}
        </PurchaseButton>
      </CardActions>
    </Card>
  );
}

export default Object.assign(NewsCard, {
  Placeholder: NewsCardPlaceHolder,
});
