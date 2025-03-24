
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { StrictMode } from 'react'

// Create a container element if it doesn't exist
const rootElement = document.getElementById("root");
if (!rootElement) throw new Error("Failed to find the root element");

// Use StrictMode for better development experience
const root = createRoot(rootElement);
root.render(
  <StrictMode>
    <App />
  </StrictMode>
);

// Log that the app has been rendered
console.log("App rendered successfully");
