
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { StrictMode } from 'react'
import { register } from './serviceWorker'

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
      <App />
    </StrictMode>
  );
  console.log("App rendered successfully");
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

// Register the service worker for better caching
register({
  onSuccess: () => console.log('Service worker registered successfully'),
  onUpdate: () => console.log('New content is available; please refresh')
});
