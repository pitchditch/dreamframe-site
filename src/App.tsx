import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";

// Pages
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
import FenceWashing from "./pages/services/FenceWashing";
import WhyUs from "./pages/WhyUs";
import HouseTracking from "./pages/HouseTracking";
import KelownaServices from "./pages/KelownaServices";
import ReferralHub from "./pages/ReferralHub";
import NotFound from "./pages/NotFound";

// ✅ NEW: Quote Page
import Quote from "./pages/services/Quote";

const queryClient = new QueryClient();

const App = () => (
  <HelmetProvider>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* General Pages */}
            <Route path="/" element={<Index />} />
            <Route path="/calculator" element={<Calculator />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/services" element={<Services />} />
            <Route path="/testimonials" element={<Testimonials />} />
            <Route path="/why-us" element={<WhyUs />} />
            <Route path="/equipment" element={<Equipment />} />
            <Route path="/compare-prices" element={<ComparePrices />} />
            <Route path="/compare-services" element={<CompareServices />} />
            <Route path="/house-tracking" element={<HouseTracking />} />
            <Route path="/referral-hub" element={<ReferralHub />} />

            {/* Service Pages */}
            <Route path="/services/window-cleaning" element={<WindowCleaning />} />
            <Route path="/services/pressure-washing" element={<PressureWashing />} />
            <Route path="/services/soft-wash" element={<SoftWash />} />
            <Route path="/services/roof-cleaning" element={<RoofCleaning />} />
            <Route path="/services/gutter-cleaning" element={<GutterCleaning />} />
            <Route path="/services/house-wash" element={<HouseWash />} />
            <Route path="/services/commercial-window-cleaning" element={<CommercialWindowCleaning />} />
            <Route path="/services/commercial-pressure-washing" element={<CommercialPressureWashing />} />
            <Route path="/services/post-construction-window-cleaning" element={<PostConstructionWindowCleaning />} />
            <Route path="/services/fence-washing" element={<FenceWashing />} />

            {/* ✅ NEW QUOTE PAGE ROUTE */}
            <Route path="/services/quote" element={<Quote />} />

            {/* City Pages */}
            <Route path="/kelowna" element={<KelownaServices />} />
            <Route path="/vancouver" element={<CityPages />} />
            <Route path="/surrey" element={<CityPages />} />
            <Route path="/burnaby" element={<CityPages />} />
            <Route path="/richmond" element={<CityPages />} />
            <Route path="/coquitlam" element={<CityPages />} />
            <Route path="/langley-city" element={<CityPages />} />
            <Route path="/township-of-langley" element={<CityPages />} />
            <Route path="/delta" element={<CityPages />} />
            <Route path="/new-westminster" element={<CityPages />} />

            {/* 404 Fallback */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </HelmetProvider>
);

export default App;
