
// Service Worker with extreme cache busting
const CACHE_NAME = 'bcpressurewashing-v3'; // Increment cache version
const VERSION = new Date().getTime();

// Skip the waiting phase immediately on installation
self.addEventListener('install', event => {
  // Skip the waiting phase immediately
  self.skipWaiting();
  console.log('New service worker installed and skipping waiting');
  
  // Aggressively clear ALL caches during installation
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

// Claim clients and clear old caches when activated
self.addEventListener('activate', event => {
  console.log('Service worker activating...');
  
  // Take control of all clients immediately
  event.waitUntil(
    Promise.all([
      // Clear all caches
      caches.keys().then(cacheNames => {
        return Promise.all(
          cacheNames.map(cacheName => {
            console.log('Deleting cache:', cacheName);
            return caches.delete(cacheName);
          })
        );
      }),
      
      // Claim all clients immediately
      self.clients.claim().then(() => {
        console.log('Service worker has claimed all clients');
        
        // Refresh all open pages to ensure they have the latest content
        self.clients.matchAll({type: 'window'}).then(clients => {
          clients.forEach(client => {
            client.navigate(client.url);
          });
        });
      })
    ])
  );
});

// Network-first strategy with version parameter to bust cache
self.addEventListener('fetch', event => {
  // Skip non-GET requests
  if (event.request.method !== 'GET') return;

  // Skip cross-origin requests
  const url = new URL(event.request.url);
  if (url.origin !== self.location.origin) return;
  
  // Add cache-busting parameter to all requests
  const bustUrl = new URL(event.request.url);
  bustUrl.searchParams.set('v', VERSION);
  
  event.respondWith(
    // Always try network first with cache-busting parameter
    fetch(bustUrl, {
      headers: {
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0'
      },
      cache: 'no-store'
    })
    .then(response => {
      if (!response || response.status !== 200) {
        throw new Error('Network response was not ok');
      }
      return response;
    })
    .catch(() => {
      // Only use cache as fallback, but try to avoid this
      console.log('Network fetch failed, trying cache for:', event.request.url);
      return caches.match(event.request);
    })
  );
});

// Listen for message to clear cache and force reload
self.addEventListener('message', event => {
  if (event.data && event.data.type === 'CLEAR_CACHE') {
    console.log('Clearing all caches by request');
    // Clear all caches
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => caches.delete(cacheName))
      );
    }).then(() => {
      // Notify client that cache is cleared and force reload
      self.clients.matchAll().then(clients => {
        clients.forEach(client => {
          client.postMessage({ type: 'CACHE_CLEARED' });
          client.navigate(client.url);
        });
      });
    });
  }
});
