import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import { grey } from '@mui/material/colors';

import { styled } from '@mui/material/styles';

export const ToolBox = styled(Box)(({ theme }) => ({
  position: 'sticky',
  top: '72px',
  zIndex: 5,
  margin: '0 -16px',
  padding: '16px',
  background: theme.palette.background.paper,
}));

export const SearchBox = styled(Box)(() => ({
  display: 'grid',
  gap: '8px',
}));

export const ListWrapper = styled(Stack)(() => ({
  flex: 1,
  margin: '0 -16px',
  '> :not(:last-child) ': {
    borderBottom: `1px solid ${grey[200]}`,
  },
}));
