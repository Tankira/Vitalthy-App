// Default Initialize
import { createApp } from "vue"
import app from "./App.vue"
import router from './router'
import './assets/styles/default.css'

// PrimeVue UI Framework
import 'primeicons/primeicons.css'
import primeVue from 'primevue/config'
import aura from '@primevue/themes/aura'

// Firebase
import { initializeApp } from "firebase/app"
const firebaseApp = initializeApp({
    apiKey: "AIzaSyC2XFTFVUGJlugaMT9OSY-B00kWKLkxcAI",
    authDomain: "vitalthy-project-vn.firebaseapp.com",
    databaseURL: "https://vitalthy-project-vn-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "vitalthy-project-vn",
    storageBucket: "vitalthy-project-vn.firebasestorage.app",
    messagingSenderId: "83045493085",
    appId: "1:83045493085:web:4badb58722b9f6e043e0b4"
})

// App
createApp(app)
    .use(router)
    .use(primeVue, {theme: {preset: aura}})
    .mount('#app')
