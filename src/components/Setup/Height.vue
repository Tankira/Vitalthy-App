<script setup>
    const height = defineModel({required: true})
    import { FloatLabel, Select } from 'primevue';

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
        <div class="tips">
            <h1>Bạn cao bao nhiêu?</h1>
            <p>Nhập chiều cao của bạn</p>
        </div>

        <FloatLabel variant="in">
            <Select v-model="height" :options="heights(140,200)" optionLabel="name" optionValue="value" required fluid/>
            <label>Chiều cao</label>
        </FloatLabel>
    </div>
</template>
