import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.tsx';
import './index.css';
import { StrictMode } from 'react';
import { HelmetProvider } from 'react-helmet-async';

// Ensure the root element exists in index.html
const rootElement = document.getElementById('root');

if (!rootElement) {
  throw new Error('Root element not found. Ensure <div id="root"></div> exists in index.html.');
}

// Create root and render app
try {
  const root = createRoot(rootElement);
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
