<script setup>
    import { ref } from 'vue';
    import { RouterLink, useRouter } from 'vue-router';
    import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
    const router = useRouter()
    const email = ref()
    const password = ref()
    const errorMsg = ref()

    // Register Handle
    function register() {
        createUserWithEmailAndPassword(getAuth(), email.value, password.value)
        .then((userCredential) => {
            console.log("OK")
        })
        .catch((error) => {
            const errorCode = error.code
            switch (errorCode) {
                case "auth/email-already-in-use":
                    errorMsg.value = "Email đã tồn tại"
                    break;
                    
                case "auth/invalid-email":
                    errorMsg.value = "Email không hợp lệ"
                    break;

                default:
                    errorMsg.value = `"Lỗi: ", errorCode`;
                    break;
            }
        })
    }

    // Password Visibility
    function visibilePass() {
        const passwordInput = document.getElementById("password-input")
        passwordInput.type = (passwordInput.type === "password") ? "text" : "password"
    }
</script>

<template>
    <div id="container" class="flex min-h-screen">
        <aside class="flex flex-col px-16 py-10 w-[55%] text-[var(--primary-color)]">
            <!-- Welcome Text -->
            <h1 class="font-bold text-2xl">Chào mừng<br>đến với Vitalthy 💖</h1>
            <h1 class="text-sm leading-10">Đăng ký để tiếp tục</h1>

            <!-- Form -->
            <form class="flex flex-col mt-8 [&>div>input]:h-12 [&>div>input]:bg-[var(--secondary-color)] [&>div>input]:border [&>div>input]:border-[#1330204A] [&>div>input]:rounded-lg [&>div>input]:outline-none [&>div>input]:pl-14 [&>#input-wrapper:not(:last-child)]:mb-4" @submit.prevent="register()">
                <!-- Email -->
                <div id="input-wrapper" class="relative flex flex-col">
                    <label for="email-input">Email</label>
                    <input name="email-input" type="email" placeholder="Email" class="mt-2" v-model="email">
                    <svg class="absolute mt-[2.8rem] ml-4 stroke-[#999]" xmlns="http://www.w3.org/2000/svg" width="24"  height="24" viewBox="0 0 24 24" fill="none" stroke-width="2" stroke-linecap="round"  stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M3 7a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v10a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2v-10z" /><path d="M3 7l9 6l9 -6" /></svg>
                </div>

                <!-- Password -->
                <div id="input-wrapper" class="relative flex flex-col">
                    <label for="password-input">Mật khẩu</label>
                    <input id="password-input" name="password-input" type="password" placeholder="Mật khẩu" class="mt-2" v-model="password">
                    <svg class="absolute mt-[2.8rem] ml-4 stroke-[#999]" xmlns="http://www.w3.org/2000/svg" width="24"  height="24" viewBox="0 0 24 24" fill="none" stroke-width="2" stroke-linecap="round"  stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M5 13a2 2 0 0 1 2 -2h10a2 2 0 0 1 2 2v6a2 2 0 0 1 -2 2h-10a2 2 0 0 1 -2 -2v-6z" /><path d="M11 16a1 1 0 1 0 2 0a1 1 0 0 0 -2 0" /><path d="M8 11v-4a4 4 0 1 1 8 0v4" /></svg>
                    <button id="eye-pass" class="right-0 absolute mt-[2.8rem] mr-4" type="button" @click="visibilePass()">
                        <svg class="stroke-[#999]" xmlns="http://www.w3.org/2000/svg" width="24"  height="24" viewBox="0 0 24 24" fill="none" stroke-width="2" stroke-linecap="round"  stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M10 12a2 2 0 1 0 4 0a2 2 0 0 0 -4 0" /><path d="M21 12c-2.4 4 -5.4 6 -9 6c-3.6 0 -6.6 -2 -9 -6c2.4 -4 5.4 -6 9 -6c3.6 0 6.6 2 9 6" /></svg>
                    </button>
                </div>

                <!-- Error? Are u forgot ur pass? -->
                <div class="flex text-sm">
                    <p class="flex-[2] text-left text-red-600">{{errorMsg}}</p>
                </div>

                <!-- Link start! -->
                <button class="bg-[var(--primary-color)] mt-6 rounded-lg h-12 font-bold text-lg text-white" type="submit" >Đăng ký
                </button>
            </form>

            <!-- Another OAuth -->
            <button id="google-oauth" class="flex justify-center items-center border-[var(--primary-color)] mt-4 border rounded-lg h-12">
                <svg class="mr-2 fill-[var(--text-primary)]" width="24px" height="24px" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M8 7v2.4h3.97c-.16 1.03-1.2 3.02-3.97 3.02-2.39 0-4.34-1.98-4.34-4.42S5.61 3.58 8 3.58c1.36 0 2.27.58 2.79 1.08l1.9-1.83C11.47 1.69 9.89 1 8 1 4.13 1 1 4.13 1 8s3.13 7 7 7c4.04 0 6.72-2.84 6.72-6.84 0-.46-.05-.81-.11-1.16H8z"/></svg>
                Tiếp tục với Google
            </button>

            <!-- You have an account?? -->
            <RouterLink to="/login" class="mt-auto text-center">Bạn đã có tài khoản rồi?</RouterLink>
        </aside>
        <aside class="bg-sky-200 ml-auto w-[45%]"></aside>
    </div>
</template>
