const CACHE_NAME = "videovortex-cache-v1";
const urlsToCache = [
    "./",
    "./index.html",
    "./manifest.json",
    "./VideoVortex_logo.ico", // Якщо є окремий CSS файл
    "https://www.gstatic.com/firebasejs/8.10.0/firebase-app.js",
    "https://www.gstatic.com/firebasejs/8.10.0/firebase-auth.js",
    "https://www.gstatic.com/firebasejs/8.10.0/firebase-database.js",
    "https://www.gstatic.com/firebasejs/8.10.0/firebase-storage.js",
    "https://fonts.googleapis.com/icon?family=Material+Icons"
];

self.addEventListener("install", (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            return cache.addAll(urlsToCache);
        })
    );
});

self.addEventListener("fetch", (event) => {
    event.respondWith(
        caches.match(event.request).then((response) => {
            return response || fetch(event.request);
        })
    );
});

self.addEventListener("activate", (event) => {
    const cacheWhitelist = [CACHE_NAME];
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    if (!cacheWhitelist.includes(cacheName)) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});
