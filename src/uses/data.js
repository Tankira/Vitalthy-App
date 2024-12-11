import { ref as vref } from 'vue'
export const createData = async (uid, dataObject) => {
    const { firebaseDatabase } = await import('../index')
    const { ref, set } = await import('firebase/database')
    await set(ref(firebaseDatabase, `users/${uid}`), dataObject)
}

export const readData = async (uid, data) => {
    const { firebaseDatabase } = await import('../index')
    const { ref, onValue } = await import('firebase/database')

    return new Promise((resolve, reject) => {
        onValue(ref(firebaseDatabase, `users/${uid}`), (snapshot) => {
            if (snapshot.val()) {resolve(snapshot.val()[data])}
            else {reject(new Error('Data not found'))}
        }),
        (err) => {
            reject(err)
        }
    })
}
