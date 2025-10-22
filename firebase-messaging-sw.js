// firebase-messaging-sw.js
importScripts("https://www.gstatic.com/firebasejs/10.12.2/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/10.12.2/firebase-messaging-compat.js");

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

messaging.onBackgroundMessage((payload) => {
  console.log("📩 Отримано фонове повідомлення:", payload);
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: payload.notification.icon || "/VideoVortex_logo.ico",
  };
  self.registration.showNotification(notificationTitle, notificationOptions);
});