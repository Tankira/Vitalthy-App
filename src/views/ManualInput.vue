<script setup>
    import { reactive } from 'vue';
    import { useRouter } from 'vue-router';
    import { FloatLabel, InputText, Message, Button } from 'primevue'

    const router = useRouter()

    const data = reactive({
        weight: null,
        error: null
    })

    const handleInput = async () => {
        const { useAccountStore } = await import('../stores/account')
        const { updateData } = await import('../functions/data')

        data.error = (data.weight === null || data.weight === 0 || data.weight === '')
        if (!data.error) {
            if (useAccountStore().data.guest) {
                await useAccountStore().updateData({weight: Number(data.weight)})
            } else {
                await updateData({weight: Number(data.weight)})
            }
            setTimeout(() => {
                router.push('/result')
            }, 500);
        }
    }
</script>

<template>
    <div id="container">
        <!-- Tips -->
        <div class="tips">
            <h1>Nhập cân nặng của bạn.</h1>
        </div>

        <FloatLabel variant="in">
            <InputText
            v-model="data.weight"
            type="number"
            fluid
            />
            <label>Cân nặng (Kg)</label>
        </FloatLabel>

        <Message v-if="data.error" icon="pi pi-exclamation-circle" severity="error" variant="simple">Cân nặng không được để trống</Message>

        <Button label="Tiếp tục" @click="handleInput" rounded fluid/>
        <Button label="Trở về" @click="$router.push('/')" variant="outlined" rounded fluid/>
    </div>
</template>

<style scoped>
    #container {
        display: grid;
        padding: 32px;
        gap: 24px;
        text-align: center
    }

    #container > .tips > h1 {
        font-size: 28px;
    }
    
    .p-inputtext {
        height: 4rem;
    }

    .p-button {
        height: 3.5rem;
    }

</style>
