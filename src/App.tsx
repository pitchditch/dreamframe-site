
import { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from '@/components/ui/toaster';
import { TranslationProvider } from '@/hooks/use-translation';

// Simple Loading component
const Loading = () => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
  </div>
);

// Lazy load pages for better performance
const Home = lazy(() => import('./pages/Home'));
const About = lazy(() => import('./pages/About'));
const Services = lazy(() => import('./pages/Services'));
const Contact = lazy(() => import('./pages/Contact'));
const NotFound = lazy(() => import('./pages/NotFound'));
const Calculator = lazy(() => import('./pages/Calculator'));
const Booking = lazy(() => import('./pages/Booking'));
const HouseTracking = lazy(() => import('./pages/HouseTracking'));
const CRM = lazy(() => import('./pages/CRM'));
const PropertyCapture = lazy(() => import('./pages/crm/PropertyCapture'));
const CanvasserMode = lazy(() => import('./pages/crm/CanvasserMode'));
const ViewProperties = lazy(() => import('./pages/crm/ViewProperties'));
const PropertyDetail = lazy(() => import('./pages/crm/PropertyDetail'));

// Service pages
const WindowCleaning = lazy(() => import('./pages/WindowCleaning'));
const PressureWashing = lazy(() => import('./pages/PressureWashing'));

// Specific service pages
const CommercialWindowCleaning = lazy(() => import('./pages/services/CommercialWindowCleaning'));
const StorefrontWindowCleaning = lazy(() => import('./pages/services/StorefrontWindowCleaning'));

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TranslationProvider>
        <Router>
          <div className="min-h-screen bg-white">
            <Suspense fallback={<Loading />}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/services" element={<Services />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/calculator" element={<Calculator />} />
                <Route path="/booking" element={<Booking />} />
                <Route path="/house-tracking" element={<HouseTracking />} />
          <Route path="/crm" element={<CRM />} />
          <Route path="/crm/property-capture" element={<PropertyCapture />} />
          <Route path="/crm/canvasser" element={<CanvasserMode />} />
          <Route path="/crm/properties" element={<ViewProperties />} />
          <Route path="/crm/property/:id" element={<PropertyDetail />} />

                {/* Service Routes */}
                <Route path="/services/window-cleaning" element={<WindowCleaning />} />
                <Route path="/services/pressure-washing" element={<PressureWashing />} />
                
                {/* Specific Service Pages */}
                <Route path="/services/commercial-window-cleaning" element={<CommercialWindowCleaning />} />
                <Route path="/services/storefront-window-cleaning" element={<StorefrontWindowCleaning />} />

                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
            <Toaster />
          </div>
        </Router>
      </TranslationProvider>
    </QueryClientProvider>
  );
}

export default App;
