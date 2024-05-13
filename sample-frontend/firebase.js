import { initializeApp } from "firebase/app";
import { getStorage } from 'firebase/storage';
import dotenv from 'dotenv';
dotenv.config();


const firebaseConfig = {
  apiKey: "AIzaSyBLdSduQQKL-RiSbEeqUvitBb5tVXiC6WM",
  authDomain: "sample-project-1c879.firebaseapp.com",
  projectId: "sample-project-1c879",
  storageBucket: "sample-project-1c879.appspot.com",
  messagingSenderId: "880569467719",
  appId: "1:880569467719:web:396427d337f8a6955c4262",
  measurementId: "G-ZGM3E4YGN8"
};

const app = initializeApp(firebaseConfig);
export const imageDb = getStorage(app)
