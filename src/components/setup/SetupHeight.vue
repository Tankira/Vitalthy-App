<script setup>
    import { FloatLabel, Select, Button } from 'primevue'
    const emit = defineEmits(['incStep', 'decStep'])

    const height = defineModel()

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
</script>

<template>
    <div id="container">
        <!-- Tips -->
        <div class="tips">
            <h2>Chiều cao của bạn là bao nhiêu?</h2>
            <p>Bạn có thể thay đổi lại trong phần cài đặt sau</p>
        </div>

            <FloatLabel variant="on">
                <Select class="p-input" v-model="height" :options="heights(140,200)" optionLabel="name" optionValue="value" fluid/>
                <label>Chiều cao</label>
            </FloatLabel>

        <div class="action-button">
            <Button label="Trở về" type="submit" @click="$emit('decStep')" variant="outlined"  rounded fluid/>
            <Button label="Tiếp tục" type="submit" @click="$emit('incStep')"  rounded fluid/>
        </div>
    </div>
</template>

<style scoped>
    #container {
        display: grid;
        gap: 1.5rem;
        padding: 2rem;
    }

    #container > .action-button {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 1rem;
    }

    .p-input {
        align-items: center;
        height: 4rem;
    }

    .p-button {
        margin-top: 1.5rem;
        height: 3.5rem;
    }
</style>
