import React, { useEffect, useState } from "react";
import axios from "../axios";
import requests from "../requests";
import movieTrailer from "movie-trailer";
import YouTube from "react-youtube";
import "./Banner.css";

const base_url = "https://image.tmdb.org/t/p/original/";

function Banner() {
  const [movie, setMovie] = useState(null);
  const [trailerId, setTrailerId] = useState("");

  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(requests.fetchNetflixOriginals);
      setMovie(
        request.data.results[
          Math.floor(Math.random() * request.data.results.length)
        ]
      );
    }
    fetchData();
  }, []);

  const playTrailer = () => {
    if (trailerId) {
      setTrailerId("");
    } else {
      movieTrailer(movie?.title || movie?.name || "")
        .then((url) => {
          const params = new URLSearchParams(new URL(url).search);
          setTrailerId(params.get("v"));
        })
        .catch(() => alert("Trailer not available"));
    }
  };

  const opts = {
    height: "390",
    width: "100%",
    playerVars: {
      autoplay: 1,
    },
  };

  return (
    <header
      className="banner"
      style={{
        backgroundSize: "cover",
        backgroundImage: `url(${base_url}${movie?.backdrop_path})`,
        backgroundPosition: "center center",
      }}
    >
      <div className="banner__contents">
        <h1 className="banner__title">
          {movie?.title || movie?.name || movie?.original_name}
        </h1>

        <div className="banner__buttons">
          <button className="banner__button" onClick={playTrailer}>
            ▶ Play
          </button>
          <button className="banner__button">My List</button>
        </div>

        <p className="banner__description">
          {movie?.overview}
        </p>
      </div>

      <div className="banner--fadeBottom" />

      {/* 🎬 TRAILER */}
      {trailerId && (
        <div className="banner__trailer">
          <YouTube videoId={trailerId} opts={opts} />
        </div>
      )}
    </header>
  );
}

export default Banner;
