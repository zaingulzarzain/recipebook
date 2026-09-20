import React, { useState } from 'react';
import { Box, Typography, Container, TextField, Button, Grid, Snackbar, Alert } from '@mui/material';
import { Mail, ArrowRight } from 'lucide-react';

const Newsletter = () => {
  const [email, setEmail] = useState('');
  const [snack, setSnack] = useState({ open: false, message: '', severity: 'success' });

  const handleSubmit = (e) => {
    e.preventDefault();
    const ok = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    if (!ok) {
      setSnack({ open: true, message: 'Please enter a valid email address.', severity: 'warning' });
      return;
    }
    try {
      const list = JSON.parse(localStorage.getItem('flavorvault_newsletter') || '[]');
      if (!list.includes(email)) {
        list.push(email);
        localStorage.setItem('flavorvault_newsletter', JSON.stringify(list));
      }
    } catch {}
    setSnack({ open: true, message: 'You are subscribed! Check your inbox for a welcome email.', severity: 'success' });
    setEmail('');
  };

  return (
    <Box sx={{ py: { xs: 8, md: 12 }, background: 'linear-gradient(135deg, #FF6B35 0%, #E55A2B 100%)', position: 'relative', overflow: 'hidden' }}>
      <Box sx={{ position: 'absolute', inset: 0, opacity: 0.1, backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.2'%3E%3Cpath d='M20 20c0-5.5-4.5-10-10-10s-10 4.5-10 10 4.5 10 10 10 10-4.5 10-10zm10 0c0-5.5-4.5-10-10-10s-10 4.5-10 10 4.5 10 10 10 10-4.5 10-10z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")` }} />
      <Container maxWidth="md" sx={{ position: 'relative', zIndex: 2 }}>
        <Grid container spacing={4} alignItems="center">
          <Grid item xs={12} md={6}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
              <Box sx={{ width: 60, height: 60, borderRadius: '50%', bgcolor: 'rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Mail size={28} color="white" />
              </Box>
              <Typography variant="h3" sx={{ fontSize: { xs: '1.8rem', md: '2.2rem' }, fontWeight: 800, color: 'white', lineHeight: 1.2 }}>Stay in the Loop</Typography>
            </Box>
            <Typography variant="h6" sx={{ color: 'rgba(255,255,255,0.9)', fontWeight: 400, lineHeight: 1.6, mb: { xs: 4, md: 0 } }}>
              Get weekly recipe inspirations, cooking tips, and special offers delivered straight to your inbox. Join our community of food lovers!
            </Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', gap: 2, flexDirection: { xs: 'column', sm: 'row' }, alignItems: 'stretch' }}>
              <TextField
                fullWidth type="email" placeholder="Enter your email address" value={email} onChange={(e) => setEmail(e.target.value)} required
                sx={{ bgcolor: 'white', borderRadius: 2, '& .MuiOutlinedInput-root': { borderRadius: 2, '& fieldset': { border: 'none' } }, '& .MuiInputBase-input': { py: 2, fontSize: '1rem' } }}
              />
              <Button type="submit" variant="contained" endIcon={<ArrowRight size={20} />} sx={{ bgcolor: '#2D5016', color: 'white', fontWeight: 600, px: 4, py: 2, borderRadius: 2, whiteSpace: 'nowrap', '&:hover': { bgcolor: '#1a2f0c', transform: 'translateY(-2px)', boxShadow: '0 8px 25px rgba(45,80,22,0.3)' }, transition: 'all 0.3s ease' }}>
                Subscribe
              </Button>
            </Box>
            <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.8)', mt: 2, fontSize: '0.85rem' }}>No spam, unsubscribe at any time. We respect your privacy.</Typography>
          </Grid>
        </Grid>
      </Container>
      <Snackbar open={snack.open} autoHideDuration={3000} onClose={() => setSnack({ ...snack, open: false })} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}>
        <Alert severity={snack.severity} onClose={() => setSnack({ ...snack, open: false })}>{snack.message}</Alert>
      </Snackbar>
    </Box>
  );
};

export default Newsletter;
