<script setup>
    import Navbar from '../components/navbar/navbar.vue';
    import { useAccountStore } from '../stores/account'
    import { computed, reactive } from 'vue';
    import { Knob, Button } from 'primevue';

    const data = reactive({
        name: useAccountStore().data.user.name,
        time: computed(() => { 
            if (new Date().getHours() > 4 && new Date().getHours() < 12) {
                return 'buổi sáng'
            } else if (new Date().getHours() > 12 && new Date().getHours() < 18) {
                return 'buổi chiều'
            } else {
                return 'buổi tối'
            }
        }),
        weight: useAccountStore().data.user.weight,
    })
</script>

<template>
    <div id="container">
        <div class="tips">
            <h2>Xin chào, {{ data.name }}!</h2>
            <p>Chúc bạn {{ data.time }} vui vẻ! ✨</p>
        </div>

        <div class="content">
            <div class="card">
                <div class="card-component1">
                    <Knob v-model="data.weight" valueTemplate="{value} kg" :strokeWidth="5" readonly/>

                </div>
                <Button label="Nhập thủ công" style="margin-top: 16px;" @click="$router.push({path: '/result', query: {manualinput: true}})" rounded fluid/>
            </div>
        </div>
    </div>

    <Navbar/>
</template>

<style scoped>
    #container {
        display: grid;
        grid-template-rows: min-content 1fr;
        gap: 2rem;
        padding: 2rem;
    }

    #container > .content > .card {
        background: #9999992A;
        border-radius: 8px;
        padding: 2rem;
    }
</style>
