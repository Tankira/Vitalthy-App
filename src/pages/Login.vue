<script setup>
    import '../assets/styles/auth.css'
    import { ref } from 'vue';
    import { FloatLabel, InputText, Password, Button, Dialog } from 'primevue';
    import { loginUser } from '../uses/auth';

    let loading = ref(null)
    let visible = ref(null)
    const email = ref(null)
    const password = ref(null)
    const errorMsg = ref(null)

    // Handle Login
    async function handleLogin() {
        loading.value = true
        const {error} = await loginUser(email.value, password.value)
        visible.value = true
        errorMsg.value = error.value
        if (visible.value) { loading.value = false }
    }
</script>

<template>
    <div id='container'>
        <h1>Vitalthy</h1>
        <form @submit.prevent="handleLogin()">

            <!-- Email Input -->
            <FloatLabel variant="on">
                <InputText v-model="email" type="email" variant="filled" size="large" fluid/>
                <label>Email</label>
            </FloatLabel>

            <!-- Password Input -->
            <FloatLabel variant="on">
                <Password v-model="password" variant="filled" size="large" :feedback="false" toggleMask fluid/>
                <label>Mật khẩu</label>
            </FloatLabel>

            <!-- Link start! -->
            <Button label="ĐĂNG NHẬP" :loading="loading" size="large" type="submit" fluid rounded/>
            
            <!-- Another OAuth -->
            <div class="oauth">
                <Button icon="pi pi-google" label="Google" size="large" rounded/>
                <Button icon="pi pi-apple" label="Apple" size="large" rounded/>
            </div>

            <!-- RouterLink -->
            <RouterLink to="/" style="margin-top: 24px;">Bạn quên mật khẩu?</RouterLink>
            
        </form>
        <Button as="router-link" to="/register" rounded size="large" variant="outlined">Tạo tài khoản mới</Button>
        <p>From Sơn Phước Primary & Secondary School with love 💖</p>
    </div>

    <Dialog v-model:visible="visible" :header="errorMsg" modal>
    </Dialog>
</template>
