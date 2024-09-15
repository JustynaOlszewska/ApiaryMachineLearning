import React, { useState, useEffect } from "react";
import * as firebaseui from "firebaseui";
import firebase from "firebase/app";
import "firebase/auth";
// import { auth } from "firebaseui";
// import languageCode from "firebase/auth";
import { initializeApp, getApps, getApp } from "firebase/app";
import "firebaseui/dist/firebaseui.css";
import { getAuth, EmailAuthProvider, GoogleAuthProvider, FacebookAuthProvider, TwitterAuthProvider, GithubAuthProvider, onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase/firebaseConfig";
// import { EmailAuthProvider, GoogleAuthProvider, FacebookAuthProvider, TwitterAuthProvider, GithubAuthProvider, getAuth } from "firebase/auth";
// const firebaseConfig = {
//   apiKey: "AIzaSyBhQjUXFze-RuAO1pbccBP-1l13QDvoHjU",
//   authDomain: "apiary-3ac2b.firebaseapp.com",
//   projectId: "apiary-3ac2b",
//   storageBucket: "apiary-3ac2b.appspot.com",
//   messagingSenderId: "551193251503",
//   appId: "1:551193251503:web:afeabde15413be3a698e5a",
//   measurementId: "G-3V7D5X7ZDD",
// };
// const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

const FirebaseUI = () => {
  //   // return () => {
  //   //   if (ui) {
  //   //     ui.delete();
  //   //   }
  //   // };
  // }, []);
  useEffect(() => {
    // const auth = getAuth(app);

    onAuthStateChanged(auth, (user) => {
      console.log("user", user);
      let ui = firebaseui.auth.AuthUI.getInstance() || new firebaseui.auth.AuthUI(auth);

      const uiConfig = {
        signInSuccessUrl: "/",
        signInOptions: [EmailAuthProvider.PROVIDER_ID, GoogleAuthProvider.PROVIDER_ID, FacebookAuthProvider.PROVIDER_ID, TwitterAuthProvider.PROVIDER_ID, GithubAuthProvider.PROVIDER_ID],
      };
      ui.start("#firebaseui-auth-container", uiConfig);
    });
  }, []);

  return (
    <div>
      <h1>Welcome to My Awesome App</h1>
      <div id="firebaseui-auth-container"></div>
    </div>
  );
};

export default FirebaseUI;
