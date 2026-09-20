import React from 'react';
import { Box, Container, Typography, Grid } from '@mui/material';
import { styled } from '@mui/material/styles';
import { motion } from 'framer-motion';
import LocalDiningIcon from '@mui/icons-material/LocalDining';
import HistoryIcon from '@mui/icons-material/History';
import './About.css';

const Section = styled(Box)(({ theme }) => ({
  padding: theme.spacing(8, 0),
  textAlign: 'center',
}));

const About = () => {
  return (
    <Box sx={{ bgcolor: '#F5F0E1', pt: { xs: 8, md: 10 }, pb: 8, boxShadow: '0 4px 20px rgba(0,0,0,0.05)'}}>
      <Container maxWidth="lg">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <Typography variant="h3" gutterBottom sx={{ color: '#2D5016', fontWeight: 700, mb: 4 }}>
            About FlavorVault
          </Typography>
        </motion.div>

        <Section>
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={6}>
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <Typography variant="h4" gutterBottom sx={{ color: '#FF6B35', fontWeight: 600, mb: 2 }}>
                  Our Mission
                </Typography>
                <Typography variant="body1" sx={{ color: '#2D5016', lineHeight: 1.8, fontSize: '1.1rem' }}>
                  At FlavorVault, our mission is to empower home cooks and food enthusiasts alike by providing a comprehensive platform for discovering, sharing, and organizing recipes. We believe that cooking should be an enjoyable and accessible experience for everyone, fostering creativity and connection through food.
                </Typography>
              </motion.div>
            </Grid>
            <Grid item xs={12} md={6}>
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                <LocalDiningIcon sx={{ fontSize: 150, color: '#2D5016' }} />
              </motion.div>
            </Grid>
          </Grid>
        </Section>

        <Section>
          <Box sx={{ bgcolor: '#FFF8E7', borderRadius: 3, boxShadow: '0 4px 20px rgba(0,0,0,0.05)', p: 4 }}>
            <Grid container spacing={4} alignItems="center">
              <Grid item xs={12} md={6}>
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                >
                  <HistoryIcon sx={{ fontSize: 150, color: '#2D5016' }} />
                </motion.div>
              </Grid>
              <Grid item xs={12} md={6}>
                <motion.div
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                >
                  <Typography variant="h4" gutterBottom sx={{ color: '#FF6B35', fontWeight: 600, mb: 2 }}>
                    Our Story
                  </Typography>
                  <Typography variant="body1" sx={{ color: '#2D5016', lineHeight: 1.8, fontSize: '1.1rem' }}>
                    FlavorVault was born out of a simple idea: to create a centralized hub for all things culinary. Frustrated with scattered recipes and unorganized meal plans, our founders envisioned a platform where passion for food could flourish. Since our humble beginnings, we've grown into a thriving community, constantly evolving to meet the needs of our users.
                  </Typography>
                </motion.div>
              </Grid>
            </Grid>
          </Box>
        </Section>
      </Container>
    </Box>
  );
};

export default About; 