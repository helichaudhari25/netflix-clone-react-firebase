import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";
import PhoneLogin from "./pages/PhoneLogin";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Movies from "./pages/Movies";
import TVShows from "./pages/TVShows";
import Profile from "./pages/Profile";
import ProtectedRoute from "./components/ProtectedRoute";
import { AuthProvider } from "./context/AuthContext";
import NetflixLoader from "./components/NetflixLoader";



function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) return <NetflixLoader />;


  return (
    <AuthProvider>
    <Router>
      <Routes>

        {/* NEW USER → SIGNUP FIRST */}
        <Route
          path="/"
          element={user ? <Home /> : <Navigate to="/signup" />}
        />

        {/* SIGNUP */}
        <Route
          path="/signup"
          element={!user ? <Signup /> : <Navigate to="/" />}
        />

        {/* LOGIN */}
        <Route
          path="/login"
          element={!user ? <Login /> : <Navigate to="/" />}
        />

        <Route path="/" element={
          <ProtectedRoute><Home /></ProtectedRoute>
        } />

        <Route path="/movies" element={
          <ProtectedRoute><Movies /></ProtectedRoute>
        } />

        <Route path="/tv" element={
          <ProtectedRoute><TVShows /></ProtectedRoute>
        } />

        <Route path="/profile" element={
          <ProtectedRoute><Profile /></ProtectedRoute>
        } />

         

        <Route
          path="/phone-login"
          element={!user ? <PhoneLogin /> : <Navigate to="/" />}
        />


      </Routes>
    </Router>
    </AuthProvider>
  );
}

export default App;
