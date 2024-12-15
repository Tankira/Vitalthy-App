import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            component: () => import('./views/Home.vue'),
            meta: { requireAuth: true, requireSetup: true }
        },
        {
            path: '/login',
            component: () => import('./views/Login.vue'),
            meta: { skipTransition: true }
        },
        {
            path: '/register',
            component: () => import('./views/Register.vue'),
            meta: { skipTransition: true }
        },
        {
            path: '/setup',
            component: () => import('./views/Setup.vue'),
            meta: { requireAuth: true }
        },
        {
            path: '/option',
            component: () => import('./views/Option.vue'),
            meta: { requireAuth: true, requireSetup: true }
        },
        {
            path: '/manualinput',
            component: () => import('./views/ManualInput.vue'),
            meta: { requireAuth: true, requireSetup: true }
        },
        {
            path: '/result',
            component: () => import('./views/WeightResult.vue'),
            meta: { requireAuth: true, requireSetup: true }
        }
    ]
})

// Function
const getCurrentUserAuthStatus = async () => {
    const { getAuth, onAuthStateChanged } = await import('firebase/auth')
    const { useAccountStore } = await import('./stores/account')
    const { readData } = await import('./functions/data')

    return new Promise((resolve) => {
        const unsub = onAuthStateChanged(
            getAuth(),
            async (user) => {
                unsub()
                if (user) {
                    useAccountStore().updateData(await readData(user.uid))
                    resolve(useAccountStore().data.user)
                } else {
                    resolve(useAccountStore().data.guest)
                }
            }
        )
    })
}

// Guards
router.beforeEach(async (to,from) => {
    const user = await getCurrentUserAuthStatus()
    const { useAccountStore } = await import('./stores/account')
    if (!user && to.meta.requireAuth) { return {path: '/login'} }
    if (!useAccountStore().data.setup && to.meta.requireSetup) { return {path: '/setup'} }
    if (useAccountStore().data.setup && to.path === '/setup') { return {path: '/'} }
    if (user && (to.path === '/login' || to.path === '/register')) { return {path: '/'} }
})

export default router
