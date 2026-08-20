import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  CardActions,
  Button,
  Chip,
  Rating,
  Container,
  CircularProgress,
  Alert,
  TextField,
  InputAdornment,
} from '@mui/material';
import {
  AccessTime as TimeIcon,
  Payments as FeeIcon,
  Search as SearchIcon,
} from '@mui/icons-material';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Restaurant } from '../types';
import { restaurantService } from '../services/api';
import { getCategoryColor, getCategoryGradient, getCategoryIcon } from '../theme/foodVisuals';

const cuisineTypes = [
  'Todos',
  'Italian',
  'Japanese',
  'Indian',
  'American',
  'Healthy',
];

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [filteredRestaurants, setFilteredRestaurants] = useState<Restaurant[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedCuisine, setSelectedCuisine] = useState('Todos');
  const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '');

  useEffect(() => {
    fetchRestaurants();
  }, []);

  useEffect(() => {
    filterRestaurants();
  }, [restaurants, selectedCuisine, searchQuery]);

  const fetchRestaurants = async () => {
    try {
      setLoading(true);
      const data = await restaurantService.getAll();
      setRestaurants(data);
      setError(null);
    } catch (err) {
      setError('No se pudieron cargar los restaurantes. Inténtalo de nuevo más tarde.');
      console.error('Error fetching restaurants:', err);
    } finally {
      setLoading(false);
    }
  };

  const filterRestaurants = () => {
    let filtered = restaurants;

    // Filter by cuisine
    if (selectedCuisine !== 'Todos') {
      filtered = filtered.filter(restaurant => 
        restaurant.cuisineType.toLowerCase() === selectedCuisine.toLowerCase()
      );
    }

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(restaurant =>
        restaurant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        restaurant.cuisineType.toLowerCase().includes(searchQuery.toLowerCase()) ||
        restaurant.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredRestaurants(filtered);
  };

  const handleRestaurantClick = (restaurantId: number) => {
    navigate(`/restaurant/${restaurantId}`);
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
          <Button variant="contained" onClick={fetchRestaurants}>
              Reintentar
          </Button>
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth="xl">
      {/* Hero Section */}
      <Box
        sx={{
          position: 'relative',
          overflow: 'hidden',
          background: 'linear-gradient(135deg, #FF6B35 0%, #F7931E 45%, #FFB347 100%)',
          borderRadius: 4,
          color: 'white',
          p: { xs: 4, md: 7 },
          mb: 5,
          textAlign: 'center',
          boxShadow: '0 20px 50px -20px rgba(79, 70, 229, 0.6)',
        }}
      >
        <Box
          sx={{
            position: 'absolute',
            top: -80,
            right: -60,
            width: 260,
            height: 260,
            borderRadius: '50%',
            background: 'rgba(255,255,255,0.12)',
            filter: 'blur(4px)',
          }}
        />
        <Box
          sx={{
            position: 'absolute',
            bottom: -100,
            left: -40,
            width: 220,
            height: 220,
            borderRadius: '50%',
            background: 'rgba(255,255,255,0.08)',
          }}
        />
        <Box sx={{ position: 'relative', zIndex: 1 }}>
          <Chip
            label="Envío rápido · Comida a domicilio"
            sx={{
              mb: 2,
              color: 'white',
              backgroundColor: 'rgba(255,255,255,0.18)',
              backdropFilter: 'blur(6px)',
              fontWeight: 600,
            }}
          />
          <Typography variant="h2" component="h1" gutterBottom>
            Tu comida favorita, a domicilio
          </Typography>
          <Typography variant="h6" sx={{ mb: 4, opacity: 0.92, fontWeight: 400 }}>
            Pide en tus restaurantes favoritos y recíbelo en minutos, calentito y en casa
          </Typography>

          {/* Search Bar */}
          <Box maxWidth="600px" mx="auto">
            <TextField
              fullWidth
              variant="outlined"
              placeholder="Buscar restaurantes, platos o tipos de cocina..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
                sx: {
                  backgroundColor: 'white',
                  borderRadius: 3,
                  '& fieldset': { border: 'none' },
                },
              }}
            />
          </Box>
        </Box>
      </Box>

      {/* Cuisine Filter */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h5" gutterBottom>
          Explora por tipo de cocina
        </Typography>
        <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
          {cuisineTypes.map((cuisine) => {
            const selected = selectedCuisine === cuisine;
            const color = cuisine === 'Todos' ? '#4F46E5' : getCategoryColor(cuisine);
            return (
              <Chip
                key={cuisine}
                label={cuisine}
                clickable
                onClick={() => setSelectedCuisine(cuisine)}
                sx={{
                  mb: 1,
                  px: 0.5,
                  fontWeight: 600,
                  color: selected ? '#fff' : color,
                  backgroundColor: selected ? color : 'transparent',
                  border: '1.5px solid',
                  borderColor: color,
                  '&:hover': {
                    backgroundColor: selected ? color : `${color}18`,
                  },
                }}
              />
            );
          })}
        </Box>
      </Box>

      {/* Results Header */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="h5" gutterBottom>
          {searchQuery ? `Resultados para "${searchQuery}"` : 'Nuestros restaurantes'}
        </Typography>
        <Typography variant="body1" color="text.secondary">
          {filteredRestaurants.length} restaurante{filteredRestaurants.length !== 1 ? 's' : ''} disponible{filteredRestaurants.length !== 1 ? 's' : ''}
        </Typography>
      </Box>

      {/* Restaurant Grid */}
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: {
            xs: '1fr',
            sm: 'repeat(2, 1fr)',
            md: 'repeat(3, 1fr)',
            lg: 'repeat(4, 1fr)',
          },
          gap: 3,
        }}
      >
        {filteredRestaurants.map((restaurant) => {
          const CategoryIcon = getCategoryIcon(restaurant.cuisineType);
          return (
          <Card
            key={restaurant.id}
            sx={{
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              cursor: 'pointer',
              transition: 'all 0.3s ease-in-out',
              '&:hover': {
                transform: 'translateY(-6px)',
                boxShadow: '0 22px 40px -18px rgba(79, 70, 229, 0.45)',
              },
              '&:hover .card-media': {
                transform: 'scale(1.12)',
              },
            }}
            onClick={() => handleRestaurantClick(restaurant.id)}
          >
            <Box
              sx={{
                position: 'relative',
                height: 170,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                overflow: 'hidden',
                background: getCategoryGradient(restaurant.cuisineType),
              }}
            >
              <Box
                sx={{
                  position: 'absolute',
                  top: -40,
                  right: -30,
                  width: 150,
                  height: 150,
                  borderRadius: '50%',
                  background: 'rgba(255,255,255,0.14)',
                }}
              />
              <Box
                sx={{
                  position: 'absolute',
                  bottom: -50,
                  left: -20,
                  width: 120,
                  height: 120,
                  borderRadius: '50%',
                  background: 'rgba(255,255,255,0.10)',
                }}
              />
              <CategoryIcon
                className="card-media"
                sx={{
                  fontSize: 78,
                  color: 'rgba(255,255,255,0.96)',
                  position: 'relative',
                  zIndex: 1,
                  transition: 'transform 0.4s ease',
                }}
              />
              <Chip
                label={restaurant.cuisineType}
                size="small"
                sx={{
                  position: 'absolute',
                  top: 12,
                  left: 12,
                  color: getCategoryColor(restaurant.cuisineType),
                  fontWeight: 700,
                  backgroundColor: '#fff',
                  zIndex: 2,
                }}
              />
            </Box>
            <CardContent sx={{ flexGrow: 1 }}>
              <Typography variant="h6" component="h2" gutterBottom>
                {restaurant.name}
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                {restaurant.description}
              </Typography>
              
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <Rating value={restaurant.rating} precision={0.1} readOnly size="small" />
                <Typography variant="body2" sx={{ ml: 1 }}>
                  {restaurant.rating.toFixed(1)}
                </Typography>
              </Box>
              
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1 }}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <TimeIcon sx={{ fontSize: 16, mr: 0.5, color: 'text.secondary' }} />
                  <Typography variant="body2" color="text.secondary">
                    {restaurant.deliveryTime}
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <FeeIcon sx={{ fontSize: 16, mr: 0.5, color: 'text.secondary' }} />
                  <Typography variant="body2" color="text.secondary">
                    {restaurant.deliveryFee > 0 ? `${restaurant.deliveryFee.toFixed(2)} € envío` : 'Envío gratis'}
                  </Typography>
                </Box>
              </Box>
            </CardContent>
            <CardActions sx={{ p: 2, pt: 0 }}>
              <Button
                fullWidth
                variant="contained"
                color="primary"
                onClick={(e) => {
                  e.stopPropagation();
                  handleRestaurantClick(restaurant.id);
                }}
              >
                Ver carta
              </Button>
            </CardActions>
          </Card>
          );
        })}
      </Box>

      {filteredRestaurants.length === 0 && !loading && (
        <Box textAlign="center" py={8}>
          <Typography variant="h6" color="text.secondary" gutterBottom>
            No se encontraron restaurantes
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Prueba a ajustar la búsqueda o los filtros
          </Typography>
        </Box>
      )}
    </Container>
  );
};

export default HomePage;
