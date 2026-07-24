import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Container,
  Card,
  CardContent,
  Paper,
  Stepper,
  Step,
  StepLabel,
  StepContent,
  Chip,
  Button,
  Alert,
  CircularProgress,
  Divider,
} from '@mui/material';
import {
  CheckCircle as CheckCircleIcon,
  EventAvailable as ConfirmedIcon,
  NotificationsActive as ReminderIcon,
  MedicalServices as ConsultationIcon,
  TaskAlt as CompletedIcon,
} from '@mui/icons-material';
import { useParams, useNavigate } from 'react-router-dom';
import { Appointment, AppointmentStatus } from '../types';
import { appointmentService } from '../services/api';

const appointmentSteps = [
  { label: 'Cita solicitada', icon: <CheckCircleIcon />, status: AppointmentStatus.Requested },
  { label: 'Cita confirmada', icon: <ConfirmedIcon />, status: AppointmentStatus.Confirmed },
  { label: 'Recordatorio enviado', icon: <ReminderIcon />, status: AppointmentStatus.Reminded },
  { label: 'En consulta', icon: <ConsultationIcon />, status: AppointmentStatus.InConsultation },
  { label: 'Completada', icon: <CompletedIcon />, status: AppointmentStatus.Completed },
];

const getStatusColor = (status: AppointmentStatus) => {
  switch (status) {
    case AppointmentStatus.Requested:
    case AppointmentStatus.Confirmed:
      return 'info';
    case AppointmentStatus.Reminded:
    case AppointmentStatus.CheckedIn:
      return 'warning';
    case AppointmentStatus.InConsultation:
      return 'primary';
    case AppointmentStatus.Completed:
      return 'success';
    case AppointmentStatus.Cancelled:
      return 'error';
    default:
      return 'default';
  }
};

const getStatusText = (status: AppointmentStatus) => {
  switch (status) {
    case AppointmentStatus.Requested:
      return 'Solicitada';
    case AppointmentStatus.Confirmed:
      return 'Confirmada';
    case AppointmentStatus.Reminded:
      return 'Recordatorio';
    case AppointmentStatus.CheckedIn:
      return 'Check-in';
    case AppointmentStatus.InConsultation:
      return 'En consulta';
    case AppointmentStatus.Completed:
      return 'Completada';
    case AppointmentStatus.Cancelled:
      return 'Cancelada';
    default:
      return 'Desconocido';
  }
};

