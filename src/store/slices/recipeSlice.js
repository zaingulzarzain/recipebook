import { createSlice } from '@reduxjs/toolkit';

const defaultRecipes = [
  {
    _id: '1',
    name: 'Classic Pancakes',
    title: 'Classic Pancakes',
    time: '15 mins',
    cookTime: '15 mins',
    description: 'Fluffy pancakes with maple syrup and fresh berries. Perfect for a weekend brunch.',
    image: 'https://images.unsplash.com/photo-1528207776546-365bb10ee283?w=500',
    difficulty: 'Easy',
    likes: 128,
    rating: 4.8,
    steps: [
      'In a large bowl, whisk together flour, sugar, baking powder, and salt.',
      'In a separate bowl, whisk together milk, egg, and melted butter.',
      'Pour the wet ingredients into the dry ingredients and stir until just combined. Do not overmix; lumps are okay.',
      'Heat a lightly oiled griddle or frying pan over medium-high heat. Pour or scoop about 1/4 cup of batter per pancake onto the griddle.',
      'Cook for 2-3 minutes per side, or until golden brown and cooked through.',
      'Serve warm with your favorite toppings.'
    ]
  },
  {
    _id: '2',
    name: 'Avocado Toast',
    title: 'Avocado Toast',
    time: '10 mins',
    cookTime: '10 mins',
    description: 'Crispy sourdough topped with smashed avocado, cherry tomatoes, and microgreens. A healthy and delicious breakfast or snack.',
    image: 'https://images.unsplash.com/photo-1588137378633-dea1336ce1e2?w=500',
    difficulty: 'Easy',
    likes: 95,
    rating: 4.7,
    steps: [
      'Toast your favorite slice of sourdough bread until golden and crispy.',
      'In a small bowl, mash ripe avocado with a fork. Season with salt, pepper, and a squeeze of lemon juice.',
      'Spread the mashed avocado generously over the toasted bread.',
      'Top with sliced cherry tomatoes and a sprinkle of microgreens.',
      'Optionally, drizzle with a little olive oil or balsamic glaze before serving.'
    ]
  },
  {
    _id: '3',
    name: 'Spaghetti Aglio e Olio',
    title: 'Spaghetti Aglio e Olio',
    time: '20 mins',
    cookTime: '20 mins',
    description: 'Simple yet flavorful pasta tossed in garlic, olive oil, and fresh parsley. A quick and satisfying Italian classic.',
    image: 'https://images.unsplash.com/photo-1612874742237-6526221588e3?w=500',
    difficulty: 'Medium',
    likes: 156,
    rating: 4.6,
    steps: [
      'Cook spaghetti according to package directions until al dente. Reserve about 1 cup of pasta water before draining.',
      'While pasta cooks, heat olive oil in a large skillet over medium-low heat. Add sliced garlic and red pepper flakes and cook until fragrant, about 2-3 minutes.',
      'Add the cooked and drained spaghetti to the skillet with the garlic and oil. Toss to combine.',
      'Gradually add reserved pasta water, about 1/4 cup at a time, tossing constantly, until a light sauce forms.',
      'Stir in fresh chopped parsley. Season with salt and pepper to taste.',
      'Serve immediately, garnished with extra parsley if desired.'
    ]
  },
  {
    _id: '4',
    name: 'Chocolate Lava Cake',
    title: 'Chocolate Lava Cake',
    time: '45 mins',
    cookTime: '45 mins',
    description: 'Decadent chocolate cake with a molten center, served warm with vanilla ice cream. An impressive dessert for any occasion.',
    image: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=500',
    difficulty: 'Hard',
    likes: 203,
    rating: 4.9,
    steps: [
      'Preheat oven to 425°F (220°C). Grease and flour four 6-ounce ramekins.',
      'In a double boiler or microwave, melt butter and chocolate together until smooth.',
      'In a large bowl, whisk eggs, egg yolks, and sugar until light and creamy.',
      'Gradually whisk the melted chocolate mixture into the egg mixture.',
      'Sift in the flour and whisk until just combined. Do not overmix.',
      'Divide the batter evenly among the prepared ramekins.',
      'Bake for 12-14 minutes, or until the edges are set but the center is still gooey.',
      'Carefully invert each cake onto a serving plate. Let stand for 1 minute.',
      'Serve immediately with a scoop of vanilla ice cream.'
    ]
  },
  {
    _id: '5',
    name: 'Classic Margherita Pizza',
    title: 'Classic Margherita Pizza',
    time: '30 mins',
    cookTime: '30 mins',
    description: 'A traditional Italian pizza with fresh tomatoes, mozzarella, and basil. Simple, fresh, and timeless.',
    image: 'https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?w=500',
    difficulty: 'Easy',
    likes: 142,
    rating: 4.8,
    steps: [
      'Preheat oven to 475°F (245°C) with a pizza stone if available.',
      'Stretch pizza dough on a floured surface to a 12-inch circle.',
      'Spread a thin layer of tomato sauce, leaving a border for the crust.',
      'Top with sliced fresh mozzarella and drizzle with olive oil.',
      'Bake for 10-12 minutes until crust is golden and cheese is bubbly.',
      'Remove, top with fresh basil leaves, slice and serve immediately.'
    ]
  },
  {
    _id: '6',
    name: 'Creamy Mushroom Pasta',
    title: 'Creamy Mushroom Pasta',
    time: '25 mins',
    cookTime: '25 mins',
    description: 'Rich and creamy pasta with sautéed mushrooms and herbs. Comfort food at its finest.',
    image: 'https://images.unsplash.com/photo-1476124369491-e7addf5db371?w=500',
    difficulty: 'Medium',
    likes: 118,
    rating: 4.6,
    steps: [
      'Cook pasta according to package directions. Reserve 1 cup pasta water.',
      'Sauté sliced mushrooms in butter and olive oil until golden, about 6-8 minutes.',
      'Add minced garlic and thyme, cook 1 minute more.',
      'Pour in heavy cream and simmer gently until slightly thickened.',
      'Toss in cooked pasta, add pasta water as needed to create silky sauce.',
      'Finish with grated parmesan, salt, pepper, and fresh parsley.'
    ]
  }
];

