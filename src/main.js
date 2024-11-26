import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router/router';

import { initializeApp } from "firebase/app";
createApp(App)
    .use(router)
    .mount('#app')
