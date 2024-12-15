<script setup>
    const emit = defineEmits(['setup'])
    emit('setup')
</script>

<template>
    <div id="container">
        <!-- Tips -->
        <div class="tips">
            <h1>Sắp hoàn thành rồi! 🤩</h1>
            <p>Đợi một tí trong lúc app đang cập nhật thông tin bạn nhé! ☕</p>
        </div>
    </div>
</template>

<style scoped>
    #container {
        display: grid;
        gap: 24px;
        padding: 32px;
    }

    #container > .tips > h1 {
        font-size: 28px
    }
</style>
