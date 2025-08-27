import React from 'react';
import { Box, Typography, useTheme } from '@mui/material';
import { alpha } from '@mui/system'; // Import alpha for transparent colors

function MemberCard({ image, name, position }) {
  const theme = useTheme();

  return (
    <Box
      sx={{
        width: 160,
        height: 200,
        borderRadius: '1rem',
        overflow: 'hidden',
        boxShadow: 6,
        position: 'relative',
        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
        '&:hover': {
          transform: 'scale(1.05)',
          boxShadow: 12,
        },
      }}
    >
      <img
        src={image || 'https://via.placeholder.com/300x300.png?text=Profile'}
        alt={name}
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          bottom: 0,
          right: 0,
          left: 0,
          background: alpha(theme.palette.common.black, 0.5), // Use theme color with alpha for transparency
          color: theme.palette.common.white, // Use theme color for text
          px: 1,
          py: 0.5,
        }}
      >
        <Typography variant="subtitle2" sx={{ fontWeight: 600, fontSize: '0.8rem' }}>
          {name}
        </Typography>
        <Typography variant="caption" sx={{ fontSize: '0.7rem' }}>
          {position}
        </Typography>
      </Box>
    </Box>
  );
}

export default MemberCard;
