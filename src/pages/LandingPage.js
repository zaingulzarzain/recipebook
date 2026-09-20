import React from 'react';
import { Box, Container, Typography, Button, Grid } from '@mui/material';
import { styled } from '@mui/material/styles';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import BookOutlinedIcon from '@mui/icons-material/BookOutlined';
import GroupOutlinedIcon from '@mui/icons-material/GroupOutlined';
import StarOutlinedIcon from '@mui/icons-material/StarOutlined';
import heroImage from '../assets/images/hero-image.jpg';
import Features from '../components/Features';
import RecipeShowcase from '../components/RecipeShowcase';
import Newsletter from '../components/Newsletter';

const HeroSection = styled(Box)(({ theme }) => ({
  minHeight: '100vh',
  display: 'flex',
  alignItems: 'center',
  background: 'linear-gradient(135deg, #2D5016 0%, #1A2F0D 100%)',
  color: 'white',
  paddingTop: theme.spacing(8),
  paddingBottom: theme.spacing(4),
  position: 'relative',
  overflow: 'hidden',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0, left: 0, right: 0, bottom: 0,
    background: 'radial-gradient(circle at 50% 50%, rgba(255, 255, 255, 0.1) 0%, transparent 50%)',
    pointerEvents: 'none'
  }
}));

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <Box sx={{ overflow: 'hidden' }}>
      <HeroSection>
        <Container maxWidth="lg" sx={{ position: 'relative' }}>
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={6}>
              <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}>
                <Typography variant="h1" gutterBottom sx={{ color: 'white', fontSize: { xs: '2.5rem', md: '3.5rem', lg: '4rem' }, fontWeight: 800, lineHeight: 1.2, mb: 3 }}>
                  Your Culinary Journey <br />
                  <Box component="span" sx={{ color: '#FF6B35' }}>Starts Here</Box>
                </Typography>
                <Typography variant="h5" paragraph sx={{ color: 'white', opacity: 0.9, maxWidth: '480px', fontSize: { xs: '1.1rem', md: '1.25rem' }, lineHeight: 1.6, mb: 4 }}>
                  Discover, save, and share amazing recipes from around the world. Turn your kitchen into a playground of flavors.
                </Typography>
                <Box sx={{ mt: 4, display: 'flex', gap: 2, alignItems: 'center', flexWrap: 'wrap' }}>
                  <Button variant="contained" size="large" onClick={() => navigate('/recipes')} sx={{ px: 4, py: 1.5, fontWeight: 700, bgcolor: '#FF6B35', borderRadius: 2, '&:hover': { bgcolor: '#FF5722', transform: 'translateY(-2px)', boxShadow: '0 8px 20px rgba(255,107,53,0.4)' }, transition: 'all 0.2s' }}>
                    Start Cooking
                  </Button>
                  <Button variant="outlined" size="large" onClick={() => navigate('/about')} sx={{ px: 4, py: 1.5, fontWeight: 600, color: 'white', borderColor: 'rgba(255,255,255,0.4)', borderRadius: 2, '&:hover': { borderColor: 'white', bgcolor: 'rgba(255,255,255,0.08)' } }}>
                    Learn More
                  </Button>
                </Box>

                <Grid container spacing={3} sx={{ mt: 6, color: 'white' }}>
                  <Grid item xs={4} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <BookOutlinedIcon sx={{ fontSize: 24, color: '#FF6B35' }} />
                    <Box><Typography variant="h4" sx={{ fontWeight: 700, fontSize: { xs: '1.5rem', md: '2rem' } }}>10K+</Typography><Typography variant="body2" sx={{ opacity: 0.8 }}>Recipes</Typography></Box>
                  </Grid>
                  <Grid item xs={4} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <GroupOutlinedIcon sx={{ fontSize: 24, color: '#FF6B35' }} />
                    <Box><Typography variant="h4" sx={{ fontWeight: 700, fontSize: { xs: '1.5rem', md: '2rem' } }}>50K+</Typography><Typography variant="body2" sx={{ opacity: 0.8 }}>Cooks</Typography></Box>
                  </Grid>
                  <Grid item xs={4} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <StarOutlinedIcon sx={{ fontSize: 24, color: '#FF6B35' }} />
                    <Box><Typography variant="h4" sx={{ fontWeight: 700, fontSize: { xs: '1.5rem', md: '2rem' } }}>4.9</Typography><Typography variant="body2" sx={{ opacity: 0.8 }}>Rating</Typography></Box>
                  </Grid>
                </Grid>
              </motion.div>
            </Grid>

            <Grid item xs={12} md={6} sx={{ display: { xs: 'none', md: 'block' } }}>
              <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8, delay: 0.2 }}>
                <Box
                  component="img"
                  src={heroImage}
                  alt="Cooking Ingredients"
                  loading="eager"
                  sx={{
                    width: '100%', maxWidth: 560, ml: 'auto', display: 'block',
                    height: 'auto', objectFit: 'cover', borderRadius: 4,
                    boxShadow: '0 20px 40px rgba(0, 0, 0, 0.25)',
                    transform: 'perspective(1000px) rotateY(-5deg)', transition: 'transform 0.3s ease',
                    '&:hover': { transform: 'perspective(1000px) rotateY(0deg)' }
                  }}
                />
              </motion.div>
            </Grid>
          </Grid>
        </Container>
      </HeroSection>

      <Features />
      <RecipeShowcase />
      <Newsletter />
    </Box>
  );
};

export default LandingPage;
