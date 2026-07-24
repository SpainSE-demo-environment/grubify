import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Container,
  Card,
  CardContent,
  Button,
  TextField,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  Paper,
  Divider,
  Alert,
  CircularProgress,
  Stepper,
  Step,
  StepLabel,
} from '@mui/material';
import {
  CreditCard as CreditCardIcon,
  HealthAndSafety as PolicyIcon,
  LocalAtm as CashIcon,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { AppointmentCart, BookAppointmentRequest } from '../types';
import { appointmentCartService, appointmentService } from '../services/api';

const steps = ['Datos del paciente', 'Pago', 'Revisar y confirmar'];

const CheckoutPage: React.FC = () => {
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = useState(0);
  const [cart, setCart] = useState<AppointmentCart | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [paymentError, setPaymentError] = useState<boolean>(false);

  // Datos del formulario
  const [patientInfo, setPatientInfo] = useState({
    name: '',
    phone: '',
    location: '',
    reason: '',
  });
  const [paymentMethod, setPaymentMethod] = useState('poliza');
  const [paymentInfo, setPaymentInfo] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    nameOnCard: '',
  });

  useEffect(() => {
    fetchCart();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchCart = async () => {
    try {
      setLoading(true);
      const cartData = await appointmentCartService.get('user123');
      setCart(cartData);
      if (cartData.items.length === 0) {
        navigate('/cart');
      }
      setError(null);
    } catch (err) {
      setError('No se pudo cargar la cesta. Inténtalo de nuevo más tarde.');
      console.error('Error al cargar la cesta:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleBookAppointment = async () => {
    if (!cart) return;

    try {
      setSubmitting(true);
      setError(null);
      const appointmentRequest: BookAppointmentRequest = {
        userId: 'user123',
        clinicId: cart.items[0]?.service.clinicId || 1,
        items: cart.items,
        clinicLocation: patientInfo.location,
        paymentMethod,
        notes: patientInfo.reason,
      };

      const appointment = await appointmentService.book(appointmentRequest);
      await appointmentCartService.clear('user123');
      navigate(`/appointment-tracking/${appointment.id}`);
    } catch (err: any) {
      console.error('Error al reservar la cita:', err);

      // Comprobar si es un error de pago (estado 500) - mostrar página de error
      if (err.response?.status === 500) {
        const errorData = err.response?.data;
        setPaymentError(true);

        // Usar el mensaje de error del backend si está disponible
        if (errorData?.code === 'PAYMENT_ERROR') {
          setError(`${errorData.message || 'El procesamiento del pago ha fallado'}${errorData.details ? ` - ${errorData.details}` : ''}`);
        } else {
          setError('El procesamiento del pago ha fallado. Nuestro sistema de pagos tiene dificultades técnicas en este momento.');
        }
      }
      // Otros errores 4xx/5xx
      else if (err.response?.status >= 400) {
        const errorData = err.response?.data;
        setError(errorData?.message || `Error del servidor (${err.response.status}). Inténtalo de nuevo más tarde.`);
      }
      // Errores de red u otros
      else {
        setError('No se pudo conectar con el servidor. Comprueba tu conexión e inténtalo de nuevo.');
      }
    } finally {
      setSubmitting(false);
    }
  };

  const isStepValid = (step: number) => {
    switch (step) {
      case 0:
        return patientInfo.name && patientInfo.phone;
      case 1:
        if (paymentMethod === 'tarjeta') {
          return paymentInfo.cardNumber && paymentInfo.expiryDate && paymentInfo.cvv && paymentInfo.nameOnCard;
        }
        return true;
      case 2:
        return true;
      default:
        return false;
    }
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
        <CircularProgress size={60} />
      </Box>
    );
  }

  if (error && !cart) {
    return (
      <Container maxWidth="md">
        <Alert severity="error" sx={{ mt: 4 }}>
          {error}
        </Alert>
        <Box display="flex" justifyContent="center" mt={2}>
          <Button variant="contained" onClick={() => navigate('/cart')}>
            Volver a la cesta
          </Button>
        </Box>
      </Container>
    );
  }

  // Mostrar página de error de pago cuando el pago falla
  if (paymentError) {
    return (
      <Container maxWidth="md">
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '60vh',
            textAlign: 'center',
            p: 4,
          }}
        >
          <Card sx={{ p: 4, width: '100%', maxWidth: 500, border: '1px solid #f44336' }}>
            <CreditCardIcon sx={{ fontSize: 80, color: 'error.main', mb: 2 }} />
            <Typography variant="h4" component="h1" gutterBottom color="error.main" fontWeight="bold">
              Error del sistema de pagos
            </Typography>
            <Typography variant="h6" gutterBottom sx={{ mb: 3, color: 'text.secondary' }}>
              No se pudo procesar tu cita
            </Typography>

            <Alert severity="error" sx={{ mb: 3, textAlign: 'left' }}>
              <Typography variant="body2" sx={{ fontFamily: 'monospace' }}>
                <strong>Detalles del error:</strong><br />
                {error}
              </Typography>
            </Alert>

            <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
              Estamos teniendo dificultades técnicas con nuestro sistema de procesamiento de pagos. Parece un problema de configuración del sistema.
            </Typography>

            <Typography variant="body2" color="text.secondary" sx={{ mb: 4, fontStyle: 'italic' }}>
              ID de referencia: {Date.now().toString(36).toUpperCase()}-{Math.random().toString(36).substr(2, 5).toUpperCase()}
            </Typography>

            <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
              <Button
                variant="contained"
                color="primary"
                onClick={() => {
                  setPaymentError(false);
                  setError(null);
                  setActiveStep(2); // Volver al paso de revisión
                }}
                sx={{ minWidth: 120 }}
              >
                Reintentar pago
              </Button>
              <Button
                variant="outlined"
                onClick={() => navigate('/cart')}
                sx={{ minWidth: 120 }}
              >
                Volver a la cesta
              </Button>
              <Button
                variant="text"
                onClick={() => navigate('/')}
                sx={{ minWidth: 120 }}
              >
                Seguir explorando
              </Button>
            </Box>
          </Card>
        </Box>
      </Container>
    );
  }

  const renderStepContent = (step: number) => {
    switch (step) {
      case 0:
        return (
          <Box sx={{ space: 2 }}>
            <Typography variant="h6" gutterBottom>
              Datos del paciente
            </Typography>
            <TextField
              fullWidth
              label="Nombre y apellidos"
              value={patientInfo.name}
              onChange={(e) => setPatientInfo({ ...patientInfo, name: e.target.value })}
              margin="normal"
              required
            />
            <TextField
              fullWidth
              label="Teléfono de contacto"
              value={patientInfo.phone}
              onChange={(e) => setPatientInfo({ ...patientInfo, phone: e.target.value })}
              margin="normal"
              required
            />
            <TextField
              fullWidth
              label="Sala o ubicación preferida (opcional)"
              value={patientInfo.location}
              onChange={(e) => setPatientInfo({ ...patientInfo, location: e.target.value })}
              margin="normal"
              placeholder="Ej.: Consulta 3, planta baja..."
            />
            <TextField
              fullWidth
              label="Motivo de consulta (opcional)"
              value={patientInfo.reason}
              onChange={(e) => setPatientInfo({ ...patientInfo, reason: e.target.value })}
              margin="normal"
              multiline
              rows={3}
              placeholder="Ej.: revisión anual, seguimiento, dolor persistente..."
            />
          </Box>
        );

      case 1:
        return (
          <Box sx={{ space: 2 }}>
            <Typography variant="h6" gutterBottom>
              Método de pago
            </Typography>
            <FormControl>
              <RadioGroup
                value={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value)}
              >
                <FormControlLabel
                  value="poliza"
                  control={<Radio />}
                  label={
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <PolicyIcon />
                      Póliza / Seguro médico
                    </Box>
                  }
                />
                <FormControlLabel
                  value="tarjeta"
                  control={<Radio />}
                  label={
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <CreditCardIcon />
                      Tarjeta de crédito/débito
                    </Box>
                  }
                />
                <FormControlLabel
                  value="efectivo"
                  control={<Radio />}
                  label={
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <CashIcon />
                      Pago en el centro
                    </Box>
                  }
                />
              </RadioGroup>
            </FormControl>

            {paymentMethod === 'tarjeta' && (
              <Box sx={{ mt: 3, space: 2 }}>
                <TextField
                  fullWidth
                  label="Número de tarjeta"
                  value={paymentInfo.cardNumber}
                  onChange={(e) => setPaymentInfo({ ...paymentInfo, cardNumber: e.target.value })}
                  margin="normal"
                  placeholder="1234 5678 9012 3456"
                  required
                />
                <TextField
                  fullWidth
                  label="Titular de la tarjeta"
                  value={paymentInfo.nameOnCard}
                  onChange={(e) => setPaymentInfo({ ...paymentInfo, nameOnCard: e.target.value })}
                  margin="normal"
                  required
                />
                <Box sx={{ display: 'flex', gap: 2 }}>
                  <TextField
                    label="Caducidad"
                    value={paymentInfo.expiryDate}
                    onChange={(e) => setPaymentInfo({ ...paymentInfo, expiryDate: e.target.value })}
                    margin="normal"
                    placeholder="MM/AA"
                    required
                    sx={{ flex: 1 }}
                  />
                  <TextField
                    label="CVV"
                    value={paymentInfo.cvv}
                    onChange={(e) => setPaymentInfo({ ...paymentInfo, cvv: e.target.value })}
                    margin="normal"
                    placeholder="123"
                    required
                    sx={{ flex: 1 }}
                  />
                </Box>
              </Box>
            )}
          </Box>
        );

      case 2:
        return (
          <Box sx={{ space: 2 }}>
            <Typography variant="h6" gutterBottom>
              Revisión de la cita
            </Typography>

            {/* Revisión de datos del paciente */}
            <Paper sx={{ p: 2, mb: 2 }}>
              <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                Paciente
              </Typography>
              <Typography variant="body2">
                {patientInfo.name}
              </Typography>
              <Typography variant="body2">
                Teléfono: {patientInfo.phone}
              </Typography>
              {patientInfo.location && (
                <Typography variant="body2">
                  Ubicación: {patientInfo.location}
                </Typography>
              )}
              {patientInfo.reason && (
                <Typography variant="body2" sx={{ mt: 1, fontStyle: 'italic' }}>
                  Motivo: {patientInfo.reason}
                </Typography>
              )}
            </Paper>

            {/* Revisión del método de pago */}
            <Paper sx={{ p: 2, mb: 2 }}>
              <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                Método de pago
              </Typography>
              <Typography variant="body2">
                {paymentMethod === 'poliza' && 'Póliza / Seguro médico'}
                {paymentMethod === 'tarjeta' && 'Tarjeta de crédito/débito'}
                {paymentMethod === 'efectivo' && 'Pago en el centro'}
              </Typography>
            </Paper>

            {/* Revisión de los servicios */}
            <Paper sx={{ p: 2 }}>
              <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                Servicios reservados
              </Typography>
              {cart?.items.map((item) => (
                <Box key={item.id} sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography variant="body2">
                    {item.service.name}
                  </Typography>
                  <Typography variant="body2">
                    {item.service.price.toFixed(2)} €
                  </Typography>
                </Box>
              ))}
            </Paper>
          </Box>
        );

      default:
        return null;
    }
  };

  return (
    <Container maxWidth="lg">
      <Typography variant="h3" component="h1" gutterBottom>
        Confirmar cita
      </Typography>

      <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>

      <Box sx={{ display: 'flex', gap: 4, flexDirection: { xs: 'column', md: 'row' } }}>
        {/* Contenido principal */}
        <Box sx={{ flex: 1 }}>
          <Card>
            <CardContent>
              {renderStepContent(activeStep)}

              {error && (
                <Alert severity="error" sx={{ mt: 2 }}>
                  {error}
                </Alert>
              )}

              <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}>
                <Button
                  disabled={activeStep === 0}
                  onClick={handleBack}
                >
                  Atrás
                </Button>
                <Box>
                  {activeStep === steps.length - 1 ? (
                    <Button
                      variant="contained"
                      onClick={handleBookAppointment}
                      disabled={submitting}
                    >
                      {submitting ? <CircularProgress size={24} /> : 'Confirmar cita'}
                    </Button>
                  ) : (
                    <Button
                      variant="contained"
                      onClick={handleNext}
                      disabled={!isStepValid(activeStep)}
                    >
                      Siguiente
                    </Button>
                  )}
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Box>

        {/* Resumen de la reserva */}
        {cart && (
          <Box sx={{ width: { xs: '100%', md: 350 } }}>
            <Paper sx={{ p: 3, position: 'sticky', top: 24 }}>
              <Typography variant="h6" gutterBottom>
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
            </Paper>
          </Box>
        )}
      </Box>
    </Container>
  );
};

export default CheckoutPage;
