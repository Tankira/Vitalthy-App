import { createMemoryHistory, createRouter } from "vue-router"
import Home from './components/Home.vue'
import Login from './components/Login.vue'
import Register from './components/Register.vue'
import ForgotPassword from "./components/ForgotPassword.vue"
import AccountSetup from "./components/AccountSetup.vue"

const router = createRouter({
    history: createMemoryHistory(),
    routes: [
        { path: "/", component: Home },
        { path: "/login", component: Login },
        { path: "/register", component: Register },
        { path: "/forgot-password", component: ForgotPassword },
        { path: "/account-setup", component: AccountSetup },
    ]
})

export default router
