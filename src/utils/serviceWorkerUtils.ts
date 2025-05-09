
import { unregister } from '../serviceWorker';
import { APP_VERSION } from './cacheUtils';

/**
 * Initialize and register the service worker
 */
export const initServiceWorker = (): void => {
  try {
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        const swUrl = `/service-worker.js?v=${APP_VERSION}`;
        
        navigator.serviceWorker.register(swUrl).then(registration => {
          console.log('Service worker registered successfully');
        }).catch(error => {
          console.error('Service worker registration failed:', error);
        });
      });
    }
  } catch (error) {
    console.error('Error initializing service worker:', error);
  }
};

/**
 * Unregister service workers and clear related caches
 */
export const cleanupServiceWorkers = async (): Promise<void> => {
  try {
    // Unregister service workers
    await unregister();
    
    // Additional cleanup if needed
    if ('serviceWorker' in navigator) {
      const registrations = await navigator.serviceWorker.getRegistrations();
      for (const registration of registrations) {
        await registration.unregister();
      }
    }
  } catch (error) {
    console.error('Error cleaning up service workers:', error);
  }
};
