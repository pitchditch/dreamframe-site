
import { APP_VERSION, clearCaches } from './cacheUtils';

/**
 * Create root element if it doesn't exist
 */
export const ensureRootElement = (): HTMLElement => {
  let rootElement = document.getElementById("root");
  if (!rootElement) {
    console.error("Failed to find the root element - creating one");
    const newRoot = document.createElement("div");
    newRoot.id = "root";
    document.body.appendChild(newRoot);
    rootElement = newRoot;
  }

  return rootElement;
};

/**
 * Add a visible version indicator in development mode
 */
export const addVersionIndicator = (): void => {
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
};

/**
 * Initialize the application with more robust error handling
 */
export const initializeApp = async (): Promise<HTMLElement> => {
  try {
    // Clear cache on load but don't await
    clearCaches().catch(err => console.error("Cache clearing error:", err));
    
    // Create container if it doesn't exist
    const container = ensureRootElement();
    
    // Set app version info globally
    (window as any).appVersion = APP_VERSION;
    
    return container;
  } catch (error) {
    console.error("Error in app initialization:", error);
    // Fallback to basic DOM element
    return ensureRootElement();
  }
};

/**
 * Set up check for stale content
 */
export const setupStaleContentCheck = (): void => {
  try {
    // Register event listener to detect if the page is loaded from cache
    window.addEventListener('load', () => {
      // Store current version
      window.sessionStorage.setItem('app-last-load', APP_VERSION.toString());
    });
  } catch (error) {
    console.error("Error setting up stale content check:", error);
  }
};
