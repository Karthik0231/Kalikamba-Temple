import React, { useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  Button,
  Divider,
  useTheme,
  Grid,
  Paper,
  Chip,
  Card,
  CardContent,
  Alert,
} from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  CheckCircle as CheckCircleIcon,
  Download as DownloadIcon,
  Home as HomeIcon,
  Receipt as ReceiptIcon,
  CalendarToday as CalendarIcon,
  LocationOn as LocationIcon,
  Person as PersonIcon,
  Print as PrintIcon,
} from '@mui/icons-material';
import dayjs from 'dayjs';

function PaymentSuccessPage() {
  const theme = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  
  // Get payment success data from navigation state
  const paymentSuccessData = location.state;

  useEffect(() => {
    // Redirect to home if no payment data
    if (!paymentSuccessData) {
      navigate('/');
    }
  }, [paymentSuccessData, navigate]);

  if (!paymentSuccessData) {
    return (
      <Container maxWidth="lg" sx={{ my: 6 }}>
        <Alert severity="error">
          No payment data found. Please go back to home.
        </Alert>
      </Container>
    );
  }

  const handleDownloadReceipt = () => {
    // Simulate receipt download
    const receiptData = {
      transactionId: paymentSuccessData.transactionId,
      amount: paymentSuccessData.totalAmount,
      paymentMethod: paymentSuccessData.paymentMethod,
      customerName: paymentSuccessData.userDetails.name,
      sevas: paymentSuccessData.selectedSevas,
      paymentTime: paymentSuccessData.paymentTime,
    };
    
    console.log('Downloading receipt:', receiptData);
    alert('Receipt download started!');
  };

  const handlePrintReceipt = () => {
    window.print();
  };

  const formatDate = (dateString) => {
    return dayjs(dateString).format('DD/MM/YYYY');
  };

  const formatTime = (dateString) => {
    return dayjs(dateString).format('DD/MM/YYYY hh:mm A');
  };

  const getPaymentMethodLabel = (method) => {
    const methods = {
      'upi': 'UPI Payment',
      'card': 'Credit/Debit Card',
      'netbanking': 'Net Banking'
    };
    return methods[method] || method;
  };

  return (
    <Container maxWidth="lg" sx={{ my: 6 }} className="print-container">
      {/* Success Header */}
      <Box sx={{ textAlign: 'center', mb: 4 }}>
        <CheckCircleIcon 
          sx={{ 
            fontSize: 80, 
            color: theme.palette.success.main, 
            mb: 2 
          }} 
        />
        <Typography 
          variant="h3" 
          sx={{ 
            color: theme.palette.success.main, 
            fontWeight: 700,
            mb: 1
          }}
        >
          Payment Successful!
        </Typography>
        <Typography 
          variant="h6" 
          color="textSecondary"
          sx={{ mb: 2 }}
        >
          Your seva booking has been confirmed
        </Typography>
        <Chip 
          label={`Transaction ID: ${paymentSuccessData.transactionId}`}
          sx={{ 
            backgroundColor: theme.palette.primary.light,
            color: theme.palette.primary.contrastText,
            fontWeight: 600,
            fontSize: '0.9rem',
            px: 2,
            py: 1
          }}
        />
      </Box>

      <Grid container spacing={4}>
        {/* Left Section: Payment Details */}
        <Grid item xs={12} md={8}>
          {/* Transaction Summary */}
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
              <ReceiptIcon sx={{ color: theme.palette.primary.main, mr: 2, fontSize: 30 }} />
              <Typography 
                variant="h5" 
                sx={{ 
                  color: theme.palette.primary.main,
                  fontWeight: 600
                }}
              >
                Transaction Details
              </Typography>
            </Box>
            <Divider sx={{ mb: 3 }} />

            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <Typography variant="body2" color="textSecondary">Transaction ID</Typography>
                <Typography variant="body1" fontWeight={600}>
                  {paymentSuccessData.transactionId}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="body2" color="textSecondary">Payment Time</Typography>
                <Typography variant="body1" fontWeight={600}>
                  {formatTime(paymentSuccessData.paymentTime)}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="body2" color="textSecondary">Amount Paid</Typography>
                <Typography variant="h6" fontWeight={700} sx={{ color: theme.palette.success.main }}>
                  ₹{paymentSuccessData.totalAmount.toFixed(2)}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="body2" color="textSecondary">Payment Method</Typography>
                <Typography variant="body1" fontWeight={600}>
                  {getPaymentMethodLabel(paymentSuccessData.paymentMethod)}
                </Typography>
              </Grid>
            </Grid>
          </Paper>

          {/* Booking Details */}
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
              <CalendarIcon sx={{ color: theme.palette.primary.main, mr: 2, fontSize: 30 }} />
              <Typography 
                variant="h5" 
                sx={{ 
                  color: theme.palette.primary.main,
                  fontWeight: 600
                }}
              >
                Booking Details
              </Typography>
            </Box>
            <Divider sx={{ mb: 3 }} />

            {/* Selected Sevas */}
            <Box sx={{ mb: 3 }}>
              <Typography variant="h6" sx={{ color: theme.palette.primary.main, mb: 2, fontWeight: 600 }}>
                Booked Sevas
              </Typography>
              {paymentSuccessData.selectedSevas.map((seva, index) => (
                <Box 
                  key={seva.id}
                  sx={{ 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    alignItems: 'center',
                    py: 2,
                    px: 2,
                    borderRadius: 1,
                    backgroundColor: index % 2 === 0 ? theme.palette.grey[50] : 'transparent',
                    mb: 1
                  }}
                >
                  <Box>
                    <Typography variant="body1" fontWeight={600}>{seva.name}</Typography>
                    <Typography variant="body2" color="textSecondary">
                      Quantity: {seva.quantity} | Unit Price: ₹{seva.price}
                    </Typography>
                  </Box>
                  <Typography variant="body1" fontWeight={600}>
                    ₹{(seva.price * seva.quantity).toFixed(2)}
                  </Typography>
                </Box>
              ))}
            </Box>

            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <Typography variant="body2" color="textSecondary">Seva Date</Typography>
                <Typography variant="body1" fontWeight={600}>
                  {formatDate(paymentSuccessData.userDetails.sevaDate)}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="body2" color="textSecondary">Collection Method</Typography>
                <Typography variant="body1" fontWeight={600}>
                  {paymentSuccessData.deliveryOption === 'collect' ? 'Collect from Temple' : 'Prasada by Post'}
                </Typography>
              </Grid>
            </Grid>

            {/* Seva Persons */}
            {paymentSuccessData.userDetails.sevaPersons && paymentSuccessData.userDetails.sevaPersons.length > 0 && (
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
                  {paymentSuccessData.userDetails.sevaPersons.map((person, index) => (
                    <Box
                      key={index}
                      sx={{
                        py: 1,
                        borderBottom: index < paymentSuccessData.userDetails.sevaPersons.length - 1 ? '1px solid #f0f0f0' : 'none',
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

          {/* Customer Information */}
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
                Customer Information
              </Typography>
            </Box>
            <Divider sx={{ mb: 3 }} />

            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <Typography variant="body2" color="textSecondary">Name</Typography>
                <Typography variant="body1" fontWeight={600}>
                  {paymentSuccessData.userDetails.name}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="body2" color="textSecondary">Contact</Typography>
                <Typography variant="body1" fontWeight={600}>
                  {paymentSuccessData.contactNumber}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="body2" color="textSecondary">Email</Typography>
                <Typography variant="body1" fontWeight={600}>
                  {paymentSuccessData.userDetails.email}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="body2" color="textSecondary">Address</Typography>
                <Typography variant="body1" fontWeight={600}>
                  {paymentSuccessData.userDetails.address}
                </Typography>
              </Grid>
            </Grid>
          </Paper>
        </Grid>

        {/* Right Section: Actions & Next Steps */}
        <Grid item xs={12} md={4}>
          {/* Action Buttons */}
          <Paper 
            elevation={3} 
            sx={{ 
              p: 3, 
              borderRadius: 2,
              border: `1px solid ${theme.palette.divider}`,
              mb: 3
            }}
          >
            <Typography 
              variant="h6" 
              sx={{ 
                color: theme.palette.primary.main,
                fontWeight: 600,
                mb: 3
              }}
            >
              Actions
            </Typography>

            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <Button
                variant="contained"
                fullWidth
                startIcon={<DownloadIcon />}
                onClick={handleDownloadReceipt}
                sx={{
                  py: 1.5,
                  backgroundColor: theme.palette.primary.main,
                  '&:hover': {
                    backgroundColor: theme.palette.primary.dark,
                  }
                }}
              >
                Download Receipt
              </Button>

              <Button
                variant="outlined"
                fullWidth
                startIcon={<PrintIcon />}
                onClick={handlePrintReceipt}
                sx={{
                  py: 1.5,
                  borderColor: theme.palette.primary.main,
                  color: theme.palette.primary.main,
                  '&:hover': {
                    borderColor: theme.palette.primary.dark,
                    backgroundColor: theme.palette.primary.light + '20',
                  }
                }}
              >
                Print Receipt
              </Button>

              <Button
                variant="outlined"
                fullWidth
                startIcon={<HomeIcon />}
                onClick={() => navigate('/')}
                sx={{
                  py: 1.5,
                  borderColor: theme.palette.grey[400],
                  color: theme.palette.text.primary,
                  '&:hover': {
                    borderColor: theme.palette.grey[600],
                    backgroundColor: theme.palette.grey[50],
                  }
                }}
              >
                Go to Home
              </Button>
            </Box>
          </Paper>

          {/* Next Steps */}
          <Paper 
            elevation={3} 
            sx={{ 
              p: 3, 
              borderRadius: 2,
              border: `1px solid ${theme.palette.divider}`,
              mb: 3
            }}
          >
            <Typography 
              variant="h6" 
              sx={{ 
                color: theme.palette.primary.main,
                fontWeight: 600,
                mb: 3
              }}
            >
              What's Next?
            </Typography>

            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <Card variant="outlined" sx={{ p: 2, backgroundColor: theme.palette.success.light + '10' }}>
                <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
                  <Box sx={{ 
                    minWidth: 24, 
                    height: 24, 
                    borderRadius: '50%', 
                    backgroundColor: theme.palette.success.main,
                    color: 'white',
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center',
                    fontSize: '0.8rem',
                    fontWeight: 'bold'
                  }}>
                    1
                  </Box>
                  <Box>
                    <Typography variant="body2" fontWeight={600}>
                      Confirmation Email Sent
                    </Typography>
                    <Typography variant="caption" color="textSecondary">
                      Check your email for booking confirmation and receipt
                    </Typography>
                  </Box>
                </Box>
              </Card>

              <Card variant="outlined" sx={{ p: 2, backgroundColor: theme.palette.info.light + '10' }}>
                <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
                  <Box sx={{ 
                    minWidth: 24, 
                    height: 24, 
                    borderRadius: '50%', 
                    backgroundColor: theme.palette.info.main,
                    color: 'white',
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center',
                    fontSize: '0.8rem',
                    fontWeight: 'bold'
                  }}>
                    2
                  </Box>
                  <Box>
                    <Typography variant="body2" fontWeight={600}>
                      Seva Date: {formatDate(paymentSuccessData.userDetails.sevaDate)}
                    </Typography>
                    <Typography variant="caption" color="textSecondary">
                      Your seva will be performed on this date
                    </Typography>
                  </Box>
                </Box>
              </Card>

              <Card variant="outlined" sx={{ p: 2, backgroundColor: theme.palette.warning.light + '10' }}>
                <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
                  <Box sx={{ 
                    minWidth: 24, 
                    height: 24, 
                    borderRadius: '50%', 
                    backgroundColor: theme.palette.warning.main,
                    color: 'white',
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center',
                    fontSize: '0.8rem',
                    fontWeight: 'bold'
                  }}>
                    3
                  </Box>
                  <Box>
                    <Typography variant="body2" fontWeight={600}>
                      {paymentSuccessData.deliveryOption === 'collect' ? 'Collect Prasada' : 'Prasada Delivery'}
                    </Typography>
                    <Typography variant="caption" color="textSecondary">
                      {paymentSuccessData.deliveryOption === 'collect' 
                        ? 'Visit the temple to collect your prasada after the seva'
                        : 'Your prasada will be delivered to your address'
                      }
                    </Typography>
                  </Box>
                </Box>
              </Card>
            </Box>
          </Paper>

          {/* Contact Information */}
          <Paper 
            elevation={3} 
            sx={{ 
              p: 3, 
              borderRadius: 2,
              border: `1px solid ${theme.palette.divider}`,
            }}
          >
            <Typography 
              variant="h6" 
              sx={{ 
                color: theme.palette.primary.main,
                fontWeight: 600,
                mb: 2
              }}
            >
              Need Help?
            </Typography>
            
            <Typography variant="body2" color="textSecondary" sx={{ mb: 2 }}>
              For any queries regarding your booking, please contact us:
            </Typography>

            <Box sx={{ mb: 2 }}>
              <Typography variant="body2" fontWeight={600}>Temple Office</Typography>
              <Typography variant="body2" color="textSecondary">+91 1234567890</Typography>
            </Box>

            <Box sx={{ mb: 2 }}>
              <Typography variant="body2" fontWeight={600}>Email Support</Typography>
              <Typography variant="body2" color="textSecondary">support@temple.com</Typography>
            </Box>

            <Box>
              <Typography variant="body2" fontWeight={600}>Reference ID</Typography>
              <Typography variant="body2" color="textSecondary">
                {paymentSuccessData.transactionId}
              </Typography>
            </Box>
          </Paper>
        </Grid>
      </Grid>

      {/* Print Styles */}
      <style jsx>{`
        @media print {
          .print-container {
            margin: 0 !important;
            padding: 20px !important;
          }
          
          .MuiButton-root {
            display: none !important;
          }
          
          .MuiPaper-root {
            box-shadow: none !important;
            border: 1px solid #ccc !important;
          }
        }
      `}</style>
    </Container>
  );
}

export default PaymentSuccessPage;