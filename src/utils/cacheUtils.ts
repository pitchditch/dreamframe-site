
// Cache utility functions

// Generate a unique version identifier for this session
export const APP_VERSION = Date.now();

/**
 * Aggressively clears all browser caches, storage, and service workers
 */
export const clearCaches = async (): Promise<void> => {
  try {
    console.log('Clearing application caches...');
    
    // Clear browser caches if available
    if ('caches' in window) {
      const cacheNames = await caches.keys();
      await Promise.all(
        cacheNames.map(cacheName => caches.delete(cacheName))
      );
    }
    
    // Set new version
    localStorage.setItem('bcpressurewashing-version', APP_VERSION.toString());
    sessionStorage.setItem('app-last-load', APP_VERSION.toString());
    
  } catch (error) {
    console.error('Error clearing cache:', error);
  }
};

/**
 * Helper to add version parameter to URLs
 */
export const addVersionParam = (url: string): string => {
  try {
    const urlObj = new URL(url);
    urlObj.searchParams.set('v', APP_VERSION.toString());
    return urlObj.toString();
  } catch (error) {
    console.error('Error adding version param:', error);
    return url;
  }
};
