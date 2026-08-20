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
  CardMedia,
  CardActions,
  Chip,
  Rating,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import {
  AccessTime as TimeIcon,
  PaymentsOutlined as FeeIcon,
  Timelapse as DurationIcon,
} from '@mui/icons-material';
import { useParams, useNavigate } from 'react-router-dom';
import { Clinic, Service } from '../types';
import { clinicService, serviceService, appointmentCartService } from '../services/api';

const ClinicPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [clinic, setClinic] = useState<Clinic | null>(null);
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [notes, setNotes] = useState('');
  const [dialogOpen, setDialogOpen] = useState(false);

  useEffect(() => {
    if (id) {
      fetchClinicData(parseInt(id));
    }
  }, [id]);

  const fetchClinicData = async (clinicId: number) => {
    try {
      setLoading(true);
      const [clinicData, servicesData] = await Promise.all([
        clinicService.getById(clinicId),
        serviceService.getByClinic(clinicId),
      ]);
      setClinic(clinicData);
      setServices(servicesData);
      setError(null);
    } catch (err) {
      setError('No se pudieron cargar los datos del centro. Inténtalo de nuevo más tarde.');
      console.error('Error al cargar los datos del centro:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleBookService = async (service: Service) => {
    setSelectedService(service);
    setNotes('');
    setDialogOpen(true);
  };

  const confirmBookService = async () => {
    if (!selectedService) return;

    try {
      await appointmentCartService.addItem('user123', {
        serviceId: selectedService.id,
        quantity: 1,
        notes,
      });
      setDialogOpen(false);
    } catch (err) {
      console.error('Error al añadir el servicio a la cesta:', err);
    }
  };

  const groupedServices = services.reduce((acc, service) => {
    if (!acc[service.specialty]) {
      acc[service.specialty] = [];
    }
    acc[service.specialty].push(service);
    return acc;
  }, {} as Record<string, Service[]>);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
        <CircularProgress size={60} />
      </Box>
    );
  }

  if (error || !clinic) {
    return (
      <Container maxWidth="md">
        <Alert severity="error" sx={{ mt: 4 }}>
          {error || 'Centro no encontrado'}
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
      {/* Cabecera del centro */}
      <Card sx={{ mb: 4 }}>
        <Box sx={{ position: 'relative' }}>
          <CardMedia
            component="img"
            height="300"
            image={clinic.imageUrl}
            alt={clinic.name}
            sx={{ objectFit: 'cover' }}
          />
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
              {clinic.name}
            </Typography>
            <Typography variant="h6" sx={{ opacity: 0.9 }}>
              {clinic.description}
            </Typography>
          </Box>
        </Box>
        <CardContent>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3, alignItems: 'center' }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Rating value={clinic.rating} precision={0.1} readOnly />
              <Typography variant="body1" sx={{ ml: 1 }}>
                {clinic.rating.toFixed(1)} de valoración
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <TimeIcon sx={{ mr: 1, color: 'text.secondary' }} />
              <Typography variant="body1">
                {clinic.nextAvailable}
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <FeeIcon sx={{ mr: 1, color: 'text.secondary' }} />
              <Typography variant="body1">
                Copago desde {clinic.consultationFee.toFixed(2)} €
              </Typography>
            </Box>
            <Chip label={clinic.specialtyType} color="primary" />
          </Box>
        </CardContent>
      </Card>

      {/* Servicios */}
      {Object.entries(groupedServices).map(([specialty, items]) => (
        <Box key={specialty} sx={{ mb: 4 }}>
          <Typography variant="h4" component="h2" gutterBottom>
            {specialty}
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
            {items.map((service) => (
              <Card key={service.id} sx={{ display: 'flex', alignItems: 'stretch', minHeight: 200 }}>
                <CardMedia
                  component="img"
                  sx={{ width: 150, objectFit: 'cover' }}
                  image={service.imageUrl}
                  alt={service.name}
                />
                <Box sx={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
                  <CardContent sx={{ flex: 1 }}>
                    <Typography variant="h6" component="h3" gutterBottom>
                      {service.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                      {service.description}
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mb: 2 }}>
                      <DurationIcon sx={{ fontSize: 18, color: 'text.secondary' }} />
                      <Typography variant="body2" color="text.secondary">
                        {service.durationMinutes} min
                      </Typography>
                    </Box>
                    <Typography variant="h6" color="primary" fontWeight="bold">
                      {service.price.toFixed(2)} €
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => handleBookService(service)}
                      disabled={!service.isAvailable}
                      fullWidth
                    >
                      {service.isAvailable ? 'Reservar cita' : 'No disponible'}
                    </Button>
                  </CardActions>
                </Box>
              </Card>
            ))}
          </Box>
        </Box>
      ))}

      {/* Diálogo de reserva */}
      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Reservar cita</DialogTitle>
        <DialogContent>
          {selectedService && (
            <Box>
              <Typography variant="h6" gutterBottom>
                {selectedService.name}
              </Typography>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                {selectedService.description}
              </Typography>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                Duración estimada: {selectedService.durationMinutes} min
              </Typography>
              <Typography variant="h6" color="primary" gutterBottom>
                {selectedService.price.toFixed(2)} €
              </Typography>

              <TextField
                fullWidth
                label="Motivo de consulta (opcional)"
                multiline
                rows={3}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Ej.: revisión anual, dolor de espalda, seguimiento..."
                sx={{ mt: 2 }}
              />
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDialogOpen(false)}>Cancelar</Button>
          <Button onClick={confirmBookService} variant="contained">
            Añadir a la cesta - {selectedService ? selectedService.price.toFixed(2) : '0.00'} €
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default ClinicPage;
