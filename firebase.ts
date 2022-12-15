import { initializeApp, getApps } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
    apiKey: 'AIzaSyAFQgvHpUL7iLf5KJCARjToIaKNN96zkGo',
    authDomain: 'glitter-c7d48.firebaseapp.com',
    projectId: 'glitter-c7d48',
    storageBucket: 'glitter-c7d48.appspot.com',
    messagingSenderId: '172134206929',
    appId: '1:172134206929:web:583fe524921e52f3b6a4f0',
    measurementId: 'G-3RGM9ZQYSM',
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth();
export const db = getFirestore(app);
export default app;
