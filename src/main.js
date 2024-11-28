import { createApp } from 'vue'
import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import router from './router'
import App from './App.vue'
import './style.css'

// Firebase
const firebaseApp = initializeApp({
    apiKey: "AIzaSyAFuNMu9XT78fUv7nN8l55JAC9gxeBxEVg",
    authDomain: "vitalthy-project.firebaseapp.com",
    projectId: "vitalthy-project",
    storageBucket: "vitalthy-project.firebasestorage.app",
    messagingSenderId: "1076706912652",
    appId: "1:1076706912652:web:2841425ed4e07897d88ea9"
});
export const firebaseDB = getFirestore(firebaseApp)

// Vue app
createApp(App)
    .use(router)
    .mount('#app')
