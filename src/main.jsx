import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { createTheme } from '@mui/material/styles'; // Import createTheme
import App from './App';
import { AuthProvider } from './Context/AuthContext'; // If you have auth context

// Define a basic theme
const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#8B0000', // Deep red/maroon - traditional temple tone
      contrastText: '#fff',
    },
    secondary: {
      main: '#FFB300', // Golden saffron - spiritual richness
      contrastText: '#fff',
    },
    background: {
      default: '#FFF8E7', // Cream/ivory background - calm and divine
      paper: '#ffffff',
    },
    text: {
      primary: '#4E342E', // Earthy brown
      secondary: '#6D4C41',
    },
  },
  typography: {
    fontFamily: 'Poppins, Roboto, sans-serif',
    h1: {
      fontWeight: 700,
      fontSize: '2.8rem',
      color: '#8B0000',
    },
    h2: {
      fontWeight: 600,
      fontSize: '2.2rem',
      color: '#8B0000',
    },
    h3: {
      fontWeight: 500,
      fontSize: '1.6rem',
      color: '#4E342E',
    },
    body1: {
      fontSize: '1rem',
    },
    button: {
      textTransform: 'none',
      fontWeight: 600,
    },
  },
  shape: {
    borderRadius: 12,
  },
  Components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          paddingLeft: 16,
          paddingRight: 16,
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: '#8B0000',
        },
      },
    },
  },
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}> {/* Pass the created theme here */}
      <CssBaseline /> 
      <BrowserRouter>
        <AuthProvider> {/* Optional: only if you made a context */}
          <App />
        </AuthProvider>
      </BrowserRouter>
    </ThemeProvider>
  </React.StrictMode>
);
