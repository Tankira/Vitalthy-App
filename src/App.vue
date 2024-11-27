<script setup>
    // Library - Variable
    import { ref } from 'vue';
    import { useRouter } from 'vue-router'
    import { firebaseDB } from './main';
    import { getAuth, onAuthStateChanged } from 'firebase/auth'
    import { doc, setDoc } from 'firebase/firestore'
    const router = useRouter()
    const isLoggedIn = ref(false)
    
    // Is logged in?
    onAuthStateChanged(getAuth(), (user) => { isLoggedIn.value = (user) ? true : router.push("/login") })

    // Create Document
    async function okemam() {
        const oke = await setDoc(doc(firebaseDB, 'Users', "skibidi"))
        console.log(oke)
    }

    console.log(getAuth().currentUser.uid)
    okemam()
</script>

<template>
    <router-view />
</template>
