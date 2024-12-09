<script setup>
    import '../assets/styles/auth.css'
    import { ref } from 'vue';
    import { FloatLabel, InputText, Password, Button } from 'primevue';
    import { loginUser } from '../composable/auth';
    import { useRouter } from 'vue-router';

    const router = useRouter()
    const email = ref(null)
    const password = ref(null)
    const errorMsg = ref(null)

    // handle Login
    const handleLogin = async () => {
        const {success, error} = await loginUser(email.value, password.value)
        if (success) {
            router.push('/')
        } else {
            errorMsg.value = error.value
        }
    }
</script>

<template>
    <div id='container'>
        <h1>Vitalthy</h1>
        <form @submit.prevent="handleLogin()">
            <!-- Email input -->
            <FloatLabel variant='on'>
                <InputText v-model='email' style="height: 64px;" type="email" fluid/>
                <label>Email</label>
            </FloatLabel>
            <!-- Password input -->
            <FloatLabel variant='on'>
                <Password v-model='password' style="height: 64px;" toggleMask fluid/>
                <label>Mật khẩu</label>
            </FloatLabel>
            <!-- Error Message -->
            <p style="text-align: left;">{{ errorMsg }}</p>
            <!-- Link start! -->
            <Button label="ĐĂNG NHẬP" style="height: 64px;" type="submit" rounded/>
            <!-- Oauth -->
            <div id="oauth-container">
                <Button label="Google" style="height: 64px;" rounded/>
                <Button label="Apple" style="height: 64px;" rounded/>
            </div>
            <!-- RouterLink - Forgot Password -->
            <RouterLink to='/register' style="margin-top: 24px;">Bạn quên mật khẩu?</RouterLink>
        </form>
        <RouterLink to='/register'>Tạo tài khoản mới</RouterLink>
    </div>
</template>
