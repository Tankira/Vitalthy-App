<script setup>
    import { reactive } from 'vue'
    import { useAccountStore } from '../stores/account'
    import { Card, Knob, Button } from 'primevue'
    import Navbar from '../components/Navbar/Navbar.vue'
    import { useRouter } from 'vue-router'

    const router = useRouter()
    const data = reactive({
        name: useAccountStore().data.user.name,
        weight: useAccountStore().data.user.weight
    })

    const timeGreeting = () => {
        const thisHour = new Date().getHours()
        if (thisHour > 4 &&  thisHour < 12) { return 'Chúc bạn buổi sáng vui vẻ!' }
        else if (thisHour > 12 && thisHour < 18) { return 'Chúc bạn buổi chiều vui vẻ!' }
        else { return 'Chúc bạn buổi tối vui vẻ!' }
    }
</script>

<template>
    <div id="container">
        <div id="component-container">
            <div class="component-1">
                <h1>Xin chào,  {{ data.name }}!</h1>
                <p>{{ timeGreeting() }}</p>
            </div>

            <Card>
                <template #content>
                    <Knob v-model="data.weight" valueTemplate="{value}kg" readonly/>
                    <Button label="Nhập thủ công" @click="$router.push('/manualinput')" rounded fluid/>
                </template>
            </Card>
        </div>

        <Navbar/>
    </div>
</template>

<style scoped>

    #container {
        display: grid;
        grid-template-rows: 1fr min-content;
        height: 100vh;
    }

    #component-container {
        display: grid;
        grid-template-rows: repeat(3, min-content);
        gap: 24px;
        padding: 32px;
    }

    #component-container > .p-card > .p-card-body > .p-card-content > .p-button {
        margin-top: 16px;
        height: 3.25rem;
    }
</style>
