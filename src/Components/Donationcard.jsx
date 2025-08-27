// Components/DonationCard.jsx
import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  Box,
  Button,
  Divider,
} from '@mui/material';
import TempleHinduIcon from '@mui/icons-material/TempleHindu';
import VolunteerActivismIcon from '@mui/icons-material/VolunteerActivism';

const DonationCard = ({ title, description, amount, image, onDonate }) => {
  return (
    <Card
      sx={{
        width: 320,
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        borderRadius: 4,
        boxShadow: 4,
        bgcolor: 'background.paper',
        border: '1px solid #ffe0b2',
        transition: '0.3s',
        '&:hover': {
          boxShadow: 8,
          transform: 'translateY(-4px)',
        },
      }}
    >
      {image && (
        <Box
          component="img"
          src={image}
          alt={title}
          sx={{
            width: '100%',
            height: 180,
            objectFit: 'cover',
            borderTopLeftRadius: 16,
            borderTopRightRadius: 16,
          }}
        />
      )}

      <CardContent sx={{ flexGrow: 1, p: 3 }}>
        <Box display="flex" alignItems="center" gap={1} mb={1}>
          <TempleHinduIcon color="primary" />
          <Typography variant="h6" color="text.primary" fontWeight={600}>
            {title}
          </Typography>
        </Box>

        <Divider sx={{ mb: 2, bgcolor: '#e0c9a6' }} />

        <Typography variant="body2" color="text.secondary" mb={2}>
          {description}
        </Typography>

        <Typography
          variant="subtitle2"
          fontWeight={600}
          color="secondary.main"
        >
          Suggested Donation: ₹{amount}
        </Typography>
      </CardContent>

      <Box textAlign="center" pb={3}>
        <Button
          variant="contained"
          color="secondary"
          startIcon={<VolunteerActivismIcon />}
          onClick={onDonate}
          sx={{
            borderRadius: 5,
            fontWeight: 600,
            px: 4,
            boxShadow: 2,
          }}
        >
          Donate Now
        </Button>
      </Box>
    </Card>
  );
};

export default DonationCard;
