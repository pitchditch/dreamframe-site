
import { unregister } from '../serviceWorker';
import { APP_VERSION, addVersionParam } from './cacheUtils';

/**
 * Initialize and register the service worker
 */
export const initServiceWorker = (): void => {
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      const swUrl = `/service-worker.js?v=${APP_VERSION}`;
      
      navigator.serviceWorker.register(swUrl).then(registration => {
        console.log('Service worker registered:', registration);
        
        // Force update check
        registration.update();
        
        // Force the waiting service worker to become active
        if (registration.waiting) {
          registration.waiting.postMessage({ type: 'SKIP_WAITING' });
        }
      }).catch(error => {
        console.error('Service worker registration failed:', error);
      });
    });
  }
};

/**
 * Unregister service workers and clear related caches
 */
export const cleanupServiceWorkers = async (): Promise<void> => {
  // Unregister service workers
  await unregister();
  
  // Additional cleanup if needed
  if ('serviceWorker' in navigator) {
    const registrations = await navigator.serviceWorker.getRegistrations();
    for (const registration of registrations) {
      await registration.unregister();
    }
  }
};
