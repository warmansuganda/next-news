import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';

export const SearchBox = styled(Box)(({ theme }) => ({
  position: 'sticky',
  top: '72px',
  zIndex: 5,
  margin: '0 -16px',
  padding: '16px 16px 0 16px',
  background: theme.palette.background.paper,
}));
