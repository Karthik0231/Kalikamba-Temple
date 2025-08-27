import React from 'react';
import { Box, Typography, useTheme } from '@mui/material';

function HeroSection({ image }) {
  const theme = useTheme();

  if (!image || !image.src) {
    return (
      <Box
        sx={{
          height: '80vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: theme.palette.grey[900],
          color: theme.palette.text.secondary,
        }}
      >
        <Typography variant="h4">No hero image available</Typography>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        position: 'relative',
        width: '100%',
        height: '80vh',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'flex-end',
        justifyContent: 'center',
        color: '#fff',
      }}
    >
      {/* Background Image */}
      <Box
        component="img"
        src={image.src}
        alt={image.alt || 'Hero Background'}
        sx={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          top: 0,
          left: 0,
          zIndex: -2,
        }}
      />

      {/* Overlay */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: 'linear-gradient(to top, rgba(0,0,0,0.8), rgba(0,0,0,0.2))',
          zIndex: -1,
        }}
      />

      {/* Title at Bottom Center */}
      {image.title && (
        <Box
          sx={{
            width: '100%',
            textAlign: 'center',
            pb: { xs: 8, md: 10 },
            px: 2,
            animation: 'fadeInUp 1.5s ease-in-out',
          }}
        >
          <Typography
            variant="h2"
            component="h1"
            sx={{
              fontWeight: 700,
              fontSize: { xs: '2rem', md: '3.5rem' },
              color: '#fff',
              textShadow: '2px 2px 6px rgba(0,0,0,0.6)',
            }}
          >
            {image.title}
          </Typography>
        </Box>
      )}

      {/* Animations */}
      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </Box>
  );
}

export default HeroSection;
