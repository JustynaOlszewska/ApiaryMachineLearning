// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// import firebaseui from "firebaseui"; // Import FirebaseUI
// import * as firebaseui from "firebaseui";
// Your web app's Firebase configuration
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

// Initialize Firebase Auth
const auth = getAuth(app);

// Configure FirebaseUI
// const uiConfig = {
//   signInSuccessUrl: "/", // Redirect after successful sign-in
//   signInOptions: [
//     EmailAuthProvider.PROVIDER_ID, // Email
//     GoogleAuthProvider.PROVIDER_ID, // Google
//     FacebookAuthProvider.PROVIDER_ID, // Facebook
//     TwitterAuthProvider.PROVIDER_ID, // Twitter
//     GithubAuthProvider.PROVIDER_ID, // GitHub
//     // ... other providers if needed
//   ],
// };

// Create a FirebaseUI instance
// const ui = new firebaseui.auth.AuthUI(auth);

// Start FirebaseUI
// ui.start("#firebaseui-auth-container", uiConfig);

// Export necessary objects
const db = getFirestore(app);
export { auth, db };

// // Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// import { getAuth } from "firebase/auth";
// import { getFirestore } from "firebase/firestore";
// import firebaseui from "firebaseui"; // Import FirebaseUI

// // Your web app's Firebase configuration
// // For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: "AIzaSyBhQjUXFze-RuAO1pbccBP-1l13QDvoHjU",
//   authDomain: "apiary-3ac2b.firebaseapp.com",
//   projectId: "apiary-3ac2b",
//   storageBucket: "apiary-3ac2b.appspot.com",
//   messagingSenderId: "551193251503",
//   appId: "1:551193251503:web:afeabde15413be3a698e5a",
//   measurementId: "G-3V7D5X7ZDD",
// };

// // Initialize Firebase

// // Configure FirebaseUI
// const uiConfig = {
//   signInSuccessUrl: "/", // Redirect after successful sign-in
//   signInOptions: [
//     // List of providers you want to support
//     auth.EmailAuthProvider.PROVIDER_ID, // Use 'auth' instead of 'firebase'
//     auth.GoogleAuthProvider.PROVIDER_ID, // Use 'auth' instead of 'firebase'
//     auth.FacebookAuthProvider.PROVIDER_ID,
//     auth.TwitterAuthProvider.PROVIDER_ID,
//     auth.GithubAuthProvider.PROVIDER_ID,
//     // ... other providers
//   ],
// };

// // Create a FirebaseUI instance
// const ui = new firebaseui.auth.AuthUI(auth);

// // Start FirebaseUI
// ui.start("#firebaseui-auth-container", uiConfig);
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
// const auth = getAuth(app);
// const db = getFirestore(app);
// // Export necessary objects
// export { auth, db, ui }; // Export FirebaseUI instance as well
