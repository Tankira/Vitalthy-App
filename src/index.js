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
import { getDatabase } from "firebase/database"
const firebaseApp = initializeApp({
    apiKey: "AIzaSyC2XFTFVUGJlugaMT9OSY-B00kWKLkxcAI",
    authDomain: "vitalthy-project-vn.firebaseapp.com",
    databaseURL: "https://vitalthy-project-vn-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "vitalthy-project-vn",
    storageBucket: "vitalthy-project-vn.firebasestorage.app",
    messagingSenderId: "83045493085",
    appId: "1:83045493085:web:4badb58722b9f6e043e0b4"
})

export const firebaseDatabase = getDatabase(firebaseApp)

// App
createApp(app)
    .use(router)
    .use(primeVue, {
        theme: {preset: aura},
        locale: {
            accept: 'Đồng ý',
            reject: 'Từ chối',
            dateFormat: 'dd/mm/yy',
            dayNames: ['Chủ nhật','Thứ hai','Thứ ba','Thứ tư','Thứ năm','Thứ sáu', 'Thứ bảy'],
            dayNamesShort: ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'],
            dayNamesMin: ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'],
            monthNames: ['Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6', 'Tháng 7', 'Tháng 8', 'Tháng 9', 'Tháng 10', 'Tháng 11', 'Tháng 12'],
            monthNamesShort: ['Thg 1', 'Thg 2', 'Thg 3', 'Thg 4', 'Thg 5', 'Thg 6', 'Thg 7', 'Thg 8', 'Thg 9', 'Thg 10', 'Thg 11', 'Thg 12'],
            chooseYear: 'Chọn năm',
            chooseMonth: 'Chọn tháng',
            chooseDate: 'Chọn ngày',
            am: 'SA',
            pm: 'CH'
        }
    })
    .mount('#app')
