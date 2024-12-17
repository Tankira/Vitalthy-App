<script setup>
    import { FloatLabel, InputText, Message, Button } from 'primevue'
    import { ref } from 'vue'
    const emit = defineEmits(['incStep'])
    const name = defineModel()
    const error = ref(null)

    const handleInput = () => {
        name.value =  String(name.value).trim()
        error.value = name.value === '' || name.value === ' '
        if (!error.value) {emit('incStep')}
    }
</script>

<template>
    <div id="container">
        <!-- Tips -->
        <div class="tips">
            <h2>Bạn tên là gì?</h2>
            <p>Bạn có thể thay đổi lại trong phần cài đặt sau</p>
        </div>

        <form @submit.prevent="handleInput">
            <FloatLabel variant="on">
                <InputText v-model="name" required fluid/>
                <label>Tên</label>
            </FloatLabel>

            <Message v-if="error" icon="pi pi-exclamation-circle"  severity="error" variant="simple" style="margin-top: 1rem;">Tên không được để trống</Message>

            <Button label="Tiếp tục" type="submit" rounded fluid/>
        </form>
    </div>
</template>

<style scoped>
    #container {
        display: grid;
        gap: 1.5rem;
        padding: 2rem;
    }

    .p-inputtext {
        height: 4rem;
    }

    .p-button {
        margin-top: 1.5rem;
        height: 3.5rem;
    }
</style>
