
import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
// Remove ReactQueryDevtools import as it's not installed

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
// Remove AdminLogin import as it doesn't exist
// Remove SoftWashing import as it doesn't exist
import WhyUs from './pages/WhyUs';
// Create a simple TranslationProvider context
import WhiteRock from './pages/locations/WhiteRock';

// Styles
import './App.css';

const queryClient = new QueryClient();

// Create a simple TranslationContext and Provider
const TranslationContext = React.createContext({
  language: 'en',
  setLanguage: (lang: string) => {},
});

export const TranslationProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
  const [language, setLanguage] = useState('en');
  
  return (
    <TranslationContext.Provider value={{ language, setLanguage }}>
      {children}
    </TranslationContext.Provider>
  );
};

// Export the context for use in other components
export const useTranslation = () => React.useContext(TranslationContext);

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
            {/* Remove routes for AdminLogin and SoftWashing */}
            <Route path="/why-choose-us" element={<WhyUs />} />
            <Route path="/locations/white-rock" element={<WhiteRock />} />
          </Routes>
        </TranslationProvider>
      </HelmetProvider>
      {/* Remove ReactQueryDevtools */}
    </QueryClientProvider>
  );
}

export default App;
