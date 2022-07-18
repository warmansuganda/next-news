import { PaletteMode } from '@mui/material';
import { blue, grey } from '@mui/material/colors';

export const getDesignTokens = (mode: PaletteMode) => ({
  maxWidth: 11,
  palette: {
    mode,
    ...(mode === 'dark'
      ? {
          // palette values for dark mode
          primary: grey,
          divider: grey[700],
          background: {
            default: grey[900],
          },
          text: {
            primary: '#fff',
            secondary: grey[500],
          },
        }
      : {
          // palette values for light mode
          primary: blue,
          divider: blue[200],
          background: {
            default: grey[200],
          },
          text: {
            primary: grey[900],
            secondary: grey[800],
          },
        }),
  },
});
