import { createWebHistory, createRouter } from "vue-router"
import { getCurrentUser } from "./uses/auth"

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            component: () => import('./pages/Home.vue'),
            meta: { requireAuth: true, setupComplete: true }
        },
        {
            path: '/login',
            component: () => import('./pages/Login.vue'),
        },
        {
            path: '/register',
            component: () => import('./pages/Register.vue'),
        },
    ]
})

router.beforeEach(async (to, from) => {
    if (to.meta.requireAuth && !await getCurrentUser()) { return {path: '/login'} }
    if (to.path === '/login' || to.path === '/register' && await getCurrentUser()) { return {path: '/'} }
})

export default router
