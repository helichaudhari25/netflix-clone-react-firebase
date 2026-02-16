import React from "react";
import Navbar from "../components/Navbar";
import Banner from "../components/Banner";
import Row from "../components/Row";
import requests from "../requests";

function TVShows() {
  return (
    <div className="tvshows">
      <Navbar />
      <Banner />

      <Row title="Netflix Originals" fetchUrl={requests.fetchNetflixOriginals} isLargeRow />
      <Row title="Popular TV Shows" fetchUrl={requests.fetchTrending} />
    </div>
  );
}

export default TVShows;
