// firebase-messaging-sw.js
importScripts("https://www.gstatic.com/firebasejs/10.12.2/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/10.12.2/firebase-messaging-compat.js");

firebase.initializeApp({
  apiKey: "ТВОЯ_API_KEY",
  authDomain: "ТВОЄ_AUTH_DOMAIN",
  projectId: "ТВОЄ_PROJECT_ID",
  messagingSenderId: "ТВОЄ_SENDER_ID",
  appId: "ТВОЄ_APP_ID"
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log("📩 Отримано фонове повідомлення:", payload);
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: payload.notification.icon || "/icon.png",
  };
  self.registration.showNotification(notificationTitle, notificationOptions);
});