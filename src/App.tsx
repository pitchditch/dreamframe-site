
import { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from '@/components/ui/toaster';
import Loading from './components/Loading';

// Lazy load pages for better performance
const Home = lazy(() => import('./pages/Home'));
const About = lazy(() => import('./pages/About'));
const Services = lazy(() => import('./pages/Services'));
const Contact = lazy(() => import('./pages/Contact'));
const WhyUs = lazy(() => import('./pages/WhyUs'));
const NotFound = lazy(() => import('./pages/NotFound'));
const CalculatorPage = lazy(() => import('./pages/Calculator'));
const Booking = lazy(() => import('./pages/Booking'));

// Service pages
const WindowCleaning = lazy(() => import('./pages/WindowCleaning'));
const PressureWashing = lazy(() => import('./pages/PressureWashing'));
const GutterCleaning = lazy(() => import('./pages/services/GutterCleaning'));
const RoofCleaning = lazy(() => import('./pages/services/RoofCleaning'));
const HouseSoftWash = lazy(() => import('./pages/services/HouseSoftWash'));
const FenceWashing = lazy(() => import('./pages/services/FenceWashing'));
const DeckCleaning = lazy(() => import('./pages/services/DeckCleaning'));
const DrivewayoCleaning = lazy(() => import('./pages/services/DrivewayoCleaning'));

// Specific service pages
const CommercialWindowCleaning = lazy(() => import('./pages/services/CommercialWindowCleaning'));
const StorefrontWindowCleaning = lazy(() => import('./pages/services/StorefrontWindowCleaning'));
const CommercialBuildingWashing = lazy(() => import('./pages/services/CommercialBuildingWashing'));
const ParkingLotCleaning = lazy(() => import('./pages/services/ParkingLotCleaning'));

// Admin pages
const AdminQuotes = lazy(() => import('./pages/AdminQuotes'));

// City pages
const CityPages = lazy(() => import('./pages/CityPages'));

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <div className="min-h-screen bg-white">
          <Suspense fallback={<Loading />}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/services" element={<Services />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/why-us" element={<WhyUs />} />
              <Route path="/calculator" element={<CalculatorPage />} />
              <Route path="/booking" element={<Booking />} />

              {/* Service Routes */}
              <Route path="/services/window-cleaning" element={<WindowCleaning />} />
              <Route path="/services/pressure-washing" element={<PressureWashing />} />
              <Route path="/services/gutter-cleaning" element={<GutterCleaning />} />
              <Route path="/services/roof-cleaning" element={<RoofCleaning />} />
              <Route path="/services/house-soft-wash" element={<HouseSoftWash />} />
              <Route path="/services/fence-washing" element={<FenceWashing />} />
              <Route path="/services/deck-cleaning" element={<DeckCleaning />} />
              <Route path="/services/driveway-cleaning" element={<DrivewayoCleaning />} />
              
              {/* Commercial Service Pages */}
              <Route path="/services/commercial-window-cleaning" element={<CommercialWindowCleaning />} />
              <Route path="/services/storefront-window-cleaning" element={<StorefrontWindowCleaning />} />
              <Route path="/services/commercial-building-washing" element={<CommercialBuildingWashing />} />
              <Route path="/services/parking-lot-cleaning" element={<ParkingLotCleaning />} />

              {/* Admin Routes */}
              <Route path="/admin-quotes" element={<AdminQuotes />} />

              {/* City Routes */}
              <Route path="/:citySlug" element={<CityPages />} />

              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
          <Toaster />
        </div>
      </Router>
    </QueryClientProvider>
  );
}

export default App;
