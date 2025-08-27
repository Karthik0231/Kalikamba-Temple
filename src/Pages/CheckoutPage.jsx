import React, { useState, useEffect, useMemo } from 'react';
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  Divider,
  CircularProgress,
  Alert,
  useTheme,
  Grid,
  Paper,
} from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import CheckoutSevaItem from '../Components/CheckoutSevaItem';
import { DatePicker } from '@mui/x-date-pickers/DatePicker'; // Import DatePicker
import dayjs from 'dayjs'; // Import dayjs

// Dummy DB for user data simulation
const DUMMY_USER_DB = {
  '9876543210': { name: 'John Doe', email: 'john.doe@example.com', address: '123 Main St, Anytown', sevaDate: null, nakshatra: '', rashi: '' },
  '1234567890': { name: 'Jane Smith', email: 'jane.smith@example.com', address: '456 Oak Ave, Otherville', sevaDate: dayjs('2023-12-25'), nakshatra: 'Punarvasu', rashi: 'Mithuna' },
};

const CONVENIENCE_FEE_PERCENTAGE = 0.05; // 5%

function CheckoutPage() {
  const theme = useTheme();
  const navigate = useNavigate();
  const location = useLocation();

  // Initialize selected sevas from location state or local storage
  const [selectedSevas, setSelectedSevas] = useState(() => {
    const initialSevas = location.state?.selectedSevas || [];
    if (initialSevas.length > 0) {
      return initialSevas;
    }
    // Fallback to local storage if direct state is not available (e.g., page refresh)
    try {
      const storedSevas = localStorage.getItem('selectedSevas');
      return storedSevas ? JSON.parse(storedSevas) : [];
    } catch (error) {
      console.error("Failed to parse selected sevas from local storage:", error);
      return [];
    }
  });

  const [contactNumber, setContactNumber] = useState('');
  const [userData, setUserData] = useState(null); // null, or { name, email, address, sevaDate, nakshatra, rashi }
  const [showNewUserForm, setShowNewUserForm] = useState(false);
  const [newUserFormData, setNewUserFormData] = useState({
    name: '',
    email: '',
    address: '',
    sevaDate: null, // Initialize with null for DatePicker
    nakshatra: '',
    rashi: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Calculate totals
  const subtotal = useMemo(() =>
    selectedSevas.reduce((sum, seva) => sum + seva.price * seva.quantity, 0),
    [selectedSevas]
  );
  const convenienceFee = subtotal * CONVENIENCE_FEE_PERCENTAGE;
  const totalAmount = subtotal + convenienceFee;

  useEffect(() => {
    // Update local storage whenever selectedSevas changes
    try {
      localStorage.setItem('selectedSevas', JSON.stringify(selectedSevas));
    } catch (error) {
      console.error("Failed to save selected sevas to local storage:", error);
    }
  }, [selectedSevas]);

  const handleQuantityChange = (sevaId, newQuantity) => {
    if (newQuantity < 1) return;
    setSelectedSevas((prevSevas) =>
      prevSevas.map((seva) =>
        seva.id === sevaId ? { ...seva, quantity: newQuantity } : seva
      )
    );
  };

  const handleRemoveSeva = (sevaId) => {
    
    setSelectedSevas((prevSevas) => prevSevas.filter((seva) => seva.id !== sevaId));
  };

  const handleContactNumberCheck = async () => {
    setError('');
    setLoading(true);
    setUserData(null);
    setShowNewUserForm(false);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    if (DUMMY_USER_DB[contactNumber]) {
      const fetchedData = DUMMY_USER_DB[contactNumber];
      // Convert string date to dayjs object if it exists
      if (fetchedData.sevaDate && typeof fetchedData.sevaDate === 'string') {
        fetchedData.sevaDate = dayjs(fetchedData.sevaDate);
      }
      setUserData(fetchedData);
      setNewUserFormData(fetchedData); // Pre-fill form if data found
      setShowNewUserForm(true); // Still show form to allow edits
    } else {
      setError('No existing user found. Please fill in your details.');
      setNewUserFormData({ ...newUserFormData, name: '', email: '', address: '', sevaDate: null, nakshatra: '', rashi: '' }); // Clear form for new user
      setShowNewUserForm(true);
    }
    setLoading(false);
  };

  const handleNewUserFormChange = (e) => {
    const { name, value } = e.target;
    setNewUserFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleDateChange = (date) => {
    setNewUserFormData((prevData) => ({ ...prevData, sevaDate: date }));
  };

  const handleProceedToPayment = () => {
    if (selectedSevas.length === 0) {
      setError('Please select at least one seva.');
      return;
    }
    if (!contactNumber || !newUserFormData.name || !newUserFormData.email || !newUserFormData.address || !newUserFormData.sevaDate) {
      setError('Please fill in all required personal details including Seva Date.');
      return;
    }

    // In a real application, you would send this data to your backend
    console.log('Proceeding to payment with:', {
      selectedSevas,
      contactNumber,
      userDetails: {
        ...newUserFormData,
        sevaDate: newUserFormData.sevaDate ? newUserFormData.sevaDate.format('YYYY-MM-DD') : null, // Format date for sending
      },
      totalAmount,
    });

    // Navigate to a payment page or confirmation
    navigate('/payment-confirmation', {
      state: {
        selectedSevas,
        contactNumber,
        userDetails: {
          ...newUserFormData,
          sevaDate: newUserFormData.sevaDate ? newUserFormData.sevaDate.format('YYYY-MM-DD') : null,
        },
        totalAmount,
      },
    });
  };

  return (
    <Container maxWidth="lg" sx={{ my: 4 }}>
      <Typography variant="h4" align="center" gutterBottom sx={{ color: theme.palette.primary.dark, mb: 4 }}>
        Checkout
      </Typography>

      <Grid container spacing={4}>
        {/* Left Section: Seva Summary */}
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ p: 3, borderRadius: 2 }}>
            <Typography variant="h5" gutterBottom sx={{ color: theme.palette.primary.main }}>
              Selected Sevas
            </Typography>
            <Divider sx={{ mb: 2 }} />
            {selectedSevas.length === 0 ? (
              <Typography variant="body1" color="text.secondary">
                No sevas selected. Please go back to the Sevas page to select some.
              </Typography>
            ) : (
              <Box>
                {selectedSevas.map((seva) => (
                  <CheckoutSevaItem
                    key={seva.id}
                    seva={seva}
                    onQuantityChange={handleQuantityChange}
                    onRemove={handleRemoveSeva}
                  />
                ))}
                <Divider sx={{ my: 2 }} />
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography variant="body1">Subtotal:</Typography>
                  <Typography variant="body1" fontWeight={600}>₹{subtotal.toFixed(2)}</Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography variant="body1">Convenience Fee ({CONVENIENCE_FEE_PERCENTAGE * 100}%):</Typography>
                  <Typography variant="body1" fontWeight={600}>₹{convenienceFee.toFixed(2)}</Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 2, p: 1.5, borderRadius: 1, backgroundColor: theme.palette.primary.light }}>
                  <Typography variant="h6" color={theme.palette.primary.contrastText}>Total Amount:</Typography>
                  <Typography variant="h6" fontWeight={700} color={theme.palette.primary.contrastText}>₹{totalAmount.toFixed(2)}</Typography>
                </Box>
              </Box>
            )}
          </Paper>
        </Grid>

        {/* Right Section: Personal Details */}
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ p: 3, borderRadius: 2 }}>
            <Typography variant="h5" gutterBottom sx={{ color: theme.palette.primary.main }}>
              Personal Details
            </Typography>
            <Divider sx={{ mb: 2 }} />

            <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
              <TextField
                label="Mobile No. or Email Id"
                variant="outlined"
                fullWidth
                value={contactNumber}
                onChange={(e) => setContactNumber(e.target.value)}
                sx={{ '& .MuiOutlinedInput-root': { borderRadius: 1 } }}
              />
              <Button
                variant="contained"
                onClick={handleContactNumberCheck}
                disabled={loading || !contactNumber}
                sx={{ minWidth: '100px', borderRadius: 1 }}
              >
                {loading ? <CircularProgress size={24} color="inherit" /> : 'Check'}
              </Button>
            </Box>

            {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

            {showNewUserForm && (
              <Box>
                <Typography variant="subtitle1" gutterBottom sx={{ mt: 2, color: theme.palette.text.primary }}>
                  {userData ? 'Existing User Details (Edit if needed)' : 'New User Details'}
                </Typography>
                <TextField
                  label="Full Name"
                  name="name"
                  variant="outlined"
                  fullWidth
                  value={newUserFormData.name}
                  onChange={handleNewUserFormChange}
                  sx={{ mb: 2, '& .MuiOutlinedInput-root': { borderRadius: 1 } }}
                />
                <TextField
                  label="Email Address"
                  name="email"
                  type="email"
                  variant="outlined"
                  fullWidth
                  value={newUserFormData.email}
                  onChange={handleNewUserFormChange}
                  sx={{ mb: 2, '& .MuiOutlinedInput-root': { borderRadius: 1 } }}
                />
                <TextField
                  label="Address"
                  name="address"
                  variant="outlined"
                  fullWidth
                  multiline
                  rows={3}
                  value={newUserFormData.address}
                  onChange={handleNewUserFormChange}
                  sx={{ mb: 2, '& .MuiOutlinedInput-root': { borderRadius: 1 } }}
                />
                <DatePicker
                  label="Seva Date"
                  value={newUserFormData.sevaDate}
                  onChange={handleDateChange}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      fullWidth
                      sx={{ mb: 2, '& .MuiOutlinedInput-root': { borderRadius: 1 } }}
                    />
                  )}
                />
                <TextField
                  label="Nakshatra (Optional)"
                  name="nakshatra"
                  variant="outlined"
                  fullWidth
                  value={newUserFormData.nakshatra}
                  onChange={handleNewUserFormChange}
                  sx={{ mb: 2, '& .MuiOutlinedInput-root': { borderRadius: 1 } }}
                />
                <TextField
                  label="Rashi (Optional)"
                  name="rashi"
                  variant="outlined"
                  fullWidth
                  value={newUserFormData.rashi}
                  onChange={handleNewUserFormChange}
                  sx={{ mb: 2, '& .MuiOutlinedInput-root': { borderRadius: 1 } }}
                />
              </Box>
            )}

            <Button
              variant="contained"
              color="primary"
              fullWidth
              onClick={handleProceedToPayment}
              disabled={selectedSevas.length === 0 || !contactNumber || !newUserFormData.name || !newUserFormData.email || !newUserFormData.address || !newUserFormData.sevaDate}
              sx={{ mt: 3, py: 1.5, borderRadius: 1 }}
            >
              Proceed to Payment (₹{totalAmount.toFixed(2)})
            </Button>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}

export default CheckoutPage;