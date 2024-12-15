import { createApp } from "vue"
import { createPinia } from "pinia"
import { initializeApp } from "firebase/app"
import { getDatabase } from "firebase/database"
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import index from './index.vue'
import router from './router'
import primeVue  from 'primevue/config'
import aura from '@primevue/themes/aura'
import 'primeicons/primeicons.css'

// Pinia
const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

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

export const firebaseData = getDatabase(firebaseApp)

createApp(index)
    .use(pinia)
    .use(router)
    .use(primeVue, {theme: {preset: aura}})
    .mount('#app')
