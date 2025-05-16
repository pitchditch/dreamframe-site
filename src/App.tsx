import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

// Pages
import Home from './pages/Home';
import Index from './pages/Index';
import Contact from './pages/Contact';
import About from './pages/About';
import Services from './pages/Services';
import FAQ from './pages/FAQ';
import Calculator from './pages/Calculator';
import CommercialPressureWashing from './pages/services/CommercialPressureWashing';
import WindowCleaning from './pages/services/WindowCleaning';
import PressureWashing from './pages/services/PressureWashing';
import GutterCleaning from './pages/services/GutterCleaning';
import RoofCleaning from './pages/services/RoofCleaning';
import AdminLogin from './pages/admin/Login';
import SoftWashing from './pages/services/SoftWashing';
import WhyUs from './pages/WhyUs';
import { TranslationProvider } from './contexts/TranslationContext';
import WhiteRock from './pages/locations/WhiteRock';

// Styles
import './App.css';

const queryClient = new QueryClient();

function App() {
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);
  
  return (
    <QueryClientProvider client={queryClient}>
      <HelmetProvider>
        <TranslationProvider>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/index" element={<Index />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/about" element={<About />} />
            <Route path="/services" element={<Services />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/calculator" element={<Calculator />} />
            <Route path="/services/commercial-pressure-washing" element={<CommercialPressureWashing />} />
            <Route path="/services/window-cleaning" element={<WindowCleaning />} />
            <Route path="/services/pressure-washing" element={<PressureWashing />} />
            <Route path="/services/gutter-cleaning" element={<GutterCleaning />} />
            <Route path="/services/roof-cleaning" element={<RoofCleaning />} />
            <Route path="/services/soft-washing" element={<SoftWashing />} />
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/why-choose-us" element={<WhyUs />} />
            <Route path="/locations/white-rock" element={<WhiteRock />} />
          </Routes>
        </TranslationProvider>
      </HelmetProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;
