<script setup>
    import { Button } from 'primevue';
    import { ref } from 'vue';
    const tdee = defineModel()
    const emits = defineEmits(['incStep', 'decStep'])
</script>

<template>
    <div id="container">
        <!-- Tips -->
        <div class="tips">
            <h2>Tần suất hoạt động của bạn?</h2>
            <p>Bạn có thể thay đổi lại trong phần cài đặt sau</p>
        </div>

        <div class="card">
            <Button :class="{active: tdee === 1.2}" @click="tdee = 1.2" fluid>
                <span>Ít khi vận động</span>
            </Button>
            <Button :class="{active: tdee === 1.375}" @click="tdee = 1.375" fluid>
                <span>Vận động nhẹ </span>
                <span style="font-size: 0.75rem;">Có tập thể dục 1-3 ngày / tuần</span>
            </Button>
            <Button :class="{active: tdee === 1.55}" @click="tdee = 1.55" fluid>
                <span>Vận động vừa phải </span>
                <span style="font-size: 0.75rem;">Có tập thể dục 3-5 ngày / tuần</span>
            </Button>
            <Button :class="{active: tdee === 1.725}" @click="tdee = 1.725" fluid>
                <span>Vận động nhiều </span>
                <span style="font-size: 0.75rem;">Có tập thể dục 6-7 ngày / tuần</span>
            </Button>
            <Button :class="{active: tdee === 1.9}" @click="tdee = 1.9" fluid>
                <span>Vận động rất nhiều </span>
                <span style="font-size: 0.75rem;">Tập thể dục > 90p mỗi ngày hoặc làm công việc nặng</span>
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
        grid-template-columns: 1fr;
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
