import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Button,
  Container,
  CircularProgress,
  Alert,
} from '@mui/material';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Restaurant } from '../types';
import { restaurantService } from '../services/api';
import { getSectionImage, getHeroImage } from '../theme/bankVisuals';

const sectionFilters = [
  'Todos',
  'Mujer',
  'Hombre',
  'Niño',
  'Calzado',
  'Accesorios',
];

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [filteredRestaurants, setFilteredRestaurants] = useState<Restaurant[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedSection, setSelectedSection] = useState(searchParams.get('section') || 'Todos');
  const searchQuery = searchParams.get('search') || '';

  useEffect(() => {
    fetchRestaurants();
  }, []);

  useEffect(() => {
    setSelectedSection(searchParams.get('section') || 'Todos');
  }, [searchParams]);

  useEffect(() => {
    filterRestaurants();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [restaurants, selectedSection, searchQuery]);

  const fetchRestaurants = async () => {
    try {
      setLoading(true);
      const data = await restaurantService.getAll();
      setRestaurants(data);
      setError(null);
    } catch (err) {
      setError('No se pudieron cargar las secciones. Inténtalo de nuevo más tarde.');
      console.error('Error fetching restaurants:', err);
    } finally {
      setLoading(false);
    }
  };

  const filterRestaurants = () => {
    let filtered = restaurants;

    if (selectedSection !== 'Todos') {
      filtered = filtered.filter(restaurant =>
        restaurant.cuisineType.toLowerCase() === selectedSection.toLowerCase()
      );
    }

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
        <CircularProgress size={48} sx={{ color: '#111' }} />
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
    <Box>
      {/* Hero / banner editorial a ancho completo */}
      <Box
        sx={{
          position: 'relative',
          width: '100%',
          height: { xs: 420, md: 560 },
          overflow: 'hidden',
          mb: { xs: 5, md: 8 },
        }}
      >
        <Box
          component="img"
          src={getHeroImage('nueva-coleccion-otono', 1800, 1000)}
          alt="Nueva colección"
          sx={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
          }}
        />
        <Box
          sx={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(to bottom, rgba(0,0,0,0.15) 0%, rgba(0,0,0,0.45) 100%)',
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
              letterSpacing: '0.3em',
              textTransform: 'uppercase',
              fontSize: '0.85rem',
              mb: 2,
            }}
          >
            Otoño / Invierno
          </Typography>
          <Typography
            variant="h1"
            sx={{ fontSize: { xs: '2.4rem', md: '4rem' }, mb: 3 }}
          >
            Nueva Colección
          </Typography>
          <Button
            variant="contained"
            onClick={() => {
              const el = document.getElementById('secciones');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
            sx={{
              backgroundColor: '#fff',
              color: '#111',
              px: 5,
              '&:hover': { backgroundColor: '#111', color: '#fff' },
            }}
          >
            Descubrir
          </Button>
        </Box>
      </Box>

      <Container maxWidth="xl">
        {/* Nav de secciones tipo menú */}
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            flexWrap: 'wrap',
            gap: { xs: 2, md: 4 },
            mb: { xs: 4, md: 6 },
          }}
        >
          {sectionFilters.map((section) => {
            const selected = selectedSection === section;
            return (
              <Box
                key={section}
                component="button"
                onClick={() => setSelectedSection(section)}
                sx={{
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  fontFamily: '"Jost", "Helvetica Neue", sans-serif',
                  fontSize: { xs: '0.78rem', md: '0.85rem' },
                  letterSpacing: '0.18em',
                  textTransform: 'uppercase',
                  color: '#111',
                  pb: 0.75,
                  borderBottom: '1px solid',
                  borderColor: selected ? '#111' : 'transparent',
                  opacity: selected ? 1 : 0.6,
                  transition: 'opacity 0.2s ease, border-color 0.2s ease',
                  '&:hover': { opacity: 1 },
                }}
              >
                {section}
              </Box>
            );
          })}
        </Box>

        {/* Encabezado editorial */}
        <Box id="secciones" sx={{ mb: 4, textAlign: 'center' }}>
          <Typography variant="h3" component="h1" sx={{ mb: 1 }}>
            {searchQuery ? `Resultados para "${searchQuery}"` : 'Explora la tienda'}
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ letterSpacing: '0.12em', textTransform: 'uppercase', fontSize: '0.72rem' }}
          >
            {filteredRestaurants.length} secci{filteredRestaurants.length !== 1 ? 'ones' : 'ón'}
          </Typography>
        </Box>

        {/* Grid galería de secciones */}
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: {
              xs: 'repeat(2, 1fr)',
              md: 'repeat(3, 1fr)',
              lg: 'repeat(4, 1fr)',
            },
            gap: { xs: 1.5, md: 3 },
          }}
        >
          {filteredRestaurants.map((restaurant) => (
            <Box
              key={restaurant.id}
              onClick={() => handleRestaurantClick(restaurant.id)}
              sx={{ cursor: 'pointer' }}
            >
              <Box
                className="dressify-image-frame"
                sx={{
                  position: 'relative',
                  width: '100%',
                  aspectRatio: '3 / 4',
                  overflow: 'hidden',
                  backgroundColor: '#F2F2F2',
                }}
              >
                <Box
                  component="img"
                  src={getSectionImage(restaurant.cuisineType)}
                  alt={restaurant.name}
                  loading="lazy"
                  sx={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    display: 'block',
                    transition: 'transform 0.6s cubic-bezier(0.22, 1, 0.36, 1)',
                    '.dressify-image-frame:hover &': { transform: 'scale(1.05)' },
                  }}
                />
                <Box
                  sx={{
                    position: 'absolute',
                    inset: 0,
                    display: 'flex',
                    alignItems: 'flex-end',
                    justifyContent: 'center',
                    p: 3,
                    background: 'linear-gradient(to top, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0) 55%)',
                  }}
                >
                  <Typography
                    sx={{
                      color: '#fff',
                      fontFamily: '"Jost", "Helvetica Neue", sans-serif',
                      fontWeight: 400,
                      letterSpacing: '0.18em',
                      textTransform: 'uppercase',
                      fontSize: { xs: '0.9rem', md: '1.1rem' },
                      textAlign: 'center',
                    }}
                  >
                    {restaurant.name}
                  </Typography>
                </Box>
              </Box>
              <Box sx={{ mt: 1.5, textAlign: 'center' }}>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                    fontSize: '0.68rem',
                  }}
                >
                  {restaurant.cuisineType}
                </Typography>
              </Box>
            </Box>
          ))}
        </Box>

        {filteredRestaurants.length === 0 && !loading && (
          <Box textAlign="center" py={8}>
            <Typography variant="h6" color="text.secondary" gutterBottom>
              No se encontraron secciones
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Prueba a ajustar la búsqueda o los filtros
            </Typography>
          </Box>
        )}
      </Container>
    </Box>
  );
};

export default HomePage;
