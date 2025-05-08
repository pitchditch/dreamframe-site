
import { APP_VERSION, clearCaches } from './cacheUtils';

/**
 * Create root element if it doesn't exist
 */
export const ensureRootElement = (): HTMLElement => {
  const rootElement = document.getElementById("root");
  if (!rootElement) {
    console.error("Failed to find the root element - creating one");
    const newRoot = document.createElement("div");
    newRoot.id = "root";
    document.body.appendChild(newRoot);
  }

  return document.getElementById("root")!;
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
 * Initialize the application
 */
export const initializeApp = async (): Promise<HTMLElement> => {
  // Always clear cache on load
  await clearCaches();
  
  // Create container if it doesn't exist
  const container = ensureRootElement();
  
  // Set app version info globally
  (window as any).appVersion = APP_VERSION;
  
  return container;
};

/**
 * Set up check for stale content
 */
export const setupStaleContentCheck = (): void => {
  // Register event listener to detect if the page is loaded from cache
  window.addEventListener('load', () => {
    // Force reload if showing stale content
    const lastLoad = window.sessionStorage.getItem('app-last-load');
    if (lastLoad && lastLoad !== APP_VERSION.toString()) {
      console.log('Detected stale content, forcing reload...');
      window.location.reload();
    }
  });
};
