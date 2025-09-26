// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {initializeAuth, getReactNativePersistance} from "firebase/auth";
import {ReactNativeAsyncStorage} from "@react-native-async-storage/async-storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAheeNgYK-otfrzQ8uDjhj7uyWslQOzHa4",
  authDomain: "fir-p-4a9b3.firebaseapp.com",
  projectId: "fir-p-4a9b3",
  storageBucket: "fir-p-4a9b3.firebasestorage.app",
  messagingSenderId: "862475654158",
  appId: "1:862475654158:web:f868b1e3037f48143c985f",
  measurementId: "G-0Y0X9WGGGX"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const auth = initializeAuth(app);
