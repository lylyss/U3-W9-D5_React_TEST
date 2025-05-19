import { useState, useEffect } from "react";
import { Container, Row, Col, Button, Form, Carousel } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlayCircle, faStar as faStarSolid } from "@fortawesome/free-solid-svg-icons";
import { faStar as faStarRegular } from "@fortawesome/free-regular-svg-icons";

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
    /* Prendi max 10 correlati diversi dal film principale */
    return data.Search.slice(0, 10).map((movie) => ({
      id: movie.imdbID,
      title: movie.Title,
      image: movie.Poster,
    }));
  }

  return [];
}

export default function CardMoveInfo({ movie, onCardClick }) {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [comment, setComment] = useState("");
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
            <Button
              variant="light"
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                borderRadius: "50%",
                padding: 0,
                border: "none",
                background: "rgba(0,0,0,0.5)",
              }}
              disabled
            >
              <FontAwesomeIcon icon={faPlayCircle} size="3x" style={{ color: "#ffffff" }} />
            </Button>
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

          <div>
            <strong>Rating IMDb:</strong> {movieDetails && movieDetails.imdbRating ? `${movieDetails.imdbRating} / 10` : "N/A"}
          </div>
          {movieDetails && Array.isArray(movieDetails.Ratings) && movieDetails.Ratings.length > 0 && (
            <div className="mt-2">
              <strong>Altri Ratings:</strong>
              <ul className="mb-0">
                {movieDetails.Ratings.map((r, idx) => (
                  <li key={idx}>
                    {r.Source}: {r.Value}
                  </li>
                ))}
              </ul>
            </div>
          )}

          <hr className="border-secondary" />
          <div>
            <h5 className="mb-2">Vota il film:</h5>
            <div>
              {[1, 2, 3, 4, 5].map((star) => (
                <FontAwesomeIcon
                  key={star}
                  icon={star <= (hover || rating) ? faStarSolid : faStarRegular}
                  style={{ color: "#FFD700", cursor: "pointer", fontSize: 28 }}
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHover(star)}
                  onMouseLeave={() => setHover(0)}
                />
              ))}
            </div>
            <Form className="mt-3">
              <Form.Group controlId="comment">
                <Form.Label>Lascia un commento:</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Scrivi qui il tuo commento..."
                  className="bg-dark text-white"
                />
              </Form.Group>
              <Button
                variant="secondary"
                className="mt-2"
                type="button"
                onClick={() => {
                  alert("Feedback inviato!\n\nRating: " + rating + "\nCommento: " + comment);
                  setComment("");
                  setRating(0);
                }}
              >
                Invia Feedback
              </Button>
            </Form>
          </div>
        </Col>
      </Row>

      {/* Carosello correlati */}
      {related.length > 0 && (
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
      )}
    </Container>
  );
}
