import React, { useState } from 'react';
import { Box, Container, Typography, TextField, Button, Paper, Link, Alert } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { ChefHat } from 'lucide-react';

export default function ForgotPass() {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) return;
    setSent(true);
  };

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#F5F0E1', pt: 12, pb: 8, display: 'flex', alignItems: 'center' }}>
      <Container maxWidth="sm">
        <Paper sx={{ p: 4, borderRadius: 3, boxShadow: '0 8px 32px rgba(0,0,0,0.08)' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, justifyContent: 'center', mb: 3 }}>
            <ChefHat size={28} color="#FF6B35" />
            <Typography variant="h5" sx={{ fontWeight: 800, color: '#2D5016' }}>FlavorVault</Typography>
          </Box>
          <Typography variant="h4" sx={{ fontWeight: 700, color: '#2D5016', textAlign: 'center', mb: 1 }}>Reset password</Typography>
          <Typography variant="body2" sx={{ color: '#888', textAlign: 'center', mb: 4 }}>Enter your email and we'll send you a reset link</Typography>

          {sent ? (
            <Alert severity="success" sx={{ mb: 2 }}>
              If an account exists for <strong>{email}</strong>, you will receive a password reset link shortly.
            </Alert>
          ) : null}

          <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
            <TextField label="Email" type="email" fullWidth required value={email} onChange={e => setEmail(e.target.value)} />
            <Button type="submit" variant="contained" size="large" sx={{ bgcolor: '#FF6B35', py: 1.4, '&:hover': { bgcolor: '#FF5722' } }}>
              Send reset link
            </Button>
            <Typography variant="body2" sx={{ textAlign: 'center', mt: 1 }}>
              Remembered? <Link component={RouterLink} to="/login" sx={{ color: '#FF6B35', fontWeight: 600 }}>Back to sign in</Link>
            </Typography>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
}
