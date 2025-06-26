
import React from 'react';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import './App.css';
import HomePage from './pages/Home';
import AboutPage from './pages/About';
import ContactPage from './pages/Contact';
import ServicesPage from './pages/Services';
import WindowCleaningPage from './pages/services/WindowCleaning';
import PressureWashingPage from './pages/services/PressureWashing';
import GutterCleaningPage from './pages/services/GutterCleaning';
import RoofCleaningPage from './pages/services/RoofCleaning';
import { SmartPriceCalculator } from './components/SmartPriceCalculator';
import Invoices from "./pages/Invoices";

function App() {
  
  const router = createBrowserRouter([
    {
      path: "/",
      element: <HomePage />,
    },
    {
      path: "/about",
      element: <AboutPage />,
    },
    {
      path: "/contact",
      element: <ContactPage />,
    },
    {
      path: "/services",
      element: <ServicesPage />,
    },
    {
      path: "/services/window-cleaning",
      element: <WindowCleaningPage />,
    },
    {
      path: "/services/pressure-washing",
      element: <PressureWashingPage />,
    },
    {
      path: "/services/gutter-cleaning",
      element: <GutterCleaningPage />,
    },
    {
      path: "/services/roof-cleaning",
      element: <RoofCleaningPage />,
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
