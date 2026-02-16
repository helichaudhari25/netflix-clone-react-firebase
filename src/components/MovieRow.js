import React, { useEffect, useState, useRef } from "react";
import axios from "../axios";
import movieTrailer from "movie-trailer";
import YouTube from "react-youtube";
import "./Row.css";

const base_url = "https://image.tmdb.org/t/p/original/";

function Row({ title, fetchUrl, movies, isLargeRow }) {
  const [movieList, setMovieList] = useState([]);
  const [trailerId, setTrailerId] = useState("");
  const [hoverMovie, setHoverMovie] = useState(null);
  const timeoutRef = useRef(null);

  useEffect(() => {
    if (movies) {
      setMovieList(movies);
      return;
    }

    async function fetchData() {
      const request = await axios.get(fetchUrl);
      setMovieList(request.data.results);
    }

    fetchData();
  }, [fetchUrl, movies]);

  const handleMouseEnter = (movie) => {
    timeoutRef.current = setTimeout(async () => {
      try {
        const id = await movieTrailer(
          movie?.title || movie?.name || movie?.original_name,
          { id: true }
        );
        setHoverMovie(movie);
        setTrailerId(id);
      } catch {
        setTrailerId("");
      }
    }, 600); // Netflix-like delay
  };

  const handleMouseLeave = () => {
    clearTimeout(timeoutRef.current);
    setTrailerId("");
    setHoverMovie(null);
  };

  return (
    <div className="row">
      <h2>{title}</h2>

      <div className="row__posters">
        {movieList.map(
          (movie) =>
            (movie.poster_path || movie.backdrop_path) && (
              <div
                key={movie.id}
                className="posterWrapper"
                onMouseEnter={() => handleMouseEnter(movie)}
                onMouseLeave={handleMouseLeave}
              >
                <img
                  className={`row__poster ${
                    isLargeRow && "row__posterLarge"
                  }`}
                  src={`${base_url}${
                    isLargeRow
                      ? movie.poster_path
                      : movie.backdrop_path
                  }`}
                  alt={movie.title || movie.name}
                />
              </div>
            )
        )}
      </div>

      {/* HOVER TRAILER */}
      {trailerId && hoverMovie && (
        <div className="hoverTrailer">
          <YouTube
            videoId={trailerId}
            opts={{
              height: "220",
              width: "390",
              playerVars: {
                autoplay: 1,
                mute: 1,
                controls: 0,
              },
            }}
          />
        </div>
      )}
    </div>
  );
}

export default Row;
