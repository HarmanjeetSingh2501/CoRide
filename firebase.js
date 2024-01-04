
import { initializeApp } from "firebase/app";
import {GoogleAuthProvider,getAuth} from 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyBNuorlnqdnafHTiq7n5bneuO2_2sSrGSo",
  authDomain: "coride-c4fc4.firebaseapp.com",
  projectId: "coride-c4fc4",
  storageBucket: "coride-c4fc4.appspot.com",
  messagingSenderId: "375642174935",
  appId: "1:375642174935:web:043e1bcb5c83cb2e05c792",
  measurementId: "G-9VX0TJ8FSH"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const provider = new GoogleAuthProvider()
const auth = getAuth()

export {app, provider, auth}