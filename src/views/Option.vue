<script setup>
    import { reactive, computed } from 'vue';
    import { Avatar, Button, Dialog, ConfirmDialog, useConfirm } from 'primevue';
    import { useAccountStore } from '../stores/account'
    import { useRouter } from 'vue-router';
    import Navbar from '../components/navbar/Navbar.vue'

    const confirm = useConfirm()
    const router = useRouter()
    const data = reactive({
        name: useAccountStore().data.user.name,
        time: computed(() => { 
            if (new Date().getHours() > 4 && new Date().getHours() < 12) {
                return 'buổi sáng'
            } else if (new Date().getHours() > 12 && new Date().getHours() < 18) {
                return 'buổi chiều'
            } else {
                return 'buổi tối'
            }
        }),
        error: null,
        errorTips: null,
        optionPage: true,
        accountPage: null,
    })

    // handle Sign Out
    const logOut = async () => {
        const { getAuth, signOut } = await import('firebase/auth')

        confirm.require({
            header: 'Bạn chắc chắn chứ?',
            message: 'Bạn có chắc chắn đăng xuất tài khoản của mình ra không?',
            icon: 'pi pi-exclamation-circle',
            rejectProps: {
                label: 'Không',
                severity: 'secondary',
                outlined: true
            },
            acceptProps: {
                label: 'Có'
            },
            accept: () => {useAccountStore().updateData({logOut: true}); signOut(getAuth()); router.push('/login')},
            reject: () => {}
        })
    }
</script>

<template>
    <Transition name="fade" mode="out-in">
        <div v-if="data.optionPage" id="container">
            <div class="tips">
                <div>
                    <h2>Xin chào, {{ data.name }}!</h2>
                    <p>Chúc bạn {{ data.time }} vui vẻ! ✨</p>
                </div>
                <Avatar image="./src/assets/image/avatar.png" size="large" shape="circle"/>
            </div>
            <div class="component">
            <h4>Cài đặt chung</h4>
                <Button icon="pi pi-user" label="Thông tin của tôi" @click="data.optionPage = false; data.accountPage = true" fluid/>
                <Button icon="pi pi-globe" label="Ngôn ngữ" @click="data.error = 'Tính năng đang được phát triển'" fluid/>
                <Button icon="pi pi-star-fill" label="Đánh giá" @click="data.error = 'Tính năng đang được phát triển'" fluid/>
                <Button icon="pi pi-pen-to-square" label="Góp ý" @click="data.error = 'Tính năng đang được phát triển'" fluid/>
                <Button icon="pi pi-info-circle" label="Credit" fluid/>
            </div>
            <Button label="Đăng xuất" @click="logOut" rounded fluid/>
        </div>
    </Transition>
    <ConfirmDialog style="width: 80%;"></ConfirmDialog>
    <Dialog v-model:visible="data.error" :header="data.error" modal>
        {{ data.errorTips }}
    </Dialog>
    <Navbar/>

    <Transition name="fade" mode="out-in">
        <div v-if="data.accountPage" id="account-container">
            <Button></Button>
        </div>
    </Transition>
</template>

<style scoped>
    #container, #account-container {
        display: grid;
        gap: 2rem;
        padding: 2rem;
    }

    #container > .tips {
        display: grid;
        align-items: center;
        grid-template-columns: 1fr min-content;
    }

    #container > .component > .p-button {
        color: light-darK(#000, #fff);
        background: #aaaaaa5a;
        justify-content: left;
        margin-top: 1rem;
        padding-left: 1rem;
        height: 4rem;
        border: transparent;
    }
    
    .p-button {
        height: 4rem
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
