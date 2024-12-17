<script setup>
    const emit = defineEmits(['setup'])

    emit('setup')
</script>

<template>
    <div id="container">
        <!-- Tips -->
        <div class="tips">
            <h2>Sắp hoàn thành rồi! 🌱</h2>
            <p>Đợi một lát trong khi phần mềm đang cập nhật thông tin.</p>
        </div>
    </div>
</template>

<style scoped>
    #container {
        padding: 2rem;
    }
</style>
