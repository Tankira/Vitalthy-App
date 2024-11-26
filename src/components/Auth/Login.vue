<script setup>
    import { ref } from 'vue';
    import { useRouter } from 'vue-router';
    import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';

    const router = useRouter()
    const email = ref("");
    const password = ref("");

    // Sign In Handle
    function loginHandle() {
        const errorElement = document.getElementById("error-element")
        const auth = getAuth()
        signInWithEmailAndPassword(auth, email.value, password.value)
        .then((userCredential) => {
            console.log("Đăng nhập thành công!")
            console.log(auth.currentUser)
            router.push('/')
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            if (errorCode === "auth/invalid-credential") {
                errorElement.classList.remove("hidden")
                errorElement.innerText = "Tài khoản hoặc mật khẩu không đúng."
            }
        })
    }

    // Password Eye Input Handle 
    function visibilityPass() {
        const passwordInput = document.getElementById("password-input");
        if (passwordInput.type === "password") {
            passwordInput.type = "text";
        } else {
            passwordInput.type = "password";
        }
    };

    function haveEnterPass() {
        const passwordInput = document.getElementById("password-input").value;
        const eyePassButton = document.getElementById("eye-pass");
        if (passwordInput.length > 0) {
            eyePassButton.classList.remove("hidden");
        } else {
            eyePassButton.classList.add("hidden");
        }
    };
</script>

