
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Index from './pages/Index';
import Services from './pages/Services';
import Contact from './pages/Contact';
import About from './pages/About';
import Calculator from './pages/Calculator';
import PressureWashing from './pages/services/PressureWashing';
import WindowCleaning from './pages/services/WindowCleaning';
import GutterCleaning from './pages/services/GutterCleaning';
import RoofCleaning from './pages/services/RoofCleaning';
import PostConstructionWindowCleaning from './pages/services/PostConstructionWindowCleaning';
import CommercialWindowCleaning from './pages/services/CommercialWindowCleaning';
import Testimonials from './pages/Testimonials';
import Blog from './pages/Blog';
import BlogPost from './pages/BlogPost';
import NotFound from './pages/NotFound';
import Equipment from './pages/Equipment';
import ZipUploader from './pages/ZipUploader';
import WhyUs from './pages/WhyUs';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/home" element={<Home />} />
        <Route path="/services" element={<Services />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<About />} />
        <Route path="/calculator" element={<Calculator />} />
        <Route path="/services/pressure-washing" element={<PressureWashing />} />
        <Route path="/services/window-cleaning" element={<WindowCleaning />} />
        <Route path="/services/gutter-cleaning" element={<GutterCleaning />} />
        <Route path="/services/roof-cleaning" element={<RoofCleaning />} />
        <Route path="/services/post-construction-cleaning" element={<PostConstructionWindowCleaning />} />
        <Route path="/services/commercial-window-cleaning" element={<CommercialWindowCleaning />} />
        <Route path="/testimonials" element={<Testimonials />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:slug" element={<BlogPost />} />
        <Route path="/equipment" element={<Equipment />} />
        <Route path="/zip-uploader" element={<ZipUploader />} />
        <Route path="/why-us" element={<WhyUs />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
