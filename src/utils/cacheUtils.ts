
// Cache utility functions

// Generate a unique version identifier for this session
export const APP_VERSION = Date.now();

/**
 * Aggressively clears all browser caches, storage, and service workers
 */
export const clearCaches = async (): Promise<void> => {
  console.log('Aggressively clearing all caches...');

  try {
    // First, unregister all service workers
    if ('serviceWorker' in navigator) {
      await unregisterServiceWorkers();
    }
    
    // Clear browser caches
    await clearBrowserCaches();
    
    // Clear localStorage and sessionStorage
    localStorage.clear();
    sessionStorage.clear();
    
    // Set new version
    localStorage.setItem('bcpressurewashing-version', APP_VERSION.toString());
    window.sessionStorage.setItem('app-last-load', APP_VERSION.toString());
    
    // Add cache-busting parameters to all resource requests
    addVersionToResources();
  } catch (error) {
    console.error('Error clearing cache:', error);
  }
};

/**
 * Unregisters all service workers
 */
const unregisterServiceWorkers = async (): Promise<void> => {
  if ('serviceWorker' in navigator) {
    const registrations = await navigator.serviceWorker.getRegistrations();
    for (const registration of registrations) {
      await registration.unregister();
      console.log('Service worker unregistered');
    }
  }
};

/**
 * Clears all browser caches
 */
const clearBrowserCaches = async (): Promise<void> => {
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
};

/**
 * Adds version parameters to all resource requests
 */
const addVersionToResources = (): void => {
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
};

/**
 * Helper to add version parameter to URLs
 */
export const addVersionParam = (url: string): string => {
  const urlObj = new URL(url);
  urlObj.searchParams.set('v', APP_VERSION.toString());
  return urlObj.toString();
};
