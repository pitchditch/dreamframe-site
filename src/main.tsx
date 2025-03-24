
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { StrictMode } from 'react'
import { register, unregister } from './serviceWorker'

// First, unregister any existing service workers to force fresh content
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

// Use StrictMode for better development experience
try {
  const root = createRoot(container!);
  root.render(
    <StrictMode>
      <App key={Date.now().toString()} />
    </StrictMode>
  );
  console.log("App rendered successfully");
  
  // Log the app version for debugging - fix TypeScript error by checking if property exists
  console.log("App version:", (window as any).appVersion || Date.now());
} catch (error) {
  console.error("Error rendering the app:", error);
  // Display a visible error in the UI
  if (container) {
    container.innerHTML = `
      <div style="color: red; padding: 20px;">
        <h2>Error rendering the application</h2>
        <p>${error instanceof Error ? error.message : 'Unknown error'}</p>
        <button onclick="window.location.reload(true)">Reload page</button>
      </div>
    `;
  }
}

// Register the service worker for better caching, but set skipWaiting to true
register({
  onSuccess: () => console.log('Service worker registered successfully'),
  onUpdate: (registration) => {
    console.log('New content is available; please refresh');
    // Force the waiting service worker to become active
    if (registration && registration.waiting) {
      registration.waiting.postMessage({ type: 'SKIP_WAITING' });
    }
  }
});
