import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Calculator from './pages/Calculator';
import WindowCleaning from './pages/services/WindowCleaning';
import PressureWashing from './pages/services/PressureWashing';
import GutterCleaning from './pages/services/GutterCleaning';
import RoofCleaning from './pages/services/RoofCleaning';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<div className="p-4">Home Page</div>} />
        <Route path="/calculator" element={<Calculator />} />
        <Route path="/services/window-cleaning" element={<WindowCleaning />} />
        <Route path="/services/pressure-washing" element={<PressureWashing />} />
        <Route path="/services/gutter-cleaning" element={<GutterCleaning />} />
        <Route path="/services/roof-cleaning" element={<RoofCleaning />} />
        <Route path="*" element={<div className="p-4">404 - Page Not Found</div>} />
      </Routes>
    </Router>
  );
}
