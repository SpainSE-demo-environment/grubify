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
  Add as AddIcon,
  Remove as RemoveIcon,
  Delete as DeleteIcon,
  ShoppingCart as CartIcon,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { Cart, CartItem } from '../types';
import { cartService } from '../services/api';
import { ProductIconBox, getProductMeta, getCategoryColor, resolveCategory } from '../theme/bankVisuals';

const CartPage: React.FC = () => {
  const navigate = useNavigate();
  const [cart, setCart] = useState<Cart | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    try {
      setLoading(true);
      const cartData = await cartService.get('user123');
      setCart(cartData);
      setError(null);
    } catch (err) {
      setError('No se pudo cargar la solicitud. Inténtalo de nuevo más tarde.');
      console.error('Error fetching cart:', err);
    } finally {
      setLoading(false);
    }
  };

  const updateQuantity = async (itemId: number, newQuantity: number) => {
    if (!cart) return;

    try {
      const updatedCart = await cartService.updateItem('user123', itemId, {
        quantity: newQuantity,
        specialInstructions: cart.items.find(item => item.id === itemId)?.specialInstructions || '',
      });
      setCart(updatedCart);
    } catch (err) {
      console.error('Error updating cart item:', err);
    }
  };

  const removeItem = async (itemId: number) => {
    if (!cart) return;

    try {
      const updatedCart = await cartService.removeItem('user123', itemId);
      setCart(updatedCart);
    } catch (err) {
      console.error('Error removing cart item:', err);
    }
  };

  const clearCart = async () => {
    try {
      await cartService.clear('user123');
      setCart({ ...cart!, items: [] });
    } catch (err) {
      console.error('Error clearing cart:', err);
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
          <CartIcon sx={{ fontSize: 80, color: 'text.secondary', mb: 2 }} />
          <Typography variant="h4" gutterBottom>
            No tienes productos seleccionados
          </Typography>
          <Typography variant="body1" color="text.secondary" gutterBottom>
            ¡Añade productos de telco para empezar!
          </Typography>
          <Button variant="contained" onClick={() => navigate('/')} sx={{ mt: 2 }}>
            Ver productos
          </Button>
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg">
      <Typography variant="h3" component="h1" gutterBottom>
        Tu solicitud
      </Typography>

      <Box sx={{ display: 'flex', gap: 4, flexDirection: { xs: 'column', md: 'row' } }}>
        {/* Cart Items */}
        <Box sx={{ flex: 1 }}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Typography variant="h5">
                  Productos ({cart.items.length})
                </Typography>
                <Button
                  color="error"
                  onClick={clearCart}
                  disabled={cart.items.length === 0}
                >
                  Vaciar solicitud
                </Button>
              </Box>

              {cart.items.map((item, index) => {
                const meta = getProductMeta(item.foodItem.name);
                const cat = getCategoryColor(resolveCategory(item.foodItem.name, item.foodItem.category));
                return (
                <Box key={item.id}>
                  <Box sx={{ display: 'flex', gap: 2, py: 2 }}>
                    <ProductIconBox
                      name={item.foodItem.name}
                      category={item.foodItem.category}
                      size={80}
                      iconSize={38}
                      radius={12}
                    />
                    <Box sx={{ flex: 1 }}>
                      <Typography variant="h6" gutterBottom>
                        {item.foodItem.name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" gutterBottom>
                        {item.foodItem.description}
                      </Typography>
                      {item.specialInstructions && (
                        <Typography variant="body2" sx={{ fontStyle: 'italic', color: 'text.secondary' }}>
                          Nota: {item.specialInstructions}
                        </Typography>
                      )}
                      <Typography variant="subtitle1" sx={{ mt: 1, color: cat, fontWeight: 700 }}>
                        {meta.highlightLabel ? `${meta.highlightLabel}: ` : ''}{meta.highlight}
                      </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <IconButton
                          size="small"
                          onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                        >
                          <RemoveIcon />
                        </IconButton>
                        <Typography variant="h6" sx={{ minWidth: 30, textAlign: 'center' }}>
                          {item.quantity}
                        </Typography>
                        <IconButton
                          size="small"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        >
                          <AddIcon />
                        </IconButton>
                      </Box>
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
                );
              })}
            </CardContent>
          </Card>
        </Box>

        {/* Order Summary */}
        <Box sx={{ width: { xs: '100%', md: 350 } }}>
          <Paper sx={{ p: 3, position: 'sticky', top: 24 }}>
            <Typography variant="h5" gutterBottom>
              Resumen
            </Typography>
            
            <Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <Typography>Productos seleccionados</Typography>
                <Typography fontWeight="bold">
                  {cart.items.reduce((n, i) => n + i.quantity, 0)}
                </Typography>
              </Box>
              <Divider sx={{ my: 2 }} />
              <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                Tramitar tu solicitud no tiene coste. Un asesor revisará los productos
                seleccionados y te contactará para completar la contratación.
              </Typography>
            </Box>

            <Button
              variant="contained"
              fullWidth
              size="large"
              onClick={handleCheckout}
              sx={{ mb: 2 }}
            >
              Tramitar solicitud
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
