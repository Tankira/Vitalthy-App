<script setup>
    import '../assets/styles/auth.css'
    import { ref } from 'vue';
    import { useRouter } from 'vue-router'
    import { FloatLabel, InputText, Password, Button, Dialog } from 'primevue';

    let loading = ref(null)
    let visible = ref(null)
    const router = useRouter()
    const email = ref(null)
    const password = ref(null)
    const error = ref(null)

    // Handle Login
    const loginUser = async () => {
        loading.value = true
        const {getAuth, signInWithEmailAndPassword} = await import('firebase/auth')
        await signInWithEmailAndPassword(getAuth(), email.value, password.value)
        .then((user) => router.push('/'))
        .catch((err) => {
            loading.value = false
            visible.value = true
            switch (err.code) {
                case "auth/invalid-email":
                    error.value = 'Email không hợp lệ.'
                    break

                case "auth/missing-email":
                    error.value = 'Vui lòng nhập email.'
                    break

                case "auth/missing-password":
                    error.value = 'Vui lòng nhập mật khẩu.'
                    break
            
                case "auth/invalid-credential":
                    error.value = 'Email hoặc mật khẩu không đúng.'
                    break
                    
                default:
                    error.value = `Lỗi: ${err.code}`
                    break
            }
        })
    }
</script>

<template>
    <div id='container'>
        <h1>Vitalthy</h1>
        <form @submit.prevent="loginUser()">

            <!-- Email Input -->
            <FloatLabel variant="on">
                <InputText v-model="email" type="email" variant="filled" size="large" required fluid/>
                <label>Email</label>
            </FloatLabel>

            <!-- Password Input -->
            <FloatLabel variant="on">
                <Password v-model="password" variant="filled" size="large" :feedback="false" required toggleMask fluid/>
                <label>Mật khẩu</label>
            </FloatLabel>

            <!-- Link start! -->
            <Button label="Đăng nhập" :loading="loading" size="large" type="submit" fluid rounded/>
            
            <!-- Another OAuth -->
            <div class="oauth">
                <Button icon="pi pi-google" label="Google" size="large" rounded/>
                <Button icon="pi pi-apple" label="Apple" size="large" rounded/>
            </div>

            <!-- RouterLink -->
            <RouterLink to="/" style="margin-top: 16px;">Bạn quên mật khẩu?</RouterLink>
            
        </form>
        <div class="last-component">
            <Button as="router-link" to="/register" rounded size="large" variant="outlined">Tạo tài khoản mới</Button>
            <p>From Sơn Phước Primary & Secondary School with love 💖</p>
        </div>
    </div>

    <Dialog v-model:visible="visible" :header="error" modal>
    </Dialog>
</template>
