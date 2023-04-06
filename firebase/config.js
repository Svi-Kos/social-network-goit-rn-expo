import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCFgdUF8h5Wn4mlS09de_IZaB2SQkgUf2o",
  authDomain: "rn-veryfirstin.firebaseapp.com",
  projectId: "rn-veryfirstin",
  storageBucket: "rn-veryfirstin.appspot.com",
  messagingSenderId: "1053198873628",
  appId: "1:1053198873628:web:da2895374715c673a6dbd9",
  measurementId: "G-M61QGGKHK4",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const storage = getStorage(app);
export const db = getFirestore(app);
