// src/components/BannerSection.jsx
import React from 'react';
import Slider from 'react-slick';
import { Box, Typography } from '@mui/material';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

function BannerSection({ banners }) {
  const settings = {
    dots: true,
    infinite: true,
    speed: 800,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    fade: true,
    arrows: false,
  };

  return (
    <Box sx={{ width: '100%', position: 'relative' }}>
      <Slider {...settings}>
        {banners.map((banner, index) => (
          <Box
            key={index}
            sx={{
              height: { xs: '60vh', md: '80vh' },
              position: 'relative',
              backgroundImage: `url(${banner.image})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              borderRadius: 0,
              display: 'flex',
              alignItems: 'flex-end',
              justifyContent: 'center',
            }}
          >
            {/* Overlay */}
            <Box
              sx={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                background: 'linear-gradient(to top, rgba(0, 0, 0, 0.6), transparent)',
                zIndex: 1,
              }}
            />

            {/* Title Text */}
            <Box
              sx={{
                zIndex: 2,
                pb: { xs: 6, md: 10 },
                px: 2,
                textAlign: 'center',
                width: '100%',
              }}
            >
              <Typography
                variant="h3"
                component="h1"
                sx={{
                  color: '#fff',
                  fontWeight: 700,
                  textShadow: '2px 2px 6px rgba(0,0,0,0.7)',
                  fontSize: { xs: '1.8rem', md: '3rem' },
                  animation: 'fadeInUp 1.2s ease-out',
                }}
              >
                {banner.title}
              </Typography>
            </Box>
          </Box>
        ))}
      </Slider>

      {/* Animations */}
      <style>{`
        @keyframes fadeInUp {
          0% {
            opacity: 0;
            transform: translateY(30px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </Box>
  );
}

export default BannerSection;
