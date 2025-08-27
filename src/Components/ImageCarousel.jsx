import React, { useState, useEffect } from 'react';
import { Box, Typography, useTheme, IconButton } from '@mui/material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

function ImageCarousel({ images, height = '400px', autoPlay = true, interval = 5000 }) {
  const theme = useTheme();
  const [currentIndex, setCurrentIndex] = useState(0);

  // Handle navigation
  const goToPrevious = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? images.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const goToNext = () => {
    const isLastSlide = currentIndex === images.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  // Auto-play effect
  useEffect(() => {
    let sliderInterval;
    if (autoPlay && images.length > 1) {
      sliderInterval = setInterval(() => {
        goToNext();
      }, interval);
    }
    return () => clearInterval(sliderInterval); // Cleanup on unmount
  }, [currentIndex, autoPlay, interval, images.length]);

  if (!images || images.length === 0) {
    return (
      <Box
        sx={{
          height: height,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: theme.palette.grey[200],
          color: theme.palette.text.secondary,
          my: 4,
          borderRadius: theme.shape.borderRadius,
          boxShadow: theme.Components.MuiPaper.styleOverrides.root.boxShadow,
        }}
      >
        <Typography variant="h6">No images to display</Typography>
      </Box>
    );
  }

  const currentImage = images[currentIndex];

  return (
    <Box
      sx={{
        position: 'relative',
        width: '100%',
        height: height,
        overflow: 'hidden',
        my: 4,
        borderRadius: theme.shape.borderRadius,
        boxShadow: theme.Components.MuiPaper.styleOverrides.root.boxShadow,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <img
        src={currentImage.src}
        alt={currentImage.alt || 'Carousel Image'}
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          display: 'block',
        }}
      />

      {/* Content Overlay */}
      {currentImage.title || currentImage.description ? (
        <Box
          sx={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            color: 'white',
            padding: theme.spacing(2),
            textAlign: 'center',
          }}
        >
          {currentImage.title && (
            <Typography variant="h5" component="h3" gutterBottom>
              {currentImage.title}
            </Typography>
          )}
          {currentImage.description && (
            <Typography variant="body1">
              {currentImage.description}
            </Typography>
          )}
        </Box>
      ) : null}

      {/* Navigation Buttons */}
      {images.length > 1 && (
        <>
          <IconButton
            onClick={goToPrevious}
            sx={{
              position: 'absolute',
              left: theme.spacing(2),
              color: 'white',
              backgroundColor: 'rgba(0, 0, 0, 0.3)',
              '&:hover': {
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
              },
            }}
          >
            <ArrowBackIosIcon />
          </IconButton>
          <IconButton
            onClick={goToNext}
            sx={{
              position: 'absolute',
              right: theme.spacing(2),
              color: 'white',
              backgroundColor: 'rgba(0, 0, 0, 0.3)',
              '&:hover': {
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
              },
            }}
          >
            <ArrowForwardIosIcon />
          </IconButton>
        </>
      )}

      {/* Dots for navigation (optional) */}
      {images.length > 1 && (
        <Box
          sx={{
            position: 'absolute',
            bottom: theme.spacing(1),
            display: 'flex',
            gap: theme.spacing(1),
          }}
        >
          {images.map((_, idx) => (
            <Box
              key={idx}
              sx={{
                width: 10,
                height: 10,
                borderRadius: '50%',
                backgroundColor: currentIndex === idx ? 'white' : 'rgba(255, 255, 255, 0.5)',
                cursor: 'pointer',
                transition: 'background-color 0.3s',
              }}
              onClick={() => setCurrentIndex(idx)}
            />
          ))}
        </Box>
      )}
    </Box>
  );
}

export default ImageCarousel;