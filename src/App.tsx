
import { Suspense, lazy } from "react";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from 'react-helmet-async';
import { TranslationProvider } from "@/hooks/use-translation";

// Lazy load components for better performance
const Index = lazy(() => import("./pages/Index"));
const Home = lazy(() => import("./pages/Home"));
const About = lazy(() => import("./pages/About"));
const WindowCleaning = lazy(() => import("./pages/services/WindowCleaning"));
const Contact = lazy(() => import("./pages/Contact"));
const Calculator = lazy(() => import("./pages/Calculator"));
const Blog = lazy(() => import("./pages/Blog"));
const EducationalBlog = lazy(() => import("./pages/EducationalBlog"));
const BlogPost = lazy(() => import("./pages/BlogPost"));
const GutterCleaning = lazy(() => import("./pages/services/GutterCleaning"));
const RoofCleaning = lazy(() => import("./pages/services/RoofCleaning"));
const PressureWashing = lazy(() => import("./pages/services/PressureWashing"));
const Review = lazy(() => import("./pages/Review"));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000,
      refetchOnWindowFocus: false,
    },
  },
});

const App = () => (
  <HelmetProvider>
    <QueryClientProvider client={queryClient}>
      <TranslationProvider>
        <TooltipProvider>
          <Toaster />
          <BrowserRouter>
            <Suspense fallback={<div className="flex items-center justify-center min-h-screen"><div className="animate-spin rounded-full h-32 w-32 border-b-2 border-bc-red"></div></div>}>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/home" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/calculator" element={<Calculator />} />
                <Route path="/blog" element={<Blog />} />
                <Route path="/educational-blog" element={<EducationalBlog />} />
                <Route path="/blog/:slug" element={<BlogPost />} />
                <Route path="/services/window-cleaning" element={<WindowCleaning />} />
                <Route path="/services/gutter-cleaning" element={<GutterCleaning />} />
                <Route path="/services/roof-cleaning" element={<RoofCleaning />} />
                <Route path="/services/pressure-washing" element={<PressureWashing />} />
                <Route path="/review" element={<Review />} />
              </Routes>
            </Suspense>
          </BrowserRouter>
        </TooltipProvider>
      </TranslationProvider>
    </QueryClientProvider>
  </HelmetProvider>
);

export default App;
