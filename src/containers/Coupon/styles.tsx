import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import List from '@mui/material/List';

import { styled } from '@mui/material/styles';

export const ToolBox = styled(Box)(({ theme }) => ({
  position: 'sticky',
  top: '72px',
  zIndex: 5,
  margin: '0 -16px',
  padding: '16px 16px 8px 16px',
  background: theme.palette.background.paper,
}));

export const SearchBox = styled(Box)(() => ({
  display: 'grid',
  gap: '8px',
  marginBottom: '16px',
}));

export const FilterBox = styled(Stack)(() => ({
  overflowX: 'auto',
  scrollbarWidth: 'none',
  msOverflowStyle: 'none',
  '::-webkit-scrollbar': {
    display: 'none',
  },
}));

export const ListWrapper = styled(List)(({ theme }) => ({
  flex: 1,
  margin: '0 -16px',
  display: 'flex',
  flexDirection: 'column',
  background: theme.palette.background.paper,
}));

export const ListItemText = styled(Box)(() => ({
  flex: 1,
  overflow: 'hidden',
}));
