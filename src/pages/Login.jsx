import React, { useState } from 'react';
import { Box, Container, Typography, TextField, Button, Paper, Link } from '@mui/material';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { ChefHat } from 'lucide-react';

export default function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.email || !form.password) return setError('Please fill all fields');
    // mock login — store flag
    localStorage.setItem('flavorvault_user', JSON.stringify({ email: form.email, name: form.email.split('@')[0] }));
    navigate('/recipes');
  };

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#F5F0E1', pt: 12, pb: 8, display: 'flex', alignItems: 'center' }}>
      <Container maxWidth="sm">
        <Paper sx={{ p: 4, borderRadius: 3, boxShadow: '0 8px 32px rgba(0,0,0,0.08)' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, justifyContent: 'center', mb: 3 }}>
            <ChefHat size={28} color="#FF6B35" />
            <Typography variant="h5" sx={{ fontWeight: 800, color: '#2D5016' }}>FlavorVault</Typography>
          </Box>
          <Typography variant="h4" sx={{ fontWeight: 700, color: '#2D5016', textAlign: 'center', mb: 1 }}>Welcome back</Typography>
          <Typography variant="body2" sx={{ color: '#888', textAlign: 'center', mb: 4 }}>Sign in to continue your culinary journey</Typography>

          <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
            <TextField label="Email" type="email" fullWidth required value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
            <TextField label="Password" type="password" fullWidth required value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} />
            {error && <Typography variant="body2" sx={{ color: '#E53935' }}>{error}</Typography>}
            <Button type="submit" variant="contained" size="large" sx={{ bgcolor: '#FF6B35', py: 1.4, mt: 1, '&:hover': { bgcolor: '#FF5722' } }}>Sign In</Button>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1 }}>
              <Link component={RouterLink} to="/forgot-password" sx={{ color: '#2D5016', fontSize: '0.9rem' }}>Forgot password?</Link>
              <Link component={RouterLink} to="/signup" sx={{ color: '#FF6B35', fontSize: '0.9rem', fontWeight: 600 }}>Create account</Link>
            </Box>
          </Box>

          <Typography variant="caption" sx={{ display: 'block', textAlign: 'center', color: '#aaa', mt: 4 }}>
            Demo — no real authentication. Any email/password works.
          </Typography>
        </Paper>
      </Container>
    </Box>
  );
}
