<script setup>
    import { Button } from 'primevue';
    import { createData, getData } from '../composable/data';
    import { getCurrentUser } from '../composable/auth';

    const test = async () => {
        const user = await getCurrentUser()
        await getData(user.uid)
    }
</script>

<template>
    <Button label="Click here" @click="test()"/>
</template>
