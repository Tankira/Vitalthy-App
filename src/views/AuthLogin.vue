<script setup>
    import { FloatLabel, InputText, Password, Button, Dialog } from 'primevue'
    import { reactive } from 'vue'
    import { useRouter } from 'vue-router'

    const router = useRouter()

    const data = reactive({
        email: null,
        password: null,
        error: null,
        errorTips: null,
        loading: null
    })

    const loginUser = async () => {
        const { getAuth, signInWithEmailAndPassword } = await import('firebase/auth')

        try {
            data.loading = true
            await signInWithEmailAndPassword(getAuth(), data.email, data.password)
            router.push('/')
        } 
        catch (error) {
            data.loading = false
            switch (error.code) {
                case "auth/invalid-email":
                    data.error = 'Email không hợp lệ.'
                    break
                case "auth/missing-email":
                    data.error = 'Vui lòng nhập email.'
                    break
                case "auth/missing-password":
                    data.error = 'Vui lòng nhập mật khẩu.'
                    break
                case "auth/invalid-credential":
                    data.error = 'Email hoặc mật khẩu không đúng.'
                    break
                case "auth/network-request-failed":
                    error.value = 'Không thể kết nối tới máy chủ xác thực'
                    data.errorTips = 'Kiểm tra lại đã bật Wi-fi, 4G chưa, rồi đăng nhập lại bạn nhé! Nếu vẫn không được, hãy báo cáo với nhà phát triển để được hỗ trợ'
                    break
                default:
                    data.error = `Lỗi: ${error.code}`
                    data.errorTips = 'Vui lòng báo cáo với Nhà Phát Triển để được hỗ trợ.'
                    break
            }
        }
    }

    const guestUser = async () => {
        const { useAccountStore } = await import('../stores/account')
        useAccountStore().updateData({type: 'guest', setup: false})
        router.push('/setup')
    }
</script>

<template>
    <div id="container">
        <h1>Vitalthy</h1>
        <form @submit.prevent="loginUser">
            <FloatLabel variant="on">
                <InputText v-model="data.email" class="p-input" type="email" required fluid/>
                <label>Email</label>
            </FloatLabel>
            <FloatLabel variant="on">
                <Password v-model="data.password" class="p-input" :feedback="false" required fluid toggleMask/>
                <label>Mật khẩu</label>
            </FloatLabel>
            <Button label="Đăng nhập" :loading="data.loading" type="submit" rounded fluid/>
            <Button icon="pi pi-user" label="Khách" @click="guestUser" rounded fluid/>
            <div class="oauth">
                <Button icon="pi pi-google" label="Google" rounded fluid/>
                <Button icon="pi pi-facebook" label="Facebook" rounded fluid/>
            </div>

        </form>
        <div class="last-component">
            <Button label="Tạo tài khoản" as="router-link" to="/register" variant="outlined" rounded fluid/>
            <p>From Sơn Phước Primary & Secondary School with love  💖</p>
        </div>
    </div>

    <Dialog v-model:visible="data.error" :header="data.error" modal style="width: 80%;">
        {{ data.errorTips }}
    </Dialog>
</template>

<style scoped>
    #container {
        display: grid;
        grid-template-rows: 0.5fr auto 1fr;
        text-align: center;
        height: 100vh;
        padding: 2rem;
    }

    #container > h1 {
        align-self: center;
        font-size: 42px;
    }

    #container > form {
        display: grid;
        gap: 1rem;
    }

    #container > form > .oauth {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 1rem;
    }

    #container > .last-component {
        align-self: end;
        display: grid;
        gap: 1rem;
        font-size: 12px;
        color: #999;
    }

    .p-input {
        height: 4rem;
    }

    .p-button {
        height: 3.5rem;
    }

    * a {
        text-decoration: none
    }
</style>
