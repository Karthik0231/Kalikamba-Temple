import { useState } from 'react'
import './App.css'
import { Routes, Route } from 'react-router-dom';
import Home from './Pages/Home';
import SevasPage from './Pages/SevasPage';
import Navbar from './Components/Navbar';
import Footer from './Components/Footer';
import { Box } from '@mui/material';
import CheckoutPage from './Pages/CheckoutPage';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import AboutPage from './Pages/AboutPage'; // Import the new AboutPage
import PaymentConfirmationPage from './Pages/Payment';
import PaymentSuccessPage from './Pages/PaymentSuccess';
import EventsPage from './Pages/Events';
import DonationsPage from './Pages/DonationsPage';

function App() {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Navbar />
      <Box component="main" sx={{ flexGrow: 1 }}>
      <LocalizationProvider dateAdapter={AdapterDayjs}> {/* Ensure this wrapper is present */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/sevas" element={<SevasPage />} /> {/* Add the SevasPage route */}
          {/* Add more routes here as you create new pages */}
          <Route path="/events" element={<EventsPage/>} />
          <Route path="/hall-booking" element={<div>Hall Booking Page</div>} />
          <Route path="/about" element={<AboutPage />} /> {/* Add the new AboutPage route */}
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/payment-confirmation" element={<PaymentConfirmationPage />} />
          <Route path="/payment-success" element={<PaymentSuccessPage/>} />
          <Route path="/donations" element={<DonationsPage/>} />
        </Routes>
      </LocalizationProvider>
      </Box>
      <Footer />
    </Box>
  );
}

export default App;
