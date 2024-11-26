import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: "/",
            component: () => import("../components/Home.vue"),
        },
        {
            path: "/login",
            component: () => import("../components/Auth/Login.vue"),
        },
        {
            path: "/register",
            component: () => import("../components/Auth/Register.vue"),
        },
    ],
});

export default router;
