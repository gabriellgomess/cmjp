import HeaderFixed from '../HeaderFixed';
import React, { useState, useEffect } from 'react';
import AdbIcon from '@mui/icons-material/Adb';
import MenuIcon from '@mui/icons-material/Menu';
import { MenuItem, Button, Container, Menu, Typography, IconButton, Toolbar, Box, AppBar } from '@mui/material';
import { Link } from 'react-router-dom';
import LogoGrey from '../../assets/grey_scale.png'


function Header() {
  const [isFixed, setIsFixed] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentPosition = window.pageYOffset;
      setIsFixed(currentPosition > 0);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  const [anchorElNav, setAnchorElNav] = useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  }; 

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };


  return (
    <>
      <HeaderFixed />
      <AppBar
        position="sticky"
        top={isFixed ? '0' : 'auto'}
        sx={{ zIndex: 10 }}
        className={isFixed ? 'fixed-appbar' : ''}
      >
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Box sx={{display:{xs: 'none', md: 'flex'}}}>
            <img width={60} src={LogoGrey} alt="" />
            </Box>
          

            <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
             <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              <Link to="/homolog/">
                <MenuItem onClick={handleCloseNavMenu}>
                  <Typography sx={{color: "blue"}} textAlign="center" fontWeight={"400"}>Home</Typography>
                </MenuItem>
                </Link>
                
              
            </Menu>
          </Box>
          
          <Box sx={{ display: { xs: 'flex', md: 'none' }}}>
            <img  width={60} src={LogoGrey} alt="" />
          </Box>
          
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            <Link to="/homolog/">
              <Button
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'white', display: 'block' }}
            >                
              Home
            </Button>
            </Link>
          
          </Box>          
        </Toolbar>
      </Container>
    </AppBar>
    </>
  );
}

export default Header;