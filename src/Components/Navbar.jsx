import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Button,
  Box,
  useTheme,
  useMediaQuery,
  IconButton,
  Drawer,
  List,
  ListItemButton,
  ListItemText,
  Divider,
  Slide,
} from '@mui/material';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import { Link, useLocation } from 'react-router-dom';
import logo from '../assets/champ.png';

function Navbar() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  const toggleDrawer = () => setMobileOpen(!mobileOpen);

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Sevas', path: '/sevas' },
    { name: 'Events', path: '/events' },
    { name: 'Donations', path: '/donations' },
    { name: 'Hall Booking', path: '/hall-booking' },
    { name: 'About', path: '/about' },
  ];

  const drawer = (
    <Slide direction="left" in={mobileOpen} mountOnEnter unmountOnExit>
      <Box
        sx={{
          width: 260,
          height: '100%',
          textAlign: 'center',
          py: 3,
          background: 'rgba(0,0,0,0.75)',
          backdropFilter: 'blur(14px)',
          animation: 'fadeIn 0.4s ease-in-out',
        }}
      >
        <Box mb={3}>
          <Box
            component="img"
            src={logo}
            alt="Kalikamba Temple Logo"
            sx={{
              height: 54,
              transition: 'transform 0.4s ease-in-out',
              '&:hover': {
                animation: 'pulse 1.2s infinite',
              },
            }}
          />
        </Box>
        <Divider sx={{ borderColor: 'rgba(255,255,255,0.2)' }} />
        <List>
          {navItems.map((item) => (
            <ListItemButton
              key={item.name}
              component={Link}
              to={item.path}
              selected={location.pathname === item.path}
              sx={{
                textAlign: 'center',
                py: 1.5,
                color: '#fff',
                transition: 'background 0.3s',
                '&.Mui-selected': {
                  backgroundColor: 'rgba(255,255,255,0.1)',
                },
                '&:hover': {
                  backgroundColor: 'rgba(255, 255, 255, 0.12)',
                },
              }}
            >
              <ListItemText
                primary={item.name}
                primaryTypographyProps={{
                  fontWeight: 'bold',
                  fontSize: '1rem',
                }}
              />
            </ListItemButton>
          ))}
        </List>
      </Box>
    </Slide>
  );

  return (
    <>
      <AppBar
        position="fixed"
        elevation={0}
        sx={{
          background: 'linear-gradient(to right, rgba(0,0,0,0.6), rgba(20,20,20,0.4))',
          backdropFilter: 'blur(6px)',
          color: '#fff',
          transition: 'all 0.3s ease-in-out',
        }}
      >
        <Toolbar sx={{ justifyContent: 'space-between', px: { xs: 2, md: 4 } }}>
          <Box display="flex" alignItems="center" gap={1}>
            <Box
              component="img"
              src={logo}
              alt="Logo"
              sx={{
                height: 50,
                transition: 'transform 0.3s',
                '&:hover': {
                  animation: 'spin 1.5s ease-in-out',
                },
              }}
            />
          </Box>

          {!isMobile ? (
            <Box display="flex" gap={2}>
              {navItems.map((item) => (
                <Button
                  key={item.name}
                  component={Link}
                  to={item.path}
                  sx={{
                    fontWeight: 600,
                    px: 2,
                    borderRadius: 2,
                    color:
                      location.pathname === item.path
                        ? theme.palette.secondary.light
                        : '#fff',
                    backgroundColor:
                      location.pathname === item.path
                        ? 'rgba(255, 255, 255, 0.1)'
                        : 'transparent',
                    transition: 'all 0.25s ease-in-out',
                    '&:hover': {
                      color: theme.palette.secondary.main,
                      backgroundColor: 'rgba(255, 255, 255, 0.15)',
                      transform: 'scale(1.05)',
                    },
                  }}
                >
                  {item.name}
                </Button>
              ))}
            </Box>
          ) : (
            <IconButton onClick={toggleDrawer} sx={{ color: '#fff' }}>
              <MenuOpenIcon />
            </IconButton>
          )}
        </Toolbar>
      </AppBar>

      <Drawer
        anchor="right"
        open={mobileOpen}
        onClose={toggleDrawer}
        PaperProps={{
          sx: {
            backgroundColor: 'transparent',
            boxShadow: 'none',
          },
        }}
      >
        {drawer}
      </Drawer>

      {/* Custom Animations */}
      <style>{`

        @keyframes pulse {
          0% { transform: scale(1); }
          50% { transform: scale(1.08); }
          100% { transform: scale(1); }
        }

        @keyframes fadeIn {
          from { opacity: 0; transform: translateX(50px); }
          to { opacity: 1; transform: translateX(0); }
        }
      `}</style>
    </>
  );
}

export default Navbar;
