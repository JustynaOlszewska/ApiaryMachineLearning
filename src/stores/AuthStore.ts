import { makeAutoObservable } from "mobx";
import axios from "axios";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { signOut } from "firebase/auth";
import { auth } from "../firebase/firebaseConfig.js";
// import { setToken } from "../utils/setToken";

class AuthStore {
  counter = 0;
  errorLogin = false;
  isAuthenticated = false;

  constructor() {
    // makeAutoObservable sprawia, że wszystkie właściwości i metody są automatycznie obserwowalne
    makeAutoObservable(this);
  }

  // Getter dla podwojenia wartości licznika
  get doubleCount() {
    return this.counter * 2;
  }
  getUser = async () => {
    try {
      const auth = getAuth();
      console.log("get users", auth);
      onAuthStateChanged(auth, (user) => {
        if (user) {
          // Użytkownik jest zalogowany
          const uid = user.uid;
          return uid;
          console.log("ID użytkownika:", uid);
        } else {
          // Użytkownik nie jest zalogowany
        }
      });
    } catch (error) {
      console.log("ID użytkownika:error", error);
    }
  };
  // Akcja logowania użytkownika
  async loginUser(dataUser) {
    const config = { headers: { "Content-Type": "application/json" } };

    try {
      const response = await axios.post("http://localhost:5000/api/apiary/auth", dataUser, config);

      if (response.data) {
        console.log("datalogin", response.data, dataUser);
        this.errorLogin = false;
        this.isAuthenticated = true;
        sessionStorage.setItem("token", response.data.token);

        if (sessionStorage.getItem("token")) {
          // setToken(sessionStorage.getItem("token"));
        }
      }
    } catch (error) {
      console.log("errorlogin", error);
      this.errorLogin = true;
      this.isAuthenticated = false;
    }
  }

  // Akcja rejestracji nowego użytkownika
  async registerUser(newUser) {
    const config = { headers: { "Content-Type": "application/json" } };

    try {
      const response = await axios.post("http://localhost:5000/api/apiary/users", JSON.stringify(newUser), config);

      if (response.data) {
        this.isAuthenticated = true;
        console.log("data", response.data.token);
        sessionStorage.setItem("token", response.data.token);

        if (sessionStorage.getItem("token")) {
          // setToken(sessionStorage.getItem("token"));
        }
      }
    } catch (error) {
      console.log("error", error);
    }
  }

  // Akcja ładowania danych
  async loadData() {
    try {
      const response = await axios.get("http://localhost:5000/api/apiary/apiary");
      if (response.data) {
        console.log("data", response.data);
        // Można tutaj dodać logikę do przetwarzania danych
      }
    } catch (error) {
      console.log("error", error);
    }
  }

  handleLogout = () => {
    signOut(auth)
      .then(() => {
        console.log("Użytkownik wylogowany");
        // Tutaj możesz przekierować na stronę główną lub pokazać komunikat
      })
      .catch((error) => {
        console.error("Błąd podczas wylogowywania:", error.message);
      });
  };
}

const authStore = new AuthStore();
export default authStore;
