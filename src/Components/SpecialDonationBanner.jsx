// components/SpecialDonationBanner.jsx
import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import TempleHinduIcon from '@mui/icons-material/TempleHindu';

const SpecialDonationBanner = () => {
  return (
    <Box
      sx={{
        background: 'linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.6)), url("/temple-bg.jpg") center/cover no-repeat',
        borderRadius: 4,
        p: { xs: 3, md: 6 },
        color: 'white',
        mb: 5,
        textAlign: 'center',
        boxShadow: 6,
      }}
    >
      <TempleHinduIcon sx={{ fontSize: 50, mb: 1, color: '#FFB300' }} />
      <Typography variant="h4" fontWeight="bold" gutterBottom>
        Special Temple Renovation Fund
      </Typography>
      <Typography variant="body1" maxWidth="md" mx="auto" mb={3}>
        Join hands in preserving the sanctity of our temple by supporting its renovation. Every contribution counts in maintaining this sacred space.
      </Typography>
      <Button
        variant="contained"
        color="secondary"
        size="large"
        sx={{
          borderRadius: 3,
          px: 5,
          fontWeight: 600,
        }}
      >
        Contribute Now
      </Button>
    </Box>
  );
};

export default SpecialDonationBanner;
