<script setup>
    import '../assets/styles/setup.css'
    import { ref } from 'vue';
    import { Button } from 'primevue';
    import Name from '../components/Setup/Name.vue';
    import Height from '../components/Setup/Height.vue';
    import Gender from '../components/Setup/Gender.vue';

    const name = ref(null)
    const height = ref(null)
    const done = ref(null)


</script>

<template>
    <Name v-if="done" v-model="name"/>
    <Height v-if="done" v-model="height"/>
    <Gender />
    <Button id="submit" label="Tiếp tục" rounded fluid/>
</template>
