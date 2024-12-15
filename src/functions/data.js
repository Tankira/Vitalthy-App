// Create Data - OVERWRITE ALL DATA!
const createUserData = async (uid, data) => {
    const { firebaseData } = await import('../index')
    const { set, ref } = await import('firebase/database')
    
    await set(ref(firebaseData, `users/${uid}`), data)
}

// Update user data
const updateData = async (data) => {
    const { firebaseData } = await import('../index')
    const { getAuth } = await import('firebase/auth')
    const { update, ref } = await import('firebase/database')
    const uid = await getAuth().currentUser.uid
    
    await update(ref(firebaseData, `users/${uid}`), data)
}

// Read all Data
const readData = async (uid) => {
    const { firebaseData } = await import('../index')
    const { ref, onValue } = await import('firebase/database')

    return new Promise((resolve, reject) => {
        onValue(ref(firebaseData, `users/${uid}`), (snapshot) => {
            if (snapshot.exists) {
                resolve(snapshot.val())
            } else {
                reject(new Error('Data not found.'))
            }
        })
    })
}

export {
    createUserData,
    updateData,
    readData
}
