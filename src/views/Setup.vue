<script setup>
    import { ProgressBar } from 'primevue';
    import { defineAsyncComponent, reactive, computed } from 'vue';
    import { useRouter } from 'vue-router';
    const router = useRouter()
    const Name = defineAsyncComponent(() => import('../components/setup/Name.vue'))
    const Gender = defineAsyncComponent(() => import('../components/setup/Gender.vue'))
    const Height = defineAsyncComponent(() => import('../components/setup/Height.vue'))
    const DateOfBirth = defineAsyncComponent(() => import('../components/setup/DateOfBirth.vue'))
    const Done = defineAsyncComponent(() => import('../components/setup/Done.vue'))

    const data = reactive({
        name: '',
        gender: null,
        height: 140,
        dateOfBirth: {day: 1, month: 1, year: 2024},
        step: 1,
    })

    const steps = {
        1: Name,
        2: Gender,
        3: Height,
        4: DateOfBirth,
        5: Done
    }

    const model = {
        1: "name",
        2: "gender",
        3: "height",
        4: "dateOfBirth"
    }

    const currentComponent = computed(() => steps[data.step] || null)
    const currentModel = computed(() => model[data.step] || null)

    const setup = async () => {
        const { updateData } = await import('../functions/data')
        const { useAccountStore } = await import('../stores/account')

        if (useAccountStore().data.guest) {
            useAccountStore().updateData({
                name: data.name,
                gender: data.gender,
                height: (data.height/100),
                dateOfBirth: data.dateOfBirth,
                weight: 0,
                setup: true,
            })
        } else {
            useAccountStore().updateData({
                name: data.name,
                gender: data.gender,
                height: (data.height/100),
                dateOfBirth: data.dateOfBirth,
                weight: 0,
                setup: true,
            })
            
            updateData({
                name: data.name,
                gender: data.gender,
                height: (data.height/100),
                dateOfBirth: data.dateOfBirth,
                weight: 0,
                setup: true
            })
        }

        setTimeout(() => {
            router.push('/')
        }, 3000)
    }
</script>

<template>
    
    <Transition name="fade" mode="out-in">
        <ProgressBar v-if="data.step < 5" :value="data.step*20" :showValue="false"/>
    </Transition>
    <Transition name="fade" mode="out-in">
        <component :is="currentComponent" v-model="data[currentModel]" @incStep="data.step++" @decStep="data.step--" @setup="setup"/>
    </Transition>
</template>

<style scoped>
    .p-progressbar {
        margin: 32px;
        margin-bottom: 12px;
        border-radius: 50px;
    }
    
    .p-progressbar > * {
        border-radius: 50px !important;
    }

    .fade-enter-active,
    .fade-leave-active {
        transition: opacity 0.5s ease;
    }

    .fade-enter-from,
    .fade-leave-to {
        opacity: 0;
    }
</style>
