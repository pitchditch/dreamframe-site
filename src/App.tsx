
import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';

import Index from './pages/Index';
import Services from './pages/Services';
import Contact from './pages/Contact';
import Calculator from './pages/Calculator';
import About from './pages/About';
import Testimonials from './pages/Testimonials';
import BlogPost from './pages/BlogPost';
import Blog from './pages/Blog';
import Equipment from './pages/Equipment';
import ZipUploader from './components/ZipUploader';
import Review from './pages/Review';
import NotFound from './pages/NotFound';
import ServiceProcessPage from './pages/ServiceProcess';
import Home from './pages/Home';

// Services
import PressureWashing from './pages/services/PressureWashing';
import WindowCleaning from './pages/services/WindowCleaning';
import GutterCleaning from './pages/services/GutterCleaning';
import RoofCleaning from './pages/services/RoofCleaning';
import PostConstructionWindowCleaning from './pages/services/PostConstructionWindowCleaning';
import CommercialWindowCleaning from './pages/services/CommercialWindowCleaning';
import CommercialPressureWashing from './pages/services/CommercialPressureWashing';

import ChatAssistant from './components/ChatAssistant';
import { trackPage } from './lib/analytics-client';

function App() {
  // Use location directly instead of the custom hook
  const location = useLocation();
  
  // Track page views on route changes
  React.useEffect(() => {
    trackPage(location.pathname);
    
    // Also track in Google Analytics directly
    if (typeof window.gtag === 'function') {
      window.gtag('event', 'page_view', {
        page_title: document.title,
        page_location: window.location.href,
        page_path: location.pathname
      });
    }
  }, [location]);

  return (
    <>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/home" element={<Home />} />
        <Route path="/now" element={<Services />} />
        <Route path="/services" element={<Services />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/calculator" element={<Calculator />} />
        <Route path="/about" element={<About />} />
        <Route path="/process" element={<ServiceProcessPage />} />

        {/* Service Pages */}
        <Route path="/services/pressure-washing" element={<PressureWashing />} />
        <Route path="/services/window-cleaning" element={<WindowCleaning />} />
        <Route path="/services/gutter-cleaning" element={<GutterCleaning />} />
        <Route path="/services/roof-cleaning" element={<RoofCleaning />} />
        <Route path="/services/post-construction-window-cleaning" element={<PostConstructionWindowCleaning />} />
        <Route path="/services/commercial-window-cleaning" element={<CommercialWindowCleaning />} />
        <Route path="/services/commercial-pressure-washing" element={<CommercialPressureWashing />} />

        <Route path="/testimonials" element={<Testimonials />} />
        <Route path="/blog/:slug" element={<BlogPost />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/equipment" element={<Equipment />} />
        <Route path="/zip-uploader" element={<ZipUploader onExtract={() => {}} />} />
        <Route path="/review" element={<Review />} />
        <Route path="*" element={<NotFound />} />
      </Routes>

      <ChatAssistant />
    </>
  );
}

export default App;
