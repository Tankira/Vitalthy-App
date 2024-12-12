<script setup>
    const day = defineModel('day', {required: true})
    const month = defineModel('month', {required: true})
    const year = defineModel('year', {required: true})
    import { FloatLabel, Select } from 'primevue';
    import { days, months, years } from '../../uses/date';
</script>

<template>
    <div id="container">
        <div class="tips">
            <h1>Ngày sinh của bạn là khi nào?</h1>
            <p>Chọn ngày sinh của bạn</p>
        </div>

        <div class="datepicker">
            <FloatLabel variant="in">
                <Select v-model="day" :options="days(month, year)" optionLabel="value" optionValue="value" required fluid/>
                <label>Ngày</label>
            </FloatLabel>
            <FloatLabel variant="in">
                <Select v-model="month" :options="months()" optionLabel="name" optionValue="value" required fluid/>
                <label>Tháng</label>
            </FloatLabel>
            <FloatLabel variant="in">
                <Select v-model="year" :options="years(100)" optionLabel="value" optionValue="value" required fluid/>
                <label>Năm</label>
            </FloatLabel>
        </div>
    </div>
</template>
