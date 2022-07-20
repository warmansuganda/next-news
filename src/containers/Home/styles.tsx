import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import { grey } from '@mui/material/colors';

import { styled } from '@mui/material/styles';

export const SearchBox = styled(Box)(({ theme }) => ({
  position: 'sticky',
  top: '72px',
  zIndex: 5,
  margin: '0 -16px',
  padding: '16px',
  background: theme.palette.background.paper,
  display: 'grid',
  gap: '8px',
  gridTemplateColumns: '1fr 45px',
}));

export const ListWrapper = styled(Stack)(() => ({
  margin: '0 -16px',
  '> :not(:last-child) ': {
    borderBottom: `1px solid ${grey[200]}`,
  },
}));
