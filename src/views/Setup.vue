<script setup>
    import { ProgressBar } from 'primevue'
    import { reactive, computed, defineAsyncComponent } from 'vue'
    import { useRouter } from 'vue-router'
    const router = useRouter()
    
    // Lazy component
    const Name = defineAsyncComponent(() => import('../components/setup/SetupName.vue'))
    const Gender = defineAsyncComponent(() => import('../components/setup/SetupGender.vue'))
    const Height = defineAsyncComponent(() => import('../components/setup/SetupHeight.vue'))
    const TDEE = defineAsyncComponent(() => import('../components/setup/SetupTDEE.vue'))
    const DOB = defineAsyncComponent(() => import('../components/setup/SetupDOB.vue'))
    const Done = defineAsyncComponent(() => import('../components/setup/SetupDone.vue'))

    // Reactive list
    const data = reactive({
        name: null,
        gender: 'male',
        height: 140,
        rtdee: 1.2,
        dob: {day: 1, month: 1, year: 2024},
        step: 1,
    })

    const component = { 1: Name, 2: Gender, 3: Height, 4: TDEE, 5: DOB, 6: Done  }
    const model = { 1: 'name', 2: 'gender', 3: 'height', 4: 'rtdee', 5: 'dob' }

    const currentComponent = computed(() => component[data.step] || null)
    const currentModel = computed(() => model[data.step] || null)

    // Handle Setup
    const handleSetup = async () => {
        const { updateData } = await import('../uses/data')
        const { useAccountStore } = await import('../stores/account')

        if (useAccountStore().data.guest) {
            useAccountStore().updateData({
                name: data.name,
                age: (new Date().getFullYear()) - data.dob['year'],
                gender: data.gender,
                height: data.height,
                rtdee: data.rtdee,
                dob: data.dob,
                weight: 0,
                setup: true
            })
        } else {
            useAccountStore().updateData({
                name: data.name,
                age: (new Date().getFullYear()) - data.dob['year'],
                gender: data.gender,
                height: data.height,
                rtdee: data.rtdee,
                dob: data.dob,
                weight: 0,
                setup: true
            })
            updateData({
                name: data.name,
                age: (new Date().getFullYear()) - data.dob['year'],
                gender: data.gender,
                height: data.height,
                rtdee: data.rtdee,
                dob: data.dob,
                weight: 0,
                setup: true
            })
        }
        setTimeout(() => {
            router.push('/')
        }, 1500);
    }
</script>

<template>
    <Transition name="fade" mode="out-in">
        <ProgressBar :value="data.step*18" :showValue="false"/>
    </Transition>
    <Transition name="fade" mode="out-in">
        <component :is="currentComponent" v-model="data[currentModel]" @incStep="data.step++" @decStep="data.step--" @setup="handleSetup"/>
    </Transition>
</template>

<style scoped>
    /* Progress Bar */
    .p-progressbar {
        margin-top: 2rem;
        margin-left: 2rem;
        margin-right: 2rem;
        border-radius: 3.125rem;
        height: 0.5rem;
    }

    .p-progressbar > * {
        border-radius: 3.125rem;
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
</style>
