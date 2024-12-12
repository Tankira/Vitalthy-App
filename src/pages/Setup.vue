<script setup>
    import '../assets/styles/setup.css'
    import { defineAsyncComponent, ref } from 'vue';
    import { useRouter } from 'vue-router';
    import { Button } from 'primevue';
    import { getCurrentUser } from '../uses/auth';
    import { createData } from '../uses/data';

    // Component
    const Name = defineAsyncComponent(() => import('../components/Setup/Name.vue'))

    // Value
    const router = useRouter()
    
    
    // Handle send data
    const handleData = async () => {
        const currentUser = await getCurrentUser()
        createData(currentUser.uid, {
            name: name.value,
            gender: gender.value,
            height: height.value,
            date_of_birth: [day.value, month.value, year.value],
            setup: true
        })
        setTimeout(() => {
            router.push('/')
        }, 3000);
    }

    // Handle component
</script>

<template>
    
    <Name/>
</template>
