import { initializeApp } from "firebase/app";
import {getStorage} from "firebase/storage"

const firebaseConfig = {
  apiKey: "AIzaSyAQVBR5KCOxoIymDuDBjLE8W3m3gyPiaWI",
  authDomain: "ninja-task-f33e0.firebaseapp.com",
  projectId: "ninja-task-f33e0",
  storageBucket: "ninja-task-f33e0.appspot.com",
  messagingSenderId: "61256792147",
  appId: "1:61256792147:web:098b9757520e225d122ea6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app)