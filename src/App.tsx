
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Index from './pages/Index';
import About from './pages/About';
import Services from './pages/Services';
import Contact from './pages/Contact';
import Testimonials from './pages/Testimonials';
import NotFound from './pages/NotFound';
import WindowCleaning from './pages/services/WindowCleaning';
import PressureWashing from './pages/services/PressureWashing';
import GutterCleaning from './pages/services/GutterCleaning';
import RoofCleaning from './pages/services/RoofCleaning';
import CommercialWindowCleaning from './pages/services/CommercialWindowCleaning';
import WhiteRock from './pages/locations/WhiteRock';
import Calculator from './pages/Calculator';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/about" element={<About />} />
      <Route path="/services" element={<Services />} />
      <Route path="/services/window-cleaning" element={<WindowCleaning />} />
      <Route path="/services/pressure-washing" element={<PressureWashing />} />
      <Route path="/services/gutter-cleaning" element={<GutterCleaning />} />
      <Route path="/services/roof-cleaning" element={<RoofCleaning />} />
      <Route path="/services/commercial-window-cleaning" element={<CommercialWindowCleaning />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/testimonials" element={<Testimonials />} />
      <Route path="/locations/white-rock" element={<WhiteRock />} />
      <Route path="/calculator" element={<Calculator />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default App;
