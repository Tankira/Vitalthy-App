<script setup>
    import { ref } from "vue";
    import { useRouter } from "vue-router";
    import { getAuth, onAuthStateChanged } from "firebase/auth";
    const router = useRouter();

    const isLoggedIn = ref(false)

    // Authentication Handle
    const auth = getAuth()
    onAuthStateChanged(auth, (user) => {
        if (user) {
            isLoggedIn.value = true
        } else {
            router.push('/login')
        }
    })
</script>

<template>
    <Loading />
    <router-view/>
</template>
