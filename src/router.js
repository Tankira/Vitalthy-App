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
            meta: { authComponent: true }
        },
        {
            path: '/register',
            component: () => import('./pages/Register.vue'),
            meta: { authComponent: true }
        },
    ]
})

router.beforeEach(async (to, from) => {
    if (to.meta.requireAuth && !await getCurrentUser()) { return {path: '/login'} }
})

export default router
