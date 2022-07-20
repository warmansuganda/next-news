import React, { useMemo } from 'react';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import getConfig from 'next/config';

import { News } from '@services/news/types';
import Image from '@components/Image';

import { Card, CardMedia, CardContent } from './styles';

const { publicRuntimeConfig: config } = getConfig();

interface NewsCardProps {
  data: News;
}

export default function NewsCard({ data }: NewsCardProps) {
  const media = useMemo(() => {
    const image = data?.multimedia.find(
      (item) => item.subtype === 'largeWidescreen573'
    );
    return image
      ? [config.CDN_URL, image.url].join('/')
      : '/static/default-image.png';
  }, [data?.multimedia]);

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
        <Button size="small">Share</Button>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>
  );
}
