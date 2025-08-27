import React, { useState, useEffect, useMemo } from 'react';
import { 
  Box, 
  Container, 
  Typography, 
  TextField, 
  InputAdornment, 
  useTheme,
  Grid,
  Paper,
  useMediaQuery,
  Fade,
  Zoom
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import SevaCard from '../Components/SevaCard';
import SevaInfoDialog from '../Components/SevaInfoDialog';
import SevaSelectionBar from '../Components/SevaSelectionBar';
import { useNavigate } from 'react-router-dom';

// Dummy Seva Data (replace with actual data from an API later)
const DUMMY_SEVAS = [
  {
    id: 's1',
    name: 'Archana',
    price: 51.00,
    time: '10:00 AM',
    description: 'A short prayer offered to the deity by chanting the names of the God/Goddess. It is performed daily for the well-being of devotees.'
  },
  {
    id: 's2',
    name: 'Abhishekam',
    time: '6:00 PM',
    price: 251.00,
    description: 'A ritual bathing of the deity with various sacred substances like milk, curd, honey, ghee, sugar, and water. It is believed to purify and invoke blessings.'
  },
  {
    id: 's3',
    name: 'Homam',
    time: '8:00 AM',
    price: 501.00,
    description: 'A fire ritual performed to invoke specific deities and seek their blessings. Offerings are made into the sacred fire with mantras.'
  },
  {
    id: 's4',
    name: 'Annadanam',
    time: '5:00 PM',
    price: 1001.00,
    description: 'The sacred act of donating food. It is considered one of the greatest charities, providing sustenance to devotees and the needy.'
  },
  {
    id: 's5',
    name: 'Vahana Puja',
    time: '9:00 AM',
    price: 151.00,
    description: 'A special prayer performed for vehicles to ensure safety and protection from accidents and negative energies.'
  },
  {
    id: 's6',
    name: 'Satyanarayana Puja',
    time: '7:00 PM',
    price: 751.00,
    description: 'A Hindu ritual performed to worship Lord Vishnu in the form of Satyanarayana. It is performed to seek blessings for health, wealth, and prosperity.'
  },
  {
    id: 's7',
    name: 'Navagraha Puja',
    time: '11:00 AM',
    price: 301.00,
    description: 'A puja performed to appease the nine planets (Navagrahas) and mitigate any negative influences they may have on one\'s life.'
  },
  {
    id: 's8',
    name: 'Rudrabhishekam',
    time: '4:00 PM',
    price: 1201.00,
    description: 'An elaborate Abhishekam performed for Lord Shiva, involving chanting of Vedic hymns and offering various sacred items. It is believed to bring peace and prosperity.'
  },
];

const LOCAL_STORAGE_KEY = 'selectedSevas';

function SevasPage() {
  const theme = useTheme();
  const navigate = useNavigate();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));
  
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSevas, setSelectedSevas] = useState(() => {
    // Initialize selected sevas from local storage
    try {
      const storedSevas = localStorage.getItem(LOCAL_STORAGE_KEY);
      const parsedSevas = storedSevas ? JSON.parse(storedSevas) : [];
      return parsedSevas.map(seva => ({ ...seva, quantity: seva.quantity || 1 }));
    } catch (error) {
      console.error("Failed to parse selected sevas from local storage:", error);
      return [];
    }
  });
  const [infoDialogOpen, setInfoDialogOpen] = useState(false);
  const [selectedSevaForInfo, setSelectedSevaForInfo] = useState(null);

  // Effect to update local storage whenever selectedSevas changes
  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(selectedSevas));
    } catch (error) {
      console.error("Failed to save selected sevas to local storage:", error);
    }
  }, [selectedSevas]);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleInfoClick = (seva) => {
    setSelectedSevaForInfo(seva);
    setInfoDialogOpen(true);
  };

  const handleInfoDialogClose = () => {
    setInfoDialogOpen(false);
    setSelectedSevaForInfo(null);
  };

  const handleSelectSeva = (sevaToToggle) => {
    setSelectedSevas((prevSelectedSevas) => {
      const isAlreadySelected = prevSelectedSevas.some(s => s.id === sevaToToggle.id);
      if (isAlreadySelected) {
        return prevSelectedSevas.filter(s => s.id !== sevaToToggle.id);
      } else {
        return [...prevSelectedSevas, { ...sevaToToggle, quantity: 1 }];
      }
    });
  };

  const handleQuantityChange = (sevaId, newQuantity) => {
    if (newQuantity < 1) return; 
    setSelectedSevas(prevSevas =>
      prevSevas.map(seva =>
        seva.id === sevaId ? { ...seva, quantity: newQuantity } : seva
      )
    );
  };

  // Update total price calculation to include quantity
  const totalSelectedPrice = selectedSevas.reduce((sum, seva) => 
    sum + (seva.price * seva.quantity), 0
  );

  // Filter sevas based on search term
  const filteredSevas = useMemo(() => {
    const lowerCaseSearchTerm = searchTerm.toLowerCase();
    return DUMMY_SEVAS.filter(seva =>
      seva.name.toLowerCase().includes(lowerCaseSearchTerm) ||
      seva.description.toLowerCase().includes(lowerCaseSearchTerm)
    );
  }, [searchTerm]);

  const handleNextClick = () => {
    if (selectedSevas.length > 0) {
      navigate('/checkout', { state: { selectedSevas } });
    } else {
      alert('Please select at least one seva to proceed.');
    }
  };

  return (
    <Box 
      sx={{ 
        pb: 10,
        background: `linear-gradient(135deg, ${theme.palette.background.default}, ${theme.palette.grey[50]})`
      }}
    >
      <Container maxWidth="xl" sx={{ py: 8 }}>
        {/* Header Section */}
        <Fade in timeout={800}>
          <Box sx={{ textAlign: 'center', mb: isMobile ? 4 : 6 }}>
            <Typography 
              variant={isMobile ? "h3" : "h2"} 
              sx={{ 
                fontWeight: 800,
                background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                mb: 1,
                textShadow: `0 4px 8px ${theme.palette.primary.main}20`
              }}
            >
              Our Sacred Sevas
            </Typography>
            <Typography 
              variant="h6" 
              sx={{ 
                color: theme.palette.text.secondary,
                fontWeight: 400,
                maxWidth: 600,
                mx: 'auto'
              }}
            >
              Choose from our collection of divine services to seek blessings and spiritual fulfillment
            </Typography>
          </Box>
        </Fade>

        {/* Enhanced Search Bar */}
        <Fade in timeout={1000}>
          <Box sx={{ mb: isMobile ? 4 : 6, display: 'flex', justifyContent: 'center' }}>
            <Paper
              elevation={8}
              sx={{
                p: 1,
                borderRadius: 4,
                background: `linear-gradient(135deg, ${theme.palette.background.paper}, ${theme.palette.grey[50]})`,
                backdropFilter: 'blur(10px)',
                border: `1px solid ${theme.palette.divider}`,
                maxWidth: isMobile ? '100%' : 700,
                width: '100%'
              }}
            >
              <TextField
                fullWidth
                variant="outlined"
                placeholder="Search for sevas, rituals, or blessings..."
                value={searchTerm}
                onChange={handleSearchChange}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon sx={{ color: theme.palette.primary.main }} />
                    </InputAdornment>
                  ),
                  sx: {
                    '& .MuiOutlinedInput-notchedOutline': {
                      border: 'none'
                    },
                    borderRadius: 3,
                    fontSize: isMobile ? '0.95rem' : '1rem'
                  }
                }}
                sx={{ 
                  '& .MuiInputBase-input': {
                    padding: isMobile ? '12px 0' : '16px 0'
                  }
                }}
              />
            </Paper>
          </Box>
        </Fade>

        {/* Results Count */}
        {searchTerm && (
          <Fade in timeout={600}>
            <Box sx={{ mb: 3, textAlign: 'center' }}>
              <Typography
                variant="body1"
                sx={{
                  color: theme.palette.text.secondary,
                  fontWeight: 500
                }}
              >
                Found {filteredSevas.length} seva{filteredSevas.length !== 1 ? 's' : ''} 
                {searchTerm && ` matching "${searchTerm}"`}
              </Typography>
            </Box>
          </Fade>
        )}

        {/* Seva Cards Grid */}
        <Grid container spacing={isMobile ? 2 : 3} justifyContent="center">
          {filteredSevas.length > 0 ? (
            filteredSevas.map((seva, index) => (
              <Grid 
                item 
                xs={12}        // 1 per row on mobile
                sm={6}         // 2 per row on small tablets
                md={4}         // 3 per row on medium screens
                lg={3}         // 4 per row on large screens
                xl={3}         // 4 per row on extra large screens
                key={seva.id}
                sx={{
                  display: 'flex',
                  justifyContent: 'center'
                }}
              >
                <Zoom in timeout={400 + (index * 100)}>
                  <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
                    <SevaCard
                      seva={seva}
                      onInfoClick={handleInfoClick}
                      onSelect={handleSelectSeva}
                      isSelected={selectedSevas.some(s => s.id === seva.id)}
                      quantity={selectedSevas.find(s => s.id === seva.id)?.quantity || 1}
                      onQuantityChange={(newQuantity) => handleQuantityChange(seva.id, newQuantity)}
                    />
                  </div>
                </Zoom>
              </Grid>
            ))
          ) : (
            <Grid item xs={12}>
              <Fade in timeout={600}>
                <Paper
                  elevation={4}
                  sx={{
                    p: 6,
                    textAlign: 'center',
                    borderRadius: 3,
                    background: `linear-gradient(135deg, ${theme.palette.background.paper}, ${theme.palette.grey[50]})`
                  }}
                >
                  <Typography 
                    variant="h5" 
                    sx={{
                      color: theme.palette.text.secondary,
                      mb: 2,
                      fontWeight: 600
                    }}
                  >
                    No Sevas Found
                  </Typography>
                  <Typography 
                    variant="body1" 
                    sx={{
                      color: theme.palette.text.disabled
                    }}
                  >
                    Try adjusting your search terms or browse all available sevas
                  </Typography>
                </Paper>
              </Fade>
            </Grid>
          )}
        </Grid>

        {/* Selected Sevas Summary */}
        {selectedSevas.length > 0 && (
          <Fade in timeout={800}>
            <Box sx={{ mt: 6, textAlign: 'center' }}>
              <Paper
                elevation={6}
                sx={{
                  p: 3,
                  borderRadius: 3,
                  background: `linear-gradient(135deg, ${theme.palette.primary.light}10, ${theme.palette.primary.main}05)`,
                  border: `1px solid ${theme.palette.primary.light}30`,
                  maxWidth: 400,
                  mx: 'auto'
                }}
              >
                <Typography
                  variant="h6"
                  sx={{
                    color: theme.palette.primary.main,
                    fontWeight: 700,
                    mb: 1
                  }}
                >
                  Selected Sevas Summary
                </Typography>
                <Typography
                  variant="body1"
                  sx={{
                    color: theme.palette.text.secondary
                  }}
                >
                  {selectedSevas.reduce((total, seva) => total + seva.quantity, 0)} item(s) • 
                  ₹{totalSelectedPrice.toFixed(2)}
                </Typography>
              </Paper>
            </Box>
          </Fade>
        )}
      </Container>

      {/* Keep existing dialog and selection bar */}
      <SevaInfoDialog
        open={infoDialogOpen}
        onClose={handleInfoDialogClose}
        seva={selectedSevaForInfo}
      />

      {selectedSevas.length > 0 && (
        <SevaSelectionBar
          selectedSevasCount={selectedSevas.reduce((total, seva) => total + seva.quantity, 0)}
          totalSelectedPrice={totalSelectedPrice}
          onNextClick={handleNextClick}
        />
      )}
    </Box>
  );
}

export default SevasPage;