import { Routes, Route, Navigate } from 'react-router-dom';
import { Suspense, lazy, useEffect } from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import './App.css';
import Index from './pages/Index';
import Contact from './pages/Contact';
import About from './pages/About';
import NotFound from './pages/NotFound';
import Services from './pages/Services';
import Testimonials from './pages/Testimonials';
import ZipUploader from './pages/ZipUploader';

import PressureWashing from './pages/services/PressureWashing';
import WindowCleaning from './pages/services/WindowCleaning';
import CommercialWindowCleaning from './pages/services/CommercialWindowCleaning';
import GutterCleaning from './pages/services/GutterCleaning';
import RoofCleaning from './pages/services/RoofCleaning';

import WhiteRock from './pages/locations/WhiteRock';
import { Toaster } from './components/ui/toaster';
import Calculator from './pages/Calculator';
import Blog from './pages/Blog';
import BlogPost from './pages/BlogPost';

// Track page views with Google Analytics
const trackPageView = (path: string) => {
  if (typeof window.gtag !== 'function') return;

  window.gtag('config', 'G-3ZYXY3MV4X', {
    page_path: path,
  });
};

function App() {
  useEffect(() => {
    // Track initial page view
    trackPageView(window.location.pathname);

    // Track page views on navigation
    const handleRouteChange = () => {
      trackPageView(window.location.pathname);
    };

    window.addEventListener('popstate', handleRouteChange);

    return () => {
      window.removeEventListener('popstate', handleRouteChange);
    };
  }, []);

  return (
    <HelmetProvider>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/services" element={<Services />} />
          <Route path="/testimonials" element={<Testimonials />} />
          <Route path="/zip-uploader" element={<ZipUploader />} />
          <Route path="/services/pressure-washing" element={<PressureWashing />} />
          <Route path="/services/window-cleaning" element={<WindowCleaning />} />
          <Route path="/services/commercial-window-cleaning" element={<CommercialWindowCleaning />} />
          <Route path="/services/gutter-cleaning" element={<GutterCleaning />} />
          <Route path="/services/roof-cleaning" element={<RoofCleaning />} />
          <Route path="/white-rock" element={<WhiteRock />} />
          <Route path="/calculator" element={<Calculator />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<BlogPost />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
      <Toaster />
    </HelmetProvider>
  );
}

export default App;
