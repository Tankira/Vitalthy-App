<script>
    const showHidePasswordButton = document.getElementsByClassName("showHidePasswordButton")
    const passwordInput = document.getElementById("password_input")

    function showHidePassword() {
        showHidePasswordButton.addEventListener("click", () => {
            console.log("ok")
            if (passwordInput.type = "password") {
                passwordInput.type = "text"
            }

            if (passwordInput.type = "text") {
                passwordInput.type = "password"
            }
        })
    }
</script>

<template>
    <div id="container" class="flex bg-gray-200 min-h-screen">
        <div class="bg-white shadow-2xl m-2 ml-auto p-12 pt-16 rounded-xl w-[38%] text-center side">
            <h1 class="font-bold text-4xl">Chào mừng!</h1>
            <p class="mt-4">Đăng nhập tài khoản của bạn để truy cập vào Vitalthy</p>
            <form class="flex flex-col mt-8 [&>input:not(:last-child)]:mb-4 *:outline-none [&>input]:bg-gray-200 [&>input]:rounded-lg [&>input]:w-full [&>input]:h-12">
                <input id="username_input" type="text" class="px-4" placeholder="Tên đăng nhập">
                <input id="password_input" type="password" class="px-4" placeholder="Mật khẩu">
                <button class="showHidePasswordButton absolute" @click="showHidePassword()" type="button">
                    <svg width="16px" height="16px" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" fill="#000000"><path fill-rule="evenodd" clip-rule="evenodd" d="M1 10c0-3.9 3.1-7 7-7s7 3.1 7 7h-1c0-3.3-2.7-6-6-6s-6 2.7-6 6H1zm4 0c0-1.7 1.3-3 3-3s3 1.3 3 3-1.3 3-3 3-3-1.3-3-3zm1 0c0 1.1.9 2 2 2s2-.9 2-2-.9-2-2-2-2 .9-2 2z"/></svg>
                </button>
            </form>
        </div>
    </div>
</template>
