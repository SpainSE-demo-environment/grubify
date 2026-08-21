import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Box } from '@mui/material';

// Components
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import RestaurantPage from './pages/RestaurantPage';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import OrderTrackingPage from './pages/OrderTrackingPage';
import './App.css';

const HEADING_FONT = '"Jost", "Helvetica Neue", "Inter", Arial, sans-serif';

const theme = createTheme({
  palette: {
    primary: {
      main: '#111111', // Negro
      light: '#3A3A3A',
      dark: '#000000',
      contrastText: '#FFFFFF',
    },
    secondary: {
      main: '#8A8A8A', // Gris acento sutil
      light: '#B5B5B5',
      dark: '#5C5C5C',
    },
    success: {
      main: '#1F1F1F',
    },
    warning: {
      main: '#8A8A8A',
    },
    background: {
      default: '#FFFFFF',
      paper: '#FFFFFF',
    },
    text: {
      primary: '#111111',
      secondary: '#6B6B6B',
    },
    divider: 'rgba(17,17,17,0.12)',
  },
  typography: {
    fontFamily: '"Inter", "Helvetica Neue", "Arial", sans-serif',
    h1: {
      fontFamily: HEADING_FONT,
      fontSize: '3.5rem',
      fontWeight: 300,
      letterSpacing: '0.14em',
      textTransform: 'uppercase',
    },
    h2: {
      fontFamily: HEADING_FONT,
      fontSize: '2.5rem',
      fontWeight: 300,
      letterSpacing: '0.14em',
      textTransform: 'uppercase',
    },
    h3: {
      fontFamily: HEADING_FONT,
      fontSize: '1.9rem',
      fontWeight: 300,
      letterSpacing: '0.12em',
      textTransform: 'uppercase',
    },
    h4: {
      fontFamily: HEADING_FONT,
      fontWeight: 400,
      letterSpacing: '0.1em',
      textTransform: 'uppercase',
    },
    h5: {
      fontFamily: HEADING_FONT,
      fontWeight: 400,
      letterSpacing: '0.08em',
    },
    h6: {
      fontFamily: HEADING_FONT,
      fontWeight: 400,
      letterSpacing: '0.06em',
    },
    subtitle1: {
      letterSpacing: '0.02em',
    },
    body2: {
      letterSpacing: '0.01em',
    },
    button: {
      fontWeight: 500,
      letterSpacing: '0.16em',
      textTransform: 'uppercase',
    },
  },
  shape: {
    borderRadius: 0,
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: '#FFFFFF',
        },
      },
    },
    MuiButton: {
      defaultProps: {
        disableElevation: true,
      },
      styleOverrides: {
        root: {
          borderRadius: 0,
          paddingTop: 12,
          paddingBottom: 12,
          boxShadow: 'none',
          fontSize: '0.78rem',
        },
        containedPrimary: {
          backgroundColor: '#111111',
          color: '#FFFFFF',
          '&:hover': {
            backgroundColor: '#000000',
            boxShadow: 'none',
          },
        },
        outlinedPrimary: {
          borderColor: '#111111',
          '&:hover': {
            borderColor: '#000000',
            backgroundColor: 'rgba(17,17,17,0.04)',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 0,
          boxShadow: 'none',
          backgroundImage: 'none',
          border: '1px solid rgba(17,17,17,0.10)',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
        },
        rounded: {
          borderRadius: 0,
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 0,
          fontWeight: 500,
          letterSpacing: '0.04em',
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: 0,
        },
      },
    },
    MuiDialog: {
      styleOverrides: {
        paper: {
          borderRadius: 0,
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
          <Box sx={{ minHeight: '100vh', pb: 8 }}>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/restaurant/:id" element={<RestaurantPage />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="/checkout" element={<CheckoutPage />} />
              <Route path="/order-tracking/:orderId" element={<OrderTrackingPage />} />
            </Routes>
          </Box>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
