import { Suspense, lazy } from 'react';
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from 'react-helmet-async';

// Lazy load components for better performance
const Index = lazy(() => import("./pages/Index"));
const Home = lazy(() => import("./pages/Home"));
const About = lazy(() => import("./pages/About"));
const Services = lazy(() => import("./pages/Services"));
const Contact = lazy(() => import("./pages/Contact"));
const Testimonials = lazy(() => import("./pages/Testimonials"));
const Blog = lazy(() => import("./pages/Blog"));
const BlogPost = lazy(() => import("./pages/BlogPost"));
const WhyUs = lazy(() => import("./pages/WhyUs"));
const Calculator = lazy(() => import("./pages/Calculator"));
const Equipment = lazy(() => import("./pages/Equipment"));
const ServiceProcess = lazy(() => import("./pages/ServiceProcess"));
const Review = lazy(() => import("./pages/Review"));
const ExpressCleaning = lazy(() => import("./pages/ExpressCleaning"));
const ComparePrices = lazy(() => import("./pages/ComparePrices"));
const ZipUploader = lazy(() => import("./pages/ZipUploader"));
const NotFound = lazy(() => import("./pages/NotFound"));
const SeasonalMaintenanceGuide = lazy(() => import("./pages/SeasonalMaintenanceGuide"));

// Service pages
const WindowCleaning = lazy(() => import("./pages/services/WindowCleaning"));
const PressureWashing = lazy(() => import("./pages/services/PressureWashing"));
const GutterCleaning = lazy(() => import("./pages/services/GutterCleaning"));
const RoofCleaning = lazy(() => import("./pages/services/RoofCleaning"));
const CommercialWindowCleaning = lazy(() => import("./pages/services/CommercialWindowCleaning"));
const CommercialPressureWashing = lazy(() => import("./pages/services/CommercialPressureWashing"));
const PostConstructionWindowCleaning = lazy(() => import("./pages/services/PostConstructionWindowCleaning"));

// Location pages
const WhiteRock = lazy(() => import("./pages/locations/WhiteRock"));
const WhiteRockBC = lazy(() => import("./pages/locations/WhiteRockBC"));
const MetroVancouver = lazy(() => import("./pages/locations/MetroVancouver"));
const VancouverWindowCleaning = lazy(() => import("./pages/locations/VancouverWindowCleaning"));

const queryClient = new QueryClient();

function App() {
  return (
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <BrowserRouter>
            <Suspense fallback={
              <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-bc-red"></div>
              </div>
            }>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/home" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/services" element={<Services />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/testimonials" element={<Testimonials />} />
                <Route path="/blog" element={<Blog />} />
                <Route path="/blog/:slug" element={<BlogPost />} />
                <Route path="/seasonal-maintenance-guide" element={<SeasonalMaintenanceGuide />} />
                <Route path="/why-us" element={<WhyUs />} />
                <Route path="/calculator" element={<Calculator />} />
                <Route path="/equipment" element={<Equipment />} />
                <Route path="/service-process" element={<ServiceProcess />} />
                <Route path="/review" element={<Review />} />
                <Route path="/express-cleaning" element={<ExpressCleaning />} />
                <Route path="/compare-prices" element={<ComparePrices />} />
                <Route path="/zip-uploader" element={<ZipUploader />} />
                
                {/* Service Routes */}
                <Route path="/services/window-cleaning" element={<WindowCleaning />} />
                <Route path="/services/pressure-washing" element={<PressureWashing />} />
                <Route path="/services/gutter-cleaning" element={<GutterCleaning />} />
                <Route path="/services/roof-cleaning" element={<RoofCleaning />} />
                <Route path="/services/commercial-window-cleaning" element={<CommercialWindowCleaning />} />
                <Route path="/services/commercial-pressure-washing" element={<CommercialPressureWashing />} />
                <Route path="/services/post-construction-window-cleaning" element={<PostConstructionWindowCleaning />} />
                
                {/* Location Routes */}
                <Route path="/locations/white-rock" element={<WhiteRock />} />
                <Route path="/locations/white-rock-bc" element={<WhiteRockBC />} />
                <Route path="/locations/metro-vancouver" element={<MetroVancouver />} />
                <Route path="/locations/vancouver-window-cleaning" element={<VancouverWindowCleaning />} />
                
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
          </BrowserRouter>
        </TooltipProvider>
      </QueryClientProvider>
    </HelmetProvider>
  );
}

export default App;
