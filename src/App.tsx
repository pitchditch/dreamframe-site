
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Suspense, lazy, useEffect, useState } from "react";
import { Toaster } from "@/components/ui/toaster";
import { TranslationProvider } from "@/hooks/use-translation";
import { Helmet } from "react-helmet";
import "./App.css";

// Use lazy loading to improve performance
const Index = lazy(() => import("./pages/Index"));
const Contact = lazy(() => import("./pages/Contact"));
const About = lazy(() => import("./pages/About"));
const Services = lazy(() => import("./pages/Services"));
const NotFound = lazy(() => import("./pages/NotFound"));
const Testimonials = lazy(() => import("./pages/Testimonials"));
const PressureWashing = lazy(() => import("./pages/services/PressureWashing"));
const WindowCleaning = lazy(() => import("./pages/services/WindowCleaning"));
const GutterCleaning = lazy(() => import("./pages/services/GutterCleaning"));
const RoofCleaning = lazy(() => import("./pages/services/RoofCleaning"));
const CommercialWindowCleaning = lazy(() => import("./pages/services/CommercialWindowCleaning"));
const Calculator = lazy(() => import("./pages/Calculator"));
// New location pages
const WhiteRock = lazy(() => import("./pages/locations/WhiteRock"));

function App() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Mark that the app has loaded
    setIsLoaded(true);
    console.log("App component mounted");
    
    // Add a listener for the beforeunload event
    const handleBeforeUnload = () => {
      console.log("Page is about to unload");
    };
    
    window.addEventListener('beforeunload', handleBeforeUnload);
    
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);

  // Fallback UI for lazy-loaded components
  const LoadingFallback = () => (
    <div className="flex items-center justify-center min-h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-bc-red"></div>
    </div>
  );

  return (
    <TranslationProvider>
      <Helmet>
        <title>BC Pressure Washing - Professional Window & Pressure Washing Services</title>
        <meta name="description" content="Expert window cleaning, pressure washing, roof cleaning, and gutter cleaning services in White Rock, Surrey and Metro Vancouver. Satisfaction guaranteed." />
        <meta name="keywords" content="window cleaning, pressure washing, roof cleaning, gutter cleaning, White Rock, Surrey, BC" />
        <meta property="og:title" content="BC Pressure Washing - Window & Pressure Washing Services" />
        <meta property="og:description" content="Professional exterior cleaning services in Metro Vancouver. Window cleaning, pressure washing, roof & gutter cleaning with satisfaction guaranteed." />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="/lovable-uploads/3093e0ae-f262-4f3d-b079-3050df7ab446.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <link rel="canonical" href="https://bcpressurewashing.com/" />
      </Helmet>
      
      <Router>
        <Suspense fallback={<LoadingFallback />}>
          {isLoaded ? (
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/about" element={<About />} />
              <Route path="/services" element={<Services />} />
              <Route path="/services/pressure-washing" element={<PressureWashing />} />
              <Route path="/services/window-cleaning" element={<WindowCleaning />} />
              <Route path="/services/gutter-cleaning" element={<GutterCleaning />} />
              <Route path="/services/roof-cleaning" element={<RoofCleaning />} />
              <Route path="/services/commercial-window-cleaning" element={<CommercialWindowCleaning />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/testimonials" element={<Testimonials />} />
              <Route path="/calculator" element={<Calculator />} />
              {/* New location routes */}
              <Route path="/locations/white-rock" element={<WhiteRock />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          ) : (
            <LoadingFallback />
          )}
        </Suspense>
        <Toaster />
      </Router>
    </TranslationProvider>
  );
}

export default App;
