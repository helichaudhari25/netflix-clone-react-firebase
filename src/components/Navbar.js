import "./Navbar.css";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

function Navbar({ setMovies }) {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");

  const logout = async () => {
    await signOut(auth);
    navigate("/login");
  };

  const searchMovie = async (e) => {
    if (e.key === "Enter" && query.trim() !== "") {
      try {
        const res = await axios.get(
          "https://api.themoviedb.org/3/search/movie",
          {
            params: {
              api_key: "d308530a1c88c4f3109f94c46709d291",
              query: query,
            },
          }
        );
        setMovies(res.data.results);
        navigate("/");
      } catch (error) {
        console.error("Search error:", error);
      }
    }
  };

  return (
    <div className="navbar">
      {/* LOGO */}
      <img
        className="logo"
        src="https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg"
        alt="Netflix Logo"
        onClick={() => navigate("/")}
      />

      {/* MENU */}
      <div className="nav-links">
        <span onClick={() => navigate("/")}>Home</span>
        <span onClick={() => navigate("/tv")}>TV Shows</span>
        <span onClick={() => navigate("/movies")}>Movies</span>
        <span onClick={() => navigate("/profile")}>Profile</span>
      </div>

      {/* SEARCH */}
      <input
        type="text"
        placeholder="Search movies"
        className="search-input"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={searchMovie}
      />

      {/* RIGHT SIDE */}
      <div className="nav-right">
        <img
          className="avatar"
          src="https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png"
          alt="User Avatar"
          onClick={() => navigate("/profile")}
        />
        <button className="logout-btn" onClick={logout}>
          Logout
        </button>
      </div>
    </div>
  );
}

export default Navbar;
