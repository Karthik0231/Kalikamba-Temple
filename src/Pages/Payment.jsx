import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  Button,
  Divider,
  Alert,
  useTheme,
  Grid,
  Paper,
  Chip,
  Card,
  CardContent,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  CircularProgress,
} from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  CheckCircle as CheckCircleIcon,
  Person as PersonIcon,
  CreditCard as CreditCardIcon,
  AccountBalance as BankIcon,
  Smartphone as UpiIcon,
  Receipt as ReceiptIcon,
} from '@mui/icons-material';
import dayjs from 'dayjs';

function PaymentConfirmationPage() {
  const theme = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  
  const [paymentMethod, setPaymentMethod] = useState('upi');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Get payment data from navigation state
  const paymentData = location.state;

  useEffect(() => {
    // Redirect to checkout if no payment data
    if (!paymentData) {
      navigate('/checkout');
    }
  }, [paymentData, navigate]);

  if (!paymentData) {
    return (
      <Container maxWidth="lg" sx={{ my: 6 }}>
        <Alert severity="error">
          No payment data found. Please go back to checkout.
        </Alert>
      </Container>
    );
  }

  const handlePaymentMethodChange = (event) => {
    setPaymentMethod(event.target.value);
  };

  const handleProceedToPayment = async () => {
    setLoading(true);
    setError('');

    try {
      // Simulate payment processing
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Navigate to payment success page
      navigate('/payment-success', {
        state: {
          ...paymentData,
          paymentMethod,
          transactionId: `TXN${Date.now()}`,
          paymentTime: new Date().toISOString(),
        }
      });
    } catch (error) {
      setError('Payment failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    return dayjs(dateString).format('DD/MM/YYYY');
  };

  const paymentMethods = [
    {
      value: 'upi',
      label: 'UPI Payment',
      icon: <UpiIcon />,
      description: 'Pay using UPI apps like GPay, PhonePe, Paytm',
      recommended: true
    },
    {
      value: 'card',
      label: 'Credit/Debit Card',
      icon: <CreditCardIcon />,
      description: 'Visa, Mastercard, RuPay cards accepted'
    },
    {
      value: 'netbanking',
      label: 'Net Banking',
      icon: <BankIcon />,
      description: 'Pay directly from your bank account'
    }
  ];

  return (
    <Container maxWidth="lg" sx={{ my: 6 }}>
      <Typography 
        variant="h4" 
        align="center" 
        gutterBottom 
        sx={{ 
          color: theme.palette.primary.dark, 
          mb: 4, 
          fontWeight: 600 
        }}
      >
        Payment Confirmation
      </Typography>

      <Grid container spacing={4}>
        {/* Left Section: Order Summary */}
        <Grid item xs={12} md={7}>
          <Paper 
            elevation={3} 
            sx={{ 
              p: 3, 
              borderRadius: 2,
              border: `1px solid ${theme.palette.divider}`,
              mb: 3
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
              <CheckCircleIcon sx={{ color: theme.palette.success.main, mr: 2, fontSize: 30 }} />
              <Typography 
                variant="h5" 
                sx={{ 
                  color: theme.palette.primary.main,
                  fontWeight: 600
                }}
              >
                Order Summary
              </Typography>
            </Box>
            <Divider sx={{ mb: 3 }} />

            {/* Selected Sevas */}
            <Box sx={{ mb: 3 }}>
              <Typography variant="h6" sx={{ color: theme.palette.primary.main, mb: 2, fontWeight: 600 }}>
                Selected Sevas
              </Typography>
              {paymentData.selectedSevas.map((seva, index) => (
                <Box 
                  key={seva.id}
                  sx={{ 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    alignItems: 'center',
                    py: 2,
                    borderBottom: index < paymentData.selectedSevas.length - 1 ? '1px solid #f0f0f0' : 'none'
                  }}
                >
                  <Box>
                    <Typography variant="body1" fontWeight={600}>{seva.name}</Typography>
                    <Typography variant="body2" color="textSecondary">
                      Quantity: {seva.quantity}
                    </Typography>
                  </Box>
                  <Typography variant="body1" fontWeight={600}>
                    ₹{(seva.price * seva.quantity).toFixed(2)}
                  </Typography>
                </Box>
              ))}
            </Box>

            {/* Delivery Method */}
            <Box sx={{ mb: 3 }}>
              <Typography variant="h6" sx={{ color: theme.palette.primary.main, mb: 2, fontWeight: 600 }}>
                Prasada Collection
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Typography variant="body1">
                  {paymentData.deliveryOption === 'collect' ? 'Collect from Temple' : 'Prasada by Post'}
                </Typography>
                <Chip 
                  label={paymentData.deliveryOption === 'collect' ? 'Free' : `₹${paymentData.deliveryFee}`} 
                  size="small" 
                  sx={{ 
                    backgroundColor: paymentData.deliveryOption === 'collect' 
                      ? theme.palette.success.light 
                      : theme.palette.warning.light,
                    color: paymentData.deliveryOption === 'collect' 
                      ? theme.palette.success.contrastText 
                      : theme.palette.warning.contrastText,
                    fontWeight: 600
                  }}
                />
              </Box>
            </Box>

            {/* Price Breakdown */}
            <Divider sx={{ my: 2 }} />
            <Box sx={{ mb: 2 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <Typography variant="body1">Subtotal:</Typography>
                <Typography variant="body1" fontWeight={600}>
                  ₹{paymentData.subtotal.toFixed(2)}
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <Typography variant="body1">Convenience Fee (3%):</Typography>
                <Typography variant="body1" fontWeight={600}>
                  ₹{paymentData.convenienceFee.toFixed(2)}
                </Typography>
              </Box>
              {paymentData.deliveryFee > 0 && (
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography variant="body1">Delivery Charge:</Typography>
                  <Typography variant="body1" fontWeight={600}>
                    ₹{paymentData.deliveryFee.toFixed(2)}
                  </Typography>
                </Box>
              )}
              <Divider sx={{ my: 1 }} />
              <Box 
                sx={{ 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  alignItems: 'center',
                  p: 2,
                  borderRadius: 1,
                  backgroundColor: theme.palette.primary.main,
                  color: theme.palette.primary.contrastText
                }}
              >
                <Typography variant="h6" fontWeight={600}>Total Amount:</Typography>
                <Typography variant="h6" fontWeight={700}>
                  ₹{paymentData.totalAmount.toFixed(2)}
                </Typography>
              </Box>
            </Box>
          </Paper>

          {/* Customer Details */}
          <Paper 
            elevation={3} 
            sx={{ 
              p: 3, 
              borderRadius: 2,
              border: `1px solid ${theme.palette.divider}`,
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
              <PersonIcon sx={{ color: theme.palette.primary.main, mr: 2, fontSize: 30 }} />
              <Typography 
                variant="h5" 
                sx={{ 
                  color: theme.palette.primary.main,
                  fontWeight: 600
                }}
              >
                Customer Details
              </Typography>
            </Box>
            <Divider sx={{ mb: 3 }} />

            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <Typography variant="body2" color="textSecondary">Contact</Typography>
                <Typography variant="body1" fontWeight={600}>{paymentData.contactNumber}</Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="body2" color="textSecondary">Name</Typography>
                <Typography variant="body1" fontWeight={600}>{paymentData.userDetails.name}</Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="body2" color="textSecondary">Email</Typography>
                <Typography variant="body1" fontWeight={600}>{paymentData.userDetails.email}</Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="body2" color="textSecondary">Seva Date</Typography>
                <Typography variant="body1" fontWeight={600}>
                  {formatDate(paymentData.userDetails.sevaDate)}
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="body2" color="textSecondary">Address</Typography>
                <Typography variant="body1" fontWeight={600}>{paymentData.userDetails.address}</Typography>
              </Grid>
            </Grid>

            {/* Seva Persons */}
            {paymentData.userDetails.sevaPersons && paymentData.userDetails.sevaPersons.length > 0 && (
              <Box sx={{ mt: 3 }}>
                <Typography variant="h6" sx={{ color: theme.palette.primary.main, mb: 2, fontWeight: 600 }}>
                  Seva Persons
                </Typography>
                <Box sx={{
                  border: '1px solid #e0e0e0',
                  borderRadius: 1,
                  backgroundColor: '#f9f9f9',
                  p: 2
                }}>
                  {paymentData.userDetails.sevaPersons.map((person, index) => (
                    <Box
                      key={index}
                      sx={{
                        py: 1,
                        borderBottom: index < paymentData.userDetails.sevaPersons.length - 1 ? '1px solid #f0f0f0' : 'none',
                      }}
                    >
                      <Typography variant="body2" sx={{ fontWeight: 600 }}>
                        {index + 1}. {person.name}
                      </Typography>
                      <Typography variant="caption" color="textSecondary">
                        {person.nakshatra && `Nakshatra: ${person.nakshatra}`}
                        {person.nakshatra && person.rashi && ' | '}
                        {person.rashi && `Rashi: ${person.rashi}`}
                        {!person.nakshatra && !person.rashi && 'No additional details'}
                      </Typography>
                    </Box>
                  ))}
                </Box>
              </Box>
            )}
          </Paper>
        </Grid>

        {/* Right Section: Payment Methods */}
        <Grid item xs={12} md={5}>
          <Paper 
            elevation={3} 
            sx={{ 
              p: 3, 
              borderRadius: 2,
              border: `1px solid ${theme.palette.divider}`,
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
              <CreditCardIcon sx={{ color: theme.palette.primary.main, mr: 2, fontSize: 30 }} />
              <Typography 
                variant="h5" 
                sx={{ 
                  color: theme.palette.primary.main,
                  fontWeight: 600
                }}
              >
                Select Payment Method
              </Typography>
            </Box>
            <Divider sx={{ mb: 3 }} />

            <FormControl component="fieldset" fullWidth>
              <RadioGroup
                value={paymentMethod}
                onChange={handlePaymentMethodChange}
              >
                {paymentMethods.map((method) => (
                  <Card 
                    key={method.value}
                    variant="outlined" 
                    sx={{ 
                      mb: 2,
                      border: paymentMethod === method.value 
                        ? `2px solid ${theme.palette.primary.main}` 
                        : `1px solid ${theme.palette.divider}`,
                      backgroundColor: paymentMethod === method.value 
                        ? theme.palette.primary.light + '20' 
                        : 'transparent',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        backgroundColor: theme.palette.primary.light + '10',
                        borderColor: theme.palette.primary.main,
                      }
                    }}
                    onClick={() => setPaymentMethod(method.value)}
                  >
                    <CardContent sx={{ py: 2 }}>
                      <FormControlLabel
                        value={method.value}
                        control={<Radio sx={{ color: theme.palette.primary.main }} />}
                        label={
                          <Box sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
                            <Box sx={{ mr: 2, color: theme.palette.primary.main }}>
                              {method.icon}
                            </Box>
                            <Box sx={{ flex: 1 }}>
                              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                <Typography variant="body1" fontWeight={600}>
                                  {method.label}
                                </Typography>
                                {method.recommended && (
                                  <Chip 
                                    label="Recommended" 
                                    size="small" 
                                    sx={{ 
                                      backgroundColor: theme.palette.success.light,
                                      color: theme.palette.success.contrastText,
                                      fontSize: '0.7rem',
                                      height: 20
                                    }}
                                  />
                                )}
                              </Box>
                              <Typography variant="caption" color="textSecondary">
                                {method.description}
                              </Typography>
                            </Box>
                          </Box>
                        }
                        sx={{ margin: 0, width: '100%' }}
                      />
                    </CardContent>
                  </Card>
                ))}
              </RadioGroup>
            </FormControl>

            {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

            {/* Payment Summary Card */}
            <Box 
              sx={{ 
                mt: 3,
                p: 3,
                borderRadius: 2,
                backgroundColor: theme.palette.grey[50],
                border: `1px solid ${theme.palette.divider}`
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <ReceiptIcon sx={{ color: theme.palette.primary.main, mr: 1 }} />
                <Typography variant="h6" sx={{ color: theme.palette.primary.main, fontWeight: 600 }}>
                  Payment Summary
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <Typography variant="body2">Amount to Pay:</Typography>
                <Typography variant="h6" fontWeight={700} sx={{ color: theme.palette.primary.main }}>
                  ₹{paymentData.totalAmount.toFixed(2)}
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                <Typography variant="caption" color="textSecondary">
                  Payment Method:
                </Typography>
                <Typography variant="caption" fontWeight={600}>
                  {paymentMethods.find(m => m.value === paymentMethod)?.label}
                </Typography>
              </Box>
            </Box>

            <Button
              variant="contained"
              color="primary"
              fullWidth
              size="large"
              onClick={handleProceedToPayment}
              disabled={loading}
              sx={{
                mt: 3,
                py: 2,
                borderRadius: 1,
                fontSize: '1.1rem',
                fontWeight: 600,
                height: '56px',
                backgroundColor: theme.palette.primary.main,
                '&:hover': {
                  backgroundColor: theme.palette.primary.dark,
                },
                '&:disabled': {
                  backgroundColor: theme.palette.grey[300],
                },
              }}
            >
              {loading ? (
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <CircularProgress size={24} color="inherit" />
                  Processing Payment...
                </Box>
              ) : (
                `Pay ₹${paymentData.totalAmount.toFixed(2)}`
              )}
            </Button>

            <Typography variant="caption" color="textSecondary" align="center" sx={{ mt: 2, display: 'block' }}>
              🔒 Your payment is secured with bank-level encryption
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}

export default PaymentConfirmationPage;