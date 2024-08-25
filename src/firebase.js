// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBhQjUXFze-RuAO1pbccBP-1l13QDvoHjU",
  authDomain: "apiary-3ac2b.firebaseapp.com",
  projectId: "apiary-3ac2b",
  storageBucket: "apiary-3ac2b.appspot.com",
  messagingSenderId: "551193251503",
  appId: "1:551193251503:web:afeabde15413be3a698e5a",
  measurementId: "G-3V7D5X7ZDD",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
