<script setup>
    import { ref } from 'vue';
    import { FloatLabel, Select, Message, Button } from 'primevue';
    const emit = defineEmits(['incStep', 'decStep'])
    const value = defineModel()
    const error = defineModel('error')

    const day = ref(null)
    const month = ref(null)
    const year = ref(null)

    const years = (range) => {
        let x = []
        const thisYear = new Date().getFullYear()
        for (let i = (thisYear - range); i <= thisYear ; i++) {
            var obj = {}
            obj['value'] = i
            x.push(obj)
        }
        return x
    }

    const months = () => {
        let x = []
        for (let i = 1; i <= 12; i++) {
            var obj = {}
            obj['value'] = i
            x.push(obj)
        }
        return x
    }

    const days = (currentMonth, currentYear) => {
        let dayNum
        let x = []
        if ([1,3,5,7,8,10,12].includes(currentMonth)) {
            dayNum = 31
        } else if ([4,6,9,11].includes(currentMonth)) {
            dayNum = 30
        } else {
            if (new Date(currentYear, 1, 29).getMonth() === 1) {
                dayNum = 29
            } else {
                dayNum = 28
            }
        }

        for (let i = 1; i <= dayNum; i++) {
            var obj = {}
            obj['value'] = i
            x.push(obj)
        }

        return x
    }

    const handleInput = () => {
        value.value = {day: day.value, month: month.value, year: year.value}
        if (day.value === null || month.value === null || year.value === null) {
            error.value = true
        } else {
            error.value = false
        }
        if (!error.value) { emit('incStep') } 
    }
</script>

<template>
    <div id="container">
        <!-- Tips -->
        <div class="tips">
            <h1>Ngày sinh của bạn là khi nào</h1>
            <p>Bạn có thể thay đổi ngày sinh của bạn sau ở trong phần cài đặt</p>
        </div>

        <!-- Form -->
        <form @submit.prevent="handleInput">
            <div class="datepicker">
                <FloatLabel variant="in">
                    <Select v-model="day" :options="days(month,year)" optionLabel="value" optionValue="value" fluid/>
                    <label>Ngày</label>
                </FloatLabel>
                <FloatLabel variant="in">
                    <Select v-model="month" :options="months()" optionLabel="value" optionValue="value" fluid/>
                    <label>Tháng</label>
                </FloatLabel>
                <FloatLabel variant="in">
                    <Select v-model="year" :options="years(100)" optionLabel="value" optionValue="value" fluid/>
                    <label>Năm</label>
                </FloatLabel>
            </div>

            <Message v-if="error" severity="error" icon="pi pi-exclamation-circle" variant="simple">Ngày/Tháng/Năm không được để trống</Message>

            <div class="action-button">
                <Button @click="$emit('decStep')" class="backButton" label="Trở lại" variant="outlined" rounded fluid/>
                <Button label="Tiếp" type="submit" rounded fluid/>
            </div>
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

    #container > form > .datepicker {
        display: grid;
        gap: 16px;
    }

    #container > form > .datepicker > .p-floatlabel > .p-inputwrapper-filled > * {
        margin-top: 6px;
    }

    #container > form > .action-button {
        display:  grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 16px;
    }

    .p-select {
        height: 4rem;
    }

    .p-button {
        height: 3.5rem;
    }
</style>
