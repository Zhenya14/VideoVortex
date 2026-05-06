importScripts('https://www.gstatic.com/firebasejs/8.10.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.10.0/firebase-messaging.js');

// --- Firebase config ---
firebase.initializeApp({
  apiKey: "AIzaSyBkPYP3bnDy61NFjRSboRZrfTVNTdIMWbY",
  authDomain: "videovortex-235cd.firebaseapp.com",
  databaseURL: "https://videovortex-235cd-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "videovortex-235cd",
  storageBucket: "videovortex-235cd.appspot.com",
  messagingSenderId: "681594250269",
  appId: "1:681594250269:web:1176b21fcc8fe2a7d052f4"
});

const messaging = firebase.messaging();

// 1. ЗМІНЮЙТЕ ЦЮ ВЕРСІЮ ТА НАЗВИ ФАЙЛІВ ПРИ ОНОВЛЕННІ ЛОГОТИПА
const CACHE_NAME = "videovortex-cache-v4"; // Збільшили версію
const LOGO_NAME = "VideoVortex_logo_192x192_v2.png"; // Додали версію до назви файлу!

const ASSETS_TO_CACHE = [
  "./",
  "index.html",
  "manifest.json",
  LOGO_NAME, // Використовуємо нове ім'я
  "VideoVortex_logo_512x512.png"
];

// Решта коду Firebase...
messaging.setBackgroundMessageHandler(function(payload) {
  const notificationOptions = {
    body: payload.notification?.body || '',
    icon: LOGO_NAME // Тут також нове ім'я
  };
  return self.registration.showNotification(payload.notification?.title || 'VideoVortex', notificationOptions);
});

self.addEventListener("install", event => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
});

self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames
          .filter(name => name !== CACHE_NAME)
          .map(name => caches.delete(name))
      );
    })
  );
  self.clients.claim();
});

// Стратегія: спочатку мережа, потім кеш (Network First) 
// Це краще для manifest.json, щоб браузер швидше бачив зміни іконок
self.addEventListener("fetch", event => {
  if (event.request.destination === "video") return;

  event.respondWith(
    fetch(event.request)
      .then(response => {
        // Якщо все добре, оновлюємо кеш і віддаємо відповідь
        const resClone = response.clone();
        caches.open(CACHE_NAME).then(cache => cache.put(event.request, resClone));
        return response;
      })
      .catch(() => caches.match(event.request)) // Якщо немає мережі — беремо з кешу
  );
});
