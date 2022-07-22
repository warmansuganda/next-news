import Box from '@mui/material/Box';
import Badge from '@mui/material/Badge';
import { grey } from '@mui/material/colors';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Link from '@mui/material/Link';

export const ProfileContact = styled(Box)(() => ({
  marginTop: 2,
  textAlign: 'center',
}));

export const ProfileCard = styled(Box)(() => ({
  margin: '0 -16px',
  padding: '16px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
}));

export const Content = styled(Box)(({ theme }) => ({
  flex: 1,
  background: theme.palette.mode === 'dark' ? 'none' : grey[100],
  margin: '0 -16px -16px -16px',
  padding: '16px 20px',
}));

export const SectionTitle = styled(Box)(() => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  marginBottom: 6,
}));

export const SectionCard = styled(Paper)(() => ({
  padding: '16px 0',
  display: 'flex',
  alignItems: 'center',
  marginBottom: 24,
  '> :not(:last-child)': {
    borderRight: `1px solid ${grey[200]}`,
  },
}));

export const ItemCard = styled(Box)(() => ({
  flex: 1,
  padding: '4px 16px',
  textAlign: 'center',
}));

export const ResetButton = styled(Button)(({ theme }) => ({
  borderRadius: '50px',
  background: theme.palette.mode === 'dark' ? 'none' : 'white',
}));

ResetButton.defaultProps = {
  variant: 'outlined',
};

export const CouponCard = styled(Paper)(() => ({
  padding: '16px',
  display: 'flex',
  alignItems: 'center',
  gap: 10,
  marginBottom: 24,
}));

export const CouponCaption = styled(Box)(() => ({
  flex: 1,
}));

export const LinkDetail = styled(Link)(() => ({
  display: 'flex',
  alignItems: 'center',
}));

LinkDetail.defaultProps = {
  underline: 'none',
};

export const StyledBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
    right: -18,
    top: 16,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: '0 4px',
  },
}));
