
import { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from '@/components/ui/toaster';
import { LanguageProvider } from '@/hooks/use-translation';
import Loading from './components/Loading';

// Lazy load pages for better performance
const Home = lazy(() => import('./pages/Home'));
const About = lazy(() => import('./pages/About'));
const Services = lazy(() => import('./pages/Services'));
const Contact = lazy(() => import('./pages/Contact'));
const NotFound = lazy(() => import('./pages/NotFound'));
const Calculator = lazy(() => import('./pages/Calculator'));
const Booking = lazy(() => import('./pages/Booking'));

// Service pages
const WindowCleaning = lazy(() => import('./pages/WindowCleaning'));
const PressureWashing = lazy(() => import('./pages/PressureWashing'));
const GutterCleaning = lazy(() => import('./pages/GutterCleaning'));
const DeckCleaning = lazy(() => import('./pages/DeckCleaning'));
const HouseWash = lazy(() => import('./pages/HouseWash'));
const CommercialServices = lazy(() => import('./pages/CommercialServices'));
const PostConstructionCleaning = lazy(() => import('./pages/PostConstructionCleaning'));

// Specific service pages
const CommercialWindowCleaning = lazy(() => import('./pages/services/CommercialWindowCleaning'));
const StorefrontWindowCleaning = lazy(() => import('./pages/services/StorefrontWindowCleaning'));

// City pages
const WhiteRock = lazy(() => import('./pages/cities/WhiteRock'));
const Surrey = lazy(() => import('./pages/cities/Surrey'));
const Vancouver = lazy(() => import('./pages/cities/Vancouver'));
const Langley = lazy(() => import('./pages/cities/Langley'));
const Delta = lazy(() => import('./pages/cities/Delta'));
const Richmond = lazy(() => import('./pages/cities/Richmond'));
const Burnaby = lazy(() => import('./pages/cities/Burnaby'));
const NewWestminster = lazy(() => import('./pages/cities/NewWestminster'));

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <LanguageProvider>
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

                {/* Service Routes */}
                <Route path="/services/window-cleaning" element={<WindowCleaning />} />
                <Route path="/services/pressure-washing" element={<PressureWashing />} />
                <Route path="/services/gutter-cleaning" element={<GutterCleaning />} />
                <Route path="/services/deck-cleaning" element={<DeckCleaning />} />
                <Route path="/services/house-wash" element={<HouseWash />} />
                <Route path="/services/commercial" element={<CommercialServices />} />
                <Route path="/services/post-construction" element={<PostConstructionCleaning />} />
                
                {/* Specific Service Pages */}
                <Route path="/services/commercial-window-cleaning" element={<CommercialWindowCleaning />} />
                <Route path="/services/storefront-window-cleaning" element={<StorefrontWindowCleaning />} />

                {/* City Routes */}
                <Route path="/white-rock" element={<WhiteRock />} />
                <Route path="/surrey" element={<Surrey />} />
                <Route path="/vancouver" element={<Vancouver />} />
                <Route path="/langley" element={<Langley />} />
                <Route path="/delta" element={<Delta />} />
                <Route path="/richmond" element={<Richmond />} />
                <Route path="/burnaby" element={<Burnaby />} />
                <Route path="/new-westminster" element={<NewWestminster />} />

                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
            <Toaster />
          </div>
        </Router>
      </LanguageProvider>
    </QueryClientProvider>
  );
}

export default App;
