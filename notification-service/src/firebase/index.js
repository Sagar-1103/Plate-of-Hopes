import firebase from "firebase-admin";
import serviceAccount from "./safeminder-10156-firebase-adminsdk-xta7q-1af2740477.json"

firebase.initializeApp({
    credential:firebase.credential.cert(serviceAccount)
})

export {firebase};