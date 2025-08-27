import React from 'react';
import { Box, Typography, IconButton, useTheme } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import DeleteIcon from '@mui/icons-material/Delete';

function CheckoutSevaItem({ seva, onQuantityChange, onRemove }) {
  const theme = useTheme();

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        p: 1.5,
        mb: 1,
        borderRadius: 2,
        backgroundColor: theme.palette.background.paper,
        boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
        border: `1px solid ${theme.palette.divider}`,
      }}
    >
      <Box sx={{ flexGrow: 1, pr: 1 }}>
        <Typography variant="subtitle1" fontWeight={600} color={theme.palette.primary.dark}>
          {seva.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          ₹{seva.price.toFixed(2)} each
        </Typography>
      </Box>

      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
        <IconButton
          size="small"
          onClick={() => onQuantityChange(seva.id, seva.quantity - 1)}
          disabled={seva.quantity <= 1}
          sx={{ color: theme.palette.primary.main }}
        >
          <RemoveIcon fontSize="small" />
        </IconButton>
        <Typography variant="body1" fontWeight={600} sx={{ minWidth: '24px', textAlign: 'center' }}>
          {seva.quantity}
        </Typography>
        <IconButton
          size="small"
          onClick={() => onQuantityChange(seva.id, seva.quantity + 1)}
          sx={{ color: theme.palette.primary.main }}
        >
          <AddIcon fontSize="small" />
        </IconButton>
      </Box>

      <Typography variant="subtitle1" fontWeight={700} sx={{ ml: 2, minWidth: '70px', textAlign: 'right' }}>
        ₹{(seva.price * seva.quantity).toFixed(2)}
      </Typography>

      <IconButton
        size="small"
        onClick={() => onRemove(seva.id)}
        sx={{ ml: 1, color: theme.palette.error.main }}
      >
        <DeleteIcon fontSize="small" />
      </IconButton>
    </Box>
  );
}

export default CheckoutSevaItem;