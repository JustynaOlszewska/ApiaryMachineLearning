import React, { useState, useEffect } from "react";
import * as firebaseui from "firebaseui";
import firebase from "firebase/app";
import "firebase/auth";
// import { auth } from "firebaseui";
// import languageCode from "firebase/auth";
import { initializeApp, getApps, getApp } from "firebase/app";
import "firebaseui/dist/firebaseui.css";
import {
  getAuth,
  EmailAuthProvider,
  GoogleAuthProvider,
  FacebookAuthProvider,
  TwitterAuthProvider,
  GithubAuthProvider,
  onAuthStateChanged,
  setPersistence,
  browserLocalPersistence,
} from "firebase/auth";
import apiaryStore from "../stores/ApiaryStore";
import { auth } from "../firebase/firebaseConfig";
import i18next from "i18next";
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
  // useEffect(() => {
  //   console.log("Rozpoczynanie FirebaseUI z instancją auth:", auth);

  //   try {
  //     // Uzyskanie instancji FirebaseUI lub utworzenie nowej
  //     const ui = firebaseui.auth.AuthUI.getInstance() || new firebaseui.auth.AuthUI(auth);

  //     // Konfiguracja FirebaseUI
  //     const uiConfig = {
  //       signInSuccessUrl: "/", // Przekierowanie po zalogowaniu
  //       signInOptions: [
  //         EmailAuthProvider.PROVIDER_ID,
  //         GoogleAuthProvider.PROVIDER_ID,
  //         // FacebookAuthProvider.PROVIDER_ID, TwitterAuthProvider.PROVIDER_ID, GithubAuthProvider.PROVIDER_ID
  //       ],
  //       callbacks: {
  //         signInSuccessWithAuthResult: (authResult: any) => {
  //           console.log("Zalogowano użytkownika:", authResult.user);
  //           return true; // Pozwala na przekierowanie
  //         },
  //         uiShown: () => {
  //           console.log("FirebaseUI załadowane.");
  //         },
  //         signInFailure: (error: any) => {
  //           console.error("Zalogowano użytkownika: Błąd logowania:", error.message);
  //         },
  //       },
  //     };

  //     console.log("Inicjalizacja FirebaseUI z konfiguracją:", uiConfig);
  //     ui.start("#firebaseui-auth-container", uiConfig);

  //     console.log("FirebaseUI uruchomione.");
  //   } catch (error: any) {
  //     console.error("Błąd podczas inicjalizacji FirebaseUI:", error?.message);
  //   }
  // }, []);
  // const { getInitApiaryData } = apiaryStore;
  const auth = getAuth();

  useEffect(() => {
    // onAuthStateChanged(auth, (user) => {
    // console.log("user", user, auth);

    let ui = firebaseui.auth.AuthUI.getInstance() || new firebaseui.auth.AuthUI(auth);
    console.log("ggggggggggggggggggg", ui);
    const uiConfig = {
      signInSuccessUrl: `/${i18next.resolvedLanguage}/apiaries`,
      // signInSuccessUrl: window.location.origin + window.location.pathname, // Automatyczna obsługa aktualnego URL

      // signInSuccessUrl: "http://localhost:5173/",
      signInOptions: [
        EmailAuthProvider.PROVIDER_ID,
        // GoogleAuthProvider.PROVIDER_ID,
        {
          provider: GoogleAuthProvider.PROVIDER_ID,
          scopes: ["https://www.googleapis.com/auth/contacts.readonly"],
          // customParameters: {
          //   // Forces account selection even when one account
          //   // is available.
          //   prompt: "select_account",
          // },
        },
        // FacebookAuthProvider.PROVIDER_ID, TwitterAuthProvider.PROVIDER_ID, GithubAuthProvider.PROVIDER_ID
      ],
      callbacks: {
        signInSuccessWithAuthResult: async (authResult: any) => {
          // console.log("Zalogowano użytkownika:", authResult.user);
          // try {
          //   await getInitApiaryData();
          // console.log("Pomyślnie zainicjalizowano dane pasieki.");

          // window.location.href = "/apiaries";
          return true;
          // } catch (error) {
          //   console.error("Błąd podczas inicjalizacji danych pasieki:", error);
          // }
          // Ręczne przekierowanie
          // window.location.href = "/";
          // return false;
        },
        signInFailure: (error: any) => {
          console.error("Błąd logowania:", error.message);
          if (error.code === "auth/email-not-found") {
            alert("Nie znaleziono użytkownika. Proszę się zarejestrować.");
          }
        },
        uiShown: () => {
          console.log("FirebaseUI załadowane.");
        },
      },
    };
    console.log("uiConfig", uiConfig);

    ui.start("#firebaseui-auth-container", uiConfig);
    // });
    return () => {
      ui.reset(); // Reset FirebaseUI, jeśli komponent zostanie odmontowany
    };
  }, []);

  return (
    <div>
      <h1>Welcome to My Awesome App</h1>
      <div id="firebaseui-auth-container"></div>
    </div>
  );
};

export default FirebaseUI;
