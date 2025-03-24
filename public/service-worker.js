
// Service Worker with aggressive cache busting
const CACHE_NAME = 'bcpressurewashing-v1';
const VERSION = new Date().getTime();

// Force activate this service worker immediately
self.addEventListener('install', event => {
  self.skipWaiting();
  console.log('Service worker installed and skipping waiting');
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
      );
    }).then(() => {
      console.log('Service worker now controlling page');
      return self.clients.claim();
    })
  );
});

// Network-first strategy with fallback to cache
self.addEventListener('fetch', event => {
  // Skip non-GET requests
  if (event.request.method !== 'GET') return;

  // Skip cross-origin requests
  if (!event.request.url.startsWith(self.location.origin)) return;

  event.respondWith(
    fetch(event.request).then(response => {
      // Cache successful responses
      if (response.status === 200) {
        const responseClone = response.clone();
        caches.open(CACHE_NAME).then(cache => {
          cache.put(event.request, responseClone);
        });
      }
      return response;
    }).catch(() => {
      // Fallback to cache if network fails
      return caches.match(event.request);
    })
  );
});

// Listen for message to clear cache and reload
self.addEventListener('message', event => {
  if (event.data && event.data.type === 'CLEAR_CACHE') {
    console.log('Clearing cache and reloading page');
    // Clear all caches
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => caches.delete(cacheName))
      );
    });
  }
});
