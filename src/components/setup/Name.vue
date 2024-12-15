<script setup>
    import { FloatLabel, InputText, Message, Button } from 'primevue';
    const emit = defineEmits(['incStep'])
    const value = defineModel()
    const error = defineModel('error')

    const handleInput = () => {
        value.value = String(value.value).trim()
        error.value = value.value === '' || value.value === undefined
        if (!error.value) { emit('incStep') } 
    }
</script>

<template>
    <div id="container">
        <!-- Tips -->
        <div class="tips">
            <h1>Bạn tên gì</h1>
            <p>Bạn có thể chỉnh lại tên của bạn sau ở trong phần cài đặt</p>
        </div>

        <!-- Form -->
        <form @submit.prevent="handleInput">
            <FloatLabel variant="in">
                <InputText v-model="value" required fluid/>
                <label>Tên</label>
            </FloatLabel>

            <Message v-if="error" severity="error" icon="pi pi-exclamation-circle" variant="simple">Tên không được để trống</Message>

            <Button label="Tiếp" type="submit" rounded fluid/>
        </form>
    </div>
</template>

<style scoped>
    #container {
        display: grid;
        gap: 24px;
        padding: 32px;
    }

    #container > form {
        display: grid;
        gap: 16px;
    }

    .p-inputtext {
        height: 4rem;
    }

    .p-button {
        height: 3.5rem;
    }
</style>
