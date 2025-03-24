
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { StrictMode } from 'react'
import { register, unregister } from './serviceWorker'

// First, aggressively unregister any existing service workers to force fresh content
unregister();

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

// Use StrictMode for better development experience
try {
  const root = createRoot(container!);
  root.render(
    <StrictMode>
      <App key={(window as any).appVersion.toString()} />
    </StrictMode>
  );
  console.log("App rendered successfully");
  
  // Log the app version for debugging - fix TypeScript error by using 'as any' type casting
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
    // Force refresh on successful registration
    if (navigator.serviceWorker && navigator.serviceWorker.controller) {
      navigator.serviceWorker.controller.postMessage({ type: 'CLEAR_CACHE' });
    }
  },
  onUpdate: (registration) => {
    console.log('New content is available; forcing refresh');
    // Force the waiting service worker to become active
    if (registration && registration.waiting) {
      registration.waiting.postMessage({ type: 'SKIP_WAITING' });
    }
  },
  onError: (error) => {
    console.error('Service worker registration failed:', error);
    // Continue without service worker if there's an SSL or other error
  }
});

// Add a global error handler for network and SSL issues
window.addEventListener('error', (event) => {
  if (event.message && (
    event.message.includes('SSL') || 
    event.message.includes('protocol') || 
    event.message.includes('network')
  )) {
    console.error('Network or SSL error detected:', event.message);
    // You could implement a retry mechanism or notification here
  }
});
