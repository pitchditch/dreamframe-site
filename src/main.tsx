
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.tsx'
import './index.css'
import { StrictMode } from 'react'
import { HelmetProvider } from 'react-helmet-async'

// Import utility functions
import { APP_VERSION } from './utils/cacheUtils'
import { initServiceWorker } from './utils/serviceWorkerUtils'
import { setupErrorHandlers } from './utils/errorUtils'
import { 
  initializeApp, 
  addVersionIndicator, 
  setupStaleContentCheck 
} from './utils/appInitUtils'

// Set up global error handlers
setupErrorHandlers();

// Initialize the application
const main = async () => {
  try {
    // Initialize the app and get container element
    const container = await initializeApp();
    
    // Use StrictMode for better development experience
    const root = createRoot(container);
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
    
    // Add a visible indicator of the current version
    addVersionIndicator();
    
    // Setup check for stale content
    setupStaleContentCheck();
    
    // Initialize service worker
    initServiceWorker();
  } catch (error) {
    console.error("Error rendering the app:", error);
    // Display a visible error in the UI
    const container = document.getElementById("root");
    if (container) {
      container.innerHTML = `
        <div style="color: red; padding: 20px;">
          <h2>Error rendering the application</h2>
          <p>${error instanceof Error ? error.message : 'Unknown error'}</p>
          <button onclick="window.location.reload()">Force Reload</button>
        </div>
      `;
    }
  }
};

// Start the application
main();
