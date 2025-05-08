
import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';

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

// Services
import PressureWashing from './pages/services/PressureWashing';
import WindowCleaning from './pages/services/WindowCleaning';
import GutterCleaning from './pages/services/GutterCleaning';
import RoofCleaning from './pages/services/RoofCleaning';
import PostConstructionWindowCleaning from './pages/services/PostConstructionWindowCleaning';
import CommercialWindowCleaning from './pages/services/CommercialWindowCleaning';
import CommercialPressureWashing from './pages/services/CommercialPressureWashing';

import ChatAssistant from './components/ChatAssistant';
import { HelmetProvider } from 'react-helmet-async';

function App() {
  // Google Analytics setup
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://www.googletagmanager.com/gtag/js?id=G-XTJFNK4L59';
    script.async = true;
    document.head.appendChild(script);

    const inlineScript = document.createElement('script');
    inlineScript.innerHTML = `
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', 'G-XTJFNK4L59');
    `;
    document.head.appendChild(inlineScript);
  }, []);

  return (
    <>
      <Routes>
        <Route path="/" element={<Index />} />
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
