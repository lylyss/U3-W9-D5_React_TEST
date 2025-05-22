import { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Inizia from "./components/Inizia";
import HomePage from "./components/HomePage";
import MainHeader from "./components/MainHeader";
import MainFooter from "./components/MainFooter";
import Movies from "./components/Movies";
import TvShows from "./components/TvShows";
import AccountPage from "./components/AccountPage";
import SearchPage from "./components/SearchPage";
import CardMoveInfo from "./components/CardMoveInfo";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

export default function App() {
  const [showIntro, setShowIntro] = useState(true);
  const [view, setView] = useState("grid");

  const [movies] = useState([
    { id: 1, title: "Inception", image: "path/to/inception.jpg" },
    { id: 2, title: "Interstellar", image: "path/to/interstellar.jpg" },
    { id: 3, title: "The Dark Knight", image: "path/to/darkknight.jpg" },
  ]);
  const [genre, setGenre] = useState("All");

  const handleNominationClick = (movieId) => {
    console.log("Nominate movie with id:", movieId);
  };

  const handleCardClick = (movieId) => {
    console.log("Card clicked with id:", movieId);
  };

  const handleAccedi = () => {
    setShowIntro(false);
  };

  return (
    <Router>
      {/* MainHeader sempre visibile */}
      <MainHeader
        onAccountClick={() => console.log("Account clicked")}
        onSearchClick={() => console.log("Search clicked")}
        onSettingsClick={() => console.log("Settings clicked")}
      />

      {/* Contenuto dinamico: Intro o Routes */}
      {showIntro ? (
        <Inizia onAccedi={handleAccedi} />
      ) : (
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route
            path="/movies"
            element={
              <Movies
                view={view}
                setView={setView}
                movies={movies}
                genre={genre}
                setGenre={setGenre}
                handleNominationClick={handleNominationClick}
                handleCardClick={handleCardClick}
              />
            }
          />
          <Route
            path="/tv-shows"
            element={
              <TvShows
                tvShows={[
                  { id: 1, title: "Breaking Bad", image: "path/to/image1.jpg" },
                  { id: 2, title: "Stranger Things", image: "path/to/image2.jpg" },
                  { id: 3, title: "The Crown", image: "path/to/image3.jpg" },
                  { id: 4, title: "The Witcher", image: "path/to/image4.jpg" },
                ]}
              />
            }
          />
          <Route path="/account" element={<AccountPage onClose={() => console.log("Account closed")} />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/card-info" element={<CardMoveInfo />} />
        </Routes>
      )}

      {/* MainFooter sempre visibile */}
      <MainFooter />
    </Router>
  );
}
