importScripts('https://www.gstatic.com/firebasejs/10.13.2/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.13.2/firebase-messaging-compat.js');

const firebaseConfig = {
    apiKey: "AIzaSyC5w3MykurxsXrpXxSqHa5Pc61CV5Lg9Hs",
    authDomain: "macro-counter-db29d.firebaseapp.com",
    projectId: "macro-counter-db29d",
    storageBucket: "macro-counter-db29d.appspot.com",
    messagingSenderId: "791826944662",
    appId: "1:791826944662:web:964de4581a789c4d23e8b7",
};

firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
    console.log('[firebase-messaging-sw.js] Received background message ', payload);
    const notificationTitle = payload.notification.title;
    const notificationOptions = {
        body: payload.notification.body,
        icon: '/firebase-logo.png'
    };

    self.registration.showNotification(notificationTitle, notificationOptions);
});