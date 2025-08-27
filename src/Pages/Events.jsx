// components/TempleEventsSection.jsx
import React from 'react';
import {
  Box,
  Typography,
  Container,
  Grid,
  Button,
  useTheme,
} from '@mui/material';
import EventIcon from '@mui/icons-material/Event';
import LocationOnIcon from '@mui/icons-material/LocationOn';

const events = [
  {
    id: 1,
    name: 'Rathotsava - Annual Chariot Festival',
    date: 'August 15, 2025',
    location: 'Sri Kalikamba Temple, Udupi',
    description:
      'Join us for the grand Rathotsava, a spiritual procession of deities in a decorated chariot accompanied by devotional music and rituals.',
  },
  {
    id: 2,
    name: 'Navaratri Celebrations',
    date: 'October 2 - October 11, 2025',
    location: 'Sri Kalikamba Temple, Udupi',
    description:
      'Nine days of devotional festivities, including daily pujas, cultural programs, and spiritual discourses.',
  },
  // Add more events...
];

const TempleEventsSection = () => {
  const theme = useTheme();

  return (
    <Box sx={{ py: 8, backgroundColor: '#fdf5e6' }}>
      <Container>
        <Typography
          variant="h4"
          align="center"
          gutterBottom
          sx={{
            fontWeight: 'bold',
            color: '#8B0000',
            fontFamily: 'serif',
          }}
        >
          Upcoming Temple Events
        </Typography>

        <Grid container direction="column" spacing={4}>
          {events.map((event) => (
            <Grid item key={event.id}>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: { xs: 'column', md: 'row' },
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  p: 3,
                  backgroundColor: 'white',
                  borderRadius: 3,
                  boxShadow: 3,
                  borderLeft: '6px solid #D2691E',
                }}
              >
                <Box sx={{ flex: 1 }}>
                  <Typography variant="h6" sx={{ color: '#8B0000' }}>
                    {event.name}
                  </Typography>

                  <Box sx={{ mt: 1, mb: 2 }}>
                    <Typography variant="body2" color="text.secondary">
                      <EventIcon fontSize="small" sx={{ mr: 1, verticalAlign: 'middle' }} />
                      {event.date}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      <LocationOnIcon fontSize="small" sx={{ mr: 1, verticalAlign: 'middle' }} />
                      {event.location}
                    </Typography>
                  </Box>

                  <Typography variant="body1" sx={{ color: '#444' }}>
                    {event.description}
                  </Typography>
                </Box>

                <Box sx={{ mt: { xs: 2, md: 0 }, ml: { md: 3 } }}>
                  <Button
                    variant="contained"
                    color="warning"
                    sx={{
                      fontWeight: 'bold',
                      borderRadius: 2,
                      px: 4,
                      backgroundColor: '#B22222',
                      '&:hover': {
                        backgroundColor: '#8B0000',
                      },
                    }}
                  >
                    View Details
                  </Button>
                </Box>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default TempleEventsSection;
