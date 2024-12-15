<script setup>
    import { RadioButton, Message, Button } from 'primevue';
    const emit = defineEmits(['incStep'])
    const value = defineModel()
    const error = defineModel('error')

    const handleInput = () => {
        if (value.value === null) {error.value = true} else {error.value = false}
        if (!error.value) { emit('incStep') } 
    }
</script>

<template>
    <div id="container">
        <!-- Tips -->
        <div class="tips">
            <h1>Giới tính của bạn là gì?</h1>
            <p>Bạn có thể thay đổi giới tính của bạn sau ở trong phần cài đặt</p>
        </div>

        <!-- Form -->
        <form @submit.prevent="handleInput">
            <div class="radio-container">
                <div class="radio-component">
                    <label>Nam</label>
                    <RadioButton v-model="value" value="male" size="large"/>
                </div>
                <div class="radio-component">
                    <label>Nữ</label>
                    <RadioButton v-model="value" value="female" size="large"/>
                </div>
            </div>

            <Message v-if="error" severity="error" icon="pi pi-exclamation-circle" variant="simple">Giới tính không được để trống</Message>

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

    form {
        display: grid;
        gap: 16px;
    }

    form > .radio-container {
        border-radius: 16px;
        overflow: hidden;
    }

    form > .radio-container > .radio-component {
        display: grid;
        align-content: center;
        background: #aaaaaa1a;
        grid-template-columns: 1fr min-content;
        padding-left: 16px;
        padding-right: 16px;
        height: 64px;
    }

    form > .radio-container > .radio-component:last-child {
        border-top: solid 1px #aaaaaa2a;
    }

    form > .radio-container > .radio-component > * {
        height: 100%;
    }

    .p-inputtext {
        height: 4rem;
    }

    .p-button {
        height: 3.25rem;
    }
</style>
