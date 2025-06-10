import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import Index from "./pages/Index";
import Home from "./pages/Home";
import WhyUs from "./pages/WhyUs";
import Contact from "./pages/Contact";
import Calculator from "./pages/Calculator";
import Testimonials from "./pages/Testimonials";
import Equipment from "./pages/Equipment";
import ComparePrices from "./pages/ComparePrices";
import CompareServices from "./pages/CompareServices";
import WindowCleaning from "./pages/services/WindowCleaning";
import PressureWashing from "./pages/services/PressureWashing";
import GutterCleaning from "./pages/services/GutterCleaning";
import RoofCleaning from "./pages/services/RoofCleaning";
import HouseWashing from "./pages/services/HouseWashing";
import PostConstructionWindowCleaning from "./pages/services/PostConstructionWindowCleaning";
import CommercialWindowCleaning from "./pages/services/CommercialWindowCleaning";
import CommercialPressureWashing from "./pages/services/CommercialPressureWashing";
import VancouverWindowCleaning from "./pages/locations/VancouverWindowCleaning";
import WhiteRockPressureWashing from "./pages/locations/WhiteRockPressureWashing";
import Services from "./pages/Services";
import StickyContactBar from "./components/StickyContactBar";
import AfkOverlay from "./components/AfkOverlay";
import SouthSurreyPressureWashing from "./pages/locations/SouthSurreyPressureWashing";
import LangleyPressureWashing from "./pages/locations/LangleyPressureWashing";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <HelmetProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/home" element={<Home />} />
            <Route path="/why-us" element={<WhyUs />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/calculator" element={<Calculator />} />
            <Route path="/testimonials" element={<Testimonials />} />
            <Route path="/equipment" element={<Equipment />} />
            <Route path="/compare-prices" element={<ComparePrices />} />
            <Route path="/compare-services" element={<CompareServices />} />
            <Route path="/services" element={<Services />} />
            <Route path="/services/window-cleaning" element={<WindowCleaning />} />
            <Route path="/services/pressure-washing" element={<PressureWashing />} />
            <Route path="/services/gutter-cleaning" element={<GutterCleaning />} />
            <Route path="/services/roof-cleaning" element={<RoofCleaning />} />
            <Route path="/services/house-washing" element={<HouseWashing />} />
            <Route path="/services/post-construction-window-cleaning" element={<PostConstructionWindowCleaning />} />
            <Route path="/services/commercial-window-cleaning" element={<CommercialWindowCleaning />} />
            <Route path="/services/commercial-pressure-washing" element={<CommercialPressureWashing />} />
            <Route path="/vancouver-window-cleaning" element={<VancouverWindowCleaning />} />
            <Route path="/white-rock-pressure-washing" element={<WhiteRockPressureWashing />} />
            <Route path="/south-surrey-pressure-washing" element={<SouthSurreyPressureWashing />} />
            <Route path="/langley-pressure-washing" element={<LangleyPressureWashing />} />
          </Routes>
          <StickyContactBar />
          <AfkOverlay />
        </BrowserRouter>
      </TooltipProvider>
    </HelmetProvider>
  </QueryClientProvider>
);

export default App;
