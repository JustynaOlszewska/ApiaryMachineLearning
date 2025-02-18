// Login.jsx
import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/firebaseConfig";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const handleLogin = async (e: any) => {
    e.preventDefault();
    try {
      // Logowanie przez Firebase
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      console.log("Zalogowano użytkownika:", userCredential.user);
      alert(`Witaj ${userCredential.user.email}!`);
    } catch (err) {
      console.error("Błąd logowania:", err.message);
      setError("Nie udało się zalogować. Sprawdź swoje dane.");
    }
  };

  return (
    <div>
      <h1>Logowanie</h1>
      <form onSubmit={handleLogin}>
        <div>
          <label>Email:</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div>
          <label>Hasło:</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>
        <button type="submit">Zaloguj się</button>
      </form>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default Login;
