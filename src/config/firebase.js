// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth,GoogleAuthProvider} from 'firebase/auth';
import {getFirestore} from 'firebase/firestore'
import {getStorage} from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyAMkX1vY9Ne9yq68CubLizSeH3gR5prox8",
  authDomain: "fir-react-be418.firebaseapp.com",
  projectId: "fir-react-be418",
  storageBucket: "fir-react-be418.appspot.com",
  messagingSenderId: "582286236888",
  appId: "1:582286236888:web:d49fd759c6390aa8dd8bad",
  measurementId: "G-MQ0RZM5R2L"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleAuthProvider = new GoogleAuthProvider();

export const db = getFirestore(app);

export const storage = getStorage(app);