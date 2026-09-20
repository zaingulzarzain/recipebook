import React from 'react';
import { Box, Typography, Container, Grid, Card, CardMedia, CardContent, Chip, IconButton } from '@mui/material';
import { Clock, Star, Heart } from 'lucide-react';
import { useSelector, useDispatch } from 'react-redux';
import { toggleFavorite } from '../store/slices/recipeSlice';
import { useNavigate } from 'react-router-dom';

const RecipeShowcase = () => {
  const { recipes, favorites, likedIds } = useSelector((state) => state.recipes);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const favSet = new Set([...(favorites || []), ...(likedIds || [])].map(String));

  const handleFavoriteToggle = (recipeId) => {
    dispatch(toggleFavorite(String(recipeId)));
  };

  // show only first 3 as featured
  const featured = recipes.slice(0, 3);

  return (
    <Box sx={{ py: { xs: 8, md: 12 }, bgcolor: 'white' }}>
      <Container maxWidth="lg">
        <Box sx={{ textAlign: 'center', mb: 8 }}>
          <Typography variant="h2" sx={{ fontSize: { xs: '2rem', md: '2.5rem', lg: '3rem' }, fontWeight: 800, color: '#2D5016', mb: 3 }}>
            Featured<Box component="span" sx={{ color: '#FF6B35' }}> Recipes</Box>
          </Typography>
          <Typography variant="h6" sx={{ color: 'rgba(45, 80, 22, 0.8)', fontWeight: 400, maxWidth: '600px', mx: 'auto', lineHeight: 1.6 }}>
            Discover handpicked recipes from our community of passionate cooks. Each dish tells a story and brings people together.
          </Typography>
        </Box>

        <Grid container spacing={4}>
          {featured.map((recipe) => {
            const id = recipe._id || recipe.id;
            const isFav = favSet.has(String(id));
            return (
              <Grid item xs={12} sm={6} lg={4} key={id}>
                <Card
                  onClick={() => navigate(`/recipe/${id}`)}
                  sx={{
                    height: '100%', borderRadius: 3, border: 'none',
                    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)', transition: 'all 0.3s ease',
                    '&:hover': { transform: 'translateY(-8px)', boxShadow: '0 12px 40px rgba(0, 0, 0, 0.15)' }, cursor: 'pointer'
                  }}
                >
                  <Box sx={{ position: 'relative' }}>
                    <CardMedia component="img" height="220" image={recipe.image} alt={recipe.name || recipe.title} sx={{ transition: 'transform 0.3s ease', '&:hover': { transform: 'scale(1.05)' } }} />
                    <IconButton
                      sx={{ position: 'absolute', top: 12, right: 12, bgcolor: 'rgba(255, 255, 255, 0.9)', '&:hover': { bgcolor: 'white', transform: 'scale(1.1)' }, transition: 'all 0.3s ease' }}
                      onClick={(e) => { e.stopPropagation(); handleFavoriteToggle(id); }}
                    >
                      <Heart size={20} color={isFav ? '#E91E63' : '#666'} fill={isFav ? '#E91E63' : 'none'} />
                    </IconButton>
                    <Box sx={{ position: 'absolute', bottom: 12, left: 12, display: 'flex', gap: 1 }}>
                      <Chip label={recipe.difficulty} size="small" sx={{ bgcolor: recipe.difficulty === 'Easy' ? '#4CAF50' : recipe.difficulty === 'Medium' ? '#FF9800' : '#F44336', color: 'white', fontWeight: 600, fontSize: '0.75rem' }} />
                    </Box>
                  </Box>
                  <CardContent sx={{ p: 3 }}>
                    <Typography variant="h6" sx={{ fontWeight: 700, color: '#2D5016', mb: 1, fontSize: '1.1rem', lineHeight: 1.3 }}>{recipe.name || recipe.title}</Typography>
                    <Typography variant="body2" sx={{ color: 'rgba(45, 80, 22, 0.7)', mb: 3, lineHeight: 1.5 }}>{recipe.description}</Typography>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Clock size={16} color="#666" />
                        <Typography variant="body2" sx={{ color: '#666', fontWeight: 500 }}>{recipe.time || recipe.cookTime}</Typography>
                      </Box>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                        <Star size={16} color="#FFD700" fill="#FFD700" />
                        <Typography variant="body2" sx={{ color: '#666', fontWeight: 600 }}>{recipe.rating || '4.5'}</Typography>
                      </Box>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            );
          })}
        </Grid>

        <Box sx={{ textAlign: 'center', mt: 6 }}>
          <Typography
            onClick={() => navigate('/recipes')}
            variant="h6"
            sx={{ color: '#FF6B35', fontWeight: 600, cursor: 'pointer', display: 'inline-block', '&:hover': { textDecoration: 'underline' } }}
          >
            View All Recipes →
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default RecipeShowcase;
