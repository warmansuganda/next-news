import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { grey } from '@mui/material/colors';
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
  paddingTop: '16px',
}));

export const CardActions = styled(Box)(() => ({
  paddingBottom: '8px',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
}));

export const CardSection = styled(Box)(() => ({
  color: grey[500],
  fontSize: '14px',
  display: 'flex',
  alignItems: 'center',
  overflow: 'hidden',
  flex: 1,
  '> *': {
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
  },
  '> :not(:last-child):after': {
    content: '"•"',
    fontSize: '10px',
    marginLeft: '8px',
    marginRight: '8px',
  },
}));

export const PurchaseButton = styled(Button)(() => ({
  borderRadius: '50px',
}));

PurchaseButton.defaultProps = {
  variant: 'outlined',
};
