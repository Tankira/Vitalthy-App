<script setup>
    const model = defineModel()
    import { FloatLabel, InputText } from 'primevue';
</script>
<template>
    <div id="container">
        <div class="tips">
            <h1>Bạn tên gì?</h1>
            <p>Nhập tên của bạn</p>
        </div>

        <FloatLabel variant="in">
            <InputText v-model="name" required fluid/>
            <label>Tên</label>
        </FloatLabel>
    </div>
</template>
