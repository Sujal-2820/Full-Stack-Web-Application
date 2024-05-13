import { initializeApp } from "firebase/app";
import { getStorage } from 'firebase/storage';
import dotenv from 'dotenv';
dotenv.config();


const firebaseConfig = {
  apiKey: "aEjgdaSayaebdqwjaudvuawvdL-RiSbwafesfjhabdsb",
  authDomain: "saeihdbjawaebdhb.firebaseapp.com",
  projectId: "afeib-waudgiawbd-h3279972bf",
  storageBucket: "waiuehdbwaiybqwiub-euudb-22983appspot.com",
  messagingSenderId: "820949242719",
  appId: "82478273912:2381983:a81399952",
  measurementId: "G-jnSEIFBBbusn"
};

const app = initializeApp(firebaseConfig);
export const imageDb = getStorage(app)