// helpers for localStorage persistence
const load = (key, fallback) => {
  try {
    const v = localStorage.getItem(key);
    return v ? JSON.parse(v) : fallback;
  } catch {
    return fallback;
  }
};
const save = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch { /* ignore */ }
};

const storedRecipes = load('flavorvault_recipes', null);
const storedFavorites = load('flavorvault_favorites', []);
const storedLiked = load('flavorvault_liked', null); // migrate old
const storedComments = load('flavorvault_comments', {});
const storedSteps = load('flavorvault_steps', {});

// migrate favorites -> liked if liked not set
const initialFavorites = storedFavorites;
const initialLiked = storedLiked !== null ? storedLiked : [...storedFavorites];

const initialState = {
  recipes: storedRecipes || defaultRecipes,
  favorites: initialFavorites,
  likedIds: initialLiked,
  comments: storedComments, // { [recipeId]: Comment[] }
  completedSteps: storedSteps, // { [recipeId]: number[] }
};

const recipeSlice = createSlice({
  name: 'recipes',
  initialState,
  reducers: {
    addRecipe: (state, action) => {
      const recipe = {
        likes: 0,
        rating: 4.5,
        ...action.payload,
        _id: action.payload._id || Date.now().toString(),
        title: action.payload.title || action.payload.name,
        cookTime: action.payload.cookTime || action.payload.time,
      };
      state.recipes.push(recipe);
      save('flavorvault_recipes', state.recipes);
    },
    toggleFavorite: (state, action) => {
      const id = String(action.payload);
      const idx = state.favorites.indexOf(id);
      if (idx >= 0) state.favorites.splice(idx, 1);
      else state.favorites.push(id);
      // keep likedIds in sync for UI consistency
      const likedIdx = state.likedIds.indexOf(id);
      if (idx >= 0 && likedIdx >= 0) state.likedIds.splice(likedIdx, 1);
      if (idx === -1 && likedIdx === -1) state.likedIds.push(id);
      else if (idx >= 0 && likedIdx === -1) {} // already removed from favorites but liked? keep separate
      else if (idx === -1 && likedIdx >= 0) {} // already liked
      save('flavorvault_favorites', state.favorites);
      save('flavorvault_liked', state.likedIds);
    },
    addToFavorites: (state, action) => {
      const id = String(action.payload);
      if (!state.favorites.includes(id)) {
        state.favorites.push(id);
        save('flavorvault_favorites', state.favorites);
      }
      if (!state.likedIds.includes(id)) {
        state.likedIds.push(id);
        save('flavorvault_liked', state.likedIds);
      }
    },
    removeFromFavorites: (state, action) => {
      const id = String(action.payload);
      state.favorites = state.favorites.filter(x => x !== id);
      state.likedIds = state.likedIds.filter(x => x !== id);
      save('flavorvault_favorites', state.favorites);
      save('flavorvault_liked', state.likedIds);
    },
    toggleLike: (state, action) => {
      const id = String(action.payload);
      const isLiked = state.likedIds.includes(id);
      const recipe = state.recipes.find(r => String(r._id) === id || String(r.id) === id);
      if (isLiked) {
        state.likedIds = state.likedIds.filter(x => x !== id);
        state.favorites = state.favorites.filter(x => x !== id);
        if (recipe && typeof recipe.likes === 'number') recipe.likes = Math.max(0, recipe.likes - 1);
      } else {
        state.likedIds.push(id);
        if (!state.favorites.includes(id)) state.favorites.push(id);
        if (recipe && typeof recipe.likes === 'number') recipe.likes += 1;
      }
      save('flavorvault_liked', state.likedIds);
      save('flavorvault_favorites', state.favorites);
      save('flavorvault_recipes', state.recipes);
    },
    toggleStep: (state, action) => {
      const { recipeId, stepIndex } = action.payload;
      const rid = String(recipeId);
      if (!state.completedSteps[rid]) state.completedSteps[rid] = [];
      const arr = state.completedSteps[rid];
      const idx = arr.indexOf(stepIndex);
      if (idx >= 0) arr.splice(idx, 1);
      else arr.push(stepIndex);
      save('flavorvault_steps', state.completedSteps);
      // legacy per-recipe key for backwards compat
      try { localStorage.setItem(`recipe-${rid}-steps`, JSON.stringify(arr)); } catch {}
    },
    addComment: (state, action) => {
      const { recipeId, text, author } = action.payload;
      const rid = String(recipeId);
      if (!state.comments[rid]) state.comments[rid] = [];
      const comment = {
        id: Date.now(),
        author: author || 'Anonymous User',
        text: String(text).trim(),
        date: new Date().toLocaleString(),
      };
      if (comment.text) {
        state.comments[rid].push(comment);
        save('flavorvault_comments', state.comments);
        try { localStorage.setItem(`recipe-${rid}-comments`, JSON.stringify(state.comments[rid])); } catch {}
      }
    },
    setRecipes: (state, action) => {
      state.recipes = action.payload;
      save('flavorvault_recipes', state.recipes);
    }
  }
});

export const {
  addRecipe,
  toggleFavorite,
  addToFavorites,
  removeFromFavorites,
  toggleLike,
  toggleStep,
  addComment,
  setRecipes
} = recipeSlice.actions;

export default recipeSlice.reducer;
