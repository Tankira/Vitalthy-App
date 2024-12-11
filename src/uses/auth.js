// Current user status
export const getCurrentUser = async () => {
    const { getAuth, onAuthStateChanged } = await import('firebase/auth')
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
