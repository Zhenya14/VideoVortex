const CACHE_NAME = "videovortex-cache-v1";
const urlsToCache = [
  "/",
  "/index.html",
  "/script.js",
  "/VideoVortex_logo_192x192.png",
  "/VideoVortex_logo_512x512.png"
];

self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener("fetch", event => {
  if (event.request.url.endsWith(".mp4")) return; // Не кешуємо відео

  event.respondWith(
    caches.match(event.request).then(response => response || fetch(event.request))
  );
});
