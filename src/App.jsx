import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import MainHeader from "./components/MainHeader";
import CarouselSection from "./components/CarouselSection";
import GridSection from "./components/GridSection";
import MainFooter from "./components/MainFooter";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGripLines, faThLarge } from "@fortawesome/free-solid-svg-icons";
import GenreFilter from "./components/GenreFilter";
import AccountPage from "./components/AccountPage";
import Nomination from "./components/Nomination";

const fetchMoviesBySearch = async (query) => {
  const apiKey = "fc9f1c61";
  const res = await fetch(`https://www.omdbapi.com/?apikey=${apiKey}&s=${query}&type=movie`);
  const data = await res.json();
  if (data.Response === "True") {
    const details = await Promise.all(
      data.Search.map((movie) => fetch(`https://www.omdbapi.com/?apikey=${apiKey}&i=${movie.imdbID}`).then((res) => res.json()))
    );
    return details
      .filter((movie) => movie.Response !== "False")
      .map((movie) => ({
        id: movie.imdbID,
        image: movie.Poster,
        title: movie.Title,
        year: movie.Year,
        genre: movie.Genre,
        country: movie.Country,
        awards: movie.Awards,
        language: movie.Language,
        runtime: movie.Runtime,
      }));
  }
  return [];
};

function App() {
  const [view, setView] = useState("carousel");
  const [movies, setMovies] = useState([]);
  const [genre, setGenre] = useState("star");
  const [showAccount, setShowAccount] = useState(false);
  const [showNomination, setShowNomination] = useState(false);

  useEffect(() => {
    fetchMoviesBySearch(genre).then(setMovies);
  }, [genre]);

  return (
    <>
      <MainHeader onAccountClick={() => setShowAccount(true)} />

      {showNomination ? (
        <>
          <div className="container my-4">
            <button className="btn btn-secondary mb-4" onClick={() => setShowNomination(false)}>
              Torna indietro
            </button>
          </div>
          <Nomination movies={movies} />
        </>
      ) : (
        <div style={{ display: showAccount ? "none" : "block" }}>
          <div className="container-fluid px-4 py-3 d-flex justify-content-between align-items-center">
            <div className="d-flex align-items-center">
              <h2 className="mb-0 me-3 text-white">TV Shows</h2>
              <GenreFilter genre={genre} setGenre={setGenre} />
              <button onClick={() => setShowNomination(true)} className="btn btn-outline-light rounded-0 fw-bold ms-2 p-1">
                Nomination
              </button>
            </div>
            <div className="btn-group">
              <button onClick={() => setView("carousel")} className="btn btn-outline-light rounded-0">
                <FontAwesomeIcon icon={faGripLines} />
              </button>
              <button onClick={() => setView("grid")} className="btn btn-outline-light rounded-0">
                <FontAwesomeIcon icon={faThLarge} />
              </button>
            </div>
          </div>
          {view === "carousel" ? <CarouselSection /> : <GridSection data={movies} />}
          <MainFooter />
        </div>
      )}
      {showAccount && <AccountPage onClose={() => setShowAccount(false)} />}
    </>
  );
}

export default App;
