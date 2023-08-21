import HeaderFixed from '../HeaderFixed';
import React, { useState, useEffect } from 'react';
import AdbIcon from '@mui/icons-material/Adb';
import MenuIcon from '@mui/icons-material/Menu';
import { MenuItem, Button, Container, Menu, Typography, IconButton, Toolbar, Box, AppBar } from '@mui/material';
import { Link } from 'react-router-dom';
import LogoGrey from '../../assets/grey_scale.png'
import { styled, alpha } from '@mui/material/styles';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const StyledMenu = styled((props) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'right',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'right',
    }}
    {...props}
  />
))(({ theme }) => ({
  '& .MuiPaper-root': {
    borderRadius: 6,
    marginTop: theme.spacing(1),
    minWidth: 180,
    color:
      theme.palette.mode === 'light' ? 'rgb(55, 65, 81)' : theme.palette.grey[300],
    boxShadow:
      'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
    '& .MuiMenu-list': {
      padding: '4px 0',
    },
    '& .MuiMenuItem-root': {
      '& .MuiSvgIcon-root': {
        fontSize: 18,
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(1.5),
      },
      '&:active': {
        backgroundColor: alpha(
          theme.palette.primary.main,
          theme.palette.action.selectedOpacity,
        ),
      },
    },
  },
}));


function Header() {
  const [isFixed, setIsFixed] = useState(false);

  const [expanded, setExpanded] = React.useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

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

  const [open, setOpen] = useState(false);
  const anchorEl = React.useRef(null);

  const handleClick = (event) => {
    setOpen(!open);
    anchorEl.current = event.currentTarget;
  };

  const handleClose = () => {
    setOpen(false);
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
                <Link to="#">
                <MenuItem onClick={handleCloseNavMenu}>
                  <Typography sx={{color: "blue"}} textAlign="center" fontWeight={"400"}>Sobre</Typography>
                </MenuItem>
                </Link>
                <Link to="#">
                <MenuItem onClick={handleCloseNavMenu}>
                  <Typography sx={{color: "blue"}} textAlign="center" fontWeight={"400"}>Como apoiar</Typography>
                </MenuItem>
                </Link>
                <Link to="#">
                <MenuItem onClick={handleCloseNavMenu}>
                  <Typography sx={{color: "blue"}} textAlign="center" fontWeight={"400"}>Contato</Typography>
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
            <Link to="#">
              <Button
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'white', display: 'block' }}
            >                
              Sobre
            </Button>
            </Link>
            <Link to="#">
            <Button
                sx={{ my: 2, color: 'white', display: 'flex' }}
                disableElevation
                onClick={handleClick}
                endIcon={<KeyboardArrowDownIcon />}
            >                
              Como apoiar
            </Button>
            <StyledMenu
              id="demo-customized-menu"
              anchorEl={anchorEl.current}
              open={open}
              onClose={handleClose}
            >
              <MenuItem onClick={handleClose} disableRipple>                
                Como apoiar 1
              </MenuItem>
              <MenuItem onClick={handleClose} disableRipple>
                Como apoiar 2
              </MenuItem>
              <MenuItem onClick={handleClose} disableRipple>
                Como apoiar 3
              </MenuItem>
              <MenuItem onClick={handleClose} disableRipple>
                Como apoiar 4
              </MenuItem>
            </StyledMenu>
            </Link>
            <Link to="#">
              <Button
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'white', display: 'block' }}
            >                
              Contato
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