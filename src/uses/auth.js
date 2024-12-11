import { ref } from 'vue'

// Current user status
export const getCurrentUser = async () => {
    const { getAuth, onAuthStateChanged } = await import('firebase/auth')
    new Promise((resolve, reject) => {
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
export const loginUser = async (email, password) => {
    const error = ref(null)
    const {getAuth, signInWithEmailAndPassword } = await import('firebase/auth')
    await signInWithEmailAndPassword(getAuth(), email, password)
    .catch((err) => { error.value = err.code })
    return {error}
}
