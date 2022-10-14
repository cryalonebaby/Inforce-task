import { useNavigate } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Container from '@mui/material/Container';
import AddIcon from '@mui/icons-material/Add';

const Navbar = () => {
  const navigate = useNavigate()

  return (
    <AppBar position="static" sx={{background: '#202020', minWidth: 350, paddingX: 3}}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            SUPERHEROES
          </Typography>
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            SUPERHEROES
          </Typography>

          <Box sx={{ flexGrow: 0 }}>
            <IconButton onClick={() => navigate('/create')}>
              <AddIcon sx={{color: 'white'}}/>
            </IconButton>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  )
}

export default Navbar