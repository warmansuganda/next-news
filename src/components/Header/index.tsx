import { ReactNode } from 'react';
import Typography from '@mui/material/Typography';

import { HeaderWrapper, HeaderAction, HeaderTitle } from './sytles';

interface HeaderProps {
  title?: string;
  accessoryLeft?: ReactNode;
  accessoryRight?: ReactNode;
}

function Header({ title, accessoryLeft, accessoryRight }: HeaderProps) {
  return (
    <HeaderWrapper disableGutters maxWidth="xs">
      {accessoryLeft && <HeaderAction>{accessoryLeft}</HeaderAction>}
      <HeaderTitle>
        <Typography variant="h6">{title}</Typography>
      </HeaderTitle>
      {accessoryRight && <HeaderAction>{accessoryRight}</HeaderAction>}
    </HeaderWrapper>
  );
}

export default Header;
