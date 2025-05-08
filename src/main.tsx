
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.tsx'
import './index.css'
import { StrictMode } from 'react'
import { unregister } from './serviceWorker'
import { HelmetProvider } from 'react-helmet-async'

// Generate a unique version identifier for this session
const APP_VERSION = Date.now();

// Extremely aggressive cache clearing function
const clearCaches = async () => {
  console.log('Aggressively clearing all caches...');

  try {
    // First, unregister all service workers
    await unregister();
    
    // Remove service worker registration
    if ('serviceWorker' in navigator) {
      const registrations = await navigator.serviceWorker.getRegistrations();
      for (const registration of registrations) {
        await registration.unregister();
        console.log('Service worker unregistered');
      }
    }
    
    // Clear browser caches
    if ('caches' in window) {
      const cacheNames = await caches.keys();
      await Promise.all(
        cacheNames.map(cacheName => {
          console.log('Deleting cache:', cacheName);
          return caches.delete(cacheName);
        })
      );
      console.log('All caches cleared successfully');
    }
    
    // Clear localStorage and sessionStorage
    localStorage.clear();
    sessionStorage.clear();
    
    // Set new version
    localStorage.setItem('bcpressurewashing-version', APP_VERSION.toString());
    window.sessionStorage.setItem('app-last-load', APP_VERSION.toString());
    
    // Add cache-busting parameters to all resource requests
    const linkElements = document.querySelectorAll('link');
    const scriptElements = document.querySelectorAll('script');
    
    linkElements.forEach(el => {
      if (el.href && el.href.startsWith(window.location.origin)) {
        el.href = addVersionParam(el.href);
      }
    });
    
    scriptElements.forEach(el => {
      if (el.src && el.src.startsWith(window.location.origin)) {
        el.src = addVersionParam(el.src);
      }
    });
  } catch (error) {
    console.error('Error clearing cache:', error);
  }
};

// Helper to add version parameter to URLs
const addVersionParam = (url) => {
  const urlObj = new URL(url);
  urlObj.searchParams.set('v', APP_VERSION.toString());
  return urlObj.toString();
};

// Initialize the application
const initializeApp = async () => {
  // Always clear cache on load
  await clearCaches();
  
  // Create container if it doesn't exist
  const rootElement = document.getElementById("root");
  if (!rootElement) {
    console.error("Failed to find the root element - creating one");
    const newRoot = document.createElement("div");
    newRoot.id = "root";
    document.body.appendChild(newRoot);
  }

  const container = document.getElementById("root");
  
  // Set app version info globally
  (window as any).appVersion = APP_VERSION;
  
  // Use StrictMode for better development experience
  try {
    const root = createRoot(container!);
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
      versionIndicator.innerText = `v${APP_VERSION}`;
      document.body.appendChild(versionIndicator);
    }
    
    // Register event listener to detect if the page is loaded from cache
    window.addEventListener('load', () => {
      // Force reload if showing stale content
      const lastLoad = window.sessionStorage.getItem('app-last-load');
      if (lastLoad && lastLoad !== APP_VERSION.toString()) {
        console.log('Detected stale content, forcing reload...');
        window.location.reload();
      }
    });
  } catch (error) {
    console.error("Error rendering the app:", error);
    // Display a visible error in the UI
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
  
  // Install an up-to-date service worker
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('/service-worker.js?v=' + APP_VERSION).then(registration => {
        console.log('Service worker registered:', registration);
        
        // Force update check
        registration.update();
        
        // Force the waiting service worker to become active
        if (registration.waiting) {
          registration.waiting.postMessage({ type: 'SKIP_WAITING' });
        }
      }).catch(error => {
        console.error('Service worker registration failed:', error);
      });
    });
  }
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
    console.error('Critical error detected, attempting recovery by reloading');
    window.location.reload();
  }
});

// Force reload when coming back online
window.addEventListener('online', () => {
  console.log('App is online, reloading for fresh content');
  window.location.reload();
});

// Initialize the application
initializeApp();
