
import React from 'react';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import './App.css';
import Index from './pages/Index';
import Home from './pages/Home';
import Contact from './pages/Contact';
import Services from './pages/Services';
import WindowCleaning from './pages/WindowCleaning';
import PressureWashing from './pages/PressureWashing';
import { SmartPriceCalculator } from './components/SmartPriceCalculator';
import Invoices from "./pages/Invoices";

// Import service pages that exist
import GutterCleaning from './pages/services/GutterCleaning';
import RoofCleaning from './pages/services/RoofCleaning';

function App() {
  
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Index />,
    },
    {
      path: "/home",
      element: <Home />,
    },
    {
      path: "/contact",
      element: <Contact />,
    },
    {
      path: "/services",
      element: <Services />,
    },
    {
      path: "/services/window-cleaning",
      element: <WindowCleaning />,
    },
    {
      path: "/services/pressure-washing",
      element: <PressureWashing />,
    },
    {
      path: "/services/gutter-cleaning",
      element: <GutterCleaning />,
    },
    {
      path: "/services/roof-cleaning",
      element: <RoofCleaning />,
    },
    {
      path: "/calculator",
      element: <SmartPriceCalculator />,
    },
    {
      path: "/invoices",
      element: <Invoices />,
    },
  ]);

  return (
    <RouterProvider router={router} />
  );
}

export default App;
