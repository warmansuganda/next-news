import { ReactNode } from 'react';

import Paper from '@mui/material/Paper';
import Header from '@components/Header';

interface PlainLayoutProps {
  children: ReactNode | ReactNode[];
  accessoryRight?: ReactNode;
}

function PlainLayout({ children, accessoryRight }: PlainLayoutProps) {
  return (
    <>
      <Header accessoryRight={accessoryRight} />
      <Paper
        sx={{
          minHeight: '100vh',
          padding: '72px 16px',
          display: 'flex',
          flexDirection: 'column',
        }}
        elevation={0}
        square
      >
        {children}
      </Paper>
    </>
  );
}

export default PlainLayout;
