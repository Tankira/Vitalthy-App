<script setup>
    import { FloatLabel, Select, Message, Button } from 'primevue';
    const emit = defineEmits(['incStep'])
    const value = defineModel()
    const error = defineModel('error')

    const heights = (min, max) => {
        let x = []
        for (let i = min; i <= max; i++) {
            var obj = {}

            obj['name'] = `${i}cm`
            obj['value'] = i

            x.push(obj)
        }
        return x
    }

    const handleInput = () => {
        if (value.value === null) {error.value = true} else {error.value = false}
        if (!error.value) { emit('incStep') } 
    }
</script>

<template>
    <div id="container">
        <!-- Tips -->
        <div class="tips">
            <h1>Chiều cao của bạn là bao nhiêu?</h1>
            <p>Bạn có thể thay đổi chiều cao của bạn sau ở trong phần cài đặt</p>
        </div>

        <!-- Form -->
        <form @submit.prevent="handleInput">
            <FloatLabel variant="in">
                <Select v-model="value" :options="heights(140,200)" optionLabel="name" optionValue="value" fluid/>
                <label>Chiều cao</label>
            </FloatLabel>

            <Message v-if="error" severity="error" icon="pi pi-exclamation-circle" variant="simple">Chiều cao không được để trống</Message>

            <Button label="Tiếp" type="submit" rounded fluid/>
            <Button @click="$emit('decStep')" class="backButton" label="Trở lại" variant="outlined" rounded fluid/>
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

    #container > form > .p-floatlabel > label, #container > form > .p-floatlabel > .p-select > * {
        margin-top: 8px;
    }

    .p-select {
        height: 4rem;
    }

    .p-button {
        height: 3.5rem;
    }
</style>
