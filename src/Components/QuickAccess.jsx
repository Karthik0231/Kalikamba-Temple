// components/QuickInfoBanner.jsx
import React from 'react';
import { Box, Button, Typography, Card, CardContent, useTheme } from '@mui/material';
import Slider from 'react-slick';
import { 
  TempleHinduOutlined,
  FavoriteOutlined,
  InfoOutlined,
  CalendarTodayOutlined,
  EventOutlined,
} from '@mui/icons-material';

const QuickInfoBanner = ({ newsItems = [] }) => {
  const theme = useTheme(); // Initialize useTheme

  const onlineServices = [
    {
      icon: <TempleHinduOutlined sx={{ fontSize: { xs: 24, md: 32 }, mb: { xs: 0.5, md: 1 }, color: theme.palette.primary.main }} />, // Use theme color
      title: 'Seva Booking',
      description: 'Devotees can book their preferred sevas online in advance.',
      action: 'Book Seva'
    },
    {
      icon: <FavoriteOutlined sx={{ fontSize: { xs: 24, md: 32 }, mb: { xs: 0.5, md: 1 }, color: theme.palette.primary.main }} />, // Use theme color
      title: 'Donation',
      description: 'Offer your support for ongoing Matha development and Annadana.',
      action: 'Donate'
    },
    {
      icon: <EventOutlined sx={{ fontSize: { xs: 24, md: 32 }, mb: { xs: 0.5, md: 1 }, color: theme.palette.primary.main }} />, // Use theme color
      title: 'Hall Booking',
      description: 'Book a hall for special events or gatherings.',
      action: 'hallBooking'
    }
  ];

  const settings = {
    infinite: true,
    speed: 3000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    arrows: false,
    vertical: false,
    pauseOnHover: true,
    fade: true,
    cssEase: 'ease-in-out',
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  return (
    <Box
      sx={{
        p: { xs: 2, md: 3 },
        backgroundColor: theme.palette.background.paper, // Use theme color
        minHeight: { xs: 'auto', md: 400 },
      }}
    >
      {/* Mobile Layout */}
      <Box sx={{ display: { xs: 'block', md: 'none' } }}>
        {/* Mobile Services - Horizontal Row */}
        <Typography
          variant="h5"
          sx={{
            color: theme.palette.primary.dark, // Use theme color
            fontWeight: 700,
            mb: 2,
            textAlign: 'center',
            fontSize: '1.3rem'
          }}
        >
          Online Services
        </Typography>

        <Box
          sx={{
            display: 'flex',
            gap: 1,
            mb: 3,
            overflowX: 'auto',
            pb: 1,
            '&::-webkit-scrollbar': {
              height: 4,
            },
            '&::-webkit-scrollbar-track': {
              backgroundColor: theme.palette.grey[200], // Use theme color
              borderRadius: 2,
            },
            '&::-webkit-scrollbar-thumb': {
              backgroundColor: theme.palette.secondary.main, // Use theme color
              borderRadius: 2,
            },
          }}
        >
          {onlineServices.map((service, index) => (
            <Card
              key={index}
              sx={{
                minWidth: 120,
                flex: '0 0 auto',
                borderRadius: 2,
                boxShadow: '0 2px 6px rgba(0, 0, 0, 0.1)',
                borderTop: `3px solid ${theme.palette.secondary.main}`, // Use theme color
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-2px)',
                  boxShadow: '0 4px 10px rgba(0, 0, 0, 0.15)',
                },
              }}
            >
              <CardContent
                sx={{
                  textAlign: 'center',
                  p: 1.5,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                }}
              >
                {service.icon}
                <Typography
                  variant="subtitle2"
                  sx={{
                    color: theme.palette.primary.dark, // Use theme color
                    fontWeight: 600,
                    mb: 1,
                    fontSize: '0.8rem',
                    lineHeight: 1.2,
                  }}
                >
                  {service.title}
                </Typography>
                <Button
                  variant="contained"
                  size="small"
                  sx={{
                    backgroundColor: theme.palette.secondary.main, // Use theme color
                    color: theme.palette.secondary.contrastText, // Use theme color
                    fontWeight: 600,
                    px: 0.8, // Slightly smaller
                    py: 0.2, // Slightly smaller
                    borderRadius: 1.5,
                    textTransform: 'none',
                    fontSize: '0.7rem',
                    minWidth: 'auto',
                    '&:hover': {
                      backgroundColor: theme.palette.secondary.dark, // Use theme color
                    },
                  }}
                >
                  {service.action}
                </Button>
              </CardContent>
            </Card>
          ))}
        </Box>

        {/* Mobile News */}
        <Typography
          variant="h5"
          sx={{
            color: theme.palette.primary.dark, // Use theme color
            fontWeight: 700,
            mb: 2,
            textAlign: 'center',
            fontSize: '1.3rem'
          }}
        >
          Latest News
        </Typography>

        <Box
          sx={{
            borderLeft: `4px solid ${theme.palette.secondary.main}`, // Use theme color
            pl: 0,
            height: 250,
            overflow: 'hidden',
          }}
        >
          {newsItems.length > 0 ? (
            <Box
              sx={{
                ml: 2,
                height: '100%',
                overflowY: 'auto',
                '&::-webkit-scrollbar': {
                  width: 6,
                },
                '&::-webkit-scrollbar-track': {
                  backgroundColor: theme.palette.grey[200], // Use theme color
                  borderRadius: 3,
                },
                '&::-webkit-scrollbar-thumb': {
                  backgroundColor: theme.palette.secondary.main, // Use theme color
                  borderRadius: 3,
                },
              }}
            >
              {newsItems.map((item, index) => (
                <Card
                  key={index}
                  sx={{
                    borderRadius: 2,
                    boxShadow: '0 2px 6px rgba(0, 0, 0, 0.1)',
                    mb: 2,
                  }}
                >
                  <CardContent sx={{ p: 2 }}>
                    <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1.5 }}>
                      {item.image && (
                        <Box
                          component="img"
                          src={item.image}
                          alt={item.title}
                          sx={{
                            width: 50,
                            height: 50,
                            borderRadius: 1.5,
                            objectFit: 'cover',
                            flexShrink: 0,
                          }}
                        />
                      )}
                      <Box sx={{ flex: 1 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 0.5 }}>
                          <CalendarTodayOutlined sx={{ fontSize: 12, color: theme.palette.text.secondary, mr: 0.5 }} /> {/* Use theme color */}
                          <Typography
                            sx={{
                              color: theme.palette.text.secondary, // Use theme color
                              fontSize: '0.75rem',
                              fontWeight: 500,
                            }}
                          >
                            {item.date ? formatDate(item.date) : 'Recent'}
                          </Typography>
                        </Box>
                        <Typography
                          variant="subtitle2"
                          sx={{
                            color: theme.palette.text.primary, // Use theme color
                            fontWeight: 600,
                            fontSize: '0.9rem',
                            lineHeight: 1.3,
                            mb: 1,
                          }}
                        >
                          {item.title || item}
                        </Typography>
                        {item.description && (
                          <Typography
                            sx={{
                              color: theme.palette.text.secondary, // Use theme color
                              fontSize: '0.8rem',
                              lineHeight: 1.4,
                            }}
                          >
                            {item.description}
                          </Typography>
                        )}
                      </Box>
                    </Box>
                  </CardContent>
                </Card>
              ))}
            </Box>
          ) : (
            <Card
              sx={{
                ml: 2,
                borderRadius: 2,
                boxShadow: '0 2px 6px rgba(0, 0, 0, 0.1)',
                height: '100%',
              }}
            >
              <CardContent
                sx={{
                  p: 2,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  height: '100%',
                  textAlign: 'center'
                }}
              >
                <Typography sx={{ color: theme.palette.text.secondary, fontSize: '0.85rem' }}> {/* Use theme color */}
                  No news updates available at the moment.
                </Typography>
              </CardContent>
            </Card>
          )}
        </Box>
      </Box>

      {/* Desktop Layout */}
      <Box
        sx={{
          display: { xs: 'none', md: 'flex' },
          gap: 4,
        }}
      >
        {/* Desktop Services */}
        <Box sx={{ flex: 1 }}>
          <Typography
            variant="h4"
            sx={{
              color: theme.palette.primary.dark, // Use theme color
              fontWeight: 700,
              mb: 3,
              fontSize: '1.8rem'
            }}
          >
            Online Services
          </Typography>

          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: 2,
            }}
          >
            {onlineServices.map((service, index) => (
              <Card
                key={index}
                sx={{
                  height: 250,
                  borderRadius: 2,
                  boxShadow: '0 3px 8px rgba(0, 0, 0, 0.1)',
                  border: '2px solid transparent',
                  borderTopColor: theme.palette.secondary.main, // Use theme color
                  borderTopWidth: '3px',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-3px)',
                    boxShadow: '0 6px 16px rgba(0, 0, 0, 0.15)',
                  },
                }}
              >
                <CardContent
                  sx={{
                    textAlign: 'center',
                    p: 2,
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                  }}
                >
                  <Box>
                    {service.icon}
                    <Typography
                      variant="h6"
                      sx={{
                        color: theme.palette.primary.dark, // Use theme color
                        fontWeight: 600,
                        mb: 1,
                        fontSize: '1.1rem'
                      }}
                    >
                      {service.title}
                    </Typography>
                    <Typography
                      sx={{
                        color: theme.palette.text.secondary, // Use theme color
                        fontSize: '0.8rem',
                        lineHeight: 1.4,
                        mb: 2,
                      }}
                    >
                      {service.description}
                    </Typography>
                  </Box>

                  <Button
                    variant="contained"
                    size="small"
                    sx={{
                      backgroundColor: theme.palette.secondary.main, // Use theme color
                      color: theme.palette.secondary.contrastText, // Use theme color
                      fontWeight: 600,
                      px: 1.5, // Slightly smaller
                      py: 0.4, // Slightly smaller
                      borderRadius: 1.5,
                      textTransform: 'none',
                      fontSize: '0.8rem',
                      '&:hover': {
                        backgroundColor: theme.palette.secondary.dark, // Use theme color
                        transform: 'translateY(-1px)',
                      },
                    }}
                  >
                    {service.action}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </Box>
        </Box>

        {/* Desktop News */}
        <Box sx={{ width: 580, minWidth: 380 }}>
          <Typography
            variant="h4"
            sx={{
              color: theme.palette.primary.dark, // Use theme color
              fontWeight: 700,
              mb: 3,
              fontSize: '1.8rem'
            }}
          >
            Latest News
          </Typography>

          <Box
            sx={{
              borderLeft: `4px solid ${theme.palette.secondary.main}`, // Use theme color
              pl: 0,
              height: 300,
              overflow: 'hidden',
            }}
          >
            {newsItems.length > 0 ? (
              <Box
                sx={{
                  ml: 2,
                  height: '100%',
                  overflowY: 'auto',
                  pr: 1,
                  '&::-webkit-scrollbar': {
                    width: 6,
                  },
                  '&::-webkit-scrollbar-track': {
                    backgroundColor: theme.palette.grey[200], // Use theme color
                    borderRadius: 3,
                  },
                  '&::-webkit-scrollbar-thumb': {
                    backgroundColor: theme.palette.secondary.main, // Use theme color
                    borderRadius: 3,
                  },
                }}
              >
                {newsItems.map((item, index) => (
                  <Card
                    key={index}
                    sx={{
                      borderRadius: 2,
                      boxShadow: '0 2px 6px rgba(0, 0, 0, 0.1)',
                      mb: 2,
                    }}
                  >
                    <CardContent sx={{ p: 2.5 }}>
                      <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
                        {item.image && (
                          <Box
                            component="img"
                            src={item.image}
                            alt={item.title}
                            sx={{
                              width: 60,
                              height: 60,
                              borderRadius: 1.5,
                              objectFit: 'cover',
                              flexShrink: 0,
                            }}
                          />
                        )}
                        <Box sx={{ flex: 1 }}>
                          <Box sx={{ display: 'flex', alignItems: 'center', mb: 0.5 }}>
                            <CalendarTodayOutlined sx={{ fontSize: 14, color: theme.palette.text.secondary, mr: 0.5 }} /> {/* Use theme color */}
                            <Typography
                              sx={{
                                color: theme.palette.text.secondary, // Use theme color
                                fontSize: '0.8rem',
                                fontWeight: 500,
                              }}
                            >
                              {item.date ? formatDate(item.date) : 'Recent'}
                            </Typography>
                          </Box>
                          <Typography
                            variant="subtitle1"
                            sx={{
                              color: theme.palette.text.primary, // Use theme color
                              fontWeight: 600,
                              fontSize: '1rem',
                              lineHeight: 1.3,
                              mb: 1,
                            }}
                          >
                            {item.title || item}
                          </Typography>
                          {item.description && (
                            <Typography
                              sx={{
                                color: theme.palette.text.secondary, // Use theme color
                                fontSize: '0.85rem',
                                lineHeight: 1.5,
                              }}
                            >
                              {item.description}
                            </Typography>
                          )}
                        </Box>
                      </Box>
                    </CardContent>
                  </Card>
                ))}
              </Box>
            ) : (
              <Card
                sx={{
                  ml: 2,
                  borderRadius: 2,
                  boxShadow: '0 2px 6px rgba(0, 0, 0, 0.1)',
                  height: '100%',
                }}
              >
                <CardContent
                  sx={{
                    p: 2.5,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: '100%',
                    textAlign: 'center'
                  }}
                >
                  <Typography sx={{ color: theme.palette.text.secondary, fontSize: '0.9rem' }}> {/* Use theme color */}
                    No news updates available at the moment.
                  </Typography>
                </CardContent>
              </Card>
            )}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default QuickInfoBanner;