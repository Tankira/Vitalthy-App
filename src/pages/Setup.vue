<script setup>
    import '../assets/styles/setup.css'
    import { defineAsyncComponent, ref } from 'vue';
    import { useRouter } from 'vue-router';
    import { Button } from 'primevue';
    import { getCurrentUser } from '../uses/auth';
    import { createData } from '../uses/data';
    const Name = defineAsyncComponent(() => import('../components/Setup/Name.vue'));
    const Height = defineAsyncComponent(() => import('../components/Setup/Height.vue'));
    const Gender = defineAsyncComponent(() => import('../components/Setup/Gender.vue'));
    const Datepicker = defineAsyncComponent(() => import('../components/Setup/Datepicker.vue'));
    const Waiting = defineAsyncComponent(() => import('../components/Setup/Waiting.vue'))

    // Value
    const router = useRouter()
    const name = ref(null)
    const height = ref(140)
    const gender = ref('male')
    const day = ref(1)
    const month = ref(1)
    const year = ref(null)
    const error = ref(null)
    const backButton = ref(false)
    const submitButton = ref(true)
    
    // Handle send data
    const handleData = async () => {
        const currentUser = await getCurrentUser()
        createData(currentUser.uid, {
            name: name.value,
            gender: gender.value,
            height: height.value,
            date_of_birth: [day.value, month.value, year.value],
            setup: true
        })
        setTimeout(() => {
            router.push('/')
        }, 3000);
    }

    // Handle component
    const currentStep = ref(1)
    const handleComponent = () => {
        switch (currentStep.value) {
            case 1:
                if (name.value === null || String(name.value).trim() === '') {
                    error.value = 'Tên không được để trống'
                } else {
                    name.value = String(name.value).trim()
                    error.value = null
                    backButton.value = true
                    currentStep.value++
                }
                break
        
            case 4:
                if (year.value === null) {
                    error.value = 'Năm sinh không được để trống'
                } else {
                    error.value = null
                    backButton.value = false
                    submitButton.value = false
                    handleData()
                    currentStep.value++
                }
                break

            default:
                currentStep.value++
                break
        }
    }
    const handleBackComponent = () => {
        switch (currentStep.value) {
            case 2:
                currentStep.value--
                backButton.value = false
                break

            default:
                error.value = false
                currentStep.value--
                break
        }
    }
</script>

<template>
    <Button v-if="backButton" icon="pi pi-chevron-left" variant="text" size="large" @click="handleBackComponent()" id="back-button" rounded/>
    
    <Transition
        enter-active-class="enter-active"
        enter-from-class="enter-from"
        enter-to-class="enter-to"
        leave-active-class="leave-active"
        leave-from-class="leave-from"
        leave-to-class="leave-to"
    >
        <Name v-if="currentStep === 1" v-model="name"/>
    </Transition>
    <Transition
        enter-active-class="enter-active"
        enter-from-class="enter-from"
        enter-to-class="enter-to"
        leave-active-class="leave-active"
        leave-from-class="leave-from"
        leave-to-class="leave-to"
    >
        <Gender v-if="currentStep === 2" v-model="gender"/>
    </Transition>
    <Transition
        enter-active-class="enter-active"
        enter-from-class="enter-from"
        enter-to-class="enter-to"
        leave-active-class="leave-active"
        leave-from-class="leave-from"
        leave-to-class="leave-to"
    >
        <Height v-if="currentStep === 3" v-model="height"/>
    </Transition>
    <Transition
        enter-active-class="enter-active"
        enter-from-class="enter-from"
        enter-to-class="enter-to"
        leave-active-class="leave-active"
        leave-from-class="leave-from"
        leave-to-class="leave-to"
    >
        <Datepicker v-if="currentStep === 4" v-model:day="day" v-model:month="month" v-model:year="year"/>
    </Transition>
    <Transition
        enter-active-class="enter-active"
        enter-from-class="enter-from"
        enter-to-class="enter-to"
        leave-active-class="leave-active"
        leave-from-class="leave-from"
        leave-to-class="leave-to"
    >
        <Waiting v-if="currentStep === 5"/>
    </Transition>

    <p v-if="error" class="error">{{ error }}</p>
    <Button v-if="submitButton" id="submit" label="Tiếp tục" @click="handleComponent()" rounded fluid/>
</template>
