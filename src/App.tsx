
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import Index from "./pages/Index";
import CityPages from "./pages/CityPages";
import Calculator from "./pages/Calculator";
import Contact from "./pages/Contact";
import Services from "./pages/Services";
import Testimonials from "./pages/Testimonials";
import WindowCleaning from "./pages/WindowCleaning";
import PressureWashing from "./pages/PressureWashing";
import SoftWash from "./pages/services/SoftWash";
import RoofCleaning from "./pages/services/RoofCleaning";
import GutterCleaning from "./pages/services/GutterCleaning";
import HouseWash from "./pages/services/HouseWashing";
import Equipment from "./pages/Equipment";
import ComparePrices from "./pages/ComparePrices";
import CompareServices from "./pages/CompareServices";
import CommercialWindowCleaning from "./pages/services/CommercialWindowCleaning";
import CommercialPressureWashing from "./pages/services/CommercialPressureWashing";
import PostConstructionWindowCleaning from "./pages/services/PostConstructionWindowCleaning";
import WhyUs from "./pages/WhyUs";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <HelmetProvider>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            
            {/* City-specific homepage routes */}
            <Route path="/vancouver" element={<CityPages />} />
            <Route path="/surrey" element={<CityPages />} />
            <Route path="/burnaby" element={<CityPages />} />
            <Route path="/richmond" element={<CityPages />} />
            <Route path="/coquitlam" element={<CityPages />} />
            <Route path="/langley-city" element={<CityPages />} />
            <Route path="/township-of-langley" element={<CityPages />} />
            <Route path="/delta" element={<CityPages />} />
            <Route path="/new-westminster" element={<CityPages />} />
            <Route path="/port-coquitlam" element={<CityPages />} />
            <Route path="/port-moody" element={<CityPages />} />
            <Route path="/maple-ridge" element={<CityPages />} />
            <Route path="/pitt-meadows" element={<CityPages />} />
            <Route path="/white-rock" element={<CityPages />} />
            
            {/* Dynamic route for all cities */}
            <Route path="/:citySlug" element={<CityPages />} />
            
            <Route path="/calculator" element={<Calculator />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/services" element={<Services />} />
            <Route path="/testimonials" element={<Testimonials />} />
            <Route path="/why-us" element={<WhyUs />} />
            <Route path="/services/window-cleaning" element={<WindowCleaning />} />
            <Route path="/services/pressure-washing" element={<PressureWashing />} />
            <Route path="/services/soft-wash" element={<SoftWash />} />
            <Route path="/services/roof-cleaning" element={<RoofCleaning />} />
            <Route path="/services/gutter-cleaning" element={<GutterCleaning />} />
            <Route path="/services/house-wash" element={<HouseWash />} />
            <Route path="/services/commercial-window-cleaning" element={<CommercialWindowCleaning />} />
            <Route path="/services/commercial-pressure-washing" element={<CommercialPressureWashing />} />
            <Route path="/services/post-construction-window-cleaning" element={<PostConstructionWindowCleaning />} />
            <Route path="/equipment" element={<Equipment />} />
            <Route path="/compare-prices" element={<ComparePrices />} />
            <Route path="/compare-services" element={<CompareServices />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </HelmetProvider>
);

export default App;
