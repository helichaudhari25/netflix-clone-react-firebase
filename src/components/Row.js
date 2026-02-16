import React, { useEffect, useRef, useState } from "react";
import axios from "../axios";
import YouTube from "react-youtube";
import movieTrailer from "movie-trailer";
import "./Row.css";

const base_url = "https://image.tmdb.org/t/p/original/";

function Row({ title, fetchUrl, movies, isLargeRow }) {
  const [movieList, setMovieList] = useState([]);
  const [trailerUrl, setTrailerUrl] = useState("");
  const rowRef = useRef(null);

  useEffect(() => {
    if (movies && movies.length > 0) {
      setMovieList(movies);
      return;
    }

    async function fetchData() {
      if (!fetchUrl) return;
      const request = await axios.get(fetchUrl);
      setMovieList(request.data.results);
    }

    fetchData();
  }, [fetchUrl, movies]);

  const handleClick = (movie) => {
    if (trailerUrl) {
      setTrailerUrl("");
    } else {
      movieTrailer(
        movie?.name || movie?.title || movie?.original_name || ""
      )
        .then((url) => {
          const urlParams = new URLSearchParams(new URL(url).search);
          setTrailerUrl(urlParams.get("v"));
        })
        .catch(() => alert("Trailer not available"));
    }
  };

  const scrollLeft = () => {
    rowRef.current.scrollBy({ left: -500, behavior: "smooth" });
  };

  const scrollRight = () => {
    rowRef.current.scrollBy({ left: 500, behavior: "smooth" });
  };

  const opts = {
    height: "390",
    width: "100%",
    playerVars: { autoplay: 1 },
  };

  return (
    <div className="row">
      <h2>{title}</h2>

      {/* LEFT ARROW */}
      <div className="row__arrow left" onClick={scrollLeft}>
        ❮
      </div>

      {/* MOVIES */}
      <div className="row__posters" ref={rowRef}>
        {movieList.map(
  (movie) =>
    (movie.poster_path || movie.backdrop_path) && (
      <div
        key={movie.id}
        className={`row__posterWrapper ${
          isLargeRow && "row__posterWrapperLarge"
        }`}
      >
        <img
          onClick={() => handleClick(movie)}
          className={`row__poster ${
            isLargeRow && "row__posterLarge"
          }`}
          src={`${base_url}${
            isLargeRow
              ? movie.poster_path
              : movie.backdrop_path
          }`}
          alt={movie.name || movie.title}
        />

        {/* OVERLAY */}
        <div className="posterOverlay">
          <div className="overlayIcons">
            <button onClick={() => handleClick(movie)}>▶</button>
            <button>＋</button>
            <button>👍</button>
          </div>

          <h3 className="posterTitle">
            {movie.name || movie.title}
          </h3>
        </div>
      </div>
    )
)}

      </div>

      {/* RIGHT ARROW */}
      <div className="row__arrow right" onClick={scrollRight}>
        ❯
      </div>

      {trailerUrl && <YouTube videoId={trailerUrl} opts={opts} />}
    </div>
  );
}

export default Row;
