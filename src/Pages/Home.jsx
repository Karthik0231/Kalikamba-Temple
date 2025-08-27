import React from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Chip,
  Button,
  Paper,
  Divider
} from '@mui/material';
import { Schedule, Event, Place, VolunteerActivism, Home as HomeIcon } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

// Reusable existing components
import HeroSection from '../Components/HeroSection';
import MarqueeStrip from '../Components/MarqueeStrip';
import PanchangaSection from '../Components/PanchangaSection';
import QuickInfoBanner from '../Components/QuickAccess';
import MemberCard from '../components/MemberCard';

const COLORS = {
  primary: '#7C4700',  // Temple brown
  accent: '#D4AF37',   // Gold
  background: '#FFF6E0', // Light temple beige
  cardBg: '#FFFCEF'
};

function Home() {
  const navigate = useNavigate();

  // Hero image and temple intro
  const heroImage = {
    src: 'https://media.istockphoto.com/id/517188688/photo/mountain-landscape.jpg?s=1024x1024&w=0&k=20&c=z8_rWaI8x4zApNEEG9DnWlGXyDIXe-OmsAyQ5fGPVV8=',
    alt: 'ಕಾಳಿಕಾಂಬಾ ದೇವಿಯ ಪ್ರವೇಶ ದ್ವಾರ',
    title: 'ಶ್ರೀ ಕಾಳಿಕಾಂಬಾ ದೇವಸ್ಥಾನ, ಬಾರ್ಕೂರು',
    description: 'ಶ್ರೀ ಕಾಳಿಕಾಂಬಾ ದೇವಿಯ ಪಾವನ ಸನ್ನಿಧಾನಕ್ಕೆ ಸುಸ್ವಾಗತ. ಉಡುಪಿಯ ಪ್ರಸಿದ್ಧ ಹೊಳೆತೀರ ದೇವಾಲಯ, ಬಾರ್ಕೂರಿನಲ್ಲಿ Goddess KaliKamba ತಾ ಶ್ರೀ ದೇವಿಯ ಆರ್ಥಿಕ ಮತ್ತು ಸಾಂಸ್ಕೃತಿಕ ಸೇವೆಗಳ ಕೇಂದ್ರ.',
  };

  const todaySevaKartas = [
    'ಶ್ರೀ ಗಣೇಶ್ ಹೆಗ್ಡೆ',
    'ಶ್ರೀಮತಿ ಲಕ್ಷ್ಮೀ ರಾವ್',
    'ಶ್ರೀ ರಮೇಶ್ ಪೈ',
    'ಶ್ರೀ ವಿಜಯ ಶೆಟ್ಟಿ'
  ];

  // Panchanga sample for Udupi
  const data = {
    date: 'ಆಗಸ್ಟ್ ೨೭, ೨೦೨೫',
    location: 'ಬಾರ್ಕೂರು, ಉಡುಪಿ',
    panchanga: {
      tithi: { name: 'ಶುಕ್ಲ ದ್ವಿತೀಯ' },
      nakshatra: { name: 'ರೋಹಿಣಿ' },
      yoga: { name: 'ಸಿದ್ಧ' },
      karana: { name: 'ಬವ' }
    },
    sunMoon: {
      sunrise: '06:15 ಬೆಳಿಗ್ಗೆ',
      sunset: '06:45 ಸಂಜೆ',
      moonrise: '08:30 ರಾತ್ರಿ',
      moonset: '07:15 ಬೆಳಿಗ್ಗೆ'
    },
    muhurta: [
      { name: 'ರಾಹುಕಾಲ', time: '12:00–1:30pm', type: 'inauspicious' },
      { name: 'ಅಭಿಜಿತ್ ಮುಹೂರ್ತ', time: '12:00–12:48pm', type: 'auspicious' }
    ]
  };

  // News/Announcements (sample for temple events)
  const newsItems = [
    {
      title: "354ನೇ ಪುನರ್ಪೂಜೆ - ಆರಾಧನಾ ಮಹೋತ್ಸವ",
      description: "ಶ್ರೀ ಕಾಳಿಕಾಂಬಾ ದೇವಸ್ಥಾನದ ವಾರ್ಷಿಕ ಆರಾಧನಾ ಉತ್ಸವದಲ್ಲಿ ವಿಶೇಷ ಸೇವೆ, ಸಾಂಸ್ಕೃತಿಕ ಕಾರ್ಯಕ್ರಮಗಳು, ಭಕ್ತರಿಗಾಗಿ ಅನ್ನಸಂತರ್ಪಣೆ ನಡೆಯಲಿದೆ.",
      date: "2025-08-30",
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop"
    },
    {
      title: "ಚಾತುರ್ಮಾಸ್ಯದ ಕ್ರಮ",
      description: "ಆಷಾಢ ಶುಕ್ಲ ಏಕಾದಶಿಯಿಂದ ಚಾತುರ್ಮಾಸ್ಯ ದೀಕ್ಷೆ ಪ್ರಾರಂಭ; ದಿನದಷ್ಟು ವಿಶೇಷ ಪೂಜೆ, ಭಜನೆ, ಧಾರ್ಮಿಕ ಉಪನ್ಯಾಸ.",
      date: "2025-07-22",
      image: "https://images.unsplash.com/photo-1583932450421-c4b6d6b4c635?w=400&h=300&fit=crop"
    },
    {
      title: "ಶ್ರೀ ಜಯತೀರ್ಥ ಸ್ವಾಮಿ ಆರಾಧನೆ",
      description: "15 ಜುಲೈ 2025 ರಂದು ಶ್ರೀ ಜಯತೀರ್ಥ ಸ್ವಾಮಿ ಆರಾಧನಾ ಮಹೋತ್ಸವ; ವಿಶೇಷ ಪೂಜೆ, ಅಭಿಷೇಕ ಮತ್ತು ಪ್ರಸಾದ ವಿತರಣೆ.",
      date: "2025-07-15",
      image: "https://images.unsplash.com/photo-1604608672516-a752905dbb2e?w=400&h=300&fit=crop"
    }
  ];

  // Daily pooja seva schedule
  const dailySevas = [
    { name: 'ಸುಪ್ರಭಾತ ಸೇವೆ', time: '5:30 ಬೆಳಿಗ್ಗೆ', description: 'ದೇವಿಯ ಪ್ರಥಮ ಆರಾಧನೆ' },
    { name: 'ಅಭಿಷೇಕ', time: '6:30 ಬೆಳಿಗ್ಗೆ', description: 'ಕಾಳಿಕಾಂಬಾ ದೇವಿಗೆ ಅಭಿಷೇಕ' },
    { name: 'ದ್ವಾರಪೂಜೆ', time: '7:00 ಬೆಳಿಗ್ಗೆ', description: 'ದೇವಾಲಯದ ಪ್ರವೇಶ ಪೂಜೆ' },
    { name: 'ಅರ್ಚನೆ', time: '8:00–11:30 ಬೆಳಗ್ಗೆ', description: 'ವೈಯಕ್ತಿಕ ಅರ್ಚನೆ/ಪ್ರಾರ್ಥನೆ' },
    { name: 'ಮಧ್ಯಾಹ್ನ ಪೂಜೆ', time: '12:30 ಮಧ್ಯಾಹ್ನ', description: 'ಅನ್ನಸಂತರ್ಪಣೆ, ಸಾಮೂಹಿಕ ಪೂಜೆ' },
    { name: 'ಸಾಯಂಕಾಲ ದೀಪಾರಾಧನೆ', time: '6:45 ಸಂಜೆ', description: 'ಸಾಯಂಕಾಲದ ಆರತಿ' },
    { name: 'ರಾತ್ರಿ ಶಯನ ಪೂಜೆ', time: '8:30 ರಾತ್ರಿ', description: 'ರಾತ್ರಿ ಆರತಿ' }
  ];

  // Official staff/factually sourced titles
  const teamMembers = [
    {
      id: 1,
      name: 'ಪಂಡಿತ್ ನಾಗೇಶ ಭಟ್',
      position: 'ಮುಖ್ಯ ಪೂಜಾರಿ',
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTLA994hpL3PMmq0scCuWOu0LGsjef49dyXVg&s'
    },
    {
      id: 2,
      name: 'ಶ್ರೀ ಸುಬ್ರಹ್ಮಣ್ಯ ಆಚಾರ್ಯ',
      position: 'ಉಪ ಪೂಜಾರಿ',
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTLA994hpL3PMmq0scCuWOu0LGsjef49dyXVg&s'
    },
    {
      id: 3,
      name: 'ಶ್ರೀಮತಿ ಶಾರದಾ ನಾಯಕ್',
      position: 'ಮಹಿಳಾ ಸಮಿತಿ ಅಧ್ಯಕ್ಷೆ',
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTLA994hpL3PMmq0scCuWOu0LGsjef49dyXVg&s'
    },
    {
      id: 4,
      name: 'ಶ್ರೀ ರವೀಂದ್ರ ಶೆಟ್ಟಿಗಾರ್',
      position: 'ದೇವಸ್ಥಾನ ಸೇವಾ ಸಮಿತಿಭಾಗ',
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTLA994hpL3PMmq0scCuWOu0LGsjef49dyXVg&s'
    }
  ];

  // Upcoming festivals
  const upcomingFestivals = [
    {
      name: 'ಗಣೇಶ ಚತುರ್ಥಿ',
      date: 'ಸೆಪ್ಟೆಂಬರ್ 7, 2025',
      description: 'ಶ್ರೀ ಗಣಪತಿಗೆ ವಿಶೇಷ ಪೂಜೆ, ಪ್ರಸಾದ'
    },
    {
      name: 'ನವದುರ್ಗಾ ವ್ರತ',
      date: 'ಅಕ್ಟೋಬರ್ 3–12, 2025',
      description: 'ದುರ್ಗಾ ಪೂಜೆ, ಕಾರ್ತಿಕ ಆರಾಧನೆ'
    },
    {
      name: 'ದೀಪಾವಳಿಯ ಹಬ್ಬ',
      date: 'ಅಕ್ಟೋಬರ್ 20, 2025',
      description: 'ಲಕ್ಷ್ಮೀ ಪೂಜೆ ಮತ್ತು ದೀಪೋತ್ಸವ'
    },
    {
      name: 'ಕಾರ್ತಿಕ ಮಾಸ ಪೂಜೆ',
      date: 'ನವೆಂಬರ್ 2025',
      description: 'ಕಾರ್ತಿಕ ಮಾಸದ ಆರಾಧನೆ'
    }
  ];

  // Temple service cards with navigation
  const templeServices = [
    {
      title: 'ಸೇವಾ ಬುಕ್ಕಿಂಗ್',
      description: ' ವಿಶೇಷ ಸೇವೆ, ಪೂಜೆ ಮತ್ತು ಅರ್ಚನೆಗಳನ್ನು ಆನ್‌ಲೈನ್‌ನಲ್ಲಿ ಬುಕ್ ಮಾಡಿ.',
      icon: <Schedule color="primary" />,
      link: '/sevas'
    },
    {
      title: 'ದಾನ/ಅನುದಾನ',
      description: 'ಮೂಲ್ಯಮಾಪನ ದಾನದ ಮೂಲಕ ದೇವಸ್ಥಾನ ಅಭಿವೃದ್ಧಿಗೆ ಸಂಪನ್ಮೂಲ.',
      icon: <VolunteerActivism color="primary" />,
      link: '/donations'
    },
    {
      title: 'ಆರವಣ್ಯ ಕಾರ್ಯಕ್ರಮಗಳು',
      description: 'ಆರವಣ್ಯ ಮಹೋತ್ಸವ, ಸಾಂಸ್ಕೃತಿಕ ಕಾರ್ಯಕ್ರಮಗಳು ಮತ್ತು ಧಾರ್ಮಿಕ ಉಪನ್ಯಾಸಗಳಿಗೆ ನೋಂದಾಯಿಸಿ.',
      icon: <Event color="primary" />,
      link: '/events'
    },
    {
      title: 'ಹಾಲ್ ಬುಕ್ಕಿಂಗ್',
      description: 'ವಿವಾಹ, ಉಪನಯನ ಮತ್ತು ಸಾಮೂಹಿಕ ಕಾರ್ಯಕ್ರಮಗಳಿಗೆ ಮಾಂದಪ ಬುಕ್ ಮಾಡಿ.',
      icon: <HomeIcon color="primary" />,
      link: '/hall-booking'
    }
  ];

  return (
    <Box sx={{ backgroundColor: COLORS.background, minHeight: '100vh' }}>
      {/* Hero header */}
      <HeroSection image={heroImage} />

      {/* Marquee – today's seva kartas */}
      <MarqueeStrip sevaKartas={todaySevaKartas} />

      {/* News & Announcements */}
      <QuickInfoBanner newsItems={newsItems} />

      {/* Daily Seva Schedule */}
      <Container maxWidth="lg" sx={{ py: 5 }}>
        <Typography variant="h4" align="center" gutterBottom sx={{ color: COLORS.primary, fontWeight: 700, mb: 3 }}>
          ಇಂದು ದೇವಸ್ಥಾನದ ಪ್ರಧಾನ ಸೇವೆಗಳ ಸಮಯ
        </Typography>
        <Grid container spacing={3}>
          {dailySevas.map((seva, idx) => (
            <Grid item xs={12} sm={6} md={4} key={idx}>
              <Card sx={{
                background: COLORS.cardBg,
                border: `2px solid ${COLORS.accent}`,
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between'
              }}>
                <CardContent sx={{ textAlign: 'center', p: 3 }}>
                  <Typography variant="h6" sx={{ color: COLORS.primary, fontWeight: 600 }}>{seva.name}</Typography>
                  <Chip label={seva.time} sx={{ my: 1, bgcolor: COLORS.accent, color: 'white', fontWeight: 500 }} />
                  <Typography variant="body2" sx={{ color: COLORS.primary }}>{seva.description}</Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Panchanga Kannada */}
      <PanchangaSection panchangaData={data} />

      {/* Upcoming Festivals */}
      <Container maxWidth="lg" sx={{ py: 5 }}>
        <Typography variant="h4" align="center" gutterBottom sx={{ color: COLORS.primary, fontWeight: 700, mb: 3 }}>
          ಬರಲಿರುವ ಹಬ್ಬಗಳು
        </Typography>
        <Grid container spacing={3}>
          {upcomingFestivals.map((fest, idx) => (
            <Grid item xs={12} sm={6} md={3} key={idx}>
              <Card sx={{
                background: COLORS.cardBg,
                border: `2px solid ${COLORS.accent}`,
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between'
              }}>
                <CardContent sx={{ textAlign: 'center', p: 2 }}>
                  <Typography variant="h6" sx={{ color: COLORS.primary }}>{fest.name}</Typography>
                  <Chip label={fest.date} sx={{ my: 1, bgcolor: COLORS.accent, color: 'white', fontWeight: 600 }} />
                  <Typography variant="body2" sx={{ color: COLORS.primary }}>{fest.description}</Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Temple Services – with navigation */}
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Typography variant="h4" align="center" gutterBottom sx={{ color: COLORS.primary, fontWeight: 700, mb: 3 }}>
          ದೇವಸ್ಥಾನದ ಪ್ರಮುಖ ಸೇವೆಗಳು
        </Typography>
        <Grid container spacing={3} justifyContent="center">
          {templeServices.map((service, idx) => (
            <Grid item xs={12} sm={6} md={3} key={idx}>
              <Paper elevation={4}
                sx={{
                  p: 3,
                  textAlign: 'center',
                  background: 'white',
                  border: `2px solid ${COLORS.accent}`,
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between'
                }}
              >
                <Box sx={{ mb: 2 }}>
                  {service.icon}
                </Box>
                <Typography variant="h6" sx={{ color: COLORS.primary, fontWeight: 600 }}>{service.title}</Typography>
                <Divider sx={{ my: 1 }} />
                <Typography variant="body2" sx={{ color: COLORS.primary, mb: 2 }}>{service.description}</Typography>
                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  sx={{
                    bgcolor: COLORS.primary,
                    color: 'white',
                    fontWeight: 600,
                    mt: 'auto',
                    '&:hover': { bgcolor: COLORS.accent, color: COLORS.primary }
                  }}
                  onClick={() => navigate(service.link)}
                >
                  ಇನ್ನಷ್ಟು ನೋಡಿ
                </Button>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Official Temple Team Section */}
      <Container maxWidth="lg" sx={{ py: 6 }}>
        <Typography variant="h4" align="center" gutterBottom sx={{ color: COLORS.primary, fontWeight: 700, mb: 3 }}>
          ದೇವಸ್ಥಾನದ ಶ್ರೇಷ್ಠ ತಂಡ
        </Typography>
        <Grid container spacing={3} justifyContent="center">
          {teamMembers.map((member) => (
            <Grid item xs={12} sm={6} md={3} key={member.id}>
              <MemberCard
                image={member.image}
                name={member.name}
                position={member.position}
              />
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}

export default Home;
