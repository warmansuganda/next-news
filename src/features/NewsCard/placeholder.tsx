import Typography from '@mui/material/Typography';
import Skeleton from '@mui/material/Skeleton';
import Box from '@mui/material/Box';

import { Card, CardMedia, CardContent, CardActions } from './styles';

export default function NewsCardPlaceHolder() {
  return (
    <Card>
      <CardMedia>
        <Skeleton
          animation="wave"
          variant="rectangular"
          width="100%"
          height={500}
        />
      </CardMedia>
      <CardContent>
        <Typography gutterBottom variant="h6" component="div">
          <Skeleton animation="wave" width="100%" />
        </Typography>
      </CardContent>
      <CardActions>
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Skeleton animation="wave" width={100} />
          <Skeleton animation="wave" width={100} />
        </Box>
        <Skeleton
          animation="wave"
          variant="rectangular"
          width={100}
          height={36.5}
          sx={{ borderRadius: 50 }}
        />
      </CardActions>
    </Card>
  );
}
