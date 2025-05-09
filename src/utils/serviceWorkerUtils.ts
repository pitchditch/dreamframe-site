
import { APP_VERSION } from './cacheUtils';

/**
 * Initialize and register the service worker
 */
export const initServiceWorker = (): void => {
  // We're disabling service worker registration for now to prevent loading issues
  console.log('Service worker initialization skipped');
};

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
  } catch (error) {
    console.error('Error cleaning up service workers:', error);
  }
};
