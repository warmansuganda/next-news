import LinearProgress from '@mui/material/LinearProgress';
import Container from '@mui/material/Container';

function Loader() {
  return (
    <Container
      maxWidth="xs"
      disableGutters
      style={{
        position: 'fixed',
        zIndex: 20,
        top: 0,
        left: 0,
        right: 0,
      }}
    >
      <LinearProgress />
    </Container>
  );
}

export default Loader;
