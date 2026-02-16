import React, { useState } from "react";
import { auth } from "../firebase";
import {
  RecaptchaVerifier,
  signInWithPhoneNumber
} from "firebase/auth";
import { useNavigate } from "react-router-dom";
import "./Login.css";

function PhoneLogin() {
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [confirmationResult, setConfirmationResult] = useState(null);
  const navigate = useNavigate();

  // ✅ Create Recaptcha ONLY ONCE
  const setupRecaptcha = () => {
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(
        auth,
        "recaptcha-container",
        {
          size: "invisible",
          callback: () => {}
        }
      );
    }
  };

  const sendOTP = async (e) => {
    e.preventDefault();

    try {
      setupRecaptcha();
      const appVerifier = window.recaptchaVerifier;

      const formattedPhone = phone.startsWith("+")
        ? phone
        : `+91${phone}`;

        const result = await signInWithPhoneNumber(
        auth,
        formattedPhone,
        appVerifier
        );

      setConfirmationResult(result);
      alert("OTP Sent Successfully");
    } catch (error) {
      alert(error.message);
    }
  };

  const verifyOTP = async (e) => {
    e.preventDefault();

    try {
      await confirmationResult.confirm(otp);
      navigate("/");
    } catch {
      alert("Invalid OTP");
    }
  };

  return (
    <div className="login">
      <form>
        <h1>Phone Login</h1>

        {!confirmationResult ? (
            <>
                <input
                type="tel"
                placeholder="Enter 10-digit mobile number"
                value={phone}
                onChange={(e) => {
                const value = e.target.value.replace(/\D/g, "");
                if (value.length <= 10) setPhone(value);
                }}
                />

                <button onClick={sendOTP}>Send OTP</button>
            </>
        ) : (
          <>
            <input
              type="text"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
            />
            <button onClick={verifyOTP}>Verify OTP</button>
          </>
        )}

        {/* REQUIRED */}
        <div id="recaptcha-container"></div>
      </form>
    </div>
  );
}

export default PhoneLogin;
