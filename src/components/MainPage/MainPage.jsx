import React, { useState } from 'react';
import { Box, Typography, Container, Grid, Card, CardMedia, CardContent, IconButton, TextField, Button, Chip, Menu, MenuItem, Badge, Tooltip, Snackbar, Alert } from '@mui/material';
import { Clock, Plus, Search, Filter, ThumbsUp, Trash2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { addRecipe, toggleLike } from '../../store/slices/recipeSlice';
import './MainPage.css';

function MainPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const recipes = useSelector((state) => state.recipes.recipes);
  const likedIds = useSelector((state) => state.recipes.likedIds);
  const favorites = useSelector((state) => state.recipes.favorites);
  // unified liked check
  const likedSet = new Set([...likedIds, ...favorites].map(String));

  const [activeTab, setActiveTab] = useState('explore');
  const [searchQuery, setSearchQuery] = useState('');
  const [filterAnchorEl, setFilterAnchorEl] = useState(null);
  const [activeFilter, setActiveFilter] = useState(null);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const [formData, setFormData] = useState({
    name: '',
    time: '',
    difficulty: '',
    description: '',
    image: '',
    steps: ['']
  });

  const handleFieldChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleStepChange = (index, value) => {
    setFormData(prev => ({
      ...prev,
      steps: prev.steps.map((step, i) => i === index ? value : step)
    }));
  };

  const addStep = () => {
    setFormData(prev => ({ ...prev, steps: [...prev.steps, ''] }));
  };

  const removeStep = (index) => {
    setFormData(prev => ({ ...prev, steps: prev.steps.filter((_, i) => i !== index) }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const cleanedSteps = formData.steps.map(s => s.trim()).filter(Boolean);
    if (cleanedSteps.length === 0) {
      setSnackbar({ open: true, message: 'Please add at least one step', severity: 'warning' });
      return;
    }
    if (!formData.image.match(/^https?:\/\/.+/)) {
      setSnackbar({ open: true, message: 'Please enter a valid image URL (https://...)', severity: 'warning' });
      return;
    }
    const newRecipe = {
      _id: Date.now().toString(),
      name: formData.name.trim(),
      title: formData.name.trim(),
      time: formData.time.trim(),
      cookTime: formData.time.trim(),
      difficulty: formData.difficulty,
      description: formData.description.trim(),
      image: formData.image.trim(),
      steps: cleanedSteps,
      likes: 0,
      rating: 4.5,
    };
    dispatch(addRecipe(newRecipe));
    setFormData({ name: '', time: '', difficulty: '', description: '', image: '', steps: [''] });
    setSnackbar({ open: true, message: 'Recipe posted successfully!', severity: 'success' });
    setActiveTab('explore');
  };

  const handleFilterClick = (event) => setFilterAnchorEl(event.currentTarget);
  const handleFilterClose = () => setFilterAnchorEl(null);
  const handleFilterSelect = (difficulty) => {
    setActiveFilter(activeFilter === difficulty ? null : difficulty);
    handleFilterClose();
  };

  const handleLikeToggle = (recipeId) => {
    dispatch(toggleLike(String(recipeId)));
  };

  const isLiked = (recipeId) => likedSet.has(String(recipeId));

  const getFilteredRecipes = () => {
    let filtered = recipes.filter(recipe => {
      const name = (recipe.name || recipe.title || '').toLowerCase();
      const desc = (recipe.description || '').toLowerCase();
      const q = searchQuery.toLowerCase();
      const matchesSearch = name.includes(q) || desc.includes(q);
      const matchesFilter = !activeFilter || recipe.difficulty === activeFilter;
      return matchesSearch && matchesFilter;
    });
    if (activeTab === 'liked') {
      filtered = filtered.filter(recipe => likedSet.has(String(recipe._id || recipe.id)));
    }
    return filtered;
  };

  const handleRecipeClick = (recipeId) => navigate(`/recipe/${recipeId}`);

  const filtered = getFilteredRecipes();

  const renderRecipeCard = (recipe) => {
    const id = recipe._id || recipe.id;
    const liked = isLiked(id);
    return (
      <Grid item xs={12} sm={6} md={4} key={id}>
        <Card
          onClick={() => handleRecipeClick(id)}
          sx={{
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            borderRadius: 3,
            overflow: 'hidden',
            transition: 'transform 0.3s ease, box-shadow 0.3s ease',
            cursor: 'pointer',
            '&:hover': { transform: 'translateY(-8px)', boxShadow: '0 12px 40px rgba(0, 0, 0, 0.15)' }
          }}
        >
          <Box sx={{ position: 'relative' }}>
            <CardMedia component="img" height="200" image={recipe.image} alt={recipe.name || recipe.title} sx={{ objectFit: 'cover' }} />
            <Chip
              label={recipe.difficulty}
              size="small"
              sx={{
                position: 'absolute', top: 12, right: 12,
                bgcolor: recipe.difficulty === 'Easy' ? '#4CAF50' : recipe.difficulty === 'Medium' ? '#FF9800' : '#F44336',
                color: 'white', fontWeight: 600
              }}
            />
            <Tooltip title={liked ? 'Unlike recipe' : 'Like recipe'}>
              <IconButton
                onClick={(e) => { e.stopPropagation(); handleLikeToggle(id); }}
                sx={{
                  position: 'absolute', top: 12, left: 12,
                  bgcolor: 'rgba(255, 255, 255, 0.9)',
                  '&:hover': { bgcolor: 'white', transform: 'scale(1.1)' },
                  transition: 'all 0.3s ease'
                }}
              >
                <ThumbsUp size={20} color={liked ? '#2196F3' : '#666'} fill={liked ? '#2196F3' : 'none'} />
              </IconButton>
            </Tooltip>
          </Box>
          <CardContent sx={{ flexGrow: 1, p: 3 }}>
            <Typography variant="h6" sx={{ fontWeight: 700, color: '#2D5016', mb: 1 }}>{recipe.name || recipe.title}</Typography>
            <Typography variant="body2" sx={{ color: 'rgba(45, 80, 22, 0.7)', mb: 2, lineHeight: 1.5 }}>{recipe.description}</Typography>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Clock size={16} color="#666" />
                <Typography variant="body2" sx={{ color: '#666' }}>{recipe.time || recipe.cookTime}</Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <ThumbsUp size={16} color={liked ? '#2196F3' : '#666'} fill={liked ? '#2196F3' : 'none'} />
                <Typography variant="body2" sx={{ color: liked ? '#2196F3' : '#666', fontWeight: liked ? 600 : 400 }}>{recipe.likes ?? 0}</Typography>
              </Box>
            </Box>
          </CardContent>
        </Card>
      </Grid>
    );
  };

  return (
    <Box sx={{ bgcolor: '#F5F0E1', minHeight: '100vh', pt: { xs: 8, md: 10 }, pb: 10 }}>
      <Container maxWidth="lg">
        {activeTab === 'explore' && (
          <Box>
            <Box sx={{ mb: 4 }}>
              <Typography variant="h4" sx={{ color: '#2D5016', fontWeight: 700, mb: 3 }}>Explore Recipes</Typography>
              <Box sx={{ position: 'relative' }}>
                <TextField
                  fullWidth
                  placeholder="Search recipes by name or description..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  sx={{
                    bgcolor: 'white', borderRadius: 2,
                    '& .MuiOutlinedInput-root': {
                      height: 56,
                      '& fieldset': { borderColor: 'rgba(45, 80, 22, 0.2)' },
                      '&:hover fieldset': { borderColor: 'rgba(45, 80, 22, 0.4)' },
                      '&.Mui-focused fieldset': { borderColor: '#2D5016' },
                      '& input::placeholder': { color: 'rgba(45, 80, 22, 0.5)', opacity: 1 },
                    },
                  }}
                  InputProps={{
                    startAdornment: (<Search size={20} color="#666" style={{ marginRight: 8 }} />),
                    endAdornment: (
                      <IconButton onClick={handleFilterClick} sx={{ color: activeFilter ? '#2D5016' : '#666', '&:hover': { bgcolor: 'rgba(45, 80, 22, 0.1)' } }}>
                        <Badge color="primary" variant="dot" invisible={!activeFilter}><Filter size={20} /></Badge>
                      </IconButton>
                    ),
                  }}
                />
                <Menu anchorEl={filterAnchorEl} open={Boolean(filterAnchorEl)} onClose={handleFilterClose} PaperProps={{ sx: { mt: 1, borderRadius: 2, boxShadow: '0 4px 20px rgba(0, 0, 0, 0.15)' } }}>
                  <MenuItem onClick={() => handleFilterSelect('Easy')} sx={{ color: activeFilter === 'Easy' ? '#4CAF50' : 'inherit', '&:hover': { bgcolor: 'rgba(76, 175, 80, 0.1)' } }}>Easy</MenuItem>
                  <MenuItem onClick={() => handleFilterSelect('Medium')} sx={{ color: activeFilter === 'Medium' ? '#FF9800' : 'inherit', '&:hover': { bgcolor: 'rgba(255, 152, 0, 0.1)' } }}>Medium</MenuItem>
                  <MenuItem onClick={() => handleFilterSelect('Hard')} sx={{ color: activeFilter === 'Hard' ? '#F44336' : 'inherit', '&:hover': { bgcolor: 'rgba(244, 67, 54, 0.1)' } }}>Hard</MenuItem>
                  {activeFilter && <MenuItem onClick={() => handleFilterSelect(activeFilter)} sx={{ color: '#666', fontStyle: 'italic' }}>Clear filter</MenuItem>}
                </Menu>
              </Box>
            </Box>
            <Grid container spacing={3}>
              {filtered.length ? filtered.map(renderRecipeCard) : (
                <Grid item xs={12}><Box sx={{ textAlign: 'center', py: 6 }}><Typography sx={{ color: '#666' }}>No recipes found. Try a different search or filter.</Typography></Box></Grid>
              )}
            </Grid>
          </Box>
        )}

        {activeTab === 'liked' && (
          <Box>
            <Box sx={{ mb: 4 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3, flexWrap: 'wrap', gap: 2 }}>
                <Typography variant="h4" sx={{ color: '#2D5016', fontWeight: 700 }}>Liked Recipes</Typography>
                <Button variant="outlined" startIcon={<ThumbsUp size={20} />} onClick={() => setActiveTab('explore')} sx={{ color: '#2D5016', borderColor: '#2D5016', '&:hover': { borderColor: '#1f3710', bgcolor: 'rgba(45, 80, 22, 0.1)' } }}>Explore More</Button>
              </Box>
              {likedSet.size === 0 ? (
                <Box sx={{ textAlign: 'center', py: 8 }}>
                  <ThumbsUp size={48} color="#666" style={{ marginBottom: 16 }} />
                  <Typography variant="h6" sx={{ color: '#666', mb: 2 }}>No liked recipes yet</Typography>
                  <Typography variant="body1" sx={{ color: 'rgba(45, 80, 22, 0.7)', mb: 3 }}>Like recipes by clicking the thumbs up icon</Typography>
                  <Button variant="contained" onClick={() => setActiveTab('explore')} sx={{ color: 'white', bgcolor: '#2D5016', '&:hover': { bgcolor: '#1f3710' } }}>Explore Recipes</Button>
                </Box>
              ) : filtered.length === 0 ? (
                <Box sx={{ textAlign: 'center', py: 6 }}><Typography sx={{ color: '#666' }}>No liked recipes match your search.</Typography></Box>
              ) : (
                <Grid container spacing={3}>{filtered.map(renderRecipeCard)}</Grid>
              )}
            </Box>
          </Box>
        )}

        {activeTab === 'post' && (
          <Box>
            <Typography variant="h4" sx={{ color: '#2D5016', fontWeight: 700, mb: 3 }}>Post a New Recipe</Typography>
            <Box component="form" onSubmit={handleSubmit} sx={{ bgcolor: 'white', borderRadius: 3, p: 4, boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)' }}>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <TextField fullWidth label="Recipe Name" value={formData.name} onChange={(e) => handleFieldChange('name', e.target.value)} required sx={{ '& .MuiOutlinedInput-root': { '& fieldset': { borderColor: 'rgba(45, 80, 22, 0.2)' }, '&:hover fieldset': { borderColor: 'rgba(45, 80, 22, 0.4)' }, '&.Mui-focused fieldset': { borderColor: '#2D5016' } } }} />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField fullWidth label="Cooking Time" value={formData.time} onChange={(e) => handleFieldChange('time', e.target.value)} required placeholder="e.g., 30 mins" sx={{ '& .MuiOutlinedInput-root': { '& fieldset': { borderColor: 'rgba(45, 80, 22, 0.2)' }, '&:hover fieldset': { borderColor: 'rgba(45, 80, 22, 0.4)' }, '&.Mui-focused fieldset': { borderColor: '#2D5016' } } }} />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField fullWidth select label="Difficulty" value={formData.difficulty} onChange={(e) => handleFieldChange('difficulty', e.target.value)} required sx={{ '& .MuiOutlinedInput-root': { '& fieldset': { borderColor: 'rgba(45, 80, 22, 0.2)' }, '&:hover fieldset': { borderColor: 'rgba(45, 80, 22, 0.4)' }, '&.Mui-focused fieldset': { borderColor: '#2D5016' } } }}>
                    <MenuItem value="Easy">Easy</MenuItem>
                    <MenuItem value="Medium">Medium</MenuItem>
                    <MenuItem value="Hard">Hard</MenuItem>
                  </TextField>
                </Grid>
                <Grid item xs={12}>
                  <TextField fullWidth label="Description" value={formData.description} onChange={(e) => handleFieldChange('description', e.target.value)} required multiline rows={3} sx={{ '& .MuiOutlinedInput-root': { '& fieldset': { borderColor: 'rgba(45, 80, 22, 0.2)' }, '&:hover fieldset': { borderColor: 'rgba(45, 80, 22, 0.4)' }, '&.Mui-focused fieldset': { borderColor: '#2D5016' } } }} />
                </Grid>
                <Grid item xs={12}>
                  <TextField fullWidth label="Image URL" value={formData.image} onChange={(e) => handleFieldChange('image', e.target.value)} required placeholder="https://example.com/recipe-image.jpg" helperText="Use a direct image link (Unsplash, etc.)" sx={{ '& .MuiOutlinedInput-root': { '& fieldset': { borderColor: 'rgba(45, 80, 22, 0.2)' }, '&:hover fieldset': { borderColor: 'rgba(45, 80, 22, 0.4)' }, '&.Mui-focused fieldset': { borderColor: '#2D5016' } } }} />
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="h6" sx={{ color: '#2D5016', mb: 2, fontWeight: 600 }}>Recipe Steps</Typography>
                  {formData.steps.map((step, index) => (
                    <Box key={index} sx={{ display: 'flex', gap: 2, mb: 2, alignItems: 'flex-start' }}>
                      <Box sx={{ minWidth: 32, height: 32, borderRadius: '50%', bgcolor: '#2D5016', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 600, flexShrink: 0, mt: 1 }}>{index + 1}</Box>
                      <TextField fullWidth value={step} onChange={(e) => handleStepChange(index, e.target.value)} placeholder={`Step ${index + 1}`} multiline rows={1} sx={{ '& .MuiOutlinedInput-root': { '& fieldset': { borderColor: 'rgba(45, 80, 22, 0.2)' }, '&:hover fieldset': { borderColor: 'rgba(45, 80, 22, 0.4)' }, '&.Mui-focused fieldset': { borderColor: '#2D5016' } } }} />
                      {formData.steps.length > 1 && (
                        <IconButton onClick={() => removeStep(index)} sx={{ color: '#666', '&:hover': { color: '#F44336', bgcolor: 'rgba(244, 67, 54, 0.1)' }, mt: 1 }}><Trash2 size={20} /></IconButton>
                      )}
                    </Box>
                  ))}
                  <Button startIcon={<Plus size={20} />} onClick={addStep} sx={{ color: '#2D5016', '&:hover': { bgcolor: 'rgba(45, 80, 22, 0.1)' } }}>Add Step</Button>
                </Grid>
                <Grid item xs={12}>
                  <Button type="submit" variant="contained" fullWidth sx={{ bgcolor: '#2D5016', py: 1.5, color: 'white', '&:hover': { bgcolor: '#1f3710' } }}>Post Recipe</Button>
                </Grid>
              </Grid>
            </Box>
          </Box>
        )}

        <Box sx={{ position: 'fixed', bottom: 24, left: '50%', transform: 'translateX(-50%)', bgcolor: 'white', borderRadius: 4, boxShadow: '0 4px 20px rgba(0, 0, 0, 0.15)', p: 1, display: 'flex', gap: 1, zIndex: 10 }}>
          <Button variant={activeTab === 'explore' ? 'contained' : 'text'} onClick={() => setActiveTab('explore')} sx={{ borderRadius: 2, px: 3, bgcolor: activeTab === 'explore' ? '#2D5016' : 'transparent', color: activeTab === 'explore' ? 'white' : '#2D5016', '&:hover': { bgcolor: activeTab === 'explore' ? '#1f3710' : 'rgba(45, 80, 22, 0.1)' } }}>Explore</Button>
          <Button variant={activeTab === 'liked' ? 'contained' : 'text'} onClick={() => setActiveTab('liked')} startIcon={<ThumbsUp size={18} fill={activeTab === 'liked' ? 'white' : 'none'} />} sx={{ borderRadius: 2, px: 3, bgcolor: activeTab === 'liked' ? '#2196F3' : 'transparent', color: activeTab === 'liked' ? 'white' : '#2196F3', '&:hover': { bgcolor: activeTab === 'liked' ? '#1976D2' : 'rgba(33, 150, 243, 0.1)' } }}>Liked {likedSet.size > 0 ? `(${likedSet.size})` : ''}</Button>
          <Button variant={activeTab === 'post' ? 'contained' : 'text'} onClick={() => setActiveTab('post')} sx={{ borderRadius: 2, px: 3, bgcolor: activeTab === 'post' ? '#2D5016' : 'transparent', color: activeTab === 'post' ? 'white' : '#2D5016', '&:hover': { bgcolor: activeTab === 'post' ? '#1f3710' : 'rgba(45, 80, 22, 0.1)' } }}>Post Recipe</Button>
        </Box>
      </Container>
      <Snackbar open={snackbar.open} autoHideDuration={3000} onClose={() => setSnackbar({ ...snackbar, open: false })} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}>
        <Alert severity={snackbar.severity} onClose={() => setSnackbar({ ...snackbar, open: false })} sx={{ width: '100%' }}>{snackbar.message}</Alert>
      </Snackbar>
    </Box>
  );
}

export default MainPage;
