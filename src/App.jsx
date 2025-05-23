import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Inizia from "./components/Inizia";
import HomePage from "./components/HomePage";
import MainHeader from "./components/MainHeader";
import MainFooter from "./components/MainFooter";
import Movies from "./components/Movies";
import TvShows from "./components/TvShows";
import AccountPage from "./components/AccountPage";
import Settings from "./components/Settings";
import SearchPage from "./components/SearchPage";
import CardMoveInfo from "./components/CardMoveInfo";
import MyList from "./components/MyList";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

export default function App() {
  const [showIntro, setShowIntro] = useState(true);

  const handleAccedi = () => {
    setShowIntro(false);
  };

  return (
    <Router>
      <MainHeader />
      {showIntro ? (
        <Inizia onAccedi={handleAccedi} />
      ) : (
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route
            path="/movies"
            element={
              <Movies
                view="carousel"
                setView={(newView) => console.log("Set view:", newView)}
                movies={[
                  { id: 1, title: "Inception", image: "path/to/image1.jpg" },
                  { id: 2, title: "Interstellar", image: "path/to/image2.jpg" },
                  { id: 3, title: "The Dark Knight", image: "path/to/image3.jpg" },
                ]}
                genre="All"
                setGenre={(newGenre) => console.log("Set genre:", newGenre)}
                handleCardClick={(movieId) => console.log("Card clicked:", movieId)}
              />
            }
          />
          <Route
            path="/tv-shows"
            element={
              <TvShows
                tvShows={[
                  { id: 1, title: "Breaking Bad", image: "path/to/image1.jpg", type: "series", rating: 9.5 },
                  { id: 2, title: "Stranger Things", image: "path/to/image2.jpg", type: "series", rating: 8.7 },
                  { id: 3, title: "The Crown", image: "path/to/image3.jpg", type: "series", rating: 8.6 },
                  { id: 4, title: "The Witcher", image: "path/to/image4.jpg", type: "series", rating: 8.2 },
                ]}
              />
            }
          />
          <Route path="/account" element={<AccountPage onClose={() => console.log("Account closed")} />} />
          <Route path="/settings" element={<Settings show={true} onBack={() => console.log("Back to previous page")} />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/card-info" element={<CardMoveInfo />} />
          <Route path="/my-list" element={<MyList />} />
        </Routes>
      )}
      <MainFooter />
    </Router>
  );
}
