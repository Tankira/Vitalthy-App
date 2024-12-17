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

    const createUser = async () => {
        const { getAuth, createUserWithEmailAndPassword } = await import('firebase/auth')
        const { useAccountStore } = await import('../stores/account')
        const { createData } = await import('../uses/data')

        try {
            data.loading = true
            const user = await createUserWithEmailAndPassword(getAuth(), data.email, data.password)
            useAccountStore().updateData({
                uid: user.user.uid,
                email: user.user.email,
                type: user.user.providerId,
                weight: 0,
                setup: false
            })
            createData(user.user.uid, {
                uid: user.user.uid,
                email: user.user.email,
                type: user.user.providerId,
                weight: 0,
                setup: false
            })
            router.push('/setup')
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
                case "auth/email-already-in-use":
                    data.error = 'Email này đã tồn tại'
                    errorTips.value = 'Email mà bạn dùng để đăng ký đã tồn tại, vui lòng thử lại với email khác.'
                    break
                case "auth/network-request-failed":
                    data.error = 'Không thể kết nối tới máy chủ xác thực'
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
        <form @submit.prevent="createUser">
            <FloatLabel variant="on">
                <InputText v-model="data.email" class="p-input" type="email" required fluid/>
                <label>Email</label>
            </FloatLabel>
            <FloatLabel variant="on">
                <Password v-model="data.password" class="p-input" :feedback="false" required fluid toggleMask/>
                <label>Mật khẩu</label>
            </FloatLabel>
            <Button label="Đăng ký" :loading="data.loading" type="submit" rounded fluid/>
            <Button icon="pi pi-user" label="Khách" @click="guestUser" rounded fluid/>
            <div class="oauth">
                <Button icon="pi pi-google" label="Google" rounded fluid/>
                <Button icon="pi pi-facebook" label="Facebook" rounded fluid/>
            </div>

        </form>
        <div class="last-component">
            <Button label="Quay về đăng nhập" as="router-link" to="/login" variant="outlined" rounded fluid/>
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
        text-decoration: none;
    }
</style>
