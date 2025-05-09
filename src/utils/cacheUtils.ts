
// Cache utility functions

// Generate a unique version identifier for this session
export const APP_VERSION = Date.now();

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

/**
 * Clear all application caches
 */
export const clearCaches = async (): Promise<void> => {
  try {
    if ('caches' in window) {
      const cacheNames = await caches.keys();
      await Promise.all(
        cacheNames.map(cacheName => caches.delete(cacheName))
      );
      console.log('All caches cleared');
    }
  } catch (error) {
    console.error('Error clearing caches:', error);
  }
};
