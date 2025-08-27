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
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Chip,
  IconButton,
} from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import CheckoutSevaItem from '../components/CheckoutSevaItem';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Delete as DeleteIcon } from '@mui/icons-material';
import dayjs from 'dayjs';

// Dummy DB for user data simulation
const DUMMY_USER_DB = {
  '9876543210': { 
    name: 'John Doe', 
    email: 'john.doe@example.com', 
    address: '123 Main St, Anytown', 
    nakshatra: 'Ashwini', 
    rashi: 'Mesha' 
  },
  '1234567890': { 
    name: 'Jane Smith', 
    email: 'jane.smith@example.com', 
    address: '456 Oak Ave, Otherville', 
    nakshatra: 'Punarvasu', 
    rashi: 'Mithuna' 
  },
};

const CONVENIENCE_FEE_PERCENTAGE = 0.03; // 3%
const DELIVERY_CHARGE = 10; // ₹10 for delivery

function CheckoutPage() {
  const theme = useTheme();
  const navigate = useNavigate();
  const location = useLocation();

  // Initialize selected sevas from location state or localStorage
  const [selectedSevas, setSelectedSevas] = useState(() => {
    const initialSevas = location.state?.selectedSevas || [];
    if (initialSevas.length > 0) {
      return initialSevas;
    }
    // Fallback to localStorage if direct state is not available
    try {
      const storedSevas = localStorage.getItem('selectedSevas');
      return storedSevas ? JSON.parse(storedSevas) : [];
    } catch (error) {
      console.error("Failed to parse selected sevas from localStorage:", error);
      return [];
    }
  });

  const [contactNumber, setContactNumber] = useState('');
  const [userData, setUserData] = useState(null);
  const [showUserForm, setShowUserForm] = useState(false);
  const [userFormData, setUserFormData] = useState({
    name: '',
    email: '',
    address: '',
    sevaDate: null,
    nakshatra: '',
    rashi: '',
    sevaPersons: [
      { name: '', nakshatra: '', rashi: '' }
    ],
    tempPersonName: '',
    tempPersonNakshatra: '',
    tempPersonRashi: ''
  });
  const [deliveryOption, setDeliveryOption] = useState('collect'); // 'collect' or 'delivery'
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [formErrors, setFormErrors] = useState({});

  // Calculate totals
  const subtotal = useMemo(() =>
    selectedSevas.reduce((sum, seva) => sum + seva.price * seva.quantity, 0),
    [selectedSevas]
  );
  const convenienceFee = subtotal * CONVENIENCE_FEE_PERCENTAGE;
  const deliveryFee = deliveryOption === 'delivery' ? DELIVERY_CHARGE : 0;
  const totalAmount = subtotal + convenienceFee + deliveryFee;

  // Update localStorage whenever selectedSevas changes
  useEffect(() => {
    try {
      if (selectedSevas.length > 0) {
        localStorage.setItem('selectedSevas', JSON.stringify(selectedSevas));
      } else {
        localStorage.removeItem('selectedSevas');
      }
    } catch (error) {
      console.error("Failed to save selected sevas to localStorage:", error);
    }
  }, [selectedSevas]);

  const handleQuantityChange = (sevaId, newQuantity) => {
    if (newQuantity < 1) return;
    
    setSelectedSevas((prevSevas) => {
      const updatedSevas = prevSevas.map((seva) =>
        seva.id === sevaId ? { ...seva, quantity: newQuantity } : seva
      );
      return updatedSevas;
    });
  };

  const handleRemoveSeva = (sevaId) => {
    setSelectedSevas((prevSevas) => {
      const updatedSevas = prevSevas.filter((seva) => seva.id !== sevaId);
      
      // Immediately update localStorage after filtering
      try {
        if (updatedSevas.length > 0) {
          localStorage.setItem('selectedSevas', JSON.stringify(updatedSevas));
        } else {
          localStorage.removeItem('selectedSevas');
        }
      } catch (error) {
        console.error("Failed to update localStorage after removing seva:", error);
      }

      return updatedSevas;
    });
  };

  const handleContactNumberCheck = async () => {
    if (!contactNumber.trim()) {
      setError('Please enter a contact number or email.');
      return;
    }

    setError('');
    setLoading(true);
    setUserData(null);
    setShowUserForm(false);
    setFormErrors({});

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    try {
      if (DUMMY_USER_DB[contactNumber]) {
        const fetchedData = { ...DUMMY_USER_DB[contactNumber] };
        
        setUserData(fetchedData);
        setUserFormData((prev) => ({
          ...prev,
          ...fetchedData,
          sevaDate: null, // Always start with empty seva date
        }));
        setShowUserForm(true);
      } else {
        setError('Contact not found. Please fill in your details below.');
        setUserFormData((prev) => ({
          ...prev,
          name: '',
          email: '',
          address: '',
          sevaDate: null,
          nakshatra: '',
          rashi: '',
        }));
        setShowUserForm(true);
      }
    } catch (error) {
      setError('Failed to check contact details. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleUserFormChange = (e) => {
    const { name, value } = e.target;
    setUserFormData((prevData) => ({ ...prevData, [name]: value }));
    
    // Clear specific field error when user starts typing
    if (formErrors[name]) {
      setFormErrors((prevErrors) => ({ ...prevErrors, [name]: '' }));
    }
  };

  const handleDateChange = (date) => {
    setUserFormData((prevData) => ({ ...prevData, sevaDate: date }));
    
    // Clear date error when user selects a date
    if (formErrors.sevaDate) {
      setFormErrors((prevErrors) => ({ ...prevErrors, sevaDate: '' }));
    }
  };

  const handleDeliveryOptionChange = (event) => {
    setDeliveryOption(event.target.value);
  };

  const handleSevaPersonChange = (e, index) => {
    const { name, value } = e.target;
    const updated = [...userFormData.sevaPersons];
    updated[index][name] = value;
    setUserFormData((prev) => ({ ...prev, sevaPersons: updated }));
    
    // Clear field error
    const errorKey = `sevaPersons.${index}.${name}`;
    if (formErrors[errorKey]) {
      setFormErrors((prevErrors) => ({ ...prevErrors, [errorKey]: '' }));
    }
  };

  const handleAddSevaPersonFixed = () => {
    if (!userFormData.tempPersonName) return;
    
    const newPerson = {
      name: userFormData.tempPersonName,
      nakshatra: userFormData.tempPersonNakshatra || '',
      rashi: userFormData.tempPersonRashi || ''
    };

    // Find first empty slot or add new one
    const updatedPersons = [...userFormData.sevaPersons];
    const emptyIndex = updatedPersons.findIndex(p => !p.name);
    
    if (emptyIndex !== -1) {
      updatedPersons[emptyIndex] = newPerson;
    } else if (updatedPersons.length < 4) {
      updatedPersons.push(newPerson);
    }

    setUserFormData(prev => ({
      ...prev,
      sevaPersons: updatedPersons,
      tempPersonName: '',
      tempPersonNakshatra: '',
      tempPersonRashi: ''
    }));
  };

  const handleRemoveSevaPersonFixed = (index) => {
    const updatedPersons = userFormData.sevaPersons.filter((_, i) => i !== index);
    
    // If no persons left, ensure we have at least one empty slot
    if (updatedPersons.length === 0) {
      updatedPersons.push({ name: '', nakshatra: '', rashi: '' });
    }
    
    setUserFormData(prev => ({ ...prev, sevaPersons: updatedPersons }));
  };

  const validateForm = () => {
    const errors = {};

    if (selectedSevas.length === 0) {
      setError('Please select at least one seva.');
      return false;
    }

    if (!contactNumber.trim()) {
      errors.contactNumber = 'Contact number is required';
    } else {
      // Phone number validation for Indian mobile numbers or email
      const phoneRegex = /^[6-9]\d{9}$/;
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!phoneRegex.test(contactNumber) && !emailRegex.test(contactNumber)) {
        errors.contactNumber = 'Please enter a valid 10-digit mobile number or email';
      }
    }

    if (!userFormData.name.trim()) {
      errors.name = 'Full name is required';
    }

    if (!userFormData.email.trim()) {
      errors.email = 'Email address is required';
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(userFormData.email)) {
        errors.email = 'Please enter a valid email address';
      }
    }

    if (!userFormData.address.trim()) {
      errors.address = 'Address is required';
    }

    if (!userFormData.sevaDate) {
      errors.sevaDate = 'Please select a seva date';
    } else {
      const selectedDate = dayjs(userFormData.sevaDate);
      const today = dayjs().startOf('day');
      
      if (selectedDate.isBefore(today)) {
        errors.sevaDate = 'Seva date must be today or in the future';
      }
    }

    // Validate seva persons - at least one person with a name is required
    const validPersons = userFormData.sevaPersons.filter(person => person.name.trim());
    if (validPersons.length === 0) {
      errors.sevaPersons = 'At least one seva person is required';
    }

    setFormErrors(errors);
    
    if (Object.keys(errors).length > 0) {
      setError('Please correct the highlighted fields.');
      return false;
    }

    return true;
  };

  const handleProceedToPayment = () => {
    setError('');
    
    if (!validateForm()) {
      return;
    }

    const paymentData = {
      selectedSevas,
      contactNumber,
      userDetails: {
        ...userFormData,
        sevaDate: userFormData.sevaDate ? userFormData.sevaDate.format('YYYY-MM-DD') : null,
        sevaPersons: userFormData.sevaPersons.filter(person => person.name.trim()), // Only include persons with names
      },
      deliveryOption,
      subtotal,
      convenienceFee,
      deliveryFee,
      totalAmount,
    };

    console.log('Proceeding to payment with:', paymentData);

    // Clear localStorage after successful checkout
    try {
      localStorage.removeItem('selectedSevas');
    } catch (error) {
      console.error("Failed to clear localStorage:", error);
    }

    // Navigate to payment confirmation
    navigate('/payment-confirmation', {
      state: paymentData,
    });
  };

  return (
    <Container maxWidth="lg" sx={{ py: { xs: 2, sm: 4, md: 6 }, px: { xs: 1, sm: 2 } }}>
      <Typography 
        variant="h4" 
        align="center" 
        gutterBottom 
        sx={{ 
          color: theme.palette.primary.dark, 
          mb: { xs: 3, md: 4 }, 
          fontWeight: 600,
          fontSize: { xs: '1.8rem', sm: '2.125rem' }
        }}
      >
        Checkout
      </Typography>

      <Grid container spacing={{ xs: 2, md: 4 }}>
        {/* Left Section: Seva Summary */}
        <Grid item xs={12} lg={6}>
          <Paper 
            elevation={3} 
            sx={{ 
              p: { xs: 2, sm: 3 }, 
              borderRadius: 2,
              border: `1px solid ${theme.palette.divider}`,
              height: 'fit-content'
            }}
          >
            <Typography 
              variant="h5" 
              gutterBottom 
              sx={{ 
                color: theme.palette.primary.main,
                fontWeight: 600,
                mb: 3,
                fontSize: { xs: '1.25rem', sm: '1.5rem' }
              }}
            >
              Selected Sevas
            </Typography>
            <Divider sx={{ mb: 2 }} />
            
            {selectedSevas.length === 0 ? (
              <Alert severity="info" sx={{ mb: 2 }}>
                No sevas selected. Please go back to the Sevas page to select some.
              </Alert>
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
                
                <Divider sx={{ my: 3 }} />
                
                {/* Delivery Options */}
                <Box sx={{ mb: 3 }}>
                  <FormControl component="fieldset" fullWidth>
                    <FormLabel 
                      component="legend" 
                      sx={{ 
                        color: theme.palette.primary.main,
                        fontWeight: 600,
                        mb: 2,
                        fontSize: { xs: '1rem', sm: '1.1rem' }
                      }}
                    >
                      Prasada Collection Method
                    </FormLabel>
                    <RadioGroup
                      value={deliveryOption}
                      onChange={handleDeliveryOptionChange}
                      sx={{ ml: { xs: 0, sm: 1 } }}
                    >
                      <FormControlLabel
                        value="collect"
                        control={<Radio sx={{ color: theme.palette.primary.main }} />}
                        label={
                          <Box sx={{ 
                            display: 'flex', 
                            alignItems: 'center', 
                            gap: 1,
                            flexWrap: 'wrap'
                          }}>
                            <Typography sx={{ fontSize: { xs: '0.9rem', sm: '1rem' } }}>
                              Collect from Temple
                            </Typography>
                            <Chip 
                              label="Free" 
                              size="small" 
                              sx={{ 
                                backgroundColor: theme.palette.success.light,
                                color: theme.palette.success.contrastText,
                                fontWeight: 600,
                                fontSize: '0.75rem'
                              }}
                            />
                          </Box>
                        }
                      />
                      <FormControlLabel
                        value="delivery"
                        control={<Radio sx={{ color: theme.palette.primary.main }} />}
                        label={
                          <Box sx={{ 
                            display: 'flex', 
                            alignItems: 'center', 
                            gap: 1,
                            flexWrap: 'wrap'
                          }}>
                            <Typography sx={{ fontSize: { xs: '0.9rem', sm: '1rem' } }}>
                              Prasada by Post
                            </Typography>
                            <Chip 
                              label={`+₹${DELIVERY_CHARGE}`} 
                              size="small" 
                              sx={{ 
                                backgroundColor: theme.palette.warning.light,
                                color: theme.palette.warning.contrastText,
                                fontWeight: 600,
                                fontSize: '0.75rem'
                              }}
                            />
                          </Box>
                        }
                      />
                    </RadioGroup>
                  </FormControl>
                </Box>

                <Divider sx={{ my: 2 }} />
                
                {/* Price Summary */}
                <Box sx={{ mt: 2 }}>
                  <Box sx={{ 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    alignItems: 'center',
                    mb: 1,
                    flexWrap: 'wrap',
                    gap: 1
                  }}>
                    <Typography variant="body1" sx={{ fontSize: { xs: '0.9rem', sm: '1rem' } }}>
                      Subtotal:
                    </Typography>
                    <Typography variant="body1" fontWeight={600} sx={{ fontSize: { xs: '0.9rem', sm: '1rem' } }}>
                      ₹{subtotal.toFixed(2)}
                    </Typography>
                  </Box>
                  <Box sx={{ 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    alignItems: 'center',
                    mb: 1,
                    flexWrap: 'wrap',
                    gap: 1
                  }}>
                    <Typography variant="body1" sx={{ fontSize: { xs: '0.9rem', sm: '1rem' } }}>
                      Convenience Fee ({(CONVENIENCE_FEE_PERCENTAGE * 100).toFixed(0)}%):
                    </Typography>
                    <Typography variant="body1" fontWeight={600} sx={{ fontSize: { xs: '0.9rem', sm: '1rem' } }}>
                      ₹{convenienceFee.toFixed(2)}
                    </Typography>
                  </Box>
                  {deliveryOption === 'delivery' && (
                    <Box sx={{ 
                      display: 'flex', 
                      justifyContent: 'space-between', 
                      alignItems: 'center',
                      mb: 1,
                      flexWrap: 'wrap',
                      gap: 1
                    }}>
                      <Typography variant="body1" sx={{ fontSize: { xs: '0.9rem', sm: '1rem' } }}>
                        Delivery Charge:
                      </Typography>
                      <Typography variant="body1" fontWeight={600} sx={{ fontSize: { xs: '0.9rem', sm: '1rem' } }}>
                        ₹{deliveryFee.toFixed(2)}
                      </Typography>
                    </Box>
                  )}
                  <Divider sx={{ my: 1 }} />
                  <Box 
                    sx={{ 
                      display: 'flex', 
                      justifyContent: 'space-between', 
                      alignItems: 'center',
                      p: { xs: 1.5, sm: 2 },
                      borderRadius: 1,
                      backgroundColor: theme.palette.primary.main,
                      color: theme.palette.primary.contrastText,
                      flexWrap: 'wrap',
                      gap: 1
                    }}
                  >
                    <Typography 
                      variant="h6" 
                      fontWeight={600}
                      sx={{ fontSize: { xs: '1.1rem', sm: '1.25rem' } }}
                    >
                      Total Amount:
                    </Typography>
                    <Typography 
                      variant="h6" 
                      fontWeight={700}
                      sx={{ fontSize: { xs: '1.1rem', sm: '1.25rem' } }}
                    >
                      ₹{totalAmount.toFixed(2)}
                    </Typography>
                  </Box>
                </Box>
              </Box>
            )}
          </Paper>
        </Grid>

        {/* Right Section: Contact & Personal Details */}
        <Grid item xs={12} lg={6}>
          <Paper 
            elevation={3} 
            sx={{ 
              p: { xs: 2, sm: 3 }, 
              borderRadius: 2,
              border: `1px solid ${theme.palette.divider}`,
              height: 'fit-content'
            }}
          >
            <Typography 
              variant="h5" 
              gutterBottom 
              sx={{ 
                color: theme.palette.primary.main,
                fontWeight: 600,
                mb: 3,
                fontSize: { xs: '1.25rem', sm: '1.5rem' }
              }}
            >
              Contact Information
            </Typography>
            <Divider sx={{ mb: 2 }} />

            {/* Contact Number Input */}
            <Box sx={{ 
              display: 'flex', 
              flexDirection: { xs: 'column', sm: 'row' },
              gap: 2, 
              mb: 2 
            }}>
              <TextField
                label="Mobile Number or Email"
                value={contactNumber}
                onChange={(e) => setContactNumber(e.target.value)}
                placeholder="Enter your mobile number or email"
                error={!!formErrors.contactNumber}
                helperText={formErrors.contactNumber}
                variant="outlined"
                fullWidth
                sx={{
                  '& .MuiOutlinedInput-root': { 
                    borderRadius: 1,
                    minHeight: '56px',
                  },
                  '& .MuiInputLabel-root': {
                    fontSize: '1rem',
                  }
                }}
              />
              <Button
                variant="contained"
                onClick={handleContactNumberCheck}
                disabled={loading || !contactNumber.trim()}
                sx={{ 
                  minWidth: { xs: '100%', sm: '100px' }, 
                  borderRadius: 1,
                  height: '56px',
                  backgroundColor: theme.palette.primary.main,
                  '&:hover': {
                    backgroundColor: theme.palette.primary.dark,
                  }
                }}
              >
                {loading ? <CircularProgress size={24} color="inherit" /> : 'Check'}
              </Button>
            </Box>

            {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

            {userData && (
              <Alert 
                severity="success" 
                sx={{ 
                  mb: 2,
                  backgroundColor: theme.palette.success.light,
                  color: theme.palette.success.contrastText
                }}
              >
                Welcome back, {userData.name}! Your details have been pre-filled. You can edit them if needed.
              </Alert>
            )}

            {/* User Details Form */}
            {showUserForm && (
              <Box sx={{ mt: 3 }}>
                <Typography
                  variant="h6"
                  gutterBottom
                  sx={{
                    color: theme.palette.primary.main,
                    mb: 3,
                    fontWeight: 600,
                    fontSize: { xs: '1.1rem', sm: '1.25rem' }
                  }}
                >
                  Personal Details
                </Typography>

                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <TextField
                      label="Your Full Name *"
                      name="name"
                      value={userFormData.name}
                      onChange={handleUserFormChange}
                      error={!!formErrors.name}
                      helperText={formErrors.name}
                      required
                      fullWidth
                      variant="outlined"
                      sx={{
                        '& .MuiOutlinedInput-root': { 
                          borderRadius: 1,
                          minHeight: '56px',
                        },
                        '& .MuiInputLabel-root': {
                          fontSize: '1rem',
                        }
                      }}
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <TextField
                      label="Email Address *"
                      name="email"
                      type="email"
                      value={userFormData.email}
                      onChange={handleUserFormChange}
                      error={!!formErrors.email}
                      helperText={formErrors.email}
                      required
                      fullWidth
                      variant="outlined"
                      sx={{
                        '& .MuiOutlinedInput-root': { 
                          borderRadius: 1,
                          minHeight: '56px',
                        },
                        '& .MuiInputLabel-root': {
                          fontSize: '1rem',
                        }
                      }}
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <TextField
                      label="Address *"
                      name="address"
                      multiline
                      rows={3}
                      value={userFormData.address}
                      onChange={handleUserFormChange}
                      error={!!formErrors.address}
                      helperText={formErrors.address}
                      required
                      fullWidth
                      variant="outlined"
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          borderRadius: 1,
                        },
                        '& .MuiInputLabel-root': {
                          fontSize: '1rem',
                        },
                      }}
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <DatePicker
                      label="Seva Date *"
                      value={userFormData.sevaDate}
                      onChange={handleDateChange}
                      minDate={dayjs()}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          error={!!formErrors.sevaDate}
                          helperText={formErrors.sevaDate}
                          required
                          fullWidth
                          variant="outlined"
                          sx={{
                            '& .MuiOutlinedInput-root': { 
                              borderRadius: 1,
                              minHeight: '56px',
                            },
                            '& .MuiInputLabel-root': {
                              fontSize: '1rem',
                            }
                          }}
                        />
                      )}
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <Typography
                      variant="subtitle1"
                      sx={{ 
                        fontWeight: 600, 
                        color: theme.palette.primary.main, 
                        mt: 2, 
                        mb: 2,
                        fontSize: { xs: '1rem', sm: '1.1rem' }
                      }}
                    >
                      Seva Person(s) Details
                    </Typography>
                    
                    <Box sx={{ 
                      border: '1px solid #ccc',
                      borderRadius: 1,
                      p: { xs: 2, sm: 3 },
                      backgroundColor: '#fafafa'
                    }}>
                      {/* Display added persons */}
                      {userFormData.sevaPersons.length > 0 && userFormData.sevaPersons.some(p => p.name) && (
                        <Box sx={{ mb: 3 }}>
                          <Typography variant="body2" sx={{ mb: 2, fontWeight: 600 }}>
                            Added Seva Persons:
                          </Typography>
                          <Box sx={{
                            border: '1px solid #e0e0e0',
                            borderRadius: 1,
                            backgroundColor: '#fff',
                            p: { xs: 1.5, sm: 2 }
                          }}>
                            {userFormData.sevaPersons.map((person, index) => (
                              person.name && (
                                <Box
                                  key={index}
                                  sx={{
                                    display: 'flex',
                                    alignItems: 'flex-start',
                                    justifyContent: 'space-between',
                                    py: 1,
                                    borderBottom: index < userFormData.sevaPersons.filter(p => p.name).length - 1 ? '1px solid #f0f0f0' : 'none',
                                    gap: 1
                                  }}
                                >
                                  <Box sx={{ flex: 1, minWidth: 0 }}>
                                    <Typography 
                                      variant="body2" 
                                      sx={{ 
                                        fontWeight: 600,
                                        fontSize: { xs: '0.85rem', sm: '0.875rem' },
                                        wordBreak: 'break-word'
                                      }}
                                    >
                                      {index + 1}. {person.name}
                                    </Typography>
                                    <Typography 
                                      variant="caption" 
                                      color="textSecondary"
                                      sx={{ 
                                        fontSize: { xs: '0.75rem', sm: '0.8rem' },
                                        display: 'block',
                                        mt: 0.5
                                      }}
                                    >
                                      {person.nakshatra && `Nakshatra: ${person.nakshatra}`}
                                      {person.nakshatra && person.rashi && ' | '}
                                      {person.rashi && `Rashi: ${person.rashi}`}
                                      {!person.nakshatra && !person.rashi && 'No additional details'}
                                    </Typography>
                                  </Box>
                                  <IconButton
                                    onClick={() => handleRemoveSevaPersonFixed(index)}
                                    size="small"
                                    sx={{ 
                                      color: theme.palette.error.main,
                                      flexShrink: 0
                                    }}
                                  >
                                    <DeleteIcon fontSize="small" />
                                  </IconButton>
                                </Box>
                              )
                            ))}
                          </Box>
                        </Box>
                      )}

                      {/* Add new person form */}
                      <Typography 
                        variant="body2" 
                        sx={{ 
                          mb: 2, 
                          fontWeight: 600,
                          fontSize: { xs: '0.85rem', sm: '0.875rem' }
                        }}
                      >
                        {userFormData.sevaPersons.some(p => p.name) ? 'Add Another Seva Person' : 'Add Seva Person Details'}
                      </Typography>
                      
                      <Grid container spacing={2}>
                        <Grid item xs={12}>
                          <TextField
                            label="Person Name *"
                            name="tempPersonName"
                            value={userFormData.tempPersonName || ''}
                            onChange={(e) => setUserFormData(prev => ({ ...prev, tempPersonName: e.target.value }))}
                            required
                            fullWidth
                            variant="outlined"
                            sx={{
                              '& .MuiOutlinedInput-root': { 
                                borderRadius: 1,
                                minHeight: '56px',
                              },
                              '& .MuiInputLabel-root': {
                                fontSize: '1rem',
                              }
                            }}
                          />
                        </Grid>

                        <Grid item xs={12} sm={6}>
                          <TextField
                            label="Nakshatra (Optional)"
                            name="tempPersonNakshatra"
                            value={userFormData.tempPersonNakshatra || ''}
                            onChange={(e) => setUserFormData(prev => ({ ...prev, tempPersonNakshatra: e.target.value }))}
                            fullWidth
                            variant="outlined"
                            sx={{
                              '& .MuiOutlinedInput-root': { 
                                borderRadius: 1,
                                minHeight: '56px',
                              },
                              '& .MuiInputLabel-root': {
                                fontSize: '1rem',
                              }
                            }}
                          />
                        </Grid>

                        <Grid item xs={12} sm={6}>
                          <TextField
                            label="Rashi (Optional)"
                            name="tempPersonRashi"
                            value={userFormData.tempPersonRashi || ''}
                            onChange={(e) => setUserFormData(prev => ({ ...prev, tempPersonRashi: e.target.value }))}
                            fullWidth
                            variant="outlined"
                            sx={{
                              '& .MuiOutlinedInput-root': { 
                                borderRadius: 1,
                                minHeight: '56px',
                              },
                              '& .MuiInputLabel-root': {
                                fontSize: '1rem',
                              }
                            }}
                          />
                        </Grid>

                        <Grid item xs={12}>
                          <Button
                            variant="outlined"
                            onClick={handleAddSevaPersonFixed}
                            disabled={!userFormData.tempPersonName || userFormData.sevaPersons.filter(p => p.name).length >= 4}
                            startIcon={<span style={{ fontWeight: 'bold', fontSize: '1.2rem' }}>+</span>}
                            fullWidth
                            sx={{
                              borderRadius: 1,
                              py: 1.5,
                              fontSize: { xs: '0.9rem', sm: '1rem' }
                            }}
                          >
                            Add Person ({userFormData.sevaPersons.filter(p => p.name).length}/4)
                          </Button>
                        </Grid>
                      </Grid>

                      {formErrors.sevaPersons && (
                        <Typography 
                          variant="caption" 
                          color="error" 
                          sx={{ 
                            mt: 1, 
                            display: 'block',
                            fontSize: { xs: '0.75rem', sm: '0.8rem' }
                          }}
                        >
                          {formErrors.sevaPersons}
                        </Typography>
                      )}
                    </Box>
                  </Grid>
                </Grid>

                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  size="large"
                  onClick={handleProceedToPayment}
                  disabled={selectedSevas.length === 0}
                  sx={{
                    mt: 4,
                    py: { xs: 1.5, sm: 2 },
                    borderRadius: 1,
                    fontSize: { xs: '1rem', sm: '1.1rem' },
                    fontWeight: 600,
                    minHeight: '56px',
                    backgroundColor: theme.palette.primary.main,
                    '&:hover': {
                      backgroundColor: theme.palette.primary.dark,
                    },
                    '&:disabled': {
                      backgroundColor: theme.palette.grey[300],
                    },
                  }}
                >
                  Proceed to Payment (₹{totalAmount.toFixed(2)})
                </Button>
              </Box>
            )}
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}

export default CheckoutPage;