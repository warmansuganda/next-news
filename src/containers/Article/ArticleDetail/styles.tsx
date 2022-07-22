import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import { grey } from '@mui/material/colors';
import { styled } from '@mui/material/styles';

export const ArticleMedia = styled(Box)(({ theme }) => ({
  margin: '0 -16px',
  position: 'relative',
  height: '260px',
  overflow: 'hidden',
  background: theme.palette.background.paper,
}));

export const ArticleTitle = styled(Box)(() => ({
  paddingTop: 0,
}));

export const ArticleContent = styled(Box)(() => ({
  paddingTop: '16px',
  overflow: 'hidden',
}));

export const ArticleActions = styled(Box)(() => ({
  padding: '16px 0',
  display: 'flex',
  gap: 6,
  justifyContent: 'space-between',
  alignItems: 'flex-start',
}));

export const ArticleAuthor = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'column',
  gap: 6,
  flex: 1,
  fontSize: 12,
}));

export const ArticleWraper = styled(Container)(({ theme }) => ({
  height: 'calc(50vh)',
  position: 'fixed',
  bottom: 0,
  left: 0,
  right: 0,
  background:
    theme.palette.mode === 'dark'
      ? 'linear-gradient(180deg, rgba(18,18,18,0) 0%, rgba(18,18,18,1) 30%, rgba(18,18,18,1) 100%)'
      : 'linear-gradient(180deg, rgba(255,255,255,0) 0%, rgba(255,255,255,1) 30%, rgba(255,255,255,1) 100%)',
}));

export const ArticleFooter = styled(Container)(() => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  position: 'fixed',
  bottom: 0,
  left: 0,
  right: 0,
  gap: 6,
}));

export const ArticleSection = styled(Box)(() => ({
  color: grey[500],
  fontSize: '14px',
  display: 'flex',
  alignItems: 'center',
  overflow: 'hidden',
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
