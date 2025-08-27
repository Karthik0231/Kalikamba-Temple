import React from 'react';
import { Box, Typography, Container, useTheme } from '@mui/material';

function Footer() {
  const theme = useTheme();

  return (
    <Box
      sx={{
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.primary.contrastText,
        padding: theme.spacing(3),
        mt: 'auto', // Pushes the footer to the bottom
        textAlign: 'center',
      }}
    >
      <Container maxWidth="lg">
        <Typography variant="body2" sx={{ mb: 1 }}>
          © {new Date().getFullYear()} Kalikamba Temple. All rights reserved.
        </Typography>
        <Typography variant="body2">
          123 Temple Road, Devotion City, State 12345 | info@kalikambatemp.org
        </Typography>
      </Container>
    </Box>
  );
}

export default Footer;