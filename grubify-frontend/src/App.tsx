import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Container } from '@mui/material';

// Components
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import RestaurantPage from './pages/RestaurantPage';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import OrderTrackingPage from './pages/OrderTrackingPage';
import './App.css';

const theme = createTheme({
  palette: {
    primary: {
      main: '#16A34A', // Green
      light: '#22C55E',
      dark: '#15803D',
    },
    secondary: {
      main: '#F59E0B', // Electric amber
      light: '#FBBF24',
      dark: '#B45309',
    },
    success: {
      main: '#059669',
    },
    warning: {
      main: '#F59E0B',
    },
    background: {
      default: '#F6F7FB',
      paper: '#FFFFFF',
    },
    text: {
      primary: '#111827',
      secondary: '#5B6472',
    },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontSize: '3.25rem',
      fontWeight: 800,
      letterSpacing: '-0.02em',
    },
    h2: {
      fontSize: '2.6rem',
      fontWeight: 800,
      letterSpacing: '-0.02em',
    },
    h3: {
      fontSize: '2rem',
      fontWeight: 700,
      letterSpacing: '-0.01em',
    },
    h5: {
      fontWeight: 700,
      letterSpacing: '-0.01em',
    },
    h6: {
      fontWeight: 700,
    },
    button: {
      fontWeight: 600,
      textTransform: 'none',
    },
  },
  shape: {
    borderRadius: 14,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          paddingTop: 10,
          paddingBottom: 10,
          boxShadow: 'none',
        },
        containedPrimary: {
          background: 'linear-gradient(135deg, #16A34A 0%, #65A30D 100%)',
          '&:hover': {
            background: 'linear-gradient(135deg, #15803D 0%, #4D7C0F 100%)',
            boxShadow: '0 8px 20px -6px rgba(22, 163, 74, 0.5)',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 18,
          boxShadow: '0 6px 24px -12px rgba(17, 24, 39, 0.18)',
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          fontWeight: 600,
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        rounded: {
          borderRadius: 16,
        },
      },
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <div className="App">
          <Navbar />
          <Container maxWidth="xl" sx={{ mt: 3, mb: 3 }}>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/restaurant/:id" element={<RestaurantPage />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="/checkout" element={<CheckoutPage />} />
              <Route path="/order-tracking/:orderId" element={<OrderTrackingPage />} />
            </Routes>
          </Container>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
