
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.tsx'
import './index.css'
import { StrictMode } from 'react'
import { HelmetProvider } from 'react-helmet-async'

// Import utility functions but simplify their usage
import { APP_VERSION } from './utils/cacheUtils'
import { initServiceWorker } from './utils/serviceWorkerUtils'
import { setupErrorHandlers } from './utils/errorUtils'

// Set up global error handlers
setupErrorHandlers();

// Get the root element or create one if it doesn't exist
const rootElement = document.getElementById('root');
if (!rootElement) {
  console.error("Root element not found, creating one");
  const newRoot = document.createElement('div');
  newRoot.id = 'root';
  document.body.appendChild(newRoot);
}

// Initialize the application with simplified approach
const root = createRoot(rootElement);
root.render(
  <StrictMode>
    <HelmetProvider>
      <BrowserRouter>
        <App key={APP_VERSION.toString()} />
      </BrowserRouter>
    </HelmetProvider>
  </StrictMode>
);

console.log("App rendered successfully");
console.log("App version:", APP_VERSION);

// Initialize service worker after render
initServiceWorker();
