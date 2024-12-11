<script setup>
    const model = defineModel()
    import { RadioButton } from 'primevue';
</script>
<template>
    <div id="container">
        <div class="tips">
            <h1>Bạn thuộc giới tính nào?</h1>
            <p>Điền giới tính của bạn vào bảng ở dưới</p>
        </div>

        <div class="radio-container">
            <div class="radio-component">
                <label>Nam</label>
                <RadioButton/>
            </div>
            <div class="radio-component">
                <label>Nữ</label>
                <RadioButton/>
            </div>
        </div>
    </div>
</template>
