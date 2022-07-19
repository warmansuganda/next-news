import { useEffect, useState, SyntheticEvent, createElement } from 'react';
import Paper from '@mui/material/Paper';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import NewspaperIcon from '@mui/icons-material/Newspaper';
import LocalLibraryIcon from '@mui/icons-material/LocalLibrary';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { styled } from '@mui/material/styles';
import Container from '@mui/material/Container';
import { useRouter } from 'next/router';

const NavigationAction = styled(BottomNavigationAction)(() => ({
  maxWidth: 'none',
}));

const menus = [
  {
    name: 'News',
    url: '/',
    icon: NewspaperIcon,
  },
  {
    name: 'Library',
    url: '/library',
    icon: LocalLibraryIcon,
  },
  {
    name: 'Accouunt',
    url: '/account',
    icon: AccountCircleIcon,
  },
];

export default function Footer() {
  const [value, setValue] = useState(0);
  const router = useRouter();

  useEffect(() => {
    setValue(menus.findIndex((item) => item.url.includes(router.pathname)));
  }, []);

  const handleChange = (event: SyntheticEvent, newValue: number) => {
    router.push(menus[newValue].url);
    setValue(newValue);
  };

  return (
    <Container
      maxWidth="xs"
      disableGutters
      style={{
        position: 'fixed',
        display: 'flex',
        justifyContent: 'center',
        bottom: 0,
        left: 0,
        right: 0,
      }}
    >
      <Paper
        sx={{
          flex: 1,
        }}
        elevation={3}
      >
        <BottomNavigation showLabels value={value} onChange={handleChange}>
          {menus.map((item, index) => (
            <NavigationAction
              key={index}
              label={item.name}
              icon={createElement(item.icon)}
            />
          ))}
        </BottomNavigation>
      </Paper>
    </Container>
  );
}
