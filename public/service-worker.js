/* eslint-disable no-restricted-globals */

const CACHE_NAME = "cache-v1";

const staticAssetsToCache = [
  "/index.html",
  "/static/css/main.0f70f3a3.css",
  "/static/js/main.482f623a.js",
];

// Install event - Pre-cache the static assets (only runs once)
self.addEventListener("install", (event) => {
  console.log("Install Event");
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

// Fetch event - Dynamic caching for image assets
self.addEventListener("fetch", (event) => {
  const requestUrl = new URL(event.request.url);
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
