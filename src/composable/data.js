import firebaseDatabase from '../index'
import { get, child, ref, set } from 'firebase/database'

// Create data
const createData = async (uid, dataObject) => {
    set(ref(firebaseDatabase, `users/${uid}`), dataObject)
    .catch((err) => { console.log(err) })
}

// Check data
const getData = async (uid) => {
    // await get(child(firebaseDatabase, `users/${uid}`))
    // .then((snapshot) => {
    //     if (snapshot.exists()) {
    //         console.log(snapshot.val());
    //       } else {
    //         console.log("No data available");
    //       }
    // })
    // .catch((error) => {
    //     console.error(error);
    //   });
    console.log(uid)
}

export {
    createData,
    getData
}
