<!--

    Browser > Application > Service workers
    Browser > Application > Cache storage

    Steps:
    1. add a large size image image in public/index.html
    2. add a 'service-worker.js' file in public directory
    3. register our custom service worker in src/index.js
    4. unregister the default workbox SW through the package.json build script
    5. when developing locally, service workers won’t work in npm start
    6. npm run build
    7. npm install -g serve
    8. serve -s build

 -->
