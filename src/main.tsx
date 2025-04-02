
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { StrictMode } from 'react'
import { register, unregister } from './serviceWorker'
import { BrowserRouter } from 'react-router-dom'

// Ensure the service worker is properly unregistered before loading new content
const clearServiceWorkerCache = async () => {
  try {
    // First, aggressively unregister any existing service workers
    await unregister();
    
    // Clear caches to ensure fresh content
    if ('caches' in window) {
      const cacheNames = await caches.keys();
      await Promise.all(
        cacheNames.map(cacheName => caches.delete(cacheName))
      );
      console.log('All caches cleared successfully');
    }
  } catch (error) {
    console.error('Error clearing cache:', error);
  }
};

// Initialize the application
const initializeApp = async () => {
  await clearServiceWorkerCache();
  
  // Create a container element if it doesn't exist
  const rootElement = document.getElementById("root");
  if (!rootElement) {
    console.error("Failed to find the root element - creating one");
    const newRoot = document.createElement("div");
    newRoot.id = "root";
    document.body.appendChild(newRoot);
  }

  // Get the root element (original or newly created)
  const container = document.getElementById("root");

  // Set a timestamp for version tracking
  (window as any).appVersion = Date.now();

  // Track page view in Google Analytics
  if (typeof gtag === 'function') {
    gtag('event', 'page_view', {
      page_title: document.title,
      page_location: window.location.href,
      page_path: window.location.pathname
    });
  }

  // Use StrictMode for better development experience
  try {
    const root = createRoot(container!);
    root.render(
      <StrictMode>
        <BrowserRouter>
          <App key={(window as any).appVersion.toString()} />
        </BrowserRouter>
      </StrictMode>
    );
    console.log("App rendered successfully");
    
    // Log the app version for debugging
    console.log("App version:", (window as any).appVersion);
  } catch (error) {
    console.error("Error rendering the app:", error);
    // Display a visible error in the UI
    if (container) {
      container.innerHTML = `
        <div style="color: red; padding: 20px;">
          <h2>Error rendering the application</h2>
          <p>${error instanceof Error ? error.message : 'Unknown error'}</p>
          <button onclick="window.location.reload()">Reload page</button>
        </div>
      `;
    }
  }

  // Register the service worker for better caching with improved error handling
  register({
    onSuccess: () => {
      console.log('Service worker registered successfully');
    },
    onUpdate: (registration) => {
      console.log('New content is available; preparing to update');
      // Force the waiting service worker to become active
      if (registration && registration.waiting) {
        registration.waiting.postMessage({ type: 'SKIP_WAITING' });
        
        // Reload once the new service worker is activated
        navigator.serviceWorker.addEventListener('controllerchange', () => {
          console.log('New service worker activated, reloading page');
          window.location.reload();
        });
      }
    }
  });
};

// Add global error handlers
window.addEventListener('error', (event) => {
  if (event.message && (
    event.message.includes('SSL') || 
    event.message.includes('protocol') || 
    event.message.includes('network')
  )) {
    console.error('Network or SSL error detected:', event.message);
    
    // For SSL errors, inform the user and provide a refresh option
    const container = document.getElementById("root");
    if (container) {
      container.innerHTML += `
        <div style="position: fixed; top: 0; left: 0; right: 0; background: #f44336; color: white; padding: 8px; text-align: center; z-index: 9999;">
          Connection issue detected. <button onclick="window.location.reload()" style="background: white; color: #f44336; border: none; padding: 4px 8px; margin-left: 8px; cursor: pointer; border-radius: 4px;">Refresh</button>
        </div>
      `;
    }
  }
});

// Initialize the application
initializeApp();
