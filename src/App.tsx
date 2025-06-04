
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Services from './pages/Services';
import Testimonials from './pages/Testimonials';
import Contact from './pages/Contact';
import Calculator from './pages/Calculator';
import Equipment from './pages/Equipment';
import ComparePrices from './pages/ComparePrices';
import CompareServices from './pages/CompareServices';
import WindowCleaning from './pages/services/WindowCleaning';
import GutterCleaning from './pages/services/GutterCleaning';
import PressureWashing from './pages/services/PressureWashing';
import RoofCleaning from './pages/services/RoofCleaning';
import CommercialWindowCleaning from './pages/services/CommercialWindowCleaning';
import CommercialPressureWashing from './pages/services/CommercialPressureWashing';
import PostConstructionWindowCleaning from './pages/services/PostConstructionWindowCleaning';
import WhyUs from './pages/WhyUs';
import FenceWashing from './pages/services/FenceWashing';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/services" element={<Services />} />
        <Route path="/testimonials" element={<Testimonials />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/calculator" element={<Calculator />} />
        <Route path="/equipment" element={<Equipment />} />
        <Route path="/compare-prices" element={<ComparePrices />} />
        <Route path="/compare-services" element={<CompareServices />} />
        <Route path="/services/window-cleaning" element={<WindowCleaning />} />
        <Route path="/services/gutter-cleaning" element={<GutterCleaning />} />
        <Route path="/services/pressure-washing" element={<PressureWashing />} />
        <Route path="/services/roof-cleaning" element={<RoofCleaning />} />
        <Route path="/services/commercial-window-cleaning" element={<CommercialWindowCleaning />} />
        <Route path="/services/commercial-pressure-washing" element={<CommercialPressureWashing />} />
        <Route path="/services/post-construction-window-cleaning" element={<PostConstructionWindowCleaning />} />
        <Route path="/why-us" element={<WhyUs />} />
        <Route path="/services/fence-washing" element={<FenceWashing />} />
      </Routes>
    </Router>
  );
}

export default App;
