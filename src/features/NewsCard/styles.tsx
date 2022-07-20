import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';

export const Card = styled(Box)(({ theme }) => ({
  padding: '0 16px',
  background: theme.palette.background.paper,
}));

export const CardMedia = styled(Box)(({ theme }) => ({
  borderRadius: '16px',
  position: 'relative',
  height: '240px',
  overflow: 'hidden',
  background: theme.palette.background.paper,
}));

export const CardContent = styled(Box)(() => ({
  padding: '16px 8px 0 8px',
}));
