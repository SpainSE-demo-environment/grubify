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
  Assignment as AssignmentIcon,
  VerifiedUser as VerifiedIcon,
  Home as HomeIcon,
} from '@mui/icons-material';
import { useParams, useNavigate } from 'react-router-dom';
import { Order, OrderStatus } from '../types';
import { orderService } from '../services/api';
import { ProductIconBox, getProductMeta } from '../theme/bankVisuals';

const orderSteps = [
  { label: 'Solicitud recibida', icon: <CheckCircleIcon />, status: OrderStatus.Placed },
  { label: 'Solicitud confirmada', icon: <CheckCircleIcon />, status: OrderStatus.Confirmed },
  { label: 'En revisión', icon: <AssignmentIcon />, status: OrderStatus.Preparing },
  { label: 'En formalización', icon: <VerifiedIcon />, status: OrderStatus.OutForDelivery },
  { label: 'Contratado', icon: <HomeIcon />, status: OrderStatus.Delivered },
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
      return 'Recibida';
    case OrderStatus.Confirmed:
      return 'Confirmada';
    case OrderStatus.Preparing:
      return 'En revisión';
    case OrderStatus.ReadyForPickup:
      return 'Lista para formalizar';
    case OrderStatus.OutForDelivery:
      return 'En formalización';
    case OrderStatus.Delivered:
      return 'Contratada';
    case OrderStatus.Cancelled:
      return 'Cancelada';
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
      setError('No se pudieron cargar los detalles de la solicitud. Inténtalo de nuevo más tarde.');
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
      return `Contratado a las ${new Date(order.deliveryTime || order.orderDate).toLocaleTimeString()}`;
    }
    
    const orderDate = new Date(order.orderDate);
    const estimatedTime = new Date(orderDate.getTime() + order.estimatedDeliveryTime * 60000);
    return `Resolución estimada: ${estimatedTime.toLocaleTimeString()}`;
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
          {error || 'Solicitud no encontrada'}
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
        Estado de la solicitud
      </Typography>

      <Box sx={{ display: 'flex', gap: 4, flexDirection: { xs: 'column', lg: 'row' } }}>
        {/* Order Status */}
        <Box sx={{ flex: 1 }}>
          <Card sx={{ mb: 4 }}>
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <Typography variant="h5">
                  Solicitud #{order.id}
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
                        {index === 0 && 'Tu solicitud se ha registrado correctamente.'}
                        {index === 1 && 'La entidad ha confirmado tu solicitud.'}
                        {index === 2 && 'Estamos revisando tu solicitud.'}
                        {index === 3 && 'Tu producto está en proceso de formalización.'}
                        {index === 4 && 'Tu póliza ha sido contratada. ¡Gracias por confiar en Coverfy!'}
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
                Entidad
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
              Datos de contacto
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
              Productos seleccionados
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
                <Typography variant="body2">Productos solicitados</Typography>
                <Typography variant="body2" fontWeight="bold">
                  {order.items.reduce((n, i) => n + i.quantity, 0)}
                </Typography>
              </Box>
              <Divider sx={{ my: 2 }} />
              <Typography variant="body2" color="text.secondary">
                Solicitud registrada. Un asesor la revisará y te contactará para
                formalizar la contratación.
              </Typography>
            </Box>
          </Paper>

          {/* Actions */}
          <Box sx={{ mt: 3, display: 'flex', gap: 2 }}>
            <Button
              variant="outlined"
              fullWidth
              onClick={() => navigate('/')}
            >
              Contratar de nuevo
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
                Cancelar solicitud
              </Button>
            )}
          </Box>
        </Box>
      </Box>
    </Container>
  );
};

export default OrderTrackingPage;
