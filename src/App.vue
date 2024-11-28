<script setup>
    import { useRouter } from 'vue-router'
    import { firebaseDB } from './main';
    import { doc, getDoc } from 'firebase/firestore';
    import { getAuth, onAuthStateChanged } from 'firebase/auth';
    import { onMounted } from 'vue';
    const router = useRouter()
    const auth = getAuth()

    // Is logged in???
    onAuthStateChanged(auth, (user) => { (user) ?  setupCompleted(user.uid) : router.push('/login') })

    // Does account has completed the setup?
    async function setupCompleted(uid) {
        const userData = await getDoc(doc(firebaseDB, "users", uid))
        if (userData.exists()) { if (!userData.data()['setupCompleted']) { router.push('/account-setup') } }
    }
    
    onMounted(() => {
        setupCompleted()
    })        
</script>

<template>
    <RouterView />
</template>
