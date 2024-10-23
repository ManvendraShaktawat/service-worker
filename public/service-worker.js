/* eslint-disable no-restricted-globals */

const CACHE_NAME = "v1";

const staticAssetsToCache = [
  "/index.html",
  "/static/css/main.0f70f3a3.css",
  "/static/js/main.482f623a.js",
];

// Install event for static assets
// only runs once when SW is not already registered, and we start the server and load the page
self.addEventListener("install", (event) => {
  console.log("Install Event");
  // event.waitUntil ensures that the service worker won't be considered installed until the cache is set up
  event.waitUntil(
    caches
      .open(CACHE_NAME)
      .then((cache) => {
        console.log("Cache opened during install");
        return cache.addAll(staticAssetsToCache);
      })
      .then(() => {
        console.log("Pre-cached basic assets");
      })
      .catch((err) => console.error("Cache open failed during install:", err))
  );
});

self.addEventListener("activate", (event) => {
  console.log("Activate Event");
  // This event is fired after the service worker is installed
  // It’s a good place to clean up old caches if needed.

  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (![CACHE_NAME].includes(cacheName)) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// Fetch event - Dynamic caching for image assets
// Cache-first caching strategy
self.addEventListener("fetch", (event) => {
  const requestUrl = new URL(event.request.url);
  // we can also use regex below like "pathname.match(/\.jpeg$/)"
  if (requestUrl.pathname.endsWith(".jpeg")) {
    console.log("Handling JPEG request:", requestUrl.pathname);

    event.respondWith(
      caches.match(event.request).then((response) => {
        if (response) {
          console.log("Serving JPEG from cache:", requestUrl.pathname);
          return response;
        }

        return fetch(event.request).then((networkResponse) => {
          return caches.open(CACHE_NAME).then((cache) => {
            console.log("Caching new JPEG:", requestUrl.pathname);
            cache.put(event.request, networkResponse.clone());
            return networkResponse;
          });
        });
      })
    );
  }

  // For other requests, serve from the network or cache
  else {
    event.respondWith(
      caches.match(event.request).then((response) => {
        return response || fetch(event.request);
      })
    );
  }
});
