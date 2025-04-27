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
import PostConstructionCleaning from './pages/services/PostConstructionCleaning';
import Testimonials from './pages/Testimonials';

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
        <Route path="/services/post-construction-cleaning" element={<PostConstructionCleaning />} />
        <Route path="/testimonials" element={<Testimonials />} />
      </Routes>
    </Router>
  );
}

export default App;
