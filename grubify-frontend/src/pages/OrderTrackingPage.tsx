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
  Receipt as ReceiptIcon,
  Restaurant as RestaurantIcon,
  DeliveryDining as DeliveryIcon,
  Home as HomeIcon,
} from '@mui/icons-material';
import { useParams, useNavigate } from 'react-router-dom';
import { Order, OrderStatus } from '../types';
import { orderService } from '../services/api';
import { ProductIconBox, getProductMeta } from '../theme/foodVisuals';

const orderSteps = [
  { label: 'Pedido recibido', icon: <CheckCircleIcon />, status: OrderStatus.Placed },
  { label: 'Pedido confirmado', icon: <ReceiptIcon />, status: OrderStatus.Confirmed },
  { label: 'En preparación', icon: <RestaurantIcon />, status: OrderStatus.Preparing },
  { label: 'En camino', icon: <DeliveryIcon />, status: OrderStatus.OutForDelivery },
  { label: 'Entregado', icon: <HomeIcon />, status: OrderStatus.Delivered },
];

const getStatusColor = (status: OrderStatus) => {
  switch (status) {
    case OrderStatus.Placed:
    case OrderStatus.Confirmed:
      return 'info';
    case OrderStatus.Preparing:
      return 'warning';
    case OrderStatus.OutForDelivery:
      return 'primary';
    case OrderStatus.Delivered:
      return 'success';
    case OrderStatus.Cancelled:
      return 'error';
    default:
      return 'default';
  }
};

const getStatusText = (status: OrderStatus) => {
  switch (status) {
    case OrderStatus.Placed:
      return 'Recibido';
    case OrderStatus.Confirmed:
      return 'Confirmado';
    case OrderStatus.Preparing:
      return 'En preparación';
    case OrderStatus.ReadyForPickup:
      return 'Listo';
    case OrderStatus.OutForDelivery:
      return 'En camino';
    case OrderStatus.Delivered:
      return 'Entregado';
    case OrderStatus.Cancelled:
      return 'Cancelado';
    default:
      return 'Desconocido';
  }
};

