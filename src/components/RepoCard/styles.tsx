import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';

export const Wrapper = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  color: theme.palette.text.secondary,
  display: 'flex',
  gap: '10px',
  minHeight: '76px',
}));

export const Avatar = styled(Box)(() => ({
  width: '60px',
  height: '60px',
  borderRadius: '4px',
  overflow: 'hidden',
  position: 'relative',
}));

export const Content = styled(Box)(() => ({
  flex: 1,
  overflow: 'hidden',
  display: 'grid',
  gridTemplateRows: '1fr auto',
}));

export const CounterWrapper = styled(Box)(() => ({
  fontSize: 11,
}));
