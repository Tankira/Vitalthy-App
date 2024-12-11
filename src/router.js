import { createWebHistory, createRouter } from "vue-router"
import { getCurrentUser } from "./uses/auth"
import { readData } from "./uses/data"

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
        {
            path: '/setup',
            component: () => import('./pages/Setup.vue'),
            meta: { requireAuth: true }
        }
    ]
})

router.beforeEach(async (to, from) => {
    const currentUser = await getCurrentUser()
    if (to.meta.requireAuth && !currentUser) { return {path: '/login'} }
    if (to.meta.setupComplete && !await readData(currentUser.uid, "setup")) { return {path: '/setup'} }
    if (await currentUser && to.path === '/login') { return {path: '/'} }
    if (await currentUser && to.path === '/register') { return {path: '/'} }
})

export default router
