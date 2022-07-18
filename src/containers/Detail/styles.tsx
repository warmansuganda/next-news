import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';

export const Avatar = styled(Box)(() => ({
  width: '160px',
  height: '160px',
  borderRadius: '100%',
  overflow: 'hidden',
  position: 'relative',
}));

export const ProfileCard = styled(Box)(() => ({
  margin: '0 -16px',
  padding: '16px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
}));

export const TabWrapper = styled(Box)(() => ({
  typography: 'body1',
  margin: '0 -16px',
}));

export const TabHeader = styled(Box)(({ theme }) => ({
  position: 'sticky',
  top: '72px',
  zIndex: 10,
  background: theme.palette.background.paper,
}));

export const CompanyWrapper = styled(Box)(() => ({
  display: 'inline-flex',
  fontSize: 14,
  marginTop: '4px',
  gap: '4px',
}));
