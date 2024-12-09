import { createWebHistory, createRouter } from 'vue-router'
import { getCurrentUser } from '../composable/auth'

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            component: () => import('../pages/Home.vue'),
            meta: { requireAuth: true }
        },
        { 
            path: '/login',  
            component: () => import('../pages/Login.vue'),
            meta: { disabledAfterLogin: true }
        },
        { 
            path: '/register',
            component: () => import('../pages/Register.vue'),
            meta: { disabledAfterLogin: true }
        },
        {
            path: '/setup',
            component: () => import('../pages/Setup.vue'),
            meta: {}
        },
    ]
})

router.beforeEach(async (to, from) => {
    if (to.meta.requireAuth && !await getCurrentUser()) { return {path: '/login'} }
    if (to.meta.disabledAfterLogin && await getCurrentUser()) { return {path: '/'} }
})

export default router
