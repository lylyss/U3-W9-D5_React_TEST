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
import SearchBar from "./components/SearchBar";
import CardMoveInfo from "./components/CardMoveInfo";
import Settings from "./components/Settings";
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
            <Card bg="dark" text="light" className="h-100" style={{ cursor: "pointer" }} onClick={() => onCardClick(movie)}>
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

function App() {
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
  const [loading, setLoading] = useState(true);
  const [showSettings, setShowSettings] = useState(false);

  useEffect(() => {
    fetchMoviesBySearch(genre).then(setMovies);
  }, [genre]);

  useEffect(() => {
    if (showSearch && searchKeyword) {
      fetchMoviesBySearch(searchKeyword).then(setMovies);
    }
  }, [showSearch, searchKeyword]);

  useEffect(() => {
    /* Intro caricamento Netflix kikka */
    const timer = setTimeout(() => setLoading(false), 4000); // 4 secondi
    return () => clearTimeout(timer);
  }, []);

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

  const handleCardClick = (movie, from) => {
    setSelectedMovie(movie);
    setShowCardInfo(true);
    setShowSearch(false);
    setShowNomination(false);
    setLastPage(from);
    /* "search" o "nomination" */
  };

  const handleBackFromCardInfo = () => {
    setShowCardInfo(false);
    setSelectedMovie(null);
    if (lastPage === "search") setShowSearch(true);
    else if (lastPage === "nomination") setShowNomination(true);
  };

  if (loading) {
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
          onEnded={() => setLoading(false)}
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

  return (
    <>
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
        <Settings show={showSettings} onClose={() => setShowSettings(false)} />
      </div>

      {/* Tutti gli altri componenti */}
      <div className={showSettings ? "d-none" : ""}>
        {/* Pagina Card Info */}
        <div style={{ display: showCardInfo ? "block" : "none" }}>
          {selectedMovie && (
            <div className="container my-4">
              <Button className="mb-4" variant="secondary" onClick={handleBackFromCardInfo}>
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
            <button className="btn btn-secondary m-0" onClick={() => setShowNomination(false)}>
              Back
            </button>
          </div>
          <Nomination movies={movies} onCardClick={handleCardClick} />
        </div>

        {/* Pagina principale */}
        <div style={{ display: !showSearch && !showNomination && !showCardInfo && !showAccount ? "block" : "none" }}>
          <div className="container-fluid px-4 py-3 d-flex justify-content-between align-items-center">
            <div className="d-flex align-items-center">
              <h2 className="mb-0 me-3 text-white">TV Shows</h2>
              <GenreFilter genre={genre} setGenre={setGenre} />
            </div>
            <button onClick={handleNominationClick} className="btn btn-danger rounded fw-bold ms-2 nomination-btn">
              Nomination Awards 2025
            </button>
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

        {/* Account Page */}
        {showAccount && <AccountPage onClose={() => setShowAccount(false)} />}
      </div>
    </>
  );
}

export default App;
