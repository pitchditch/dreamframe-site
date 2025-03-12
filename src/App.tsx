
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import GutterCleaning from "./pages/services/GutterCleaning";
import WindowCleaning from "./pages/services/WindowCleaning";
import RoofCleaning from "./pages/services/RoofCleaning";
import PressureWashing from "./pages/services/PressureWashing";
import Testimonials from "./pages/Testimonials";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/services/gutter-cleaning" element={<GutterCleaning />} />
          <Route path="/services/window-cleaning" element={<WindowCleaning />} />
          <Route path="/services/roof-cleaning" element={<RoofCleaning />} />
          <Route path="/services/house-washing" element={<PressureWashing />} />
          <Route path="/testimonials" element={<Testimonials />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
