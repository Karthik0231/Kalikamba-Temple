import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button, useTheme } from '@mui/material';

function SevaInfoDialog({ open, onClose, seva }) {
  const theme = useTheme();

  if (!seva) return null;

  return (
    <Dialog open={open} onClose={onClose} aria-labelledby="seva-info-dialog-title">
      <DialogTitle id="seva-info-dialog-title" sx={{ color: theme.palette.primary.dark }}>
        {seva.name}
      </DialogTitle>
      <DialogContent>
        <DialogContentText sx={{ color: theme.palette.text.secondary }}>
          {seva.description || 'No detailed description available.'}
        </DialogContentText>
        <DialogContentText sx={{ mt: 2, fontWeight: 'bold', color: theme.palette.text.primary }}>
          Price: ₹{seva.price.toFixed(2)}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary" variant="contained">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default SevaInfoDialog;