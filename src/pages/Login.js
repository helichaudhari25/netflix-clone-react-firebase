import React, { useState } from "react";

import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { auth, db } from "../firebase";


function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const signIn = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then(() => navigate("/"))
      .catch((error) => alert(error.message));
  };
  const provider = new GoogleAuthProvider();

const googleLogin = async () => {
  try {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;

    const userRef = doc(db, "users", user.uid);
    const snap = await getDoc(userRef);

    if (!snap.exists()) {
      await setDoc(userRef, {
        email: user.email,
        username: user.displayName,
        phone: user.phoneNumber || "",
        city: "",
        photo: user.photoURL,
        createdAt: new Date(),
      });
    }

    navigate("/");
  } catch (error) {
    alert(error.message);
  }
};

  return (
    <div className="login">
      <form>
        <h1>Login</h1>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={signIn}>login</button>
        <h4>
          <span className="login__gray">New to Netflix? </span>
          <span className="login__link" onClick={() => navigate("/signup")}>
            Sign up now
          </span>
          <button onClick={googleLogin}>Sign in with Google</button>
          <button
          className="phone-btn"
          onClick={() => navigate("/phone-login")}>
          Login with Phone OTP
          </button>

        </h4>
      </form>
    </div>
  );
}

export default Login;
