<script setup>
    import { useRouter } from 'vue-router';
    import { PhPlanet, PhPlus, PhGearSix } from '@phosphor-icons/vue'
    import { reactive } from 'vue';
    const router = useRouter()
    const currentPath = router.currentRoute.value.path
    const selected = () => {
        switch (currentPath) {
            case '/':
                data.home_fill = 'fill'
                break;

            case '/option':
                data.home_fill = 'regular'
                data.option_fill = 'fill'
        
            default:
                break;
        }
    }

    const data = reactive({
        home_fill: 'regular',
        option_fill: 'regular',
    })

    selected()
</script>

<template>
    <div id="navbar-container">
        <button class="home" @click="$router.push('/')"><PhPlanet :size="28" :weight="data.home_fill"/></button>
        <button class="add-device"><PhPlus :size="24" weight="bold"/></button>
        <button class="settings" @click="$router.push('/option')"><PhGearSix :size="28" :weight="data.option_fill"/></button>
    </div>
</template>

<style scoped>
    #navbar-container {
        display: grid;
        align-self: end;
        background: var(--p-primary-contrast-color);
        grid-template-columns: repeat(3, min-content);
        justify-content: space-around;
        gap: 16px;
        padding-top: 16px;
        padding-bottom: 16px;
        /* position: fixed; */
        bottom: 0;
        /* border-top: solid 1px #9999998a; */
        width: 100%;
        height: 64px;
    }

    #navbar-container > button {
        border: none;
        background: none;
        width: 64px;
    }

    #navbar-container > button.add-device {
        color: black;
        background: var(--p-primary-color);
        border-radius: 50px;
        width: 64px;
    }
</style>
