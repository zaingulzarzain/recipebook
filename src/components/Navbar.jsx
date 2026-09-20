import React, { useState, useEffect } from 'react';
import { AppBar, Toolbar, Typography, Button, Box, IconButton, Drawer, List, ListItem, ListItemText, useMediaQuery, useTheme } from '@mui/material';
import { Menu as MenuIcon, Close as CloseIcon } from '@mui/icons-material';
import { ChefHat, LogOut, User } from 'lucide-react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [user, setUser] = useState(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    try {
      const u = localStorage.getItem('flavorvault_user');
      setUser(u ? JSON.parse(u) : null);
    } catch { setUser(null); }
  }, [location.pathname]);

  const handleDrawerToggle = () => setMobileOpen(!mobileOpen);

  const handleLogout = () => {
    localStorage.removeItem('flavorvault_user');
    setUser(null);
    navigate('/');
    setMobileOpen(false);
  };

  const menuItems = [
    { name: 'Home', path: '/' },
    { name: 'Recipes', path: '/recipes' },
    { name: 'About', path: '/about' },
  ];

  const isActive = (path) => location.pathname === path;

  const drawer = (
    <Box sx={{ width: 280, height: '100%', bgcolor: '#2D5016', display: 'flex', flexDirection: 'column' }}>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', p: 2 }}>
        <IconButton onClick={handleDrawerToggle} sx={{ color: 'white' }}><CloseIcon /></IconButton>
      </Box>
      <List sx={{ flex: 1 }}>
        {menuItems.map((item) => (
          <ListItem
            key={item.name}
            onClick={() => { navigate(item.path); handleDrawerToggle(); }}
            sx={{
              borderBottom: '1px solid rgba(255,255,255,0.08)', cursor: 'pointer',
              bgcolor: isActive(item.path) ? 'rgba(255,107,53,0.15)' : 'transparent',
              '&:hover': { bgcolor: 'rgba(255, 107, 53, 0.12)' }
            }}
          >
            <ListItemText primary={item.name} sx={{ color: 'white', '& .MuiListItemText-primary': { fontWeight: isActive(item.path) ? 700 : 500, fontSize: '1.05rem' } }} />
          </ListItem>
        ))}
        <Box sx={{ p: 2, mt: 2, display: 'flex', flexDirection: 'column', gap: 1.5 }}>
          {user ? (
            <>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, color: 'white', mb: 1 }}>
                <User size={18} /><Typography variant="body2" sx={{ fontWeight: 600 }}>{user.name || user.email}</Typography>
              </Box>
              <Button fullWidth variant="outlined" onClick={handleLogout} startIcon={<LogOut size={16} />} sx={{ color: 'white', borderColor: 'rgba(255,255,255,0.4)', '&:hover': { borderColor: 'white', bgcolor: 'rgba(255,255,255,0.08)' } }}>Sign out</Button>
            </>
          ) : (
            <>
              <Button fullWidth variant="outlined" component={Link} to="/login" onClick={handleDrawerToggle} sx={{ color: 'white', borderColor: 'rgba(255,255,255,0.4)', '&:hover': { borderColor: 'white' } }}>Sign in</Button>
              <Button fullWidth variant="contained" component={Link} to="/signup" onClick={handleDrawerToggle} sx={{ bgcolor: '#FF6B35', color: 'white', '&:hover': { bgcolor: '#E55A2B' } }}>Create account</Button>
            </>
          )}
          <Button fullWidth variant="contained" component={Link} to="/recipes" onClick={handleDrawerToggle} sx={{ bgcolor: 'white', color: '#2D5016', fontWeight: 700, mt: 1, '&:hover': { bgcolor: '#F5F0E1' } }}>Get Started</Button>
        </Box>
      </List>
    </Box>
  );

  return (
    <>
      <AppBar position="fixed" elevation={0} sx={{ bgcolor: 'rgba(45, 80, 22, 0.96)', backdropFilter: 'blur(10px)', borderBottom: '1px solid rgba(255, 255, 255, 0.08)' }}>
        <Toolbar sx={{ justifyContent: 'space-between', gap: 2 }}>
          <Box component={Link} to="/" sx={{ display: 'flex', alignItems: 'center', gap: 1, textDecoration: 'none', flexShrink: 0 }}>
            <ChefHat size={32} color="#FF6B35" />
            <Typography variant="h5" sx={{ fontWeight: 800, color: 'white', fontSize: { xs: '1.45rem', md: '1.75rem' }, letterSpacing: '-0.02em' }}>FlavorVault</Typography>
          </Box>

          {isMobile ? (
            <IconButton edge="start" color="inherit" aria-label="menu" onClick={handleDrawerToggle}><MenuIcon /></IconButton>
          ) : (
            <Box sx={{ display: 'flex', gap: 1.5, alignItems: 'center' }}>
              {menuItems.map((item) => (
                <Button
                  key={item.name}
                  component={Link}
                  to={item.path}
                  sx={{
                    color: isActive(item.path) ? '#FF6B35' : 'white',
                    fontWeight: isActive(item.path) ? 700 : 500,
                    fontSize: '0.95rem',
                    bgcolor: isActive(item.path) ? 'rgba(255,107,53,0.12)' : 'transparent',
                    '&:hover': { bgcolor: 'rgba(255, 107, 53, 0.12)', color: '#FF6B35' }
                  }}
                >
                  {item.name}
                </Button>
              ))}
              <Box sx={{ width: '1px', height: 24, bgcolor: 'rgba(255,255,255,0.15)', mx: 1 }} />
              {user ? (
                <>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, color: 'rgba(255,255,255,0.9)', mr: 0.5 }}>
                    <User size={16} /><Typography variant="body2" sx={{ fontWeight: 600, maxWidth: 120, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{user.name || user.email}</Typography>
                  </Box>
                  <Button variant="outlined" onClick={handleLogout} sx={{ color: 'white', borderColor: 'rgba(255,255,255,0.35)', py: 0.7, '&:hover': { borderColor: 'white', bgcolor: 'rgba(255,255,255,0.08)' } }}>Sign out</Button>
                </>
              ) : (
                <>
                  <Button component={Link} to="/login" sx={{ color: 'white', fontWeight: 500, '&:hover': { color: '#FF6B35', bgcolor: 'rgba(255,107,53,0.1)' } }}>Sign in</Button>
                  <Button variant="contained" component={Link} to="/signup" sx={{ bgcolor: 'white', color: '#2D5016', fontWeight: 700, px: 2.5, py: 1, borderRadius: 2, '&:hover': { bgcolor: '#FFF8E7' } }}>Sign up</Button>
                </>
              )}
              <Button variant="contained" component={Link} to="/recipes" sx={{ bgcolor: '#FF6B35', color: 'white', fontWeight: 700, px: 3, py: 1, borderRadius: 2, ml: 0.5, '&:hover': { bgcolor: '#E55A2B', transform: 'translateY(-1px)', boxShadow: '0 8px 20px rgba(255,107,53,0.3)' }, transition: 'all 0.2s' }}>
                Get Started
              </Button>
            </Box>
          )}
        </Toolbar>
      </AppBar>

      <Drawer variant="temporary" anchor="right" open={mobileOpen} onClose={handleDrawerToggle} ModalProps={{ keepMounted: true }} PaperProps={{ sx: { bgcolor: 'transparent' } }}>
        {drawer}
      </Drawer>
    </>
  );
};

export default Navbar;
