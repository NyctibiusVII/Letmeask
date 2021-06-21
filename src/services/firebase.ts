import firebase from 'firebase/app'

import 'firebase/auth'
import 'firebase/database'

type FirebaseConfig = {
    apiKey:            string | undefined
    authDomain:        string | undefined
    databaseURL:       string | undefined
    projectId:         string | undefined
    storageBucket:     string | undefined
    messagingSenderId: string | undefined
    appId:             string | undefined
    measurementId:     string | undefined
}

// - For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig: FirebaseConfig = {
    apiKey:            process.env.NEXT_PUBLIC_API_KEY,
    authDomain:        process.env.NEXT_PUBLIC_AUTH_DOMAIN,
    databaseURL:       process.env.NEXT_PUBLIC_DATABASE_URL,
    projectId:         process.env.NEXT_PUBLIC_PROJECT_ID,
    storageBucket:     process.env.NEXT_PUBLIC_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_MESSAGING_SENDER_ID,
    appId:             process.env.NEXT_PUBLIC_APP_ID,
    measurementId:     process.env.NEXT_PUBLIC_MEASUREMENT_ID
}

!firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app() // - If already initialized, use that one

export const auth     = firebase.auth()
export const database = firebase.database()