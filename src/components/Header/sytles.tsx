import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { styled } from '@mui/material/styles';

export const HeaderWrapper = styled(Container)(({ theme }) => ({
  position: 'fixed',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  zIndex: 10,
  top: 0,
  left: 0,
  right: 0,
  padding: '16px',
  height: '72px',
  background: theme.palette.background.paper,
}));

export const HeaderAction = styled(Box)(() => ({
  // width: '36px',
}));

export const HeaderTitle = styled(Box)(() => ({
  flex: 1,
}));
