import './assets/styles/default.css'
import { createApp } from "vue"
import { initializeApp } from 'firebase/app'
import app from './App.vue'
import router from "./router/router"
import primeVue from 'primevue/config'
import aura from '@primevue/themes/aura'
import { getDatabase } from 'firebase/database'

// Firebase
const firebaseApp = initializeApp({
    apiKey: "AIzaSyC2XFTFVUGJlugaMT9OSY-B00kWKLkxcAI",
    authDomain: "vitalthy-project-vn.firebaseapp.com",
    databaseURL: "https://vitalthy-project-vn-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "vitalthy-project-vn",
    storageBucket: "vitalthy-project-vn.firebasestorage.app",
    messagingSenderId: "83045493085",
    appId: "1:83045493085:web:4badb58722b9f6e043e0b4"
})

const firebaseDatabase = getDatabase(firebaseApp)

// App
createApp(app)
    .use(primeVue, {theme: {preset: aura}})
    .use(router)
    .mount('#app')

export default firebaseDatabase
