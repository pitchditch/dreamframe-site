
import React from 'react';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import './App.css';
import Index from './pages/Index';
import Home from './pages/Home';
import { SmartPriceCalculator } from './components/SmartPriceCalculator';
import Invoices from "./pages/Invoices";

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
