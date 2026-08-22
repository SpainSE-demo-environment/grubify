import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Container,
  CircularProgress,
  Alert,
  Button,
  Card,
  CardContent,
  CardActions,
  Chip,
  Rating,
  IconButton,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import {
  Add as AddIcon,
  Remove as RemoveIcon,
  AccessTime as TimeIcon,
  Payments as FeeIcon,
} from '@mui/icons-material';
import { useParams, useNavigate } from 'react-router-dom';
import { Restaurant, FoodItem } from '../types';
import { restaurantService, foodItemService, cartService } from '../services/api';
import { getCategoryColor, getCategoryGradient, getCategoryIcon, getProductMeta, resolveCategory, ProductIconBox } from '../theme/foodVisuals';

const RestaurantPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [restaurant, setRestaurant] = useState<Restaurant | null>(null);
  const [menuItems, setMenuItems] = useState<FoodItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedItem, setSelectedItem] = useState<FoodItem | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [specialInstructions, setSpecialInstructions] = useState('');
  const [dialogOpen, setDialogOpen] = useState(false);

  useEffect(() => {
    if (id) {
      fetchRestaurantData(parseInt(id));
    }
  }, [id]);

  const fetchRestaurantData = async (restaurantId: number) => {
    try {
      setLoading(true);
      const [restaurantData, menuData] = await Promise.all([
        restaurantService.getById(restaurantId),
        foodItemService.getByRestaurant(restaurantId),
      ]);
      setRestaurant(restaurantData);
      setMenuItems(menuData);
      setError(null);
    } catch (err) {
      setError('No se pudo cargar la información del restaurante. Inténtalo de nuevo más tarde.');
      console.error('Error fetching restaurant data:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = async (item: FoodItem) => {
    setSelectedItem(item);
    setQuantity(1);
    setSpecialInstructions('');
    setDialogOpen(true);
  };

  const confirmAddToCart = async () => {
    if (!selectedItem) return;

    try {
      await cartService.addItem('user123', {
        foodItemId: selectedItem.id,
        quantity,
        specialInstructions,
      });
      setDialogOpen(false);
      // You might want to show a success message here
    } catch (err) {
      console.error('Error adding item to cart:', err);
    }
  };

  const groupedMenuItems = menuItems.reduce((acc, item) => {
    if (!acc[item.category]) {
      acc[item.category] = [];
    }
    acc[item.category].push(item);
    return acc;
  }, {} as Record<string, FoodItem[]>);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
        <CircularProgress size={60} />
      </Box>
    );
  }

  if (error || !restaurant) {
    return (
      <Container maxWidth="md">
        <Alert severity="error" sx={{ mt: 4 }}>
          {error || 'Restaurante no encontrado'}
        </Alert>
        <Box display="flex" justifyContent="center" mt={2}>
          <Button variant="contained" onClick={() => navigate('/')}>
            Volver al inicio
          </Button>
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth="xl">
      {/* Restaurant Header */}
      <Card sx={{ mb: 4 }}>
        <Box sx={{ position: 'relative' }}>
          <Box
            sx={{
              height: 260,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: getCategoryGradient(restaurant.cuisineType),
            }}
          >
            {React.createElement(getCategoryIcon(restaurant.cuisineType), {
              sx: { fontSize: 128, color: 'rgba(255,255,255,0.95)' },
            })}
          </Box>
          <Box
            sx={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              background: 'linear-gradient(transparent, rgba(0,0,0,0.8))',
              color: 'white',
              p: 3,
            }}
          >
            <Typography variant="h3" component="h1" gutterBottom>
              {restaurant.name}
            </Typography>
            <Typography variant="h6" sx={{ opacity: 0.9 }}>
              {restaurant.description}
            </Typography>
          </Box>
        </Box>
        <CardContent>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3, alignItems: 'center' }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Rating value={restaurant.rating} precision={0.1} readOnly />
              <Typography variant="body1" sx={{ ml: 1 }}>
                {restaurant.rating.toFixed(1)} valoración
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <TimeIcon sx={{ mr: 1, color: 'text.secondary' }} />
              <Typography variant="body1">
                {restaurant.deliveryTime}
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <FeeIcon sx={{ mr: 1, color: 'text.secondary' }} />
              <Typography variant="body1">
                {restaurant.deliveryFee > 0 ? `${restaurant.deliveryFee.toFixed(2)} € de envío` : 'Envío gratis'}
              </Typography>
            </Box>
            <Chip label={restaurant.cuisineType} color="primary" />
          </Box>
        </CardContent>
      </Card>

      {/* Menu Items */}
      {Object.entries(groupedMenuItems).map(([category, items]) => (
        <Box key={category} sx={{ mb: 4 }}>
          <Typography variant="h4" component="h2" gutterBottom>
            {category}
          </Typography>
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: {
                xs: '1fr',
                md: 'repeat(2, 1fr)',
              },
              gap: 3,
            }}
          >
            {items.map((item) => {
              const cat = getCategoryColor(resolveCategory(item.name, item.category));
              const meta = getProductMeta(item.name);
              return (
              <Card key={item.id} sx={{ display: 'flex', alignItems: 'stretch', minHeight: 200 }}>
                <ProductIconBox
                  name={item.name}
                  category={item.category}
                  size={150}
                  iconSize={64}
                  radius={0}
                  fullHeight
                />
                <Box sx={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
                  <CardContent sx={{ flex: 1 }}>
                    <Typography variant="h6" component="h3" gutterBottom>
                      {item.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                      {item.description}
                    </Typography>
                    <Box sx={{ display: 'flex', gap: 1, mb: 2, flexWrap: 'wrap' }}>
                      {meta.badges.map((badge) => (
                        <Chip
                          key={badge}
                          label={badge}
                          size="small"
                          variant="outlined"
                          sx={{ borderColor: cat, color: cat, fontWeight: 600 }}
                        />
                      ))}
                    </Box>
                    {meta.highlightLabel && (
                      <Typography
                        variant="caption"
                        color="text.secondary"
                        sx={{ textTransform: 'uppercase', letterSpacing: 0.5, display: 'block' }}
                      >
                        {meta.highlightLabel}
                      </Typography>
                    )}
                    <Typography variant="h6" fontWeight="bold" sx={{ color: cat }}>
                      {meta.highlight}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => handleAddToCart(item)}
                      disabled={!item.isAvailable}
                      fullWidth
                    >
                      {item.isAvailable ? 'Añadir al pedido' : 'No disponible'}
                    </Button>
                  </CardActions>
                </Box>
              </Card>
              );
            })}
          </Box>
        </Box>
      ))}

      {/* Add to Cart Dialog */}
      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Añadir al pedido</DialogTitle>
        <DialogContent>
          {selectedItem && (
            <Box>
              <Typography variant="h6" gutterBottom>
                {selectedItem.name}
              </Typography>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                {selectedItem.description}
              </Typography>
              <Typography variant="caption" color="text.secondary" sx={{ textTransform: 'uppercase', letterSpacing: 0.5, display: 'block' }}>
                {getProductMeta(selectedItem.name).highlightLabel}
              </Typography>
              <Typography variant="h6" gutterBottom sx={{ color: getCategoryColor(resolveCategory(selectedItem.name, selectedItem.category)), fontWeight: 'bold' }}>
                {getProductMeta(selectedItem.name).highlight}
              </Typography>
              
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, my: 3 }}>
                <Typography variant="body1">Unidades:</Typography>
                <IconButton onClick={() => setQuantity(Math.max(1, quantity - 1))}>
                  <RemoveIcon />
                </IconButton>
                <Typography variant="h6">{quantity}</Typography>
                <IconButton onClick={() => setQuantity(quantity + 1)}>
                  <AddIcon />
                </IconButton>
              </Box>
              
              <TextField
                fullWidth
                label="Comentarios (opcional)"
                multiline
                rows={3}
                value={specialInstructions}
                onChange={(e) => setSpecialInstructions(e.target.value)}
                placeholder="p. ej., sin cebolla, punto de la carne, alergias, etc."
              />
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDialogOpen(false)}>Cancelar</Button>
          <Button onClick={confirmAddToCart} variant="contained">
            Añadir al pedido
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default RestaurantPage;
