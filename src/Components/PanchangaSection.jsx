import React from 'react';
import {
  Box,
  Card,
  // CardContent, // This is not used, can be removed
  Typography,
  Grid,
  Chip,
  Avatar,
  List,
  ListItem,
  ListItemText,
  Divider,
  Container,
  useTheme // Import useTheme
} from '@mui/material';
import {
  WbSunny, NightsStay, Star, AccessTime, CalendarToday, LocationOn, Warning
} from '@mui/icons-material';

const iconMap = {
  tithi: <NightsStay />,
  nakshatra: <Star />,
  yoga: <WbSunny />,
  karana: <AccessTime />,
  vara: <CalendarToday />
};

const PanchangaItem = ({ title, value, icon }) => {
  const theme = useTheme(); // Use theme inside the component

  return (
    <Card
      sx={{
        width: 180, // Set a fixed width
        height: 100, // Keep fixed height
        // flexGrow: 1, // Remove flexGrow to prevent expansion
        display: 'flex',
        alignItems: 'center',
        p: 2,
        borderRadius: 3,
        background: 'rgba(255, 255, 255, 0.6)',
        backdropFilter: 'blur(10px)',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
        transition: 'all 0.3s ease',
        '&:hover': {
          transform: 'scale(1.02)',
          boxShadow: '0 6px 18px rgba(0, 0, 0, 0.15)',
        },
      }}
    >
      <Avatar
        sx={{
          bgcolor: theme.palette.primary.main, // Use theme color
          width: 48,
          height: 48,
          fontSize: 24,
          mr: 2,
        }}
      >
        {icon}
      </Avatar>

      <Box>
        <Typography variant="subtitle2" fontWeight={600} color={theme.palette.text.primary}> {/* Use theme color */}
          {title}
        </Typography>
        <Typography variant="body2" color={theme.palette.text.secondary}> {/* Use theme color */}
          {value}
        </Typography>
      </Box>
    </Card>
  );
};


function PanchangaSection({ panchangaData = {} }) {
  const theme = useTheme(); // Use theme inside the component

  const data = {
    date: new Date().toDateString(),
    location: "Udupi, Karnataka",
    panchanga: {
      tithi: { name: 'Shukla Dashami' },
      nakshatra: { name: 'Pushya' },
      yoga: { name: 'Siddha' },
      karana: { name: 'Taitila' },
      // vara: { name: 'Ravivara' }
    },
    sunMoon: {
      sunrise: '06:10 AM',
      sunset: '06:50 PM',
      moonrise: '10:45 PM',
      moonset: '11:30 AM'
    },
    muhurta: [
      { name: 'Rahu Kaal', time: '04:30 PM - 06:00 PM', type: 'inauspicious' },
      { name: 'Abhijit Muhurta', time: '12:00 PM - 12:50 PM', type: 'auspicious' }
    ],
    ...panchangaData
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Box textAlign="center" mb={3}>
        <Typography variant="h5" fontWeight="bold" color={theme.palette.primary.main}> {/* Use theme color */}
          📿 Today's Panchanga
        </Typography>
        <Typography color={theme.palette.text.secondary}>{data.date}</Typography> {/* Use theme color */}
        <Typography variant="body2" color={theme.palette.text.secondary}> {/* Use theme color */}
          <LocationOn fontSize="small" sx={{ verticalAlign: 'middle' }} /> {data.location}
        </Typography>
      </Box>

      {/* Panchanga Basics */}
      <Grid container spacing={2} mb={3} justifyContent="center"> {/* Center the grid items */}
        {Object.entries(data.panchanga).map(([key, item]) => (
          <Grid item xs={6} sm={4} key={key} sx={{ display: 'flex', justifyContent: 'center' }}> {/* Center card within grid item */}
            <PanchangaItem
              title={key.charAt(0).toUpperCase() + key.slice(1)}
              value={item.name}
              icon={iconMap[key]}
            />
          </Grid>
        ))}
      </Grid>

      {/* Sun/Moon */}
      <Grid container spacing={2} mb={3} justifyContent="center"> {/* Center the grid items */}
        <Grid item xs={6} sx={{ display: 'flex', justifyContent: 'center' }}> {/* Center card within grid item */}
          <PanchangaItem title="Sunrise" value={data.sunMoon.sunrise} icon={<WbSunny />} />
        </Grid>
        <Grid item xs={6} sx={{ display: 'flex', justifyContent: 'center' }}> {/* Center card within grid item */}
          <PanchangaItem title="Sunset" value={data.sunMoon.sunset} icon={<WbSunny />} />
        </Grid>
        <Grid item xs={6} sx={{ display: 'flex', justifyContent: 'center' }}> {/* Center card within grid item */}
          <PanchangaItem title="Moonrise" value={data.sunMoon.moonrise} icon={<NightsStay />} />
        </Grid>
        <Grid item xs={6} sx={{ display: 'flex', justifyContent: 'center' }}> {/* Center card within grid item */}
          <PanchangaItem title="Moonset" value={data.sunMoon.moonset} icon={<NightsStay />} />
        </Grid>
      </Grid>

      {/* Muhurtas */}
      <Box mt={3}>
        <Typography variant="h6" fontWeight={600} gutterBottom>
          ⏳ Muhurta Timings
        </Typography>
        <List disablePadding>
          {data.muhurta.map((item, idx) => (
            <React.Fragment key={idx}>
              <ListItem disableGutters>
                <ListItemText
                  primary={item.name}
                  secondary={item.time}
                  primaryTypographyProps={{ fontWeight: 500 }}
                />
                <Chip
                  label={item.type}
                  size="small"
                  color={
                    item.type === 'auspicious' ? 'success' :
                    item.type === 'inauspicious' ? 'error' : 'default'
                  }
                />
              </ListItem>
              {idx < data.muhurta.length - 1 && <Divider />}
            </React.Fragment>
          ))}
        </List>
      </Box>
    </Container>
  );
}

export default PanchangaSection;