import React from "react";
import CarouselSection from "./CarouselSection";
import GridSection from "./GridSection";
import GenreFilter from "./GenreFilter";
import MainFooter from "./MainFooter";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGripLines, faThLarge, faAward } from "@fortawesome/free-solid-svg-icons";

export default function Movies({ view, setView, movies, genre, setGenre, handleNominationClick, handleCardClick }) {
  return (
    <div>
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
      {view === "carousel" ? (
        <CarouselSection onCardClick={handleCardClick} />
      ) : view === "grid" ? (
        <GridSection data={movies} onCardClick={handleCardClick} />
      ) : (
        <div>Nessun contenuto disponibile</div>
      )}
      <MainFooter />
    </div>
  );
}
