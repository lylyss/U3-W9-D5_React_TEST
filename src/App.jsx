import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import TVShows from "./components/TvShows.jsx";
import MainHeader from "./components/MainHeader";
import MainFooter from "./components/MainFooter";
import CarouselSection from "./components/CarouselSection";
import GridSection from "./components/GridSection";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGripLines, faThLarge, faAward } from "@fortawesome/free-solid-svg-icons";
import GenreFilter from "./components/GenreFilter";
import AccountPage from "./components/AccountPage";
import Nomination from "./components/Nomination";
import SearchBar from "./components/SearchBar";
import CardMoveInfo from "./components/CardMoveInfo";
import Settings from "./components/Settings";
import Inizia from "./components/Inizia";
import { Container, Row, Col, Card, Button } from "react-bootstrap";

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

function SearchPage({ movies, onBack, onSearchKeyword, onCardClick }) {
  return (
    <Container className="my-4">
      <Button variant="secondary" className=" rounded-0" onClick={onBack}>
        Back
      </Button>
      <div className="mb-4">
        <SearchBar onSearchKeyword={onSearchKeyword} />
      </div>
      <Row>
        {movies.map((movie) => (
          <Col key={movie.id} md={3} className="mb-4">
            <Card bg="dark" text="light" className="h-100" style={{ cursor: "pointer" }} onClick={() => onCardClick(movie, "carousel")}>
              <Card.Img variant="top" src={movie.image} alt={movie.title} style={{ height: "300px", objectFit: "cover" }} />
              <Card.Body>
                <Card.Title>{movie.title}</Card.Title>
                <Card.Text>
                  <strong>Anno:</strong> {movie.year || " "}
                </Card.Text>
                <Card.Text>
                  <strong>Genere:</strong> {movie.genre || " "} <br />
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default function App() {
  const [view, setView] = useState("carousel");
  const [movies, setMovies] = useState([]);
  const [genre, setGenre] = useState("star");
  const [showAccount, setShowAccount] = useState(false);
  const [showNomination, setShowNomination] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [searchKeyword, setSearchKeyword] = useState("star");
  const [showCardInfo, setShowCardInfo] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [lastPage, setLastPage] = useState(null);
  const [showSettings, setShowSettings] = useState(false);
  const [showIntro, setShowIntro] = useState(true);
  const [showVideo, setShowVideo] = useState(false);

  useEffect(() => {
    fetchMoviesBySearch(genre).then(setMovies);
  }, [genre]);

  useEffect(() => {
    if (showSearch && searchKeyword) {
      fetchMoviesBySearch(searchKeyword).then(setMovies);
    }
  }, [showSearch, searchKeyword]);

  // Gestione sequenza: Inizia -> Video -> App
  if (showIntro) {
    return (
      <Inizia
        onAccedi={() => {
          setShowIntro(false);
          setShowVideo(true);
        }}
      />
    );
  }

  if (showVideo) {
    return (
      <div
        style={{
          position: "fixed",
          inset: 0,
          width: "100vw",
          height: "100vh",
          background: "#000",
          zIndex: 9999,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
        }}
      >
        <video
          src="src/assets/Netflix Intro 1080p (Highest Quality)_1080p.mp4"
          autoPlay
          muted
          playsInline
          onEnded={() => setShowVideo(false)}
          style={{
            width: "100vw",
            height: "100vh",
            objectFit: "cover",
            display: "block",
          }}
        />
      </div>
    );
  }

  const handleSearchClick = () => {
    setShowSearch(true);
    setShowNomination(false);
    setShowCardInfo(false);
    setSearchKeyword(genre);
  };

  const handleBackFromSearch = () => {
    setShowSearch(false);
  };

  const handleSearchKeyword = (keyword) => {
    setSearchKeyword(keyword);
  };

  const handleNominationClick = () => {
    setShowNomination(true);
    setShowSearch(false);
    setShowCardInfo(false);
  };

  const handleCardClick = (movie, source) => {
    setSelectedMovie(movie);
    setShowCardInfo(true);
    setShowSearch(false);
    setShowNomination(false);
    setLastPage(source);
  };

  const handleBackFromCardInfo = () => {
    setShowCardInfo(false);
    setSelectedMovie(null);
    if (lastPage === "search") setShowSearch(true);
    else if (lastPage === "nomination") setShowNomination(true);
  };

  const handleBackFromSettings = () => {
    setShowSettings(false);
  };

  return (
    <Router>
      <MainHeader
        onAccountClick={() => setShowAccount(true)}
        onSearchClick={handleSearchClick}
        onSettingsClick={() => {
          setShowSettings(true);
          setShowAccount(false);
          setShowNomination(false);
          setShowCardInfo(false);
          setShowSearch(false);
        }}
      />

      {/* Settings */}
      <div className={showSettings ? "" : "d-none"}>
        <Settings show={showSettings} onBack={handleBackFromSettings} />
      </div>

      {/* Tutti gli altri componenti */}
      <div className={showSettings ? "d-none" : ""}>
        {/* Pagina Card Info */}
        <div style={{ display: showCardInfo ? "block" : "none" }}>
          {selectedMovie && (
            <div className="container my-4">
              <Button className="mb-4" variant="secondary rounded-0" onClick={handleBackFromCardInfo}>
                Back
              </Button>
              <CardMoveInfo movie={selectedMovie} onBack={handleBackFromCardInfo} />
            </div>
          )}
        </div>

        {/* Pagina Search */}
        <div style={{ display: showSearch && !showCardInfo ? "block" : "none" }}>
          <SearchPage movies={movies} onBack={handleBackFromSearch} onSearchKeyword={handleSearchKeyword} onCardClick={handleCardClick} />
        </div>

        {/* Pagina Nomination */}
        <div style={{ display: showNomination && !showCardInfo ? "block" : "none" }}>
          <div className="container my-4 mb-0 ">
            <button className="btn btn-secondary m-0 rounded-0" onClick={() => setShowNomination(false)}>
              Back
            </button>
          </div>
          <Nomination movies={movies} onCardClick={handleCardClick} />
        </div>

        {/* Pagina principale */}
        <div style={{ display: !showSearch && !showNomination && !showCardInfo && !showAccount ? "block" : "none" }}>
          <div className="container-fluid px-4 py-3">
            <div className="row align-items-center">
              <div className="col-12 col-md-auto d-flex align-items-center mb-3 mb-md-0">
                <h2 className="mb-0 me-3 text-white">TV Shows</h2>
                <GenreFilter genre={genre} setGenre={setGenre} />
              </div>
              <div className="col-12 col-md d-flex flex-column flex-md-row align-items-stretch align-items-md-center gap-2 gap-md-2">
                <div className="w-100 d-flex flex-row flex-wrap flex-md-row align-items-center justify-content-between gap-2">
                  {/* Nomination button */}
                  <div className="d-flex justify-content-center mb-2 mb-md-0" style={{ flex: 1 }}>
                    <button
                      onClick={handleNominationClick}
                      className="btn btn-danger rounded fw-bold nomination-btn d-flex align-items-center justify-content-center"
                      style={{ gap: "0.5rem", width: "100%", maxWidth: 220 }}
                    >
                      <FontAwesomeIcon icon={faAward} />
                      <span className="d-none d-sm-inline">Awards 2025</span>
                      <span className="d-inline d-sm-none">Nomination</span>
                    </button>
                  </div>
                  {/* Layout buttons */}
                  <div className="btn-group d-flex flex-row justify-content-md-end justify-content-center mt-0 mt-md-0" style={{ flex: 1, maxWidth: 220 }}>
                    <button onClick={() => setView("carousel")} className="btn btn-outline-light rounded-0">
                      <FontAwesomeIcon icon={faGripLines} />
                    </button>
                    <button onClick={() => setView("grid")} className="btn btn-outline-light rounded-0">
                      <FontAwesomeIcon icon={faThLarge} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {view === "carousel" ? <CarouselSection onCardClick={handleCardClick} /> : <GridSection data={movies} onCardClick={handleCardClick} />}
          <MainFooter />
        </div>

        {/* Account Page */}
        {showAccount && <AccountPage onClose={() => setShowAccount(false)} />}
      </div>

      <Routes>
        <Route path="/" element={<div className="text-white">Home Page</div>} />
        <Route path="/tv-shows" element={<TVShows />} />
      </Routes>

      <style>
        {`
  @media (max-width: 576px) {
    .nomination-btn {
      width: 100% !important;
      justify-content: center !important;
      margin-bottom: 0 !important;
    }
    .btn-group {
      width: 100% !important;
      flex-direction: row !important;
      margin-top: 0 !important;
      justify-content: center !important;
    }
    .w-100.d-flex.flex-row.flex-wrap.flex-md-row.align-items-center.justify-content-between.gap-2 {
      flex-direction: row !important;
      gap: 0.5rem !important;
    }
    .col-12.col-md.d-flex {
      flex-direction: column !important;
      align-items: stretch !important;
      gap: 0.5rem !important;
    }
  }
  @media (min-width: 577px) {
    .nomination-btn {
      width: auto !important;
      margin-bottom: 0 !important;
    }
    .btn-group {
      width: auto !important;
      flex-direction: row !important;
      margin-top: 0 !important;
      justify-content: flex-end !important;
    }
    .col-12.col-md.d-flex {
      flex-direction: row !important;
      align-items: center !important;
      gap: 0.5rem !important;
    }
  }
`}
      </style>
    </Router>
  );
}
