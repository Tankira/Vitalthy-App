<script setup>
    import { Button } from 'primevue';
    import { ref } from 'vue';
    const activeButton = defineModel()
    const emits = defineEmits(['incStep', 'decStep'])
</script>

<template>
    <div id="container">
        <!-- Tips -->
        <div class="tips">
            <h2>Giới tính của bạn là gì?</h2>
            <p>Bạn có thể thay đổi lại trong phần cài đặt sau</p>
        </div>

        <div class="card">
            <Button :class="{active: activeButton === 'male'}" @click="activeButton = 'male'" fluid>
                <span>Nam</span>
                <span style="font-size: 1.5rem;">🧑</span>
            </Button>
            <Button :class="{active: activeButton === 'female'}" @click="activeButton = 'female'" fluid>
                <span>Nữ</span>
                <span style="font-size: 1.5rem;">👧</span>
            </Button>
        </div>

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

    #container > .card {
        display: grid;
        gap: 1rem;
    }

    #container > .card > .p-button {
        display: grid;
        padding-left: 1.5rem;
        padding-right: 1.5rem;
        grid-template-columns: 1fr min-content;
        border: transparent;
        text-align: left;
        color: light-dark(#555, #aaa);
        height: 4rem;
        background: #aaaaaa2A;
    }

    #container > .card > .active {
        border: solid 0.125rem var(--p-button-primary-border-color);
    }

    #container > .action-button {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 1rem;
    }

    .p-button {
        height: 3.5rem;
    }
</style>
