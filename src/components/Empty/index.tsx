import { ReactNode } from 'react';
import Box from '@mui/material/Box';

interface EmptyProps {
  icon?: ReactNode;
  message: string;
  children?: ReactNode | ReactNode[];
}

function Empty({ icon, message, children }: EmptyProps) {
  return (
    <Box
      sx={{
        flex: 1,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Box
        sx={{ alignItems: 'center', display: 'flex', flexDirection: 'column' }}
      >
        <Box>{icon}</Box>
        <Box
          sx={{
            margin: 'auto',
            maxWidth: '285px',
            textAlign: 'center',
            color: 'gray',
            fontSize: 14,
          }}
        >
          {message}
        </Box>
        {children}
      </Box>
    </Box>
  );
}

export default Empty;
