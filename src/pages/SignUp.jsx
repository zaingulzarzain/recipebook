import React, { useState } from 'react';
import { Box, Container, Typography, TextField, Button, Paper, Link } from '@mui/material';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { ChefHat } from 'lucide-react';

export default function SignUp() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', email: '', password: '', confirm: '' });
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.password) return setError('Please fill all fields');
    if (form.password !== form.confirm) return setError('Passwords do not match');
    if (form.password.length < 6) return setError('Password must be at least 6 characters');
    localStorage.setItem('flavorvault_user', JSON.stringify({ email: form.email, name: form.name }));
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
          <Typography variant="h4" sx={{ fontWeight: 700, color: '#2D5016', textAlign: 'center', mb: 1 }}>Create account</Typography>
          <Typography variant="body2" sx={{ color: '#888', textAlign: 'center', mb: 4 }}>Join 50,000+ home cooks</Typography>

          <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
            <TextField label="Full Name" fullWidth required value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
            <TextField label="Email" type="email" fullWidth required value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
            <TextField label="Password" type="password" fullWidth required value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} />
            <TextField label="Confirm Password" type="password" fullWidth required value={form.confirm} onChange={e => setForm({ ...form, confirm: e.target.value })} />
            {error && <Typography variant="body2" sx={{ color: '#E53935' }}>{error}</Typography>}
            <Button type="submit" variant="contained" size="large" sx={{ bgcolor: '#2D5016', py: 1.4, mt: 1, '&:hover': { bgcolor: '#1f3710' } }}>Create Account</Button>
            <Typography variant="body2" sx={{ textAlign: 'center', mt: 1 }}>
              Already have an account? <Link component={RouterLink} to="/login" sx={{ color: '#FF6B35', fontWeight: 600 }}>Sign in</Link>
            </Typography>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
}
