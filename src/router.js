import { createRouter, createWebHistory } from "vue-router"
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
            component: () => import('./views/AuthLogin.vue'),
            meta: { noAccessAfterAuth: true }
        },
        {
            path: '/register',
            component: () => import('./views/AuthRegister.vue'),
            meta: { noAccessAfterAuth: true }
        },
        {
            path: '/setup',
            component: () => import('./views/Setup.vue'),
        },
        {
            path: '/option',
            component: () => import('./views/Option.vue'),
            meta: { requireAuth: true, requireSetup: true }
        },
        {
            path: '/result',
            component: () => import('./views/Result.vue'),
            meta: { requireAuth: true, requireSetup: true }
        }
    ]
})

// Functions
const currentAuthStatus = async () => {
    const { getAuth, onAuthStateChanged } = await import('firebase/auth')
    const { useAccountStore } = await import('./stores/account')
    const { readData } = await import('./uses/data')

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
router.beforeEach(async (to, from) => {
    const user = await currentAuthStatus()
    const { useAccountStore } = await import('./stores/account')
    if (!user && to.meta.requireAuth) { return {path: '/login'} }
    // if (!useAccountStore().data.logOut && to.meta.requireAuth) { return {path: '/login'} }
    if (!useAccountStore().data.setup && to.meta.requireSetup) { return {path: '/setup'} }
    if (useAccountStore().data.setup && to.path === '/setup') { return {path: '/'} }
    if (user && to.meta.noAccessAfterAuth) { return {path: '/'} }
})

export default router
