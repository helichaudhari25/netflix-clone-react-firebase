import React, { useState } from "react";
import { auth, provider } from "../firebase";
import {
  createUserWithEmailAndPassword,
  signOut,
  signInWithPopup
} from "firebase/auth";
import { useNavigate } from "react-router-dom";
import "./Signup.css";

function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  // Email/Password signup
  const register = async (e) => {
    e.preventDefault();

    try {
      await createUserWithEmailAndPassword(auth, email, password);

      // logout after signup
      await signOut(auth);

      navigate("/login");
    } catch (error) {
      alert(error.message);
    }
  };

  // Google signup/login
  const googleLogin = async () => {
    try {
      await signInWithPopup(auth, provider);
      navigate("/"); // or /profile
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="login">
      <form>
        <h1>Sign Up</h1>

        <input
          type="email"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />

        {/* Email Signup */}
        <button onClick={register}>Sign Up</button>

        {/* Google Signup */}
        <button
          type="button"
          className="google-btn"
          onClick={googleLogin}
        >
          Sign up with Google
        </button>
      </form>
    </div>
  );
}

export default Signup;
