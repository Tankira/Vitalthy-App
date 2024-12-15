<script setup>
    import { reactive, computed } from 'vue';
    import { useAccountStore } from '../stores/account'

    const data = reactive({
        name: useAccountStore().data.user.name,
        time: new Date().toLocaleString('vi-VN'),
        gender: useAccountStore().data.user.gender,
        age: (new Date().getFullYear() - useAccountStore().data.user.dateOfBirth['year']),
        weight: useAccountStore().data.user.weight,
        height: useAccountStore().data.user.height,
        bmi: computed(() => ((data.weight)/(data.height**2)).toFixed(1)),
        bfp: computed(() => {
            if (data.gender === 'male') {
                return ((1.20*data.bmi)+(0.23*data.age)-16.2)
            } else {
                return ((1.20*data.bmi)+(0.23*data.age)-5.63).toFixed(1)
            }
        })
    })
</script>

<template>
    <div id="container">
        <div class="main-card">
            <div class="info">
                <h2>{{ data.name }}</h2>
                <p>{{ data.time }}</p>
            </div>
            <div class="main-index">
                <div class="weight">
                    <p>Cân nặng</p>
                    <h2>{{ data.weight }}kg</h2>
                </div>
                <div class="bmi">
                    <p>Cân nặng</p>
                    <h2>{{ data.bmi }}</h2>
                </div>
                <div class="bfp">
                    <p>Tỉ lệ mỡ cơ thể</p>
                    <h2>{{ data.bfp }}%</h2>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
    #container {
        display: grid;
        padding: 32px;
    }

    #container > .main-card {
        background: #9999992A;
        display: grid;
        border-radius: 8px;
        overflow: hidden;
    }

    #container > .main-card > .info {
        padding: 24px;
    }

    #container > .main-card > .main-index {
        align-items: center;
        display: grid;
        grid-template-columns: 0.8fr 0.8fr 1fr;
        height: 6rem;
        border-top: solid 1px #9999995A;
        text-align: center;
    }

    #container > .main-card > .main-index > * > p {
        font-size: 14px;
        color: #bbb
    }
</style>
