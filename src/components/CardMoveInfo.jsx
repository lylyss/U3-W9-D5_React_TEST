import { useState, useEffect } from "react";
import { Container, Row, Col, Button, Form, Carousel } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import AddComment from "./AddComment";
import ListComments from "./ListComments";

async function fetchMovieById(imdbID) {
  const apiKey = "fc9f1c61";
  const res = await fetch(`https://www.omdbapi.com/?i=${imdbID}&apikey=${apiKey}`);
  const data = await res.json();
  if (data.Response === "True") {
    return {
      id: data.imdbID,
      image: data.Poster,
      title: data.Title,
      year: data.Year,
      genre: data.Genre,
      country: data.Country,
      awards: data.Awards,
      language: data.Language,
      runtime: data.Runtime,
      imdbRating: data.imdbRating,
      Ratings: data.Ratings,
    };
  }
  return null;
}

async function fetchRelatedMovies(title) {
  const apiKey = "fc9f1c61";
  const res = await fetch(`https://www.omdbapi.com/?apikey=${apiKey}&s=${encodeURIComponent(title.split(" ")[0])}&type=movie`);
  const data = await res.json();
  if (data.Response === "True") {
    // Limita a 10 film correlati
    return data.Search.slice(0, 10).map((movie) => ({
      id: movie.imdbID,
      title: movie.Title,
      image: movie.Poster,
    }));
  }

  return [];
}

export default function CardMoveInfo({ movie, onCardClick }) {
  const [related, setRelated] = useState([]);
  const [movieDetails, setMovieDetails] = useState(null);

  useEffect(() => {
    if (movie?.id) {
      fetchMovieById(movie.id).then(setMovieDetails);
    }
    if (movie?.title) {
      fetchRelatedMovies(movie.title).then(setRelated);
    }
  }, [movie]);

  if (!movie) {
    return (
      <Container className="my-5">
        <h3 className="text-white">Film non trovato</h3>
      </Container>
    );
  }

  const details = movieDetails || movie;

  const handleCommentAdded = (newComment) => {
    console.log("Nuovo commento aggiunto:", newComment);
  };

  return (
    <Container className="my-5 bg-dark rounded p-4 shadow-lg nomination-bg" style={{ minHeight: "100vh", width: "100%" }}>
      <Row>
        <Col md={5} className="d-flex flex-column align-items-center mb-4 mb-md-0">
          <div style={{ position: "relative", width: "100%", maxWidth: 320 }}>
            <img
              src={details.image}
              alt={details.title}
              style={{
                width: "100%",
                height: "auto",
                borderRadius: 10,
                objectFit: "cover",
                display: "block",
              }}
            />
          </div>
        </Col>
        <Col md={7} className="text-white">
          <h2>{details.title}</h2>
          <p>
            <strong>Anno:</strong> {details.year || "N/A"} <br />
            <strong>Genere:</strong> {details.genre || "N/A"} <br />
            <strong>Paese:</strong> {details.country || "N/A"} <br />
            <strong>Awards:</strong> {details.awards || "N/A"} <br />
            <strong>Lingua:</strong> {details.language || "N/A"} <br />
            <strong>Durata:</strong> {details.runtime || "N/A"}
          </p>
          <hr className="border-secondary" />

          {/* Richiama il componente AddComment */}
          <AddComment movieId={details.id} onCommentAdded={handleCommentAdded} />

          {/* Richiama il componente ListComments */}
          <ListComments movieId={details.id} />
        </Col>
      </Row>

      {/* Carosello correlati */}
      {related.length > 0 ? (
        <div className="mt-5">
          <h5 className="text-white mb-3">Film correlati</h5>
          <Carousel indicators={false} interval={5000}>
            {Array.from({ length: Math.ceil(related.length / 4) }).map((_, idx) => (
              <Carousel.Item key={idx}>
                <div className="d-flex justify-content-center gap-3">
                  {related.slice(idx * 4, idx * 4 + 4).map((rel) => (
                    <div
                      key={rel.id}
                      style={{
                        flex: "0 0 170px",
                        maxWidth: "170px",
                        minWidth: "170px",
                        cursor: "pointer",
                      }}
                      onClick={() => onCardClick && onCardClick(rel, "related")}
                    >
                      <img
                        src={rel.image}
                        alt={rel.title}
                        style={{
                          width: "100%",
                          height: "250px",
                          objectFit: "cover",
                          borderRadius: 8,
                        }}
                      />
                      <div className="text-white text-center mt-2" style={{ fontSize: 15 }}>
                        {rel.title}
                      </div>
                    </div>
                  ))}
                </div>
              </Carousel.Item>
            ))}
          </Carousel>
        </div>
      ) : (
        <p className="text-white">Nessun film correlato trovato.</p>
      )}
    </Container>
  );
}
