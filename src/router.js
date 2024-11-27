import { createMemoryHistory, createRouter } from "vue-router";
import Home from './components/Home.vue'
import Login from './components/Auth/Login.vue'
import Register from './components/Auth/Register.vue'
import ForgotPassword from './components/Auth/ForgotPassword.vue'

const router = createRouter({
    history: createMemoryHistory(),
    routes: [
        { path: "/", component: Home },
        { path: "/login", component: Login },
        { path: "/register", component: Register },
        { path: "/forgot-password", component: ForgotPassword },
    ]
})

export default router
