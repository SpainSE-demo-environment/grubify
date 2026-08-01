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
  FormLabel,
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
  AccountBalanceWallet as WalletIcon,
  LocalAtm as CashIcon,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { Cart, PlaceOrderRequest } from '../types';
import { cartService, orderService } from '../services/api';

const steps = ['Datos de contacto', 'Pago', 'Revisar y contratar'];

const CheckoutPage: React.FC = () => {
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = useState(0);
  const [cart, setCart] = useState<Cart | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [paymentError, setPaymentError] = useState<boolean>(false);

  // Form data
  const [deliveryInfo, setDeliveryInfo] = useState({
    address: '',
    city: '',
    zipCode: '',
    phone: '',
    instructions: '',
  });
  const [paymentMethod, setPaymentMethod] = useState('credit-card');
  const [paymentInfo, setPaymentInfo] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    nameOnCard: '',
  });

  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    try {
      setLoading(true);
      const cartData = await cartService.get('user123');
      setCart(cartData);
      if (cartData.items.length === 0) {
        navigate('/cart');
      }
      setError(null);
    } catch (err) {
      setError('No se pudo cargar la solicitud. Inténtalo de nuevo más tarde.');
      console.error('Error fetching cart:', err);
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

  const handlePlaceOrder = async () => {
    if (!cart) return;

    try {
      setSubmitting(true);
      setError(null);
      const orderRequest: PlaceOrderRequest = {
        userId: 'user123',
        restaurantId: cart.items[0]?.foodItem.restaurantId || 1,
        items: cart.items,
        deliveryAddress: `${deliveryInfo.address}, ${deliveryInfo.city}, ${deliveryInfo.zipCode}`,
        paymentMethod,
        specialInstructions: deliveryInfo.instructions,
      };

      const order = await orderService.place(orderRequest);
      await cartService.clear('user123');
      navigate(`/order-tracking/${order.id}`);
    } catch (err: any) {
      console.error('Error placing order:', err);
      
      // Check if it's a payment error (500 status) - show error page
      if (err.response?.status === 500) {
        const errorData = err.response?.data;
        setPaymentError(true);
        
        // Use backend error message if available, otherwise fallback
        if (errorData?.code === 'PAYMENT_ERROR') {
          setError(`${errorData.message || 'Error al procesar el pago'}${errorData.details ? ` - ${errorData.details}` : ''}`);
        } else {
          setError('Error al procesar el pago. Nuestro sistema de pagos está experimentando dificultades técnicas.');
        }
      } 
      // Check for other 4xx/5xx errors
      else if (err.response?.status >= 400) {
        const errorData = err.response?.data;
        setError(errorData?.message || `Error del servidor (${err.response.status}). Inténtalo de nuevo más tarde.`);
      }
      // Network or other errors
      else {
        setError('No se puede conectar con el servidor. Comprueba tu conexión e inténtalo de nuevo.');
      }
    } finally {
      setSubmitting(false);
    }
  };

  const isStepValid = (step: number) => {
    switch (step) {
      case 0:
        return deliveryInfo.address && deliveryInfo.city && deliveryInfo.zipCode && deliveryInfo.phone;
      case 1:
        if (paymentMethod === 'credit-card') {
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
            Volver a la solicitud
          </Button>
        </Box>
      </Container>
    );
  }

  // Show payment error page when payment fails
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
              Error en el sistema de pagos
            </Typography>
            <Typography variant="h6" gutterBottom sx={{ mb: 3, color: 'text.secondary' }}>
              No se ha podido tramitar tu solicitud
            </Typography>
            
            <Alert severity="error" sx={{ mb: 3, textAlign: 'left' }}>
              <Typography variant="body2" sx={{ fontFamily: 'monospace' }}>
                <strong>Detalle del error:</strong><br />
                {error}
              </Typography>
            </Alert>
            
            <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
              Estamos experimentando dificultades técnicas con nuestro sistema de procesamiento de pagos. Parece un problema de configuración del sistema.
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
                  setActiveStep(2); // Go back to review step
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
                Volver a la solicitud
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
              Datos de contacto
            </Typography>
            <TextField
              fullWidth
              label="Dirección"
              value={deliveryInfo.address}
              onChange={(e) => setDeliveryInfo({ ...deliveryInfo, address: e.target.value })}
              margin="normal"
              required
            />
            <Box sx={{ display: 'flex', gap: 2 }}>
              <TextField
                label="Ciudad"
                value={deliveryInfo.city}
                onChange={(e) => setDeliveryInfo({ ...deliveryInfo, city: e.target.value })}
                margin="normal"
                required
                sx={{ flex: 1 }}
              />
              <TextField
                label="Código postal"
                value={deliveryInfo.zipCode}
                onChange={(e) => setDeliveryInfo({ ...deliveryInfo, zipCode: e.target.value })}
                margin="normal"
                required
                sx={{ flex: 1 }}
              />
            </Box>
            <TextField
              fullWidth
              label="Teléfono"
              value={deliveryInfo.phone}
              onChange={(e) => setDeliveryInfo({ ...deliveryInfo, phone: e.target.value })}
              margin="normal"
              required
            />
            <TextField
              fullWidth
              label="Comentarios (opcional)"
              value={deliveryInfo.instructions}
              onChange={(e) => setDeliveryInfo({ ...deliveryInfo, instructions: e.target.value })}
              margin="normal"
              multiline
              rows={3}
              placeholder="p. ej., horario de contacto preferente, dudas, etc."
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
                  value="credit-card"
                  control={<Radio />}
                  label={
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <CreditCardIcon />
                      Tarjeta de crédito/débito
                    </Box>
                  }
                />
                <FormControlLabel
                  value="digital-wallet"
                  control={<Radio />}
                  label={
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <WalletIcon />
                      Cartera digital
                    </Box>
                  }
                />
                <FormControlLabel
                  value="cash-on-delivery"
                  control={<Radio />}
                  label={
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <CashIcon />
                      Domiciliación bancaria
                    </Box>
                  }
                />
              </RadioGroup>
            </FormControl>

            {paymentMethod === 'credit-card' && (
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
              Revisión de la solicitud
            </Typography>
            
            {/* Delivery Info Review */}
            <Paper sx={{ p: 2, mb: 2 }}>
              <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                Datos de contacto
              </Typography>
              <Typography variant="body2">
                {deliveryInfo.address}
              </Typography>
              <Typography variant="body2">
                {deliveryInfo.city}, {deliveryInfo.zipCode}
              </Typography>
              <Typography variant="body2">
                Teléfono: {deliveryInfo.phone}
              </Typography>
              {deliveryInfo.instructions && (
                <Typography variant="body2" sx={{ mt: 1, fontStyle: 'italic' }}>
                  Comentarios: {deliveryInfo.instructions}
                </Typography>
              )}
            </Paper>

            {/* Payment Method Review */}
            <Paper sx={{ p: 2, mb: 2 }}>
              <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                Método de pago
              </Typography>
              <Typography variant="body2">
                {paymentMethod === 'credit-card' && 'Tarjeta de crédito/débito'}
                {paymentMethod === 'digital-wallet' && 'Cartera digital'}
                {paymentMethod === 'cash-on-delivery' && 'Domiciliación bancaria'}
              </Typography>
            </Paper>

            {/* Order Items Review */}
            <Paper sx={{ p: 2 }}>
              <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                Productos seleccionados
              </Typography>
              {cart?.items.map((item) => (
                <Box key={item.id} sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography variant="body2">
                    {item.quantity}x {item.foodItem.name}
                  </Typography>
                  <Typography variant="body2">
                    {(item.foodItem.price * item.quantity) > 0 ? `${(item.foodItem.price * item.quantity).toFixed(2)} €` : 'Gratis'}
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
        Contratación
      </Typography>

      <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>

      <Box sx={{ display: 'flex', gap: 4, flexDirection: { xs: 'column', md: 'row' } }}>
        {/* Main Content */}
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
                      onClick={handlePlaceOrder}
                      disabled={submitting}
                    >
                      {submitting ? <CircularProgress size={24} /> : 'Confirmar contratación'}
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

        {/* Order Summary */}
        {cart && (
          <Box sx={{ width: { xs: '100%', md: 350 } }}>
            <Paper sx={{ p: 3, position: 'sticky', top: 24 }}>
              <Typography variant="h6" gutterBottom>
                Resumen
              </Typography>
              
              <Box sx={{ space: 2 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography>Subtotal</Typography>
                  <Typography>{cart.subTotal.toFixed(2)} €</Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography>Impuestos</Typography>
                  <Typography>{cart.tax.toFixed(2)} €</Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                  <Typography>Gastos de gestión</Typography>
                  <Typography>{cart.deliveryFee > 0 ? `${cart.deliveryFee.toFixed(2)} €` : 'Gratis'}</Typography>
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
