import { initializeApp } from "firebase/app";
import { getStorage } from 'firebase/storage';
import dotenv from 'dotenv';
dotenv.config();


const firebaseConfig = {
  //place your firebase API credentials here
};

const app = initializeApp(firebaseConfig);
export const imageDb = getStorage(app)
