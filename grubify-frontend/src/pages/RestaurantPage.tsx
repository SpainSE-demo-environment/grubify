import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Container,
  CircularProgress,
  Alert,
  Button,
  IconButton,
  TextField,
  Dialog,
  DialogContent,
} from '@mui/material';
import {
  Add as AddIcon,
  Remove as RemoveIcon,
  Close as CloseIcon,
} from '@mui/icons-material';
import { useParams, useNavigate } from 'react-router-dom';
import { Restaurant, FoodItem } from '../types';
import { restaurantService, foodItemService, cartService } from '../services/api';
import {
  getProductMeta,
  ProductImage,
  getSectionImage,
} from '../theme/bankVisuals';

const clothingSizes = ['XS', 'S', 'M', 'L', 'XL'];
const shoeSizes = ['36', '37', '38', '39', '40', '41', '42', '43', '44'];

const getSizesFor = (section: string): string[] => {
  const s = section.toLowerCase();
  if (s === 'calzado') return shoeSizes;
  if (s === 'accesorios') return ['Única'];
  return clothingSizes;
};

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
  const [selectedSize, setSelectedSize] = useState('');
  const [dialogOpen, setDialogOpen] = useState(false);
  const [added, setAdded] = useState(false);

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
      setError('No se pudo cargar la información del producto. Inténtalo de nuevo más tarde.');
      console.error('Error fetching restaurant data:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = async (item: FoodItem) => {
    setSelectedItem(item);
    setQuantity(1);
    setSpecialInstructions('');
    const sizes = getSizesFor(restaurant?.cuisineType || '');
    setSelectedSize(sizes.length === 1 ? sizes[0] : '');
    setAdded(false);
    setDialogOpen(true);
  };

  const confirmAddToCart = async () => {
    if (!selectedItem) return;

    const sizeNote = selectedSize ? `Talla: ${selectedSize}` : '';
    const combinedInstructions = [sizeNote, specialInstructions.trim()]
      .filter(Boolean)
      .join(' · ');

    try {
      await cartService.addItem('user123', {
        foodItemId: selectedItem.id,
        quantity,
        specialInstructions: combinedInstructions,
      });
      setAdded(true);
      setTimeout(() => setDialogOpen(false), 900);
    } catch (err) {
      console.error('Error adding item to cart:', err);
    }
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
        <CircularProgress size={48} sx={{ color: '#111' }} />
      </Box>
    );
  }

  if (error || !restaurant) {
    return (
      <Container maxWidth="md" sx={{ mt: 4 }}>
        <Alert severity="error" sx={{ mt: 4 }}>
          {error || 'Producto no encontrado'}
        </Alert>
        <Box display="flex" justifyContent="center" mt={2}>
          <Button variant="contained" onClick={() => navigate('/')}>
            Volver al inicio
          </Button>
        </Box>
      </Container>
    );
  }

  const sizes = getSizesFor(restaurant.cuisineType);
  const dialogMeta = selectedItem ? getProductMeta(selectedItem.name) : null;

  return (
    <Box>
      {/* Cabecera de sección editorial */}
      <Box
        sx={{
          position: 'relative',
          width: '100%',
          height: { xs: 220, md: 320 },
          overflow: 'hidden',
          mb: { xs: 4, md: 6 },
        }}
      >
        <Box
          component="img"
          src={getSectionImage(restaurant.cuisineType, 1800, 700)}
          alt={restaurant.name}
          sx={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
        />
        <Box
          sx={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(to bottom, rgba(0,0,0,0.1), rgba(0,0,0,0.5))',
          }}
        />
        <Box
          sx={{
            position: 'relative',
            zIndex: 1,
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            color: '#fff',
            px: 3,
          }}
        >
          <Typography
            sx={{
              fontFamily: '"Jost", "Helvetica Neue", sans-serif',
              fontWeight: 300,
              letterSpacing: '0.28em',
              textTransform: 'uppercase',
              fontSize: '0.75rem',
              mb: 1.5,
            }}
          >
            {restaurant.cuisineType}
          </Typography>
          <Typography variant="h2" component="h1" sx={{ fontSize: { xs: '1.8rem', md: '3rem' } }}>
            {restaurant.name}
          </Typography>
        </Box>
      </Box>

      <Container maxWidth="xl">
        <Box sx={{ mb: 4, textAlign: 'center' }}>
          <Typography variant="body2" color="text.secondary" sx={{ maxWidth: 640, mx: 'auto' }}>
            {restaurant.description}
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ mt: 2, letterSpacing: '0.14em', textTransform: 'uppercase', fontSize: '0.68rem' }}
          >
            {menuItems.length} artículo{menuItems.length !== 1 ? 's' : ''}
          </Typography>
        </Box>

        {/* Grid galería de productos */}
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: {
              xs: 'repeat(2, 1fr)',
              md: 'repeat(3, 1fr)',
              lg: 'repeat(4, 1fr)',
            },
            columnGap: { xs: 1.5, md: 3 },
            rowGap: { xs: 4, md: 6 },
          }}
        >
          {menuItems.map((item) => {
            const meta = getProductMeta(item.name);
            return (
              <Box key={item.id}>
                <Box
                  className="dressify-image-frame"
                  sx={{ position: 'relative', cursor: 'pointer' }}
                  onClick={() => item.isAvailable && handleAddToCart(item)}
                >
                  <ProductImage name={item.name} id={item.id} category={item.category} />

                  {/* Botón Añadir que aparece en hover */}
                  <Box
                    sx={{
                      position: 'absolute',
                      left: 0,
                      right: 0,
                      bottom: 0,
                      p: 1.5,
                      opacity: { xs: 1, md: 0 },
                      transform: { xs: 'none', md: 'translateY(8px)' },
                      transition: 'opacity 0.25s ease, transform 0.25s ease',
                      '.dressify-image-frame:hover &': {
                        opacity: 1,
                        transform: 'translateY(0)',
                      },
                    }}
                  >
                    <Button
                      fullWidth
                      variant="contained"
                      disabled={!item.isAvailable}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleAddToCart(item);
                      }}
                      sx={{
                        backgroundColor: 'rgba(255,255,255,0.95)',
                        color: '#111',
                        fontSize: '0.68rem',
                        py: 1,
                        '&:hover': { backgroundColor: '#111', color: '#fff' },
                      }}
                    >
                      {item.isAvailable ? 'Añadir' : 'Agotado'}
                    </Button>
                  </Box>
                </Box>

                {/* Nombre + precio */}
                <Box sx={{ mt: 1.5, px: 0.5 }}>
                  <Typography
                    sx={{
                      fontSize: '0.82rem',
                      letterSpacing: '0.02em',
                      color: '#111',
                      mb: 0.5,
                    }}
                  >
                    {item.name}
                  </Typography>
                  <Typography sx={{ fontSize: '0.82rem', color: '#111', fontWeight: 500 }}>
                    {meta.highlight}
                  </Typography>
                </Box>
              </Box>
            );
          })}
        </Box>
      </Container>

      {/* Detalle de producto */}
      <Dialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogContent sx={{ p: 0 }}>
          {selectedItem && dialogMeta && (
            <Box sx={{ position: 'relative', display: 'flex', flexDirection: { xs: 'column', md: 'row' } }}>
              <IconButton
                onClick={() => setDialogOpen(false)}
                sx={{ position: 'absolute', top: 8, right: 8, zIndex: 2, color: '#111' }}
                aria-label="cerrar"
              >
                <CloseIcon />
              </IconButton>

              {/* Imagen grande */}
              <Box sx={{ width: { xs: '100%', md: '48%' } }}>
                <ProductImage
                  name={selectedItem.name}
                  id={selectedItem.id}
                  category={selectedItem.category}
                  zoomOnHover={false}
                />
              </Box>

              {/* Info */}
              <Box sx={{ flex: 1, p: { xs: 3, md: 5 } }}>
                <Typography variant="h5" component="h2" sx={{ mb: 1 }}>
                  {selectedItem.name}
                </Typography>
                <Typography sx={{ fontSize: '1.1rem', fontWeight: 500, mb: 2 }}>
                  {dialogMeta.highlight}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                  {selectedItem.description}
                </Typography>

                {/* Selector de tallas */}
                <Typography
                  variant="body2"
                  sx={{ letterSpacing: '0.14em', textTransform: 'uppercase', fontSize: '0.68rem', mb: 1.5 }}
                >
                  Talla
                </Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 3 }}>
                  {sizes.map((size) => {
                    const active = selectedSize === size;
                    return (
                      <Box
                        key={size}
                        component="button"
                        onClick={() => setSelectedSize(size)}
                        sx={{
                          minWidth: 46,
                          height: 42,
                          px: 1.5,
                          cursor: 'pointer',
                          background: active ? '#111' : '#fff',
                          color: active ? '#fff' : '#111',
                          border: '1px solid',
                          borderColor: active ? '#111' : 'rgba(17,17,17,0.25)',
                          fontSize: '0.8rem',
                          letterSpacing: '0.04em',
                          transition: 'all 0.15s ease',
                          '&:hover': { borderColor: '#111' },
                        }}
                      >
                        {size}
                      </Box>
                    );
                  })}
                </Box>

                {/* Cantidad */}
                <Typography
                  variant="body2"
                  sx={{ letterSpacing: '0.14em', textTransform: 'uppercase', fontSize: '0.68rem', mb: 1 }}
                >
                  Unidades
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 3 }}>
                  <IconButton
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    sx={{ border: '1px solid rgba(17,17,17,0.25)', borderRadius: 0 }}
                  >
                    <RemoveIcon fontSize="small" />
                  </IconButton>
                  <Typography sx={{ minWidth: 36, textAlign: 'center' }}>{quantity}</Typography>
                  <IconButton
                    onClick={() => setQuantity(quantity + 1)}
                    sx={{ border: '1px solid rgba(17,17,17,0.25)', borderRadius: 0 }}
                  >
                    <AddIcon fontSize="small" />
                  </IconButton>
                </Box>

                <TextField
                  fullWidth
                  label="Comentarios (opcional)"
                  multiline
                  rows={2}
                  value={specialInstructions}
                  onChange={(e) => setSpecialInstructions(e.target.value)}
                  placeholder="p. ej., color preferido, etc."
                  sx={{ mb: 3 }}
                />

                <Button
                  fullWidth
                  variant="contained"
                  size="large"
                  disabled={!selectedItem.isAvailable || (sizes.length > 1 && !selectedSize)}
                  onClick={confirmAddToCart}
                  sx={{ py: 1.6 }}
                >
                  {added
                    ? '✓ Añadido'
                    : sizes.length > 1 && !selectedSize
                    ? 'Selecciona una talla'
                    : 'Añadir a la cesta'}
                </Button>
              </Box>
            </Box>
          )}
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default RestaurantPage;
