import React from 'react'
import { useNavigate } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Container from '@mui/material/Container';
import AddIcon from '@mui/icons-material/Add';
import { styled } from '@mui/system';

const StyledTypographyInvisible = styled(Typography)(({theme}) => ({
  marginLeft: 2,
  marginRight: 2,
  display: 'flex',
  flexGrow: 1,
  fontFamily: 'monospace',
  fontWeight: 700,
  letterSpacing: '.3rem',
  color: 'inherit',
  textDecoration: 'none',
  [theme.breakpoints.down('md')]: {
    display: 'none',
  }
}))

const StyledTypography = styled(Typography)(({theme}) => ({
  marginLeft: 2,
  marginRight: 2,
  display: 'none',
  flexGrow: 1,
  fontFamily: 'monospace',
  fontWeight: 700,
  letterSpacing: '.3rem',
  color: 'inherit',
  textDecoration: 'none',
  [theme.breakpoints.down('md')]: {
    display: 'flex',
  }
}))

const Navbar = () => {
  const navigate = useNavigate()

  return (
    <AppBar position="static" sx={{background: '#202020', minWidth: 350, paddingX: 3}}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <StyledTypographyInvisible
            variant="h6"
            noWrap
            component="a"
            href="/"
          >
            SUPERHEROES
          </StyledTypographyInvisible>
          <StyledTypography
            variant="h5"
            noWrap
            component="a"
            href="/" 
          >
            SUPERHEROES
          </StyledTypography>

          <Box sx={{ flexGrow: 0 }}>
            <IconButton 
              onClick={() => navigate('/create')}
            >
              <AddIcon sx={{color: 'white'}}/>
            </IconButton>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  )
}

export default Navbar