const AppointmentTrackingPage: React.FC = () => {
  const { appointmentId } = useParams<{ appointmentId: string }>();
  const navigate = useNavigate();
  const [appointment, setAppointment] = useState<Appointment | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (appointmentId) {
      fetchAppointment(parseInt(appointmentId));
      // Consultar actualizaciones cada 30 segundos
      const interval = setInterval(() => {
        fetchAppointment(parseInt(appointmentId));
      }, 30000);
      return () => clearInterval(interval);
    }
  }, [appointmentId]);

  const fetchAppointment = async (id: number) => {
    try {
      const appointmentData = await appointmentService.getById(id);
      setAppointment(appointmentData);
      setError(null);
    } catch (err) {
      setError('No se pudieron cargar los datos de la cita. Inténtalo de nuevo más tarde.');
      console.error('Error al cargar la cita:', err);
    } finally {
      setLoading(false);
    }
  };

  const getCurrentStepIndex = (status: AppointmentStatus) => {
    if (status === AppointmentStatus.CheckedIn) {
      return 2; // Entre recordatorio y consulta
    }
    return appointmentSteps.findIndex(step => step.status === status);
  };

  const getEstimatedWaitText = (appointment: Appointment) => {
    if (appointment.status === AppointmentStatus.Completed) {
      return `Completada a las ${new Date(appointment.completedTime || appointment.createdDate).toLocaleTimeString()}`;
    }

    return `Espera estimada: ${appointment.estimatedWaitMinutes} min`;
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
        <CircularProgress size={60} />
      </Box>
    );
  }

  if (error || !appointment) {
    return (
      <Container maxWidth="md">
        <Alert severity="error" sx={{ mt: 4 }}>
          {error || 'Cita no encontrada'}
        </Alert>
        <Box display="flex" justifyContent="center" mt={2}>
          <Button variant="contained" onClick={() => navigate('/')}>
            Volver al inicio
          </Button>
        </Box>
      </Container>
    );
  }

  const currentStepIndex = getCurrentStepIndex(appointment.status);

  return (
    <Container maxWidth="lg">
      <Typography variant="h3" component="h1" gutterBottom>
        Seguimiento de la cita
      </Typography>

      <Box sx={{ display: 'flex', gap: 4, flexDirection: { xs: 'column', lg: 'row' } }}>
        {/* Estado de la cita */}
        <Box sx={{ flex: 1 }}>
          <Card sx={{ mb: 4 }}>
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <Typography variant="h5">
                  Cita n.º {appointment.id}
                </Typography>
                <Chip
                  label={getStatusText(appointment.status)}
                  color={getStatusColor(appointment.status)}
                />
              </Box>

              <Typography variant="body1" color="text.secondary" gutterBottom>
                {getEstimatedWaitText(appointment)}
              </Typography>

              <Stepper activeStep={currentStepIndex} orientation="vertical" sx={{ mt: 3 }}>
                {appointmentSteps.map((step, index) => (
                  <Step key={step.label}>
                    <StepLabel
                      StepIconComponent={() => (
                        <Box
                          sx={{
                            color: index <= currentStepIndex ? 'primary.main' : 'text.disabled',
                            display: 'flex',
                            alignItems: 'center',
                          }}
                        >
                          {step.icon}
                        </Box>
                      )}
                    >
                      <Typography
                        variant="body1"
                        color={index <= currentStepIndex ? 'primary' : 'text.disabled'}
                      >
                        {step.label}
                      </Typography>
                    </StepLabel>
                    <StepContent>
                      <Typography variant="body2" color="text.secondary">
                        {index === 0 && 'Tu solicitud de cita se ha registrado correctamente.'}
                        {index === 1 && 'El centro ha confirmado tu cita.'}
                        {index === 2 && 'Te hemos enviado un recordatorio de tu cita.'}
                        {index === 3 && 'El especialista te está atendiendo.'}
                        {index === 4 && 'Tu cita ha finalizado. ¡Cuídate!'}
                      </Typography>
                    </StepContent>
                  </Step>
                ))}
              </Stepper>
            </CardContent>
          </Card>

          {/* Información del centro */}
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Datos del centro
              </Typography>
              <Typography variant="body1" gutterBottom>
                {appointment.clinic.name}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {appointment.clinic.address}
              </Typography>
            </CardContent>
          </Card>
        </Box>

        {/* Detalles de la cita */}
        <Box sx={{ width: { xs: '100%', lg: 400 } }}>
          {/* Ubicación / paciente */}
          <Paper sx={{ p: 3, mb: 3 }}>
            <Typography variant="h6" gutterBottom>
              Paciente y ubicación
            </Typography>
            {appointment.clinicLocation && (
              <Typography variant="body2">
                Ubicación: {appointment.clinicLocation}
              </Typography>
            )}
            {appointment.patientName && (
              <Typography variant="body2" sx={{ mt: 1 }}>
                Paciente: {appointment.patientName}
              </Typography>
            )}
            {appointment.patientPhone && (
              <Typography variant="body2" sx={{ mt: 1 }}>
                Teléfono: {appointment.patientPhone}
              </Typography>
            )}
          </Paper>

          {/* Servicios de la cita */}
          <Paper sx={{ p: 3, mb: 3 }}>
            <Typography variant="h6" gutterBottom>
              Servicios reservados
            </Typography>
            {appointment.items.map((item) => (
              <Box key={item.id} sx={{ display: 'flex', gap: 2, mb: 2 }}>
                <Box
                  component="img"
                  src={item.service.imageUrl}
                  alt={item.service.name}
                  sx={{
                    width: 50,
                    height: 50,
                    objectFit: 'cover',
                    borderRadius: 1,
                  }}
                />
                <Box sx={{ flex: 1 }}>
                  <Typography variant="body2" fontWeight="bold">
                    {item.service.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {item.service.price.toFixed(2)} €
                  </Typography>
                  {item.notes && (
                    <Typography variant="caption" sx={{ fontStyle: 'italic' }}>
                      Motivo: {item.notes}
                    </Typography>
                  )}
                </Box>
                <Typography variant="body2" fontWeight="bold">
                  {item.service.price.toFixed(2)} €
                </Typography>
              </Box>
            ))}
          </Paper>

          {/* Resumen de la cita */}
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Resumen
            </Typography>

            <Box sx={{ space: 2 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <Typography variant="body2">Subtotal (copagos)</Typography>
                <Typography variant="body2">{appointment.subTotal.toFixed(2)} €</Typography>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                <Typography variant="body2">Tasa de gestión</Typography>
                <Typography variant="body2">{appointment.bookingFee.toFixed(2)} €</Typography>
              </Box>
              <Divider sx={{ my: 2 }} />
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                <Typography variant="h6" fontWeight="bold">
                  Total
                </Typography>
                <Typography variant="h6" fontWeight="bold">
                  {appointment.total.toFixed(2)} €
                </Typography>
              </Box>
              <Typography variant="body2" color="text.secondary">
                Pago mediante {appointment.paymentMethod}
              </Typography>
            </Box>
          </Paper>

          {/* Acciones */}
          <Box sx={{ mt: 3, display: 'flex', gap: 2 }}>
            <Button
              variant="outlined"
              fullWidth
              onClick={() => navigate('/')}
            >
              Reservar otra cita
            </Button>
            {appointment.status !== AppointmentStatus.Completed && appointment.status !== AppointmentStatus.Cancelled && (
              <Button
                variant="outlined"
                color="error"
                fullWidth
                onClick={() => {
                  // Gestionar la cancelación de la cita
                  console.log('Cancelar cita');
                }}
              >
                Cancelar cita
              </Button>
            )}
          </Box>
        </Box>
      </Box>
    </Container>
  );
};

export default AppointmentTrackingPage;
