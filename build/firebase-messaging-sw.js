importScripts("https://www.gstatic.com/firebasejs/8.7.0/firebase-app.js")
importScripts("https://www.gstatic.com/firebasejs/8.7.0/firebase-messaging.js")

firebase.initializeApp({
    apiKey: "AIzaSyCq2VHgjSo5JDEVdVdupYB9t7Zp1Mrf7pk",
    authDomain: "petmypal-pn.firebaseapp.com",
    databaseURL: "https://petmypal-pn.firebaseio.com",
    projectId: "petmypal-pn",
    storageBucket: "petmypal-pn.appspot.com",
    messagingSenderId: "589480005399",
    appId: "1:589480005399:web:618bfd14663b7cfb65f152",
    measurementId: "G-FBSVRE9FWH"
})

const initMessaging = firebase.messaging()