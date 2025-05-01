
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { StrictMode } from 'react'
import { register, unregister } from './serviceWorker'
import { HelmetProvider } from 'react-helmet-async'

// Ensure the service worker is properly unregistered before loading new content
const clearServiceWorkerCache = async () => {
  try {
    // First, aggressively unregister any existing service workers
    await unregister();
    
    // Clear browser cache for this site
    if ('caches' in window) {
      const cacheNames = await caches.keys();
      await Promise.all(
        cacheNames.map(cacheName => caches.delete(cacheName))
      );
      console.log('All caches cleared successfully');
    }
    
    // Clear localStorage and sessionStorage
    localStorage.clear();
    sessionStorage.clear();
  } catch (error) {
    console.error('Error clearing cache:', error);
  }
};

// Initialize the application
const initializeApp = async () => {
  // Clear cache and service workers first
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
  const appVersion = Date.now();
  (window as any).appVersion = appVersion;
  
  // Store the latest version in localStorage
  localStorage.setItem('bcpressurewashing-version', appVersion.toString());

  // Track page view in Google Analytics
  if (typeof window.gtag === 'function') {
    window.gtag('event', 'page_view', {
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
        <HelmetProvider>
          <App key={appVersion.toString()} />
        </HelmetProvider>
      </StrictMode>
    );
    console.log("App rendered successfully");
    console.log("App version:", appVersion);
    
    // Add a visible indicator of the current version
    if (process.env.NODE_ENV === 'development') {
      const versionIndicator = document.createElement('div');
      versionIndicator.style.position = 'fixed';
      versionIndicator.style.bottom = '5px';
      versionIndicator.style.right = '5px';
      versionIndicator.style.backgroundColor = 'rgba(0,0,0,0.3)';
      versionIndicator.style.color = 'white';
      versionIndicator.style.padding = '3px 6px';
      versionIndicator.style.borderRadius = '4px';
      versionIndicator.style.fontSize = '10px';
      versionIndicator.innerText = `v${appVersion}`;
      document.body.appendChild(versionIndicator);
    }
  } catch (error) {
    console.error("Error rendering the app:", error);
    // Display a visible error in the UI
    if (container) {
      container.innerHTML = `
        <div style="color: red; padding: 20px;">
          <h2>Error rendering the application</h2>
          <p>${error instanceof Error ? error.message : 'Unknown error'}</p>
          <button onclick="window.location.reload(true)">Force Reload</button>
        </div>
      `;
    }
  }

  // Register the service worker with improved configuration
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
          console.log('New service worker activated, reloading page with cache bust');
          window.location.href = window.location.href + '?v=' + Date.now();
        });
      }
    }
  });
};

// Add global error handlers
window.addEventListener('error', (event) => {
  console.error('Global error caught:', event.message);
  
  // For serious errors, try to recover by reloading
  if (event.message && (
    event.message.includes('SSL') || 
    event.message.includes('protocol') || 
    event.message.includes('network') ||
    event.message.includes('revert') ||
    event.message.includes('version')
  )) {
    console.error('Critical error detected, attempting recovery');
    
    // Add a recovery UI
    const container = document.getElementById("root");
    if (container) {
      container.innerHTML += `
        <div style="position: fixed; top: 0; left: 0; right: 0; background: #f44336; color: white; padding: 8px; text-align: center; z-index: 9999;">
          Error detected. <button onclick="window.location.reload(true)" style="background: white; color: #f44336; border: none; padding: 4px 8px; margin-left: 8px; cursor: pointer; border-radius: 4px;">Force Refresh</button>
        </div>
      `;
    }
  }
});

// Handle offline/online events
window.addEventListener('online', () => {
  console.log('App is online, reloading for fresh content');
  window.location.reload();
});

// Initialize the application
initializeApp();
