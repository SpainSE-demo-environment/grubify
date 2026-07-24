import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Container } from '@mui/material';

// Components
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import ClinicPage from './pages/ClinicPage';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import AppointmentTrackingPage from './pages/AppointmentTrackingPage';
import './App.css';

const theme = createTheme({
  palette: {
    primary: {
      main: '#00897B', // Teal clínico
      light: '#4DB6AC',
      dark: '#00695C',
    },
    secondary: {
      main: '#1976D2', // Azul clínico
      light: '#64B5F6',
      dark: '#0D47A1',
    },
    background: {
      default: '#F4F8F7',
      paper: '#FFFFFF',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontSize: '3rem',
      fontWeight: 700,
    },
    h2: {
      fontSize: '2.5rem',
      fontWeight: 600,
    },
    h3: {
      fontSize: '2rem',
      fontWeight: 600,
    },
  },
  shape: {
    borderRadius: 12,
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
              <Route path="/clinic/:id" element={<ClinicPage />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="/checkout" element={<CheckoutPage />} />
              <Route path="/appointment-tracking/:appointmentId" element={<AppointmentTrackingPage />} />
            </Routes>
          </Container>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
