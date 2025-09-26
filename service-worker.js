// Назва кешу
const CACHE_NAME = "videovortex-cache-v1";

// Файли для кешування
const urlsToCache = [
  "/",
  "/index.html",
  "/script.js",
  "/VideoVortex_logo_192x192.png",
  "/VideoVortex_logo_512x512.png"
];

// INSTALL - кешуємо основні файли
self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(urlsToCache))
  );
  self.skipWaiting();
});

// ACTIVATE - очищаємо старі кеші
self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.map(key => {
          if (key !== CACHE_NAME) return caches.delete(key);
        })
      )
    )
  );
  self.clients.claim();
});

// FETCH - стратегія кеш-перший
self.addEventListener("fetch", event => {
  // Не кешуємо відео
  if (event.request.url.endsWith(".mp4")) return;

  event.respondWith(
    caches.match(event.request).then(response => {
      if (response) return response;
      return fetch(event.request).then(fetchResponse => {
        return caches.open(CACHE_NAME).then(cache => {
          cache.put(event.request, fetchResponse.clone());
          return fetchResponse;
        });
      });
    }).catch(() => {
      // Можеш додати fallback-сторінку або картинку
      return caches.match("/index.html");
    })
  );
});

// 🔔 Firebase Messaging
importScripts('https://www.gstatic.com/firebasejs/9.23.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.23.0/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey: "AIzaSyBkPYP3bnDy61NFjRSboRZrfTVNTdIMWbY",
  authDomain: "videovortex-235cd.firebaseapp.com",
  projectId: "videovortex-235cd",
  storageBucket: "videovortex-235cd.appspot.com",
  messagingSenderId: "681594250269",
  appId: "1:681594250269:web:1176b21fcc8fe2a7d052f4"
});

const messaging = firebase.messaging();

// Обробка push-повідомлень у background
messaging.onBackgroundMessage(payload => {
  console.log('[Service Worker] Отримано push-повідомлення:', payload);
  const notificationTitle = payload.notification.title || 'VideoVortex';
  const notificationOptions = {
    body: payload.notification.body || '',
    icon: '/VideoVortex_logo_192x192.png'
  };
  self.registration.showNotification(notificationTitle, notificationOptions);
});
