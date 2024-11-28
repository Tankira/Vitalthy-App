<script setup>
    import { ref } from 'vue';
    import { useRouter } from 'vue-router'
    import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'
    import Logo from '../assets/logo.png'

    const router = useRouter()
    const auth = getAuth()
    const email = ref()
    const password = ref()
    const errorMsg = ref()
    
    // Login Handle
    async function login() {
        const userCredential = await signInWithEmailAndPassword(auth, email.value, password.value)
        .then(() => {
            router.push('/')
        })
        .catch((error) => {
            const errorCode = error.code
            switch (errorCode) {
                case "auth/invalid-credential":
                    errorMsg.value = "Email hoặc mật khẩu không đúng."
                    break;
                    
                case "auth/invalid-email":
                    errorMsg.value = "Email không hợp lệ."
                    break;
                        
                default:
                    errorMsg.value = `"Lỗi: ", ${errorCode}`;
                    break;
            }
        })
    }
</script>

<template>
    <div id="container" class="flex min-h-screen">
        <aside class="flex flex-col p-8 w-[40%]">
            <!-- Hello! -->
            <img class="w-10" :src="Logo">
            <h1 class="mt-6 font-bold text-xl leading-6">Chào mừng<br>đến với Vitalthy 💖</h1>
            <p class="mt-2 text-sm">Đăng nhập để tiếp tục</p>

            <!-- Form -->
            <form class="mt-8" @submit.prevent="login()">
                <!-- Email -->
                <div id="input-wrapper" class="relative flex flex-col">
                    <label for="">Email</label>
                    <input type="text" class="border-[#1330202A] bg-[var(--secondary-color)] mt-2 pl-12 border rounded-lg h-12 outline-none" placeholder="Email" v-model="email">
                    <svg class="absolute mt-11 ml-3" width="24px" height="24px" fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <g stroke="#999" stroke-linecap="round" stroke-width="1.5">
                            <path d="m17 20.5h-10c-3 0-5-1.5-5-5v-7c0-3.5 2-5 5-5h10c3 0 5 1.5 5 5v7c0 3.5-2 5-5 5z" stroke-linejoin="round" stroke-miterlimit="10"/>
                            <path d="m18.77 7.7688-5.547 4.2863c-0.7203 0.5565-1.7255 0.5565-2.4458 0l-5.547-4.2863"/>
                        </g>
                    </svg>
                </div>

                <!-- Password -->
                <div id="input-wrapper" class="relative flex flex-col mt-4">
                    <label for="">Mật khẩu</label>
                    <input type="password" class="border-[#1330202A] bg-[var(--secondary-color)] mt-2 pl-12 border rounded-lg h-12 outline-none" placeholder="Mật khẩu" v-model="password">
                    <svg class="absolute mt-11 ml-3" width="24px" height="24px" fill="#999" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path d="M17,9V7A5,5,0,0,0,7,7V9a3,3,0,0,0-3,3v7a3,3,0,0,0,3,3H17a3,3,0,0,0,3-3V12A3,3,0,0,0,17,9ZM9,7a3,3,0,0,1,6,0V9H9Zm9,12a1,1,0,0,1-1,1H7a1,1,0,0,1-1-1V12a1,1,0,0,1,1-1H17a1,1,0,0,1,1,1Z"/>
                    </svg>
                </div>

                <!-- Error? -->
                <p class="mt-4 text-red-600 text-sm">{{ errorMsg }}</p>

                <!-- Link Start! -->
                <button class="bg-[var(--primary-color)] mt-4 rounded-lg w-full h-12 font-bold text-lg text-white" type="submit">ĐĂNG NHẬP</button>
            </form>

            <!-- Seperate Bar -->
            <div class="flex items-center mt-4">
                <div class="flex-1 border-[#999] border h-0.5"></div>
                <p class="mx-4">HOẶC TIẾP TỤC VỚI</p>
                <div class="flex-1 border-[#999] border h-0.5"></div>
            </div>

            <!-- Additional OAuth -->
            <div class="flex justify-center items-center [&>button:not(:last-child)]:mr-4 mt-5">
                <button class="flex justify-center items-center border-[var(--primary-color)] p-3 border rounded-full">
                    <svg class="mr-2 fill-[var(--primary-color)" width="20px" height="20px" preserveAspectRatio="xMinYMin" viewBox="-2 -2 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path d="M4.376 8.068A5.944 5.944 0 0 0 4.056 10c0 .734.132 1.437.376 2.086a5.946 5.946 0 0 0 8.57 3.045h.001a5.96 5.96 0 0 0 2.564-3.043H10.22V8.132h9.605a10.019 10.019 0 0 1-.044 3.956 9.998 9.998 0 0 1-3.52 5.71A9.958 9.958 0 0 1 10 20 9.998 9.998 0 0 1 1.118 5.401 9.998 9.998 0 0 1 10 0c2.426 0 4.651.864 6.383 2.302l-3.24 2.652a5.948 5.948 0 0 0-8.767 3.114z"/>
                    </svg>
                    Google
                </button>
                <button class="flex justify-center items-center border-[var(--primary-color)] p-3 border rounded-full">
                    <svg class="mr-2 fill-[var(--primary-color)" width="20px" height="20px" preserveAspectRatio="xMinYMin" viewBox="-3.5 -2 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path d="M13.623 10.627c-.025-2.533 2.066-3.748 2.159-3.808-1.175-1.72-3.005-1.955-3.657-1.982-1.557-.158-3.039.917-3.83.917-.788 0-2.008-.894-3.3-.87C3.299 4.909 1.734 5.87.86 7.39c-1.764 3.06-.452 7.595 1.267 10.077.84 1.215 1.842 2.58 3.157 2.53 1.266-.05 1.745-.819 3.276-.819 1.531 0 1.962.82 3.302.795 1.363-.026 2.226-1.239 3.06-2.457.965-1.41 1.362-2.775 1.386-2.845-.03-.013-2.658-1.02-2.684-4.045zm-2.518-7.433c.698-.847 1.169-2.022 1.04-3.194C11.14.04 9.921.67 9.2 1.515c-.647.75-1.214 1.945-1.062 3.094 1.122.088 2.268-.57 2.967-1.415z"/>
                    </svg>
                    Apple
                </button>
            </div>
            
            <!-- Action Button / RouterLink -->
            <div class="flex justify-center items-center mt-auto">
                <RouterLink to="/register" class="flex-grow">Bạn chưa có tài khoản?</RouterLink>
                <RouterLink to="/forgot-password" class="text-right flex-grow">Bạn quên mật khẩu?</RouterLink>
            </div>
        </aside>
        <aside class="bg-slate-100 ml-auto w-[60%]"></aside>
    </div>
</template>
