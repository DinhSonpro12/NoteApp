// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCkOCdZJDBEZ1AF10zz77JZ0JymCzr1ORA",
  authDomain: "noteapp-d75ff.firebaseapp.com",
  projectId: "noteapp-d75ff",
  storageBucket: "noteapp-d75ff.appspot.com",
  messagingSenderId: "548537000508",
  appId: "1:548537000508:web:06919c91a1870808d0d939",
  measurementId: "G-GRG3HEJ22V",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
