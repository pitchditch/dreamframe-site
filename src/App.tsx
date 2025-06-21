
import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from '@/components/ui/toaster';
import { Helmet, HelmetProvider } from 'react-helmet-async';

const queryClient = new QueryClient();

// Lazy load components
const Home = React.lazy(() => import('./pages/Home'));
const About = React.lazy(() => import('./pages/About'));
const Services = React.lazy(() => import('./pages/Services'));
const Contact = React.lazy(() => import('./pages/Contact'));
const PriceCalculator = React.lazy(() => import('./pages/Calculator'));
const Booking = React.lazy(() => import('./pages/Booking'));
const WindowCleaning = React.lazy(() => import('./pages/services/WindowCleaning'));
const PressureWashing = React.lazy(() => import('./pages/services/PressureWashing'));
const StorefrontWindowCleaning = React.lazy(() => import('./pages/services/StorefrontWindowCleaning'));

function App() {
  return (
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <Router>
          <div className="min-h-screen bg-white">
            <Suspense fallback={<div className="flex items-center justify-center min-h-screen">Loading...</div>}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/services" element={<Services />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/calculator" element={<PriceCalculator />} />
                <Route path="/booking" element={<Booking />} />
                <Route path="/services/window-cleaning" element={<WindowCleaning />} />
                <Route path="/services/pressure-washing" element={<PressureWashing />} />
                <Route path="/services/storefront-window-cleaning" element={<StorefrontWindowCleaning />} />
              </Routes>
            </Suspense>
            <Toaster />
          </div>
        </Router>
      </QueryClientProvider>
    </HelmetProvider>
  );
}

export default App;
