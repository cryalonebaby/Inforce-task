import { initializeApp } from "firebase/app";
import {getStorage} from "firebase/storage"

const firebaseConfig = {
  apiKey: "AIzaSyAtE5MIYopJidkv0D14D_-o2qHZWVmOqV4",
  authDomain: "inforce-task-761e3.firebaseapp.com",
  projectId: "inforce-task-761e3",
  storageBucket: "inforce-task-761e3.appspot.com",
  messagingSenderId: "589088016261",
  appId: "1:589088016261:web:43e8b533c9c0b723e726ec"
};

const app = initializeApp(firebaseConfig);
export const storage = getStorage(app)