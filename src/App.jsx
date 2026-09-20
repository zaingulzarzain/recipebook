import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ThemeProvider, createTheme, CssBaseline } from '@mui/material';
import { store } from './store/store';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import MainPage from './components/MainPage/MainPage';
import RecipeDetail from './components/RecipeDetail/RecipeDetail';
import LandingPage from './pages/LandingPage';
import About from './pages/About';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import ForgotPass from './pages/ForgotPass';
import './App.css';

const theme = createTheme({
  palette: {
    primary: { main: '#FF6B35' },
    secondary: { main: '#2D5016' },
    background: { default: '#FFF8E7' },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: { fontWeight: 800 },
    h2: { fontWeight: 700 },
    h3: { fontWeight: 700 },
    h4: { fontWeight: 600 },
    h5: { fontWeight: 600 },
    h6: { fontWeight: 600 },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: { textTransform: 'none', borderRadius: 8, fontWeight: 600 },
      },
    },
    MuiCard: {
      styleOverrides: { root: { borderRadius: 12 } },
    },
  },
});

function AppContent() {
  const location = useLocation();
  // Hide footer on immersive recipe views where bottom nav is present
  const hideFooter = location.pathname.startsWith('/recipes') || location.pathname.startsWith('/recipe');
  return (
    <div className="AppContent">
      <Navbar />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/recipes" element={<MainPage />} />
        <Route path="/recipe/:id" element={<RecipeDetail />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/forgot-password" element={<ForgotPass />} />
      </Routes>
      {!hideFooter && <Footer />}
    </div>
  );
}

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Router>
          <AppContent />
        </Router>
      </ThemeProvider>
    </Provider>
  );
}

export default App;
