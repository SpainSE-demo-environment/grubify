import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Container,
  Card,
  CardContent,
  Button,
  IconButton,
  Divider,
  Paper,
  Alert,
  CircularProgress,
} from '@mui/material';
import {
  Delete as DeleteIcon,
  CalendarMonth as CalendarMonthIcon,
  Timelapse as DurationIcon,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { AppointmentCart } from '../types';
import { appointmentCartService } from '../services/api';

const CartPage: React.FC = () => {
  const navigate = useNavigate();
  const [cart, setCart] = useState<AppointmentCart | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    try {
      setLoading(true);
      const cartData = await appointmentCartService.get('user123');
      setCart(cartData);
      setError(null);
    } catch (err) {
      setError('No se pudo cargar la cesta. Inténtalo de nuevo más tarde.');
      console.error('Error al cargar la cesta:', err);
    } finally {
      setLoading(false);
    }
  };

  const removeItem = async (itemId: number) => {
    if (!cart) return;

    try {
      const updatedCart = await appointmentCartService.removeItem('user123', itemId);
      setCart(updatedCart);
    } catch (err) {
      console.error('Error al eliminar el servicio de la cesta:', err);
    }
  };

  const clearCart = async () => {
    try {
      await appointmentCartService.clear('user123');
      setCart({ ...cart!, items: [] });
    } catch (err) {
      console.error('Error al vaciar la cesta:', err);
    }
  };

  const handleCheckout = () => {
    navigate('/checkout');
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
        <CircularProgress size={60} />
      </Box>
    );
  }

  if (error) {
    return (
      <Container maxWidth="md">
        <Alert severity="error" sx={{ mt: 4 }}>
          {error}
        </Alert>
        <Box display="flex" justifyContent="center" mt={2}>
          <Button variant="contained" onClick={fetchCart}>
            Reintentar
          </Button>
        </Box>
      </Container>
    );
  }

  if (!cart || cart.items.length === 0) {
    return (
      <Container maxWidth="md">
        <Box textAlign="center" py={8}>
          <CalendarMonthIcon sx={{ fontSize: 80, color: 'text.secondary', mb: 2 }} />
          <Typography variant="h4" gutterBottom>
            Tu cesta de citas está vacía
          </Typography>
          <Typography variant="body1" color="text.secondary" gutterBottom>
            ¡Añade servicios médicos para empezar a reservar!
          </Typography>
          <Button variant="contained" onClick={() => navigate('/')} sx={{ mt: 2 }}>
            Explorar centros
          </Button>
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg">
      <Typography variant="h3" component="h1" gutterBottom>
        Tu cesta de citas
      </Typography>

      <Box sx={{ display: 'flex', gap: 4, flexDirection: { xs: 'column', md: 'row' } }}>
        {/* Servicios de la cesta */}
        <Box sx={{ flex: 1 }}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Typography variant="h5">
                  Servicios ({cart.items.length})
                </Typography>
                <Button
                  color="error"
                  onClick={clearCart}
                  disabled={cart.items.length === 0}
                >
                  Vaciar cesta
                </Button>
              </Box>

              {cart.items.map((item, index) => (
                <Box key={item.id}>
                  <Box sx={{ display: 'flex', gap: 2, py: 2 }}>
                    <Box
                      component="img"
                      src={item.service.imageUrl}
                      alt={item.service.name}
                      sx={{
                        width: 80,
                        height: 80,
                        objectFit: 'cover',
                        borderRadius: 1,
                      }}
                    />
                    <Box sx={{ flex: 1 }}>
                      <Typography variant="h6" gutterBottom>
                        {item.service.name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" gutterBottom>
                        {item.service.description}
                      </Typography>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                        <DurationIcon sx={{ fontSize: 16, color: 'text.secondary' }} />
                        <Typography variant="body2" color="text.secondary">
                          {item.service.durationMinutes} min
                        </Typography>
                      </Box>
                      {item.notes && (
                        <Typography variant="body2" sx={{ fontStyle: 'italic', color: 'text.secondary', mt: 0.5 }}>
                          Motivo: {item.notes}
                        </Typography>
                      )}
                      <Typography variant="h6" color="primary" sx={{ mt: 1 }}>
                        {item.service.price.toFixed(2)} €
                      </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1 }}>
                      <IconButton
                        color="error"
                        onClick={() => removeItem(item.id)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Box>
                  </Box>
                  {index < cart.items.length - 1 && <Divider />}
                </Box>
              ))}
            </CardContent>
          </Card>
        </Box>

        {/* Resumen de la reserva */}
        <Box sx={{ width: { xs: '100%', md: 350 } }}>
          <Paper sx={{ p: 3, position: 'sticky', top: 24 }}>
            <Typography variant="h5" gutterBottom>
              Resumen de la reserva
            </Typography>

            <Box sx={{ space: 2 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <Typography>Subtotal (copagos)</Typography>
                <Typography>{cart.subTotal.toFixed(2)} €</Typography>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                <Typography>Tasa de gestión</Typography>
                <Typography>{cart.bookingFee.toFixed(2)} €</Typography>
              </Box>
              <Divider sx={{ my: 2 }} />
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
                <Typography variant="h6" fontWeight="bold">
                  Total
                </Typography>
                <Typography variant="h6" fontWeight="bold">
                  {cart.total.toFixed(2)} €
                </Typography>
              </Box>
            </Box>

            <Button
              variant="contained"
              fullWidth
              size="large"
              onClick={handleCheckout}
              sx={{ mb: 2 }}
            >
              Continuar con la reserva
            </Button>

            <Button
              variant="outlined"
              fullWidth
              onClick={() => navigate('/')}
            >
              Seguir explorando
            </Button>
          </Paper>
        </Box>
      </Box>
    </Container>
  );
};

export default CartPage;