<template>
    <div id="container" class="flex min-h-screen">
        <aside class="flex flex-col px-14 p-8 w-[60%] text-[var(--text-primary)]">

            <!-- Welcome -->
            <h1 class="font-bold text-[32px] leading-10">Chào mừng<br>đến với Vitalthy 💖</h1>
            <p class="leading-[50px]">Đăng nhập để tiếp tục</p>

            <!-- Another OAuth -->
            <div class="flex mt-4 [&>button:not(:last-child)]:mr-4 font-bold another-oauth">
                <button class="flex flex-1 justify-center items-center border-[var(--text-primary)] border rounded-lg h-[60px] google-auth">
                    <svg class="mr-2 fill-[var(--text-primary)]" width="24px" height="24px" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M8 7v2.4h3.97c-.16 1.03-1.2 3.02-3.97 3.02-2.39 0-4.34-1.98-4.34-4.42S5.61 3.58 8 3.58c1.36 0 2.27.58 2.79 1.08l1.9-1.83C11.47 1.69 9.89 1 8 1 4.13 1 1 4.13 1 8s3.13 7 7 7c4.04 0 6.72-2.84 6.72-6.84 0-.46-.05-.81-.11-1.16H8z"/></svg>
                    Tiếp tục với Google
                </button>
                <button class="flex flex-1 justify-center items-center border-[var(--text-primary)] border rounded-lg h-[60px] apple-auth">
                    <svg class="mr-2 fill-[var(--text-primary)]" width="24px" height="24px" viewBox="-2 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="m20.091 17.524c-.451 1.375-1.053 2.569-1.805 3.651l.03-.046q-1.861 2.827-3.706 2.827c-.739-.052-1.426-.217-2.064-.478l.044.016c-.642-.267-1.387-.434-2.167-.461h-.011c-.747.029-1.447.201-2.083.49l.035-.014c-.556.269-1.204.445-1.889.49l-.015.001q-2.192 0-4.342-3.735c-1.269-2.072-2.048-4.565-2.12-7.236v-.02c-.005-.107-.008-.233-.008-.36 0-1.892.614-3.641 1.654-5.059l-.017.024c.92-1.266 2.395-2.08 4.061-2.08h.037-.002c.922.031 1.796.187 2.621.452l-.068-.019c.578.201 1.252.354 1.95.428l.041.004c.759-.067 1.459-.241 2.111-.508l-.048.017c.738-.279 1.591-.456 2.48-.49h.015.07c1.123 0 2.164.351 3.019.949l-.017-.011c.572.416 1.066.89 1.488 1.424l.012.016c-.62.5-1.161 1.059-1.627 1.678l-.017.024c-.587.823-.938 1.85-.938 2.958v.029-.001.062c0 1.181.373 2.275 1.007 3.171l-.012-.017c.53.842 1.316 1.481 2.248 1.814l.031.01zm-5.423-16.918c-.02.712-.172 1.383-.432 1.998l.014-.036c-.323.778-.776 1.441-1.34 1.992l-.001.001c-.423.452-.944.807-1.53 1.031l-.028.009c-.437.12-.949.207-1.475.243l-.025.001c0-.008 0-.018 0-.028 0-1.372.42-2.647 1.139-3.701l-.015.023c.874-1.114 2.132-1.891 3.572-2.134l.034-.005c.013.043.026.097.035.152l.001.008c.01.063.023.117.039.17l-.003-.01q0 .058.007.144t.007.142z"/></svg>
                    Tiếp tục với Apple
                </button>
            </div>

            <!-- Seperate Bar -->
            <div class="flex items-center mt-4 seperate-bar">
                <div class="flex-1 border-gray-300 border h-[.125rem]"></div>
                <p class="mx-4 text-sm">HOẶC</p>
                <div class="flex-1 border-gray-300 border h-[.125rem]"></div>
            </div>

            <!-- Login via email Form -->
            <form class="flex flex-col [&>div.input-wrapper:not(:last-child)]:mb-6 mt-4">
                <!-- Email Input -->
                <div class="relative flex email-input-container input-wrapper">
                    <svg class="absolute mt-5 ml-6 w-5 h-5 fill-[var(--text-primary)]" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 16"><path d="m10.036 8.278 9.258-7.79A1.979 1.979 0 0 0 18 0H2A1.987 1.987 0 0 0 .641.541l9.395 7.737Z"/><path d="M11.241 9.817c-.36.275-.801.425-1.255.427-.428 0-.845-.138-1.187-.395L0 2.6V14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2.5l-8.759 7.317Z"/></svg>
                    <input id="email-input" type="email" class="flex-1 border-[var(--text-primary)] bg-[#1330200D] px-16 border rounded-lg h-[60px] placeholder:text-[var(--text-primary)] outline-none" placeholder="Email" v-model="email">
                </div>
                <!-- Password Input -->
                <div class="relative flex input-wrapper password-input-container">
                    <svg class="absolute mt-5 ml-6 w-5 h-5 fill-[var(--text-primary)]" viewBox="0 0 15 15" xmlns="http://www.w3.org/2000/svg"><path d="M11 11H10V10H11V11Z"/><path d="M8 11H9V10H8V11Z" fill="#000000"/><path d="M13 11H12V10H13V11Z"/><path fill-rule="evenodd" clip-rule="evenodd" d="M3 6V3.5C3 1.567 4.567 0 6.5 0C8.433 0 10 1.567 10 3.5V6H11.5C12.3284 6 13 6.67157 13 7.5V8.05001C14.1411 8.28164 15 9.29052 15 10.5C15 11.7095 14.1411 12.7184 13 12.95V13.5C13 14.3284 12.3284 15 11.5 15H1.5C0.671573 15 0 14.3284 0 13.5V7.5C0 6.67157 0.671573 6 1.5 6H3ZM4 3.5C4 2.11929 5.11929 1 6.5 1C7.88071 1 9 2.11929 9 3.5V6H4V3.5ZM8.5 9C7.67157 9 7 9.67157 7 10.5C7 11.3284 7.67157 12 8.5 12H12.5C13.3284 12 14 11.3284 14 10.5C14 9.67157 13.3284 9 12.5 9H8.5Z"/></svg>
                    <input id="password-input" type="password" class="flex-1 border-[var(--text-primary)] bg-[#1330200D] px-16 border rounded-lg h-[60px] placeholder:text-[var(--text-primary)] outline-none" placeholder="Mật khẩu" @keyup="haveEnterPass()" @keyup.enter="loginHandle()" v-model="password">
                    <button id="eye-pass" class="right-0 absolute hidden mt-5 mr-8 w-5 h-5 fill-[var(--text-primary)]" type="button" @click="visibilityPass()">
                        <svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M1 10c0-3.9 3.1-7 7-7s7 3.1 7 7h-1c0-3.3-2.7-6-6-6s-6 2.7-6 6H1zm4 0c0-1.7 1.3-3 3-3s3 1.3 3 3-1.3 3-3 3-3-1.3-3-3zm1 0c0 1.1.9 2 2 2s2-.9 2-2-.9-2-2-2-2 .9-2 2z"/></svg>
                    </button>
                </div>
                <!-- Error? Are u forgot ur pass? -->
                <div class="flex">
                    <p id="error-element" class="flex-[2] hidden text-left text-red-600">Error</p>
                    <p class="text-right flex-1">Bạn quên mật khẩu?</p>
                </div>

                <!-- Link start! -->
                <button class="mt-6 rounded-lg h-[60px] font-bold bg-[var(--text-primary)] text-lg text-white" type="button" @click="loginHandle()">Đăng nhập</button>
            </form>

            <!-- Register Redirect -->
            <RouterLink to="/register" class="mt-auto text-center">Bạn chưa có tài khoản?</RouterLink>

        </aside>
        <aside class="bg-slate-400 m-6 ml-auto rounded-lg w-[40%]"></aside>
    </div>
</template>
