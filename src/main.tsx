
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.tsx'
import './index.css'
import { StrictMode } from 'react'
import { HelmetProvider } from 'react-helmet-async'

// Simple root element check
const rootElement = document.getElementById('root');
if (!rootElement) {
  console.error('Root element not found in the DOM');
}

// Create root and render app
try {
  const root = createRoot(rootElement || document.createElement('div'));
  root.render(
    <StrictMode>
      <HelmetProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </HelmetProvider>
    </StrictMode>
  );
  console.log("App successfully rendered");
} catch (error) {
  console.error("Failed to render app:", error);
}
