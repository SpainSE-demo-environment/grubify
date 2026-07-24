import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Card,
  CardMedia,
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
  PaymentsOutlined as FeeIcon,
  Search as SearchIcon,
} from '@mui/icons-material';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Clinic } from '../types';
import { clinicService } from '../services/api';

const specialtyTypes = [
  'Todas',
  'Medicina General',
  'Cardiología',
  'Dermatología',
  'Pediatría',
  'Traumatología',
  'Diagnóstico',
  'Rehabilitación',
  'Ginecología',
];

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [clinics, setClinics] = useState<Clinic[]>([]);
  const [filteredClinics, setFilteredClinics] = useState<Clinic[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedSpecialty, setSelectedSpecialty] = useState('Todas');
  const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '');

  useEffect(() => {
    fetchClinics();
  }, []);

  useEffect(() => {
    filterClinics();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [clinics, selectedSpecialty, searchQuery]);

  const fetchClinics = async () => {
    try {
      setLoading(true);
      const data = await clinicService.getAll();
      setClinics(data);
      setError(null);
    } catch (err) {
      setError('No se pudieron cargar los centros. Inténtalo de nuevo más tarde.');
      console.error('Error al cargar los centros:', err);
    } finally {
      setLoading(false);
    }
  };

  const filterClinics = () => {
    let filtered = clinics;

    // Filtrar por especialidad
    if (selectedSpecialty !== 'Todas') {
      filtered = filtered.filter(clinic =>
        clinic.specialtyType.toLowerCase() === selectedSpecialty.toLowerCase()
      );
    }

    // Filtrar por búsqueda
    if (searchQuery) {
      filtered = filtered.filter(clinic =>
        clinic.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        clinic.specialtyType.toLowerCase().includes(searchQuery.toLowerCase()) ||
        clinic.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredClinics(filtered);
  };

  const handleClinicClick = (clinicId: number) => {
    navigate(`/clinic/${clinicId}`);
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
          <Button variant="contained" onClick={fetchClinics}>
            Reintentar
          </Button>
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth="xl">
      {/* Sección hero */}
      <Box
        sx={{
          backgroundImage: 'linear-gradient(135deg, #00897B 0%, #1976D2 100%)',
          borderRadius: 3,
          color: 'white',
          p: 6,
          mb: 4,
          textAlign: 'center',
        }}
      >
        <Typography variant="h2" component="h1" gutterBottom>
          Tu salud, con cita en minutos
        </Typography>
        <Typography variant="h6" sx={{ mb: 4, opacity: 0.9 }}>
          Reserva cita en los mejores centros médicos y especialidades cerca de ti
        </Typography>

        {/* Barra de búsqueda */}
        <Box maxWidth="600px" mx="auto">
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Buscar centros, especialidades o servicios..."
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
                borderRadius: 2,
              },
            }}
          />
        </Box>
      </Box>

      {/* Filtro por especialidad */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h5" gutterBottom>
          Explorar por especialidad
        </Typography>
        <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
          {specialtyTypes.map((specialty) => (
            <Chip
              key={specialty}
              label={specialty}
              clickable
              variant={selectedSpecialty === specialty ? 'filled' : 'outlined'}
              color={selectedSpecialty === specialty ? 'primary' : 'default'}
              onClick={() => setSelectedSpecialty(specialty)}
              sx={{ mb: 1 }}
            />
          ))}
        </Box>
      </Box>

      {/* Cabecera de resultados */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="h5" gutterBottom>
          {searchQuery ? `Resultados para "${searchQuery}"` : 'Centros destacados'}
        </Typography>
        <Typography variant="body1" color="text.secondary">
          {filteredClinics.length} centro{filteredClinics.length !== 1 ? 's' : ''} encontrado{filteredClinics.length !== 1 ? 's' : ''}
        </Typography>
      </Box>

      {/* Rejilla de centros */}
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
        {filteredClinics.map((clinic) => (
          <Card
            key={clinic.id}
            sx={{
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              cursor: 'pointer',
              transition: 'all 0.3s ease-in-out',
              '&:hover': {
                transform: 'translateY(-4px)',
                boxShadow: 4,
              },
            }}
            onClick={() => handleClinicClick(clinic.id)}
          >
            <CardMedia
              component="img"
              height="200"
              image={clinic.imageUrl}
              alt={clinic.name}
              sx={{ objectFit: 'cover' }}
            />
            <CardContent sx={{ flexGrow: 1 }}>
              <Typography variant="h6" component="h2" gutterBottom>
                {clinic.name}
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                {clinic.description}
              </Typography>

              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <Rating value={clinic.rating} precision={0.1} readOnly size="small" />
                <Typography variant="body2" sx={{ ml: 1 }}>
                  {clinic.rating.toFixed(1)}
                </Typography>
              </Box>

              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1 }}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <TimeIcon sx={{ fontSize: 16, mr: 0.5, color: 'text.secondary' }} />
                  <Typography variant="body2" color="text.secondary">
                    {clinic.nextAvailable}
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <FeeIcon sx={{ fontSize: 16, mr: 0.5, color: 'text.secondary' }} />
                  <Typography variant="body2" color="text.secondary">
                    {clinic.consultationFee.toFixed(2)} €
                  </Typography>
                </Box>
              </Box>

              <Chip
                label={clinic.specialtyType}
                size="small"
                variant="outlined"
                color="primary"
              />
            </CardContent>
            <CardActions sx={{ p: 2, pt: 0 }}>
              <Button
                fullWidth
                variant="contained"
                color="primary"
                onClick={(e) => {
                  e.stopPropagation();
                  handleClinicClick(clinic.id);
                }}
              >
                Ver servicios
              </Button>
            </CardActions>
          </Card>
        ))}
      </Box>

      {filteredClinics.length === 0 && !loading && (
        <Box textAlign="center" py={8}>
          <Typography variant="h6" color="text.secondary" gutterBottom>
            No se encontraron centros
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
