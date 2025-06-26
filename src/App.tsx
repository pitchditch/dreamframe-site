import React from 'react';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import './App.css';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import ServicesPage from './pages/ServicesPage';
import WindowCleaningPage from './pages/WindowCleaningPage';
import PressureWashingPage from './pages/PressureWashingPage';
import GutterCleaningPage from './pages/GutterCleaningPage';
import RoofCleaningPage from './pages/RoofCleaningPage';
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
