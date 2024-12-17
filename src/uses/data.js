// Create Data - Overwrite all data
const createData = async (uid, data) => {
    const { firebaseData } = await import('../index')
    const { set, ref } = await import('firebase/database')
    
    set(ref(firebaseData, `users/${uid}`), data)
}

const updateData = async (data) => {
    const { firebaseData } = await import('../index')
    const { getAuth } = await import('firebase/auth');
    const { update, ref } = await import('firebase/database')
    const uid = getAuth().currentUser.uid

    update(ref(firebaseData, `users/${uid}`), data)
}

// Read all data in document
const readData = async (uid) => {
    const { firebaseData } = await import('../index')
    const { onValue, ref } = await import('firebase/database')

    return new Promise((resolve, reject) => {
        onValue(ref(firebaseData, `users/${uid}`), (snapshot) => {
            if (snapshot.exists()) {
                resolve(snapshot.val())
            } else {
                reject(new Error('Data not found'))
            }
        })
    })
}

export {
    createData,
    updateData,
    readData
}
