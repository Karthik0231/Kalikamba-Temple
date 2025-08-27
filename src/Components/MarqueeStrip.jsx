import React from 'react';
import { Box, Typography, useTheme } from '@mui/material';

function MarqueeStrip({ sevaKartas = [] }) {
  const theme = useTheme();

  const combinedText =
    'ಇಂದಿನ ನಿತ್ಯ ಪೂಜಾ ಸೇವೆ ಕಾರ್ಥರು: ' + sevaKartas.join(', ') + ' 🙏';

  return (
    <Box
      sx={{
        width: '100%',
        overflow: 'hidden',
        whiteSpace: 'nowrap',
        position: 'relative',
        py: 1.2,
        background: 'linear-gradient(90deg, #6a11cb 0%, #2575fc 100%)',
        color: '#fff',
        fontFamily: `'Noto Sans Kannada', sans-serif`,
      }}
    >
      <Box
        component="div"
        sx={{
          display: 'inline-block',
          px: 2,
          fontSize: { xs: '1rem', md: '1.1rem' },
          fontWeight: 500,
          animation: 'scroll-left 13s linear infinite',
          '&:hover': {
            animationPlayState: 'paused',
          },
        }}
      >
        <Typography component="span">{combinedText}</Typography>
      </Box>

      {/* Keyframe animation */}
      <style>{`
        @keyframes scroll-left {
          0% {
            transform: translateX(100%);
          }
          100% {
            transform: translateX(-100%);
          }
        }
      `}</style>
    </Box>
  );
}

export default MarqueeStrip;
