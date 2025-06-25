
/**
 * Unregister service workers and clear related caches
 */
export const cleanupServiceWorkers = async (): Promise<void> => {
  try {
    // Unregister service workers
    if ('serviceWorker' in navigator) {
      const registrations = await navigator.serviceWorker.getRegistrations();
      for (const registration of registrations) {
        await registration.unregister();
        console.log('Service worker unregistered successfully');
      }
    }

    // Clear all caches
    if ('caches' in window) {
      const cacheNames = await caches.keys();
      await Promise.all(
        cacheNames.map(cacheName => caches.delete(cacheName))
      );
      console.log('All caches cleared');
    }
  } catch (error) {
    console.error('Error cleaning up service workers:', error);
  }
};

/**
 * Initialize and register the service worker - DISABLED
 */
export const initServiceWorker = (): void => {
  // Service worker registration is disabled to prevent loading issues
  console.log('Service worker initialization skipped');
};
