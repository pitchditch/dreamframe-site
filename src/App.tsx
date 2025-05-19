
import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Index from './pages/Index';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import Services from './pages/Services';
import WindowCleaning from './pages/services/WindowCleaning';
import PressureWashing from './pages/services/PressureWashing';
import GutterCleaning from './pages/services/GutterCleaning';
import RoofCleaning from './pages/services/RoofCleaning';
import CommercialWindowCleaning from './pages/services/CommercialWindowCleaning';
import CommercialPressureWashing from './pages/services/CommercialPressureWashing';
import PostConstructionWindowCleaning from './pages/services/PostConstructionWindowCleaning';
import WhyUs from './pages/WhyUs';
import Equipment from './pages/Equipment';
import Testimonials from './pages/Testimonials';
import ServiceProcess from './pages/ServiceProcess';
import Calculator from './pages/Calculator';
import Review from './pages/Review';
import Blog from './pages/Blog';
import BlogPost from './pages/BlogPost';
import WhiteRock from './pages/locations/WhiteRock';
import WhiteRockBC from './pages/locations/WhiteRockBC';
import MetroVancouver from './pages/locations/MetroVancouver';
import VancouverWindowCleaning from './pages/locations/VancouverWindowCleaning';
import NotFound from './pages/NotFound';
import ZipUploader from './pages/ZipUploader';
import { initAnalytics } from './lib/analytics-client';
import ExpressCleaning from './pages/ExpressCleaning';
import { setupErrorHandlers } from './utils/errorUtils';
import usePageTracking from './hooks/usePageTracking';

function App() {
  // Track page views
  usePageTracking();
  
  useEffect(() => {
    // Initialize Google Analytics
    initAnalytics();
    // Setup error handlers
    setupErrorHandlers();
  }, []);

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/home" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/services" element={<Services />} />
        <Route path="/services/window-cleaning" element={<WindowCleaning />} />
        <Route path="/services/pressure-washing" element={<PressureWashing />} />
        <Route path="/services/gutter-cleaning" element={<GutterCleaning />} />
        <Route path="/services/roof-cleaning" element={<RoofCleaning />} />
        <Route path="/services/commercial-window-cleaning" element={<CommercialWindowCleaning />} />
        <Route path="/services/commercial-pressure-washing" element={<CommercialPressureWashing />} />
        <Route path="/services/post-construction-window-cleaning" element={<PostConstructionWindowCleaning />} />
        <Route path="/express-cleaning" element={<ExpressCleaning />} />
        <Route path="/why-us" element={<WhyUs />} />
        <Route path="/equipment" element={<Equipment />} />
        <Route path="/testimonials" element={<Testimonials />} />
        <Route path="/process" element={<ServiceProcess />} />
        <Route path="/calculator" element={<Calculator />} />
        <Route path="/review" element={<Review />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:id" element={<BlogPost />} />
        <Route path="/locations/white-rock-bc" element={<WhiteRockBC />} />
        <Route path="/locations/white-rock" element={<WhiteRock />} />
        <Route path="/locations/metro-vancouver" element={<MetroVancouver />} />
        <Route path="/locations/vancouver-bc" element={<VancouverWindowCleaning />} />
        <Route path="/zip-uploader" element={<ZipUploader />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
