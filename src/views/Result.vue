<script setup>
    import { useRouter } from 'vue-router'
    import { reactive, computed } from 'vue'
    import { FloatLabel, InputText, Message, Button, Avatar, DataTable, Column } from 'primevue';
    import { useAccountStore } from '../stores/account';

    const router = useRouter()

    const data = reactive({
        name: useAccountStore().data.user.name,
        manualinput: router.currentRoute['value']['query']['manualinput'],
        weight: null,
        bmi: computed(() => useAccountStore().healthIndex.bmi),
        bmr: computed(() => useAccountStore().healthIndex.bmr),
        bfp: computed(() => useAccountStore().healthIndex.bfp),
        lbm: computed(() => useAccountStore().healthIndex.lbm),
        tdee: computed(() => useAccountStore().healthIndex.tdee),
        error: null,
        result: null
    })

    const handleInput = () => {
        data.error = data.weight === null || data.weight === 0 || data.weight === ''
        if (!data.error) {
            data.error = null,
            data.result = true
            useAccountStore().updateData({weight: data.weight})
        }
    }

    const database = [
        {
            index: 'Cân nặng',
            value: computed(() => `${data.weight}kg`),
            rank: computed(() => database[1]['rank'])
        },
        {
            index: 'BMI',
            value: computed(() => `${data.bmi}`),
            rank: computed(() => {
                if (data.bmi < 18.5) {
                    return 'Nhẹ cân'
                } else if (data.bmi >= 18.5  && data.bmi < 23) {
                    return 'Bình thường'
                } else if (data.bmi >= 23 && data.bmi < 25) {
                    return 'Thừa cân'
                } else if (data.bmi >= 25 && data.bmi < 30) {
                    return 'Béo phì'
                } else {
                    return 'Béo phì độ II'
                }
            })
        },
        {
            index: 'Tỷ lệ mỡ cơ thể',
            value: computed(() => `${data.bfp}%`),
            rank: computed(() => {
                if (useAccountStore().data.user.gender === 'male') {
                    if (data.bfp < 5) {
                        return 'Nguy hiểm'
                    } else if (data.bfp >= 5 && data.bfp < 8) {
                        return 'Quá thấp'
                    } else if (data.bfp >= 8 && data.bfp < 12) {
                        return 'Thấp'
                    } else if (data.bfp >= 12 && data.bfp < 20) {
                        return 'Tiêu chuẩn'
                    } else if (data.bfp >= 20 && data.bfp < 30) {
                        return 'Quá mức'
                    } else {
                        return 'Nguy hiểm'
                    }
                } else {
                    if (data.bfp < 15) {
                        return 'Nguy hiểm'
                    } else if (data.bfp >= 15 && data.bfp < 18) {
                        return 'Quá thấp'
                    } else if (data.bfp >= 19 && data.bfp < 22) {
                        return 'Thấp'
                    } else if (data.bfp >= 23 && data.bfp < 30) {
                        return 'Tiêu chuẩn'
                    } else if (data.bfp >= 31 && data.bfp < 40) {
                        return 'Quá mức'
                    } else {
                        return 'Nguy hiểm'
                    }
                }
            })
        },
        {
            index: 'Tỷ lệ cơ bắp',
            value: computed(() => `${data.lbm}%`),
            rank: computed(() => {
                if (useAccountStore().data.user.gender === 'male') {
                    if (data.lbm < 50) {
                        return 'Thấp'
                    } else if (data.lbm >= 50 && data.lbm < 70) {
                        return 'Trung bình'
                    } else if (data.lbm >= 70 && data.lbm < 85) {
                        return 'Tiêu chuẩn'
                    } else {
                        return 'Tuyệt vời'
                    }
                } else {
                    if (data.lbm < 50) {
                        return 'Thấp'
                    } else if (data.lbm >= 50 && data.lbm < 80) {
                        return 'Trung bình'
                    } else if (data.lbm >= 80 && data.lbm < 90) {
                        return 'Tiêu chuẩn'
                    } else {
                        return 'Tuyệt vời'
                    }
                }
            })
        },
        {
            index: 'BMR',
            value: computed(() => `${data.bmr}`),
            rank: ''
        },
        {
            index: 'TDEE',
            value: computed(() => `${data.tdee}`),
            rank: ''
        },
    ]