const OrderTrackingPage: React.FC = () => {
  const { orderId } = useParams<{ orderId: string }>();
  const navigate = useNavigate();
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (orderId) {
      fetchOrder(parseInt(orderId));
      // Poll for updates every 30 seconds
      const interval = setInterval(() => {
        fetchOrder(parseInt(orderId));
      }, 30000);
      return () => clearInterval(interval);
    }
  }, [orderId]);

  const fetchOrder = async (id: number) => {
    try {
      const orderData = await orderService.getById(id);
      setOrder(orderData);
      setError(null);
    } catch (err) {
      setError('No se pudieron cargar los detalles del pedido. Inténtalo de nuevo más tarde.');
      console.error('Error fetching order:', err);
    } finally {
      setLoading(false);
    }
  };

  const getCurrentStepIndex = (status: OrderStatus) => {
    return orderSteps.findIndex(step => step.status === status);
  };

  const getEstimatedDeliveryTime = (order: Order) => {
    if (order.status === OrderStatus.Delivered) {
      return `Entregado a las ${new Date(order.deliveryTime || order.orderDate).toLocaleTimeString()}`;
    }
    
    const orderDate = new Date(order.orderDate);
    const estimatedTime = new Date(orderDate.getTime() + order.estimatedDeliveryTime * 60000);
    return `Entrega estimada: ${estimatedTime.toLocaleTimeString()}`;
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
        <CircularProgress size={60} />
      </Box>
    );
  }

  if (error || !order) {
    return (
      <Container maxWidth="md">
        <Alert severity="error" sx={{ mt: 4 }}>
          {error || 'Pedido no encontrado'}
        </Alert>
        <Box display="flex" justifyContent="center" mt={2}>
          <Button variant="contained" onClick={() => navigate('/')}>
            Volver al inicio
          </Button>
        </Box>
      </Container>
    );
  }

  const currentStepIndex = getCurrentStepIndex(order.status);

  return (
    <Container maxWidth="lg">
      <Typography variant="h3" component="h1" gutterBottom>
        Estado del pedido
      </Typography>

      <Box sx={{ display: 'flex', gap: 4, flexDirection: { xs: 'column', lg: 'row' } }}>
        {/* Order Status */}
        <Box sx={{ flex: 1 }}>
          <Card sx={{ mb: 4 }}>
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <Typography variant="h5">
                  Pedido #{order.id}
                </Typography>
                <Chip
                  label={getStatusText(order.status)}
                  color={getStatusColor(order.status)}
                />
              </Box>

              <Typography variant="body1" color="text.secondary" gutterBottom>
                {getEstimatedDeliveryTime(order)}
              </Typography>

              <Stepper activeStep={currentStepIndex} orientation="vertical" sx={{ mt: 3 }}>
                {orderSteps.map((step, index) => (
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
                        {index === 0 && 'Tu pedido se ha registrado correctamente.'}
                        {index === 1 && 'El restaurante ha confirmado tu pedido.'}
                        {index === 2 && 'El restaurante está preparando tu pedido.'}
                        {index === 3 && 'Tu pedido está en camino.'}
                        {index === 4 && 'Tu pedido ha sido entregado. ¡Gracias por pedir en Grubify!'}
                      </Typography>
                    </StepContent>
                  </Step>
                ))}
              </Stepper>
            </CardContent>
          </Card>

          {/* Restaurant Info */}
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Restaurante
              </Typography>
              <Typography variant="body1" gutterBottom>
                {order.restaurant.name}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {order.restaurant.address}
              </Typography>
            </CardContent>
          </Card>
        </Box>

        {/* Order Details */}
        <Box sx={{ width: { xs: '100%', lg: 400 } }}>
          {/* Delivery Address */}
          <Paper sx={{ p: 3, mb: 3 }}>
            <Typography variant="h6" gutterBottom>
              Datos de entrega
            </Typography>
            <Typography variant="body2">
              {order.deliveryAddress}
            </Typography>
            <Typography variant="body2" sx={{ mt: 1 }}>
              Teléfono: {order.customerPhone}
            </Typography>
          </Paper>

          {/* Order Items */}
          <Paper sx={{ p: 3, mb: 3 }}>
            <Typography variant="h6" gutterBottom>
              Platos del pedido
            </Typography>
            {order.items.map((item) => (
              <Box key={item.id} sx={{ display: 'flex', gap: 2, mb: 2 }}>
                <ProductIconBox
                  name={item.foodItem.name}
                  category={item.foodItem.category}
                  size={50}
                  iconSize={26}
                  radius={10}
                />
                <Box sx={{ flex: 1 }}>
                  <Typography variant="body2" fontWeight="bold">
                    {item.quantity}x {item.foodItem.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {getProductMeta(item.foodItem.name).highlight}
                  </Typography>
                  {item.specialInstructions && (
                    <Typography variant="caption" sx={{ fontStyle: 'italic' }}>
                      Nota: {item.specialInstructions}
                    </Typography>
                  )}
                </Box>
              </Box>
            ))}
          </Paper>

          {/* Order Summary */}
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Resumen
            </Typography>
            
            <Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <Typography variant="body2">Subtotal</Typography>
                <Typography variant="body2" fontWeight="bold">
                  {`${order.items.reduce((s, i) => s + i.quantity * i.foodItem.price, 0).toFixed(2).replace('.', ',')} €`}
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <Typography variant="body2">Envío</Typography>
                <Typography variant="body2" fontWeight="bold" color="secondary.main">Gratis</Typography>
              </Box>
              <Divider sx={{ my: 2 }} />
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant="subtitle1" fontWeight="bold">Total</Typography>
                <Typography variant="subtitle1" fontWeight="bold">
                  {`${order.items.reduce((s, i) => s + i.quantity * i.foodItem.price, 0).toFixed(2).replace('.', ',')} €`}
                </Typography>
              </Box>
            </Box>
          </Paper>

          {/* Actions */}
          <Box sx={{ mt: 3, display: 'flex', gap: 2 }}>
            <Button
              variant="outlined"
              fullWidth
              onClick={() => navigate('/')}
            >
              Pedir de nuevo
            </Button>
            {order.status !== OrderStatus.Delivered && order.status !== OrderStatus.Cancelled && (
              <Button
                variant="outlined"
                color="error"
                fullWidth
                onClick={() => {
                  // Handle order cancellation
                  console.log('Cancel order');
                }}
              >
                Cancelar pedido
              </Button>
            )}
          </Box>
        </Box>
      </Box>
    </Container>
  );
};

export default OrderTrackingPage;
