
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Contact from "./pages/Contact";
import About from "./pages/About";
import Services from "./pages/Services";
import NotFound from "./pages/NotFound";
import Testimonials from "./pages/Testimonials";
import PressureWashing from "./pages/services/PressureWashing";
import WindowCleaning from "./pages/services/WindowCleaning";
import GutterCleaning from "./pages/services/GutterCleaning";
import RoofCleaning from "./pages/services/RoofCleaning";
import CommercialWindowCleaning from "./pages/services/CommercialWindowCleaning";
import CallButton from "./components/CallButton";
import Calculator from "./pages/Calculator";
import "./App.css";
import { Toaster } from "@/components/ui/toaster";
import { TranslationProvider } from "@/hooks/use-translation";

function App() {
  return (
    <TranslationProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/services/pressure-washing" element={<PressureWashing />} />
          <Route path="/services/window-cleaning" element={<WindowCleaning />} />
          <Route path="/services/gutter-cleaning" element={<GutterCleaning />} />
          <Route path="/services/roof-cleaning" element={<RoofCleaning />} />
          <Route path="/services/commercial-window-cleaning" element={<CommercialWindowCleaning />} />
          <Route path="/services/house-washing" element={<PressureWashing />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/testimonials" element={<Testimonials />} />
          <Route path="/calculator" element={<Calculator />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <CallButton />
        <Toaster />
      </Router>
    </TranslationProvider>
  );
}

export default App;
