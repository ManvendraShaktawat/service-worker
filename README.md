<!--

    Browser > Application > Service workers
    Browser > Application > Cache storage

    Steps:

        1. add a large size image URL in public/index.html
        2. add a 'service-worker.js' file in public directory
            - cache name, static asset URLs
            - register "install" and "fetch" events on 'self'
            - "install" event: pre-cache static assets (runs only once when SW is first registered)
            - "fetch" event: intercepting every network request, dynamic caching
        3. register our custom service worker in src/index.js
            - check if 'serviceWorker' is available in 'navigator' object
            - if yes, register the 'service-worker.js' file in window 'load' event
            - print console in 'then' block, add error handling as well
        4. unregister the default workbox SW through the package.json build script
            - "react-scripts build --no-service-worker"
        5. when developing locally, service workers won’t work in npm start (CRA serves files from memory)
        6. npm run build
        7. npm install -g serve
        8. serve -s build


    Service workers logic can be extended for:

        1. Push Notifications: You can use service workers to handle push notifications, which enable your app to notify users even when it isn't active.

        2. Background Sync: This allows your service worker to delay actions (like sending data to a server) until the user has a stable network connection.

        3. Error Handling in Caching/Fetch: Implement fallback strategies for fetch failures or cache miss situations, especially when working offline.

        4. Periodic Sync: This allows you to run periodic background tasks even if the app isn't open.


    Additional notes:

        skipWaiting() forces the new service worker to activate immediately, skipping the waiting phase.
        clients.claim() allows the service worker to take control of pages immediately after activation (instead of waiting for a page reload).

        self.addEventListener('install', (event) => {
            self.skipWaiting(); // Forces the waiting service worker to become active immediately
        });

        self.addEventListener('activate', (event) => {
            event.waitUntil(
                clients.claim() // Immediately takes control of any open pages
            );
        });

 -->
