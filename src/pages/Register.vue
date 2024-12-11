<script setup>
    import '../assets/styles/auth.css'
    import { FloatLabel, InputText, Password, Button, } from 'primevue';
</script>

<template>
    <div id='container'>
        <h1>Vitalthy</h1>
        <form>

            <!-- Email Input -->
            <FloatLabel variant="on">
                <InputText type="email" variant="filled" size="large" fluid/>
                <label>Email</label>
            </FloatLabel>

            <!-- Password Input -->
            <FloatLabel variant="on">
                <Password variant="filled" size="large" :feedback="false" toggleMask fluid/>
                <label>Mật khẩu</label>
            </FloatLabel>

            <!-- Link start! -->
            <Button label="ĐĂNG KÝ" size="large" fluid rounded/>
            
            <!-- Another OAuth -->
            <div class="oauth">
                <Button icon="pi pi-google" label="Google" size="large" rounded/>
                <Button icon="pi pi-apple" label="Apple" size="large" rounded/>
            </div>
            
        </form>
        <Button as="router-link" to="/login" rounded size="large" variant="outlined">Bạn đã có tài khoản?</Button>
        <p>From Sơn Phước Primary & Secondary School with love 💖</p>
    </div>
</template>