</script>

<template>
    <Transition name="fade" mode="out-in">
        <div v-if="data.manualinput === 'true' && !data.result" id="input-container">
            <!-- Tips -->
            <div class="tips">
                <h2>Cân nặng của bạn là bao nhiêu</h2>
                <p>Các chỉ số sức khỏe sẽ dựa trên cân nặng và thông tin của bạn để tính ra</p>
            </div>

            <!-- Form -->
            <form @submit.prevent='handleInput'>
                <FloatLabel variant="in">
                    <InputText v-model="data.weight" type="number" fluid/>
                    <label>Cân nặng (Kg)</label>
                </FloatLabel>

                <Message v-if="data.error" icon="pi pi-exclamation-circle" severity="error" variant="simple">Cân nặng không được để trống</Message>

                <div class="action-button">
                    <Button label="Trở về" type="button" @click="$router.push('/')" variant="outlined"  rounded fluid/>
                    <Button label="Tiếp tục" type="submit" rounded fluid/>
                </div>
            </form>
        </div>
    </Transition>

    <Transition name="fade" mode="out-in">
        <div v-if="data.result" id="result-container">
            <div class="main-card">
                <div class="account-info">
                    <Avatar image="./src/assets/image/avatar.png" size="large" shape="circle"/>
                    <div>
                        <h3>{{ data.name }}</h3>
                        <p>{{ new Date().toLocaleString('vi-VN') }}</p>
                    </div>
                </div>
                <div class="index">
                    <div class="weight">
                        <p>Cân nặng</p>
                        <h3>{{ data.weight }} kg</h3>
                    </div>
                    <div class="bmi">
                        <p>BMI</p>
                        <h3>{{ data.bmi }}</h3>
                    </div>
                    <div class="bfp">
                        <p>Tỷ lệ mỡ cơ thể</p>
                        <h3>{{ data.bfp }}%</h3>
                    </div>
                </div>
            </div>
            <div class="list-card">
                <DataTable :value="database" stripedRows>
                    <Column field="index" header="Chỉ số"/>
                    <Column field="value" header="Giá trị"/>
                    <Column field="rank" header="Tiêu chuẩn"/>
                </DataTable>
            </div>
            <div class="yuki">

            </div>
        </div>
    </Transition>
</template>

<style scoped>
    #input-container, #result-container {
        display: grid;
        gap: 1rem;
        padding: 2rem;
    }

    #input-container > form {
        display: grid;
        gap: 1rem;
    }

    #input-container > form > .action-button {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 1rem;
    }

    #result-container {
        background: #89ce59;
        grid-template-rows: min-content 1fr;
        height: 100vh;
    }

    #result-container > .main-card {
        display: grid;
        background: #aaaaaa4A;
        border-radius: 1rem;
        overflow: hidden;
    }

    #result-container > .main-card  > .account-info {
        display: grid;
        grid-template-columns: min-content 1fr;
        align-items: center;
        gap: 1rem;
        padding: 1.25rem;
    }
    
    #result-container > .main-card > .index {
        display: grid;
        color: #fff;
        background: #0d9488;
        grid-template-columns: 0.8fr 0.8fr 1fr;
        padding: 1.25rem;
        text-align: center;
    }

    #result-container > .main-card > .index > * p {
        font-size: 0.825rem;
    }

    * td.cell {
        color: #0d9488
    }

    /* Animation */
    .fade-enter-active,
    .fade-leave-active {
        transition: opacity 0.5s ease;
    }

    .fade-enter-from,
    .fade-leave-to {
        opacity: 0;
    }

    .p-inputtext {
        height: 4rem;
    }

    .p-button {
        height: 3.5rem;
    }
</style>
