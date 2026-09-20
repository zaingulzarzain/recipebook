import { configureStore } from '@reduxjs/toolkit';
import recipeReducer from './slices/recipeSlice';

export const store = configureStore({
  reducer: {
    recipes: recipeReducer,
  },
  middleware: (getDefault) =>
    getDefault({
      serializableCheck: false,
    }),
});
