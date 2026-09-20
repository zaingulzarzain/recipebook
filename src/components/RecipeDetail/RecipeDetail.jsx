import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Box, Container, Typography, Grid, Chip, IconButton, Checkbox, Divider, Button, Card, CardMedia, List, ListItem, ListItemIcon, ListItemText, Tooltip, Snackbar, Alert
} from '@mui/material';
import { Clock, ArrowLeft, ThumbsUp, CheckCircle, Circle, Share2 } from 'lucide-react';
import { useSelector, useDispatch } from 'react-redux';
import { toggleLike, toggleStep } from '../../store/slices/recipeSlice';
import CommentSection from '../CommentSection';
import './RecipeDetail.css';

function RecipeDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const recipes = useSelector(s => s.recipes.recipes);
  const likedIds = useSelector(s => s.recipes.likedIds);
  const favorites = useSelector(s => s.recipes.favorites);
  const completedStepsMap = useSelector(s => s.recipes.completedSteps);
  const [snackbar, setSnackbar] = React.useState({ open: false, message: '', severity: 'success' });

  const recipe = recipes.find(r => String(r._id || r.id) === String(id));
  const completedSteps = completedStepsMap[String(id)] || [];
  const liked = [...likedIds, ...favorites].map(String).includes(String(id));

  if (!recipe) {
    return (
      <Container maxWidth="lg" sx={{ py: 12, textAlign: 'center' }}>
        <Typography variant="h5" sx={{ color: '#666', mb: 2 }}>Recipe not found</Typography>
        <Button variant="contained" onClick={() => navigate('/recipes')} sx={{ bgcolor: '#2D5016' }}>Back to Recipes</Button>
      </Container>
    );
  }

  const handleStepToggle = (stepIndex) => {
    dispatch(toggleStep({ recipeId: String(id), stepIndex }));
  };

  const handleLikeToggle = () => {
    dispatch(toggleLike(String(id)));
  };

  const handleShare = async () => {
    const url = window.location.href;
    if (navigator.share) {
      try {
        await navigator.share({ title: recipe.name || recipe.title, text: `Check out this recipe: ${recipe.name || recipe.title}`, url });
      } catch {}
    } else {
      try {
        await navigator.clipboard.writeText(url);
        setSnackbar({ open: true, message: 'Link copied to clipboard!', severity: 'success' });
      } catch {
        setSnackbar({ open: true, message: url, severity: 'info' });
      }
    }
  };

  return (
    <Box sx={{ bgcolor: '#F5F0E1', minHeight: '100vh', pt: { xs: 8, md: 10 }, pb: 8 }}>
      <Container maxWidth="lg">
        <Button startIcon={<ArrowLeft size={20} />} onClick={() => navigate(-1)} sx={{ color: '#2D5016', mb: 3, '&:hover': { bgcolor: 'rgba(45, 80, 22, 0.1)' } }}>
          Back to Recipes
        </Button>

        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <Card sx={{ borderRadius: 3, overflow: 'hidden', boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)' }}>
              <CardMedia component="img" image={recipe.image} alt={recipe.name || recipe.title} sx={{ height: 420, objectFit: 'cover' }} />
            </Card>
          </Grid>

          <Grid item xs={12} md={6}>
            <Box sx={{ mb: 2 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2, gap: 2 }}>
                <Typography variant="h4" sx={{ color: '#2D5016', fontWeight: 700, lineHeight: 1.2 }}>{recipe.name || recipe.title}</Typography>
                <Box sx={{ display: 'flex', gap: 1, flexShrink: 0 }}>
                  <Tooltip title={liked ? 'Unlike recipe' : 'Like recipe'}>
                    <IconButton onClick={handleLikeToggle} sx={{ color: liked ? '#2196F3' : '#666', bgcolor: liked ? 'rgba(33,150,243,0.1)' : 'white', border: '1px solid', borderColor: liked ? '#2196F3' : '#e0e0e0', '&:hover': { bgcolor: 'rgba(33, 150, 243, 0.15)' } }}>
                      <ThumbsUp size={22} fill={liked ? '#2196F3' : 'none'} />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Share recipe">
                    <IconButton onClick={handleShare} sx={{ color: '#666', bgcolor: 'white', border: '1px solid #e0e0e0', '&:hover': { bgcolor: 'rgba(45, 80, 22, 0.08)' } }}>
                      <Share2 size={22} />
                    </IconButton>
                  </Tooltip>
                </Box>
              </Box>

              <Box sx={{ display: 'flex', gap: 1.5, mb: 3, flexWrap: 'wrap' }}>
                <Chip icon={<Clock size={16} />} label={recipe.time || recipe.cookTime} sx={{ bgcolor: 'rgba(45, 80, 22, 0.1)', color: '#2D5016', '& .MuiChip-icon': { color: '#2D5016' } }} />
                <Chip label={recipe.difficulty} sx={{ bgcolor: recipe.difficulty === 'Easy' ? '#4CAF50' : recipe.difficulty === 'Medium' ? '#FF9800' : '#F44336', color: 'white', fontWeight: 600 }} />
                <Chip label={`${recipe.likes ?? 0} likes`} sx={{ bgcolor: liked ? '#2196F3' : 'white', color: liked ? 'white' : '#666', border: '1px solid', borderColor: liked ? '#2196F3' : '#e0e0e0', fontWeight: 600 }} />
                {recipe.rating && <Chip label={`★ ${recipe.rating}`} sx={{ bgcolor: '#FFF8E7', color: '#2D5016', border: '1px solid #e0e0e0', fontWeight: 600 }} />}
              </Box>

              <Typography variant="body1" sx={{ color: 'rgba(45, 80, 22, 0.8)', lineHeight: 1.7, mb: 3 }}>{recipe.description}</Typography>

              <Divider sx={{ my: 3 }} />

              <Typography variant="h6" sx={{ color: '#2D5016', fontWeight: 700, mb: 1 }}>Steps to Follow</Typography>
              <Typography variant="body2" sx={{ color: '#888', mb: 2 }}>{completedSteps.length} of {recipe.steps?.length || 0} completed</Typography>

              <List sx={{ width: '100%' }}>
                {(recipe.steps || []).map((step, index) => {
                  const done = completedSteps.includes(index);
                  return (
                    <ListItem key={index} sx={{ bgcolor: done ? '#E8F5E9' : 'white', border: done ? '1px solid #C8E6C9' : '1px solid transparent', borderRadius: 2, mb: 1, transition: 'all 0.2s ease', '&:hover': { transform: 'translateX(4px)', boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)' } }}>
                      <ListItemIcon sx={{ minWidth: 44 }}>
                        <Checkbox
                          checked={done}
                          onChange={() => handleStepToggle(index)}
                          icon={<Circle size={24} color="#9e9e9e" />}
                          checkedIcon={<CheckCircle size={24} color="#4CAF50" fill="#4CAF50" />}
                        />
                      </ListItemIcon>
                      <ListItemText primary={<Typography sx={{ color: done ? '#4CAF50' : '#2D5016', textDecoration: done ? 'line-through' : 'none', transition: 'all 0.2s ease', lineHeight: 1.5 }}>{step}</Typography>} />
                    </ListItem>
                  );
                })}
              </List>
            </Box>
          </Grid>
        </Grid>

        <CommentSection recipeId={String(id)} />
      </Container>

      <Snackbar open={snackbar.open} autoHideDuration={2500} onClose={() => setSnackbar({ ...snackbar, open: false })} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}>
        <Alert severity={snackbar.severity} onClose={() => setSnackbar({ ...snackbar, open: false })}>{snackbar.message}</Alert>
      </Snackbar>
    </Box>
  );
}

export default RecipeDetail;
