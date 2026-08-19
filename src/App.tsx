import { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from '@/components/ui/toaster';

// Simple Loading component
const Loading = () => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
  </div>
);

// Lazy load pages for better performance
const Home = lazy(() => import('./pages/Home'));
const About = lazy(() => import('./pages/About'));
const WhyUs = lazy(() => import('./pages/WhyUs'));
const Testimonials = lazy(() => import('./pages/Testimonials'));
const Services = lazy(() => import('./pages/Services'));
const Contact = lazy(() => import('./pages/Contact'));
const NotFound = lazy(() => import('./pages/NotFound'));
const Calculator = lazy(() => import('./pages/Calculator'));
const Booking = lazy(() => import('./pages/Booking'));
const CityPages = lazy(() => import('./pages/CityPages'));
const HouseTracking = lazy(() => import('./pages/HouseTracking'));
const CRM = lazy(() => import('./pages/CRM'));
const MaintenanceMemberships = lazy(() => import('./pages/MaintenanceMemberships'));
const StorefrontUpdates = lazy(() => import('./pages/StorefrontUpdates'));
const PropertyCapture = lazy(() => import('./pages/crm/PropertyCapture'));
const CanvasserMode = lazy(() => import('./pages/crm/CanvasserMode'));
const ViewProperties = lazy(() => import('./pages/crm/ViewProperties'));
const PropertyDetail = lazy(() => import('./pages/crm/PropertyDetail'));
const MapView = lazy(() => import('./pages/crm/MapView'));
const Analytics = lazy(() => import('./pages/crm/AnalyticsEnhanced'));
const RouteHistory = lazy(() => import('./pages/crm/RouteHistory'));
const Clients = lazy(() => import('./pages/crm/Clients'));
const CallDesk = lazy(() => import('./pages/crm/CallDesk'));
const OutboundConsent = lazy(() => import('./pages/crm/OutboundConsent'));
const VirtualEstimate = lazy(() => import('./pages/VirtualEstimate'));
const VirtualEstimateDesk = lazy(() => import('./pages/VirtualEstimateDesk'));
const VirtualEstimateHost = lazy(() => import('./pages/VirtualEstimateHost'));

// Service pages
const WindowCleaning = lazy(() => import('./pages/WindowCleaning'));
const PressureWashing = lazy(() => import('./pages/PressureWashing'));
const FleetWashing = lazy(() => import('./pages/FleetWashing'));
const GutterCleaning = lazy(() => import('./pages/services/GutterCleaning'));
const RoofCleaning = lazy(() => import('./pages/services/RoofCleaning'));
const HouseWashing = lazy(() => import('./pages/services/HouseWashing'));
const FenceWashing = lazy(() => import('./pages/services/FenceWashing'));
const CommercialPressureWashing = lazy(() => import('./pages/services/CommercialPressureWashing'));

// Specific service pages
const CommercialWindowCleaning = lazy(() => import('./pages/services/CommercialWindowCleaning'));
const StorefrontRecurringWindowCleaning = lazy(() => import('./pages/services/StorefrontRecurringWindowCleaning'));
const PostConstructionWindowCleaning = lazy(() => import('./pages/services/PostConstructionWindowCleaning'));

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-white">
        <Suspense fallback={<Loading />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/why-us" element={<WhyUs />} />
            <Route path="/testimonials" element={<Testimonials />} />
            <Route path="/reviews" element={<Testimonials />} />
            <Route path="/services" element={<Services />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/calculator" element={<Calculator />} />
            <Route path="/booking" element={<Booking />} />
            <Route path="/maintenance-memberships" element={<MaintenanceMemberships />} />
            <Route path="/storefront-updates" element={<StorefrontUpdates />} />
            <Route path="/house-tracking" element={<HouseTracking />} />
            <Route path="/virtual-estimate/:sessionId" element={<VirtualEstimate />} />
            <Route path="/crm" element={<CRM />} />
            <Route path="/crm/property-capture" element={<PropertyCapture />} />
            <Route path="/crm/canvasser" element={<CanvasserMode />} />
            <Route path="/crm/properties" element={<ViewProperties />} />
            <Route path="/crm/property/:id" element={<PropertyDetail />} />
            <Route path="/crm/map" element={<MapView />} />
            <Route path="/crm/analytics" element={<Analytics />} />
            <Route path="/crm/routes" element={<RouteHistory />} />
            <Route path="/crm/clients" element={<Clients />} />
            <Route path="/crm/call-desk" element={<CallDesk />} />
            <Route path="/crm/outbound-consent" element={<OutboundConsent />} />
            <Route path="/crm/virtual-estimates" element={<VirtualEstimateDesk />} />
            <Route path="/crm/virtual-estimate/:sessionId" element={<VirtualEstimateHost />} />

            {/* Residential service routes */}
            <Route path="/services/window-cleaning" element={<WindowCleaning />} />
            <Route path="/services/pressure-washing" element={<PressureWashing />} />
            <Route path="/services/gutter-cleaning" element={<GutterCleaning />} />
            <Route path="/services/roof-cleaning" element={<RoofCleaning />} />
            <Route path="/services/house-washing" element={<HouseWashing />} />
            <Route path="/services/fence-washing" element={<FenceWashing />} />

            {/* Commercial service routes */}
            <Route path="/services/fleet-washing" element={<FleetWashing />} />
            <Route path="/fleet-washing" element={<FleetWashing />} />
            <Route path="/services/commercial-window-cleaning" element={<CommercialWindowCleaning />} />
            <Route path="/services/commercial-pressure-washing" element={<CommercialPressureWashing />} />
            <Route path="/storefront-window-cleaning" element={<StorefrontRecurringWindowCleaning />} />
            <Route path="/services/storefront-window-cleaning" element={<StorefrontRecurringWindowCleaning />} />
            <Route path="/post-construction-window-cleaning" element={<PostConstructionWindowCleaning />} />
            <Route path="/services/post-construction-window-cleaning" element={<PostConstructionWindowCleaning />} />

            {/* City/service-area pages. Keep these after all named routes. */}
            <Route path="/locations/:citySlug" element={<CityPages />} />
            <Route path="/:citySlug" element={<CityPages />} />

            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
        <Toaster />
      </div>
    </Router>
  );
}

export default App;