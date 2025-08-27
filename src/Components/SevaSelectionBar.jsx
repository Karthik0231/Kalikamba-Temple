import React from 'react';
import { Box, Typography, Button, useTheme } from '@mui/material';

function SevaSelectionBar({ selectedSevasCount, totalSelectedPrice, onNextClick }) {
  const theme = useTheme();

  return (
    <Box
      sx={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.primary.contrastText,
        padding: theme.spacing(2),
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        boxShadow: '0 -2px 10px rgba(0,0,0,0.1)',
        zIndex: 1000, // Ensure it stays on top
        flexDirection: { xs: 'column', sm: 'row' }, // Stack on small screens
        gap: { xs: theme.spacing(1), sm: 0 },
      }}
    >
      <Box sx={{ textAlign: { xs: 'center', sm: 'left' } }}>
        <Typography variant="h6">
          Selected Sevas: {selectedSevasCount}
        </Typography>
        <Typography variant="h6">
          Total Price: ₹{totalSelectedPrice.toFixed(2)}
        </Typography>
      </Box>
      <Button
        variant="contained"
        color="secondary"
        onClick={onNextClick}
        disabled={selectedSevasCount === 0}
        sx={{
          minWidth: { xs: '100%', sm: 'auto' },
          mt: { xs: 1, sm: 0 },
        }}
      >
        Next
      </Button>
    </Box>
  );
}

export default SevaSelectionBar;