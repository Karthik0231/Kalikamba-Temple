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
  Paper,
  Divider,
  Avatar,
  IconButton,
  useTheme
} from '@mui/material';
import { 
  Schedule as ScheduleIcon,
  Event as EventIcon,
  Place as PlaceIcon,
  Phone as PhoneIcon,
  Email as EmailIcon,
  CalendarToday as CalendarIcon,
  TempleBuddhist as TempleIcon,
  Favorite as FavoriteIcon,
  Home as HomeIcon,
  Hotel as HotelIcon
} from '@mui/icons-material';

// Import your existing components
import HeroSection from '../Components/HeroSection';
import MarqueeStrip from '../Components/MarqueeStrip';
import PanchangaSection from '../Components/PanchangaSection';
import QuickInfoBanner from '../Components/QuickAccess';
import MemberCard from '../components/MemberCard';

function Home() {
  const theme = useTheme();

  // Temple color scheme
  const templeColors = {
    primary: '#8B4513', // Saddle brown
    primaryDark: '#654321', // Dark brown
    primaryLight: '#DEB887', // Burlywood
    secondary: '#FF6347', // Saffron/orange
    accent: '#DAA520', // Goldenrod
    background: '#FFF8DC', // Cornsilk
    cardBg: '#FFFACD' // Lemon chiffon
  };

  const heroImage = {
    src: 'https://media.istockphoto.com/id/517188688/photo/mountain-landscape.jpg?s=1024x1024&w=0&k=20&c=z8_rWaI8x4zApNEEG9DnWlGXyDIXe-OmsAyQ5fGPVV8=',
    alt: 'Sri Kalikamba Temple Entrance',
    title: 'श्री कालिकाम्बा मंदिर बारकुर',
    description: 'मातृ कालिकाम्बा के पावन धाम में आपका स्वागत है। Welcome to the sacred abode of Goddess Kalikamba.',
  };

  const todaySevaKartas = [
    'श्री गणेश हेगड़े', 
    'श्रीमती लक्ष्मी राव', 
    'श्री रमेश पै', 
    'श्री विजय शेट्टी',
    'श्रीमती सुधा नायक'
  ];

  // Daily Seva Schedule
  const dailySevas = [
    { name: 'सुप्रभात सेवा', time: '5:30 AM', description: 'प्रातःकालीन जागरण आराधना', type: 'morning' },
    { name: 'अभिषेक', time: '6:30 AM', description: 'पवित्र स्नान एवं अभिषेक', type: 'morning' },
    { name: 'कल्याणोत्सव', time: '7:30 AM', description: 'दैनिक पूजा अर्चना', type: 'morning' },
    { name: 'अर्चना सेवा', time: '8:00 AM - 12:00 PM', description: 'व्यक्तिगत अर्चना एवं मंत्र जाप', type: 'continuous' },
    { name: 'मध्याह्न पूजा', time: '12:30 PM', description: 'दोपहर की आराधना', type: 'afternoon' },
    { name: 'संध्या आरती', time: '6:30 PM', description: 'सायंकालीन आरती', type: 'evening' },
    { name: 'शयन सेवा', time: '9:00 PM', description: 'रात्रि विश्राम सेवा', type: 'night' }
  ];

  // Temple Team with proper designations
  const teamMembers = [
    { 
      id: 1, 
      name: 'श्री रामचन्द्र भट्ट', 
      position: 'मुख्य पुरोहित', 
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTLA994hpL3PMmq0scCuWOu0LGsjef49dyXVg&s',
      experience: '25+ वर्ष अनुभव'
    },
    { 
      id: 2, 
      name: 'श्री कृष्ण उपाध्याय', 
      position: 'सहायक पुरोहित', 
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTLA994hpL3PMmq0scCuWOu0LGsjef49dyXVg&s',
      experience: '15+ वर्ष अनुभव'
    },
    { 
      id: 3, 
      name: 'श्री गणेश आचार्य', 
      position: 'सेवा समन्वयक', 
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTLA994hpL3PMmq0scCuWOu0LGsjef49dyXVg&s',
      experience: 'प्रशासनिक प्रमुख'
    },
    {
      id: 4, 
      name: 'श्रीमती लक्ष्मी नायक', 
      position: 'महिला समिति अध्यक्ष', 
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTLA994hpL3PMmq0scCuWOu0LGsjef49dyXVg&s',
      experience: 'सामुदायिक सेवा प्रमुख'
    },
  ];

  // Upcoming Festivals
  const upcomingFestivals = [
    { 
      name: 'श्री गणेश चतुर्थी', 
      date: 'Sep 7, 2025', 
      type: 'major',
      description: 'विघ्न विनाशक गणपति बप्पा का आगमन'
    },
    { 
      name: 'नवरात्रि महोत्सव', 
      date: 'Oct 3-12, 2025', 
      type: 'major',
      description: '9 दिवसीय मातृ शक्ति की आराधना'
    },
    { 
      name: 'दीपावली', 
      date: 'Oct 20, 2025', 
      type: 'special',
      description: 'लक्ष्मी पूजन एवं दीप महोत्सव'
    },
    { 
      name: 'कार्तिक मास', 
      date: 'Nov 2025', 
      type: 'monthly',
      description: 'पवित्र कार्तिक माह व्रत उत्सव'
    }
  ];

  // Temple Services
  const templeServices = [
    { 
      title: 'ऑनलाइन सेवा बुकिंग', 
      description: 'विशेष पूजा एवं सेवा ऑनलाइन बुक करें',
      icon: <CalendarIcon />,
      color: templeColors.secondary
    },
    { 
      title: 'दान एवं चढ़ावा', 
      description: 'मंदिर संचालन हेतु दान करें',
      icon: <FavoriteIcon />,
      color: templeColors.accent
    },
    { 
      title: 'विवाह मंडप', 
      description: 'पवित्र विवाह संस्कार हेतु बुकिंग',
      icon: <HomeIcon />,
      color: templeColors.primary
    },
    { 
      title: 'आवास सुविधा', 
      description: 'श्रद्धालुओं हेतु निवास व्यवस्था',
      icon: <HotelIcon />,
      color: templeColors.primaryDark
    }
  ];

  // Panchanga data
  const data = {
    date: 'August 27, 2025',
    location: 'बारकुर, कर्नाटक',
    panchanga: {
      tithi: { name: 'शुक्ल द्वितीया' },
      nakshatra: { name: 'रोहिणी' },
      yoga: { name: 'सिद्ध' },
      karana: { name: 'बव' },
    },
    sunMoon: {
      sunrise: '06:15 AM',
      sunset: '06:45 PM',
      moonrise: '08:30 PM',
      moonset: '07:15 AM'
    },
    muhurta: [
      { name: 'राहु काल', time: '12:00 PM - 01:30 PM', type: 'inauspicious' },
      { name: 'अभिजीत मुहूर्त', time: '12:00 PM - 12:48 PM', type: 'auspicious' }
    ]
  };

  // Enhanced news items
  const newsItems = [
    {
      title: "354वीं आराधना महोत्सव - आमंत्रण",
      description: "वार्षिक आराधना महोत्सव में भाग लें। विशेष सेवा, सांस्कृतिक कार्यक्रम एवं आध्यात्मिक प्रवचन। तीन दिवसीय उत्सव में पारंपरिक संगीत, नृत्य प्रदर्शन एवं सभी भक्तों के लिए अन्नदान।",
      date: "2025-08-30",
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop"
    },
    {
      title: "चातुर्मास्य दीक्षा महोत्सव - मंत्रालयम",
      description: "आषाढ़ शुक्ल एकादशी से पवित्र चातुर्मास्य दीक्षा प्रारंभ। दैनिक प्रार्थना, भजन एवं आध्यात्मिक प्रवचन हेतु विशेष व्यवस्था।",
      date: "2025-07-22",
      image: "https://images.unsplash.com/photo-1583932450421-c4b6d6b4c635?w=400&h=300&fit=crop"
    },
    {
      title: "श्री जयतीर्थ स्वामीजी आराधना - 15.07.2025",
      description: "श्री जयतीर्थ स्वामीजी की वार्षिक आराधना। विशेष पूजा, अभिषेक एवं प्रसाद वितरण। प्रातः एवं सायं प्रार्थना सत्र में भाग लें।",
      date: "2025-07-15",
      image: "https://images.unsplash.com/photo-1604608672516-a752905dbb2e?w=400&h=300&fit=crop"
    }
  ];

  return (
    <Box sx={{ backgroundColor: templeColors.background, minHeight: '100vh' }}>
      {/* Hero Section */}
      <HeroSection image={heroImage} />
      
      {/* Marquee Strip */}
      <MarqueeStrip sevaKartas={todaySevaKartas} />

      {/* Quick Info Banner */}
      <QuickInfoBanner newsItems={newsItems} />

      {/* Daily Seva Schedule Section */}
      <Container maxWidth="lg" sx={{ py: 6 }}>
        <Typography 
          variant="h3" 
          align="center" 
          gutterBottom 
          sx={{ 
            color: templeColors.primaryDark,
            fontFamily: 'Georgia, serif',
            fontWeight: 700,
            mb: 4
          }}
        >
          आज की सेवा अनुसूची
        </Typography>
        <Grid container spacing={3}>
          {dailySevas.map((seva, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card 
                sx={{ 
                  height: '100%',
                  backgroundColor: templeColors.cardBg,
                  border: `2px solid ${templeColors.primaryLight}`,
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: `0 8px 25px ${templeColors.primary}40`,
                    transition: 'all 0.3s ease'
                  }
                }}
              >
                <CardContent sx={{ textAlign: 'center', p: 3 }}>
                  <ScheduleIcon 
                    sx={{ 
                      fontSize: 40, 
                      color: templeColors.secondary,
                      mb: 1
                    }} 
                  />
                  <Typography 
                    variant="h6" 
                    sx={{ 
                      color: templeColors.primaryDark,
                      fontWeight: 600,
                      mb: 1
                    }}
                  >
                    {seva.name}
                  </Typography>
                  <Chip 
                    label={seva.time} 
                    sx={{ 
                      backgroundColor: templeColors.accent,
                      color: 'white',
                      fontWeight: 600,
                      mb: 2
                    }} 
                  />
                  <Typography 
                    variant="body2" 
                    sx={{ 
                      color: templeColors.primaryDark,
                      lineHeight: 1.6
                    }}
                  >
                    {seva.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Panchanga Section */}
      <PanchangaSection panchangaData={data} />

      {/* Upcoming Festivals Section */}
      <Container maxWidth="lg" sx={{ py: 6 }}>
        <Typography 
          variant="h3" 
          align="center" 
          gutterBottom 
          sx={{ 
            color: templeColors.primaryDark,
            fontFamily: 'Georgia, serif',
            fontWeight: 700,
            mb: 4
          }}
        >
          आगामी त्यौहार
        </Typography>
        <Grid container spacing={4}>
          {upcomingFestivals.map((festival, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Card 
                sx={{ 
                  height: '100%',
                  backgroundColor: templeColors.cardBg,
                  border: `2px solid ${templeColors.primaryLight}`,
                  position: 'relative',
                  overflow: 'visible',
                  '&:hover': {
                    transform: 'translateY(-6px)',
                    boxShadow: `0 12px 30px ${templeColors.primary}50`
                  }
                }}
              >
                <Box
                  sx={{
                    position: 'absolute',
                    top: -10,
                    right: -10,
                    backgroundColor: festival.type === 'major' ? templeColors.secondary : templeColors.accent,
                    borderRadius: '50%',
                    width: 40,
                    height: 40,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  <EventIcon sx={{ color: 'white', fontSize: 20 }} />
                </Box>
                <CardContent sx={{ textAlign: 'center', p: 3 }}>
                  <Typography 
                    variant="h6" 
                    sx={{ 
                      color: templeColors.primaryDark,
                      fontWeight: 600,
                      mb: 2
                    }}
                  >
                    {festival.name}
                  </Typography>
                  <Typography 
                    variant="body1" 
                    sx={{ 
                      color: templeColors.secondary,
                      fontWeight: 600,
                      mb: 2
                    }}
                  >
                    {festival.date}
                  </Typography>
                  <Typography 
                    variant="body2" 
                    sx={{ 
                      color: templeColors.primaryDark,
                      lineHeight: 1.5
                    }}
                  >
                    {festival.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Temple Services Section */}
      <Box sx={{ backgroundColor: templeColors.primaryLight + '20', py: 6 }}>
        <Container maxWidth="lg">
          <Typography 
            variant="h3" 
            align="center" 
            gutterBottom 
            sx={{ 
              color: templeColors.primaryDark,
              fontFamily: 'Georgia, serif',
              fontWeight: 700,
              mb: 4
            }}
          >
            मंदिर सेवाएं
          </Typography>
          <Grid container spacing={4}>
            {templeServices.map((service, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <Paper 
                  elevation={4}
                  sx={{ 
                    p: 4,
                    textAlign: 'center',
                    backgroundColor: 'white',
                    border: `3px solid ${service.color}`,
                    cursor: 'pointer',
                    '&:hover': {
                      backgroundColor: service.color + '10',
                      transform: 'translateY(-8px)',
                      boxShadow: `0 15px 35px ${service.color}40`
                    }
                  }}
                >
                  <Box
                    sx={{
                      backgroundColor: service.color,
                      borderRadius: '50%',
                      width: 60,
                      height: 60,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      margin: '0 auto 20px',
                      color: 'white'
                    }}
                  >
                    {service.icon}
                  </Box>
                  <Typography 
                    variant="h6" 
                    sx={{ 
                      color: templeColors.primaryDark,
                      fontWeight: 600,
                      mb: 2
                    }}
                  >
                    {service.title}
                  </Typography>
                  <Typography 
                    variant="body2" 
                    sx={{ 
                      color: templeColors.primaryDark,
                      lineHeight: 1.6
                    }}
                  >
                    {service.description}
                  </Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Temple Team Section */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Typography 
          variant="h3" 
          align="center" 
          gutterBottom 
          sx={{ 
            color: templeColors.primaryDark,
            fontFamily: 'Georgia, serif',
            fontWeight: 700,
            mb: 4
          }}
        >
          हमारी समर्पित टीम
        </Typography>
        <Grid container spacing={4} justifyContent="center">
          {teamMembers.map((member) => (
            <Grid
              item
              key={member.id}
              xs={12}
              sm={6}
              md={3}
              display="flex"
              justifyContent="center"
            >
              <Card
                sx={{
                  maxWidth: 280,
                  backgroundColor: templeColors.cardBg,
                  border: `2px solid ${templeColors.primaryLight}`,
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: `0 15px 40px ${templeColors.primary}30`
                  }
                }}
              >
                <CardMedia
                  component="img"
                  height="200"
                  image={member.image}
                  alt={member.name}
                  sx={{ 
                    objectFit: 'cover',
                    borderBottom: `3px solid ${templeColors.accent}`
                  }}
                />
                <CardContent sx={{ textAlign: 'center', p: 3 }}>
                  <Typography 
                    variant="h6" 
                    sx={{ 
                      color: templeColors.primaryDark,
                      fontWeight: 600,
                      mb: 1
                    }}
                  >
                    {member.name}
                  </Typography>
                  <Typography 
                    variant="body1" 
                    sx={{ 
                      color: templeColors.secondary,
                      fontWeight: 500,
                      mb: 1
                    }}
                  >
                    {member.position}
                  </Typography>
                  <Typography 
                    variant="body2" 
                    sx={{ 
                      color: templeColors.primaryDark,
                      fontStyle: 'italic'
                    }}
                  >
                    {member.experience}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Temple Contact Info Section */}
      <Box sx={{ backgroundColor: templeColors.primaryDark, color: 'white', py: 6 }}>
        <Container maxWidth="lg">
          <Grid container spacing={4}>
            <Grid item xs={12} md={4}>
              <Box sx={{ textAlign: 'center' }}>
                <PlaceIcon sx={{ fontSize: 50, mb: 2, color: templeColors.accent }} />
                <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                  मंदिर का पता
                </Typography>
                <Typography variant="body2" sx={{ lineHeight: 1.6 }}>
                  श्री कालिकाम्बा मंदिर<br />
                  बारकुर, उडुपी जिला<br />
                  कर्नाटक - 576210
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} md={4}>
              <Box sx={{ textAlign: 'center' }}>
                <PhoneIcon sx={{ fontSize: 50, mb: 2, color: templeColors.accent }} />
                <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                  संपर्क सूत्र
                </Typography>
                <Typography variant="body2" sx={{ lineHeight: 1.6 }}>
                  मोबाइल: +91 98765 43210<br />
                  फोन: 08252-123456<br />
                  आपातकाल: +91 98765 43211
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} md={4}>
              <Box sx={{ textAlign: 'center' }}>
                <EmailIcon sx={{ fontSize: 50, mb: 2, color: templeColors.accent }} />
                <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                  ईमेल संपर्क
                </Typography>
                <Typography variant="body2" sx={{ lineHeight: 1.6 }}>
                  info@kalikambatemple.org<br />
                  seva@kalikambatemple.org<br />
                  donation@kalikambatemple.org
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Box>
  );
}

export default Home;