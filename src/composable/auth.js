import { ref } from "vue"
import { getAuth, onAuthStateChanged, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth"

// Is user? Is logged in?
const getCurrentUser = async () => {
    return new Promise((resolve, reject) => {
        const cancelListener = onAuthStateChanged(
            getAuth(),
            (user) => {
                cancelListener()
                resolve(user)
            },
            (err) => {
                cancelListener()
                reject(err)
            }
        )
    })
}

// Login
const loginUser = async (email, password) => {
    let success = false
    const error = ref(null)
    const user = await signInWithEmailAndPassword(getAuth(), email, password)
    .then(() => {
        success = true
    })
    .catch((err) => {
        switch (err.code) {
            case "auth/invalid-credential":
                error.value = "Email hoặc mật khẩu không đúng."
                break

            case "auth/invalid-email":
                error.value = "Email không hợp lệ."
                break

            case "auth/missing-email":
                error.value = "Vui lòng nhập email"
                break

            case "auth/missing-password":
                error.value = "Vui lòng nhập mật khẩu"
                break
                    
            default:
                error.value = `Lỗi: ${err.code}`
                break
        }
    })

    return {success, error}
}

const createUser = async (email, password) => {
    let success = false
    const error = ref(null)
    const user = await createUserWithEmailAndPassword(getAuth(), email, password)
    .then(() => {
        success = true
    })
    .catch((err) => {
        switch (err.code) {
            case "auth/invalid-credential":
                error.value = "Email hoặc mật khẩu không đúng."
                break

            case "auth/invalid-email":
                error.value = "Email không hợp lệ."
                break

            case "auth/missing-email":
                error.value = "Vui lòng nhập email"
                break

            case "auth/missing-password":
                error.value = "Vui lòng nhập mật khẩu"
                break
                    
            default:
                error.value = `Lỗi: ${err.code}`
                break
        }
    })

    return {success, error}
}

export {
    getCurrentUser,
    loginUser,
    createUser
}
