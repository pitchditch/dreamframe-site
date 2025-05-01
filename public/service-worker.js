
// Service Worker with aggressive cache busting
const CACHE_NAME = 'bcpressurewashing-v2'; // Updated cache version
const VERSION = new Date().getTime();

// Force activate this service worker immediately
self.addEventListener('install', event => {
  // Skip the waiting phase
  self.skipWaiting();
  console.log('New service worker installed and skipping waiting');
  
  // Aggressively clear all caches during installation
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          console.log('Clearing cache:', cacheName);
          return caches.delete(cacheName);
        })
      );
    })
  );
});

// Clear old caches when activated
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.filter(cacheName => {
          return cacheName.startsWith('bcpressurewashing-') && cacheName !== CACHE_NAME;
        }).map(cacheName => {
          console.log('Deleting old cache:', cacheName);
          return caches.delete(cacheName);
        })
      ).then(() => {
        console.log('Service worker now controlling page');
        return self.clients.claim(); // Take control immediately
      });
    })
  );
});

// Network-first strategy - always try network first
self.addEventListener('fetch', event => {
  // Skip non-GET requests
  if (event.request.method !== 'GET') return;

  // Skip cross-origin requests
  if (!event.request.url.startsWith(self.location.origin)) return;
  
  event.respondWith(
    // Always try network first
    fetch(event.request.url + '?v=' + VERSION) // Add version to bust cache
      .then(response => {
        if (!response || response.status !== 200) {
          throw new Error('Network response was not ok');
        }
        
        // Clone the response to store in cache
        const responseToCache = response.clone();
        
        // Update the cache with the fresh version
        caches.open(CACHE_NAME).then(cache => {
          cache.put(event.request, responseToCache);
        });
        
        return response;
      })
      .catch(() => {
        // Only use cache as fallback
        return caches.match(event.request);
      })
  );
});

// Listen for message to clear cache and reload
self.addEventListener('message', event => {
  if (event.data && event.data.type === 'CLEAR_CACHE') {
    console.log('Clearing all caches by request');
    // Clear all caches
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => caches.delete(cacheName))
      );
    }).then(() => {
      // Notify client that cache is cleared
      self.clients.matchAll().then(clients => {
        clients.forEach(client => {
          client.postMessage({ type: 'CACHE_CLEARED' });
        });
      });
    });
  }
});
