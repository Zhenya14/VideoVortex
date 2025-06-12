const CACHE_NAME = "vortex-cache-v1";
const urlsToCache = [
  "/",
  "/index.html",
  "/script.js",
  "/offline.html",
  "/VideoVortex_logo.ico"
];

// Встановлення service worker
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});

// Перехоплення запитів
self.addEventListener("fetch", (event) => {
  event.respondWith(
    fetch(event.request).catch(() => caches.match(event.request).then(
      response => response || caches.match("offline.html")
    ))
  );
});
