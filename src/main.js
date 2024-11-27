// Library - Variable
import { createApp } from 'vue'
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
import './style.css'
import App from './App.vue'
import router from './router'

// Firebase Auth
const firebaseConfig = {
    apiKey: "AIzaSyA2k8-2eY04Qxd9QLA2paVfYYaBIG1v0s4",
    authDomain: "healthyapp-bffd3.firebaseapp.com",
    databaseURL: "https://healthyapp-bffd3-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "healthyapp-bffd3",
    storageBucket: "healthyapp-bffd3.firebasestorage.app",
    messagingSenderId: "813789121795",
    appId: "1:813789121795:web:85decc0dbc7317aab72d36"
  }
  
  const firebaseApp = initializeApp(firebaseConfig)
  const firebaseDB = getFirestore(firebaseApp)

// Create App
createApp(App)
    .use(router)
    .mount('#app')

export {firebaseDB}
