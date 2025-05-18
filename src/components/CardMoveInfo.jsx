import { useState } from "react";
import { Container, Row, Col, Button, Form } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlayCircle, faStar as faStarSolid } from "@fortawesome/free-solid-svg-icons";
import { faStar as faStarRegular } from "@fortawesome/free-regular-svg-icons";

export default function CardMoveInfo({ movie }) {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [comment, setComment] = useState("");

  /* se il film non e trovato  */
  if (!movie) {
    return (
      <Container className="my-5">
        <h3 className="text-white">Film non trovato</h3>
      </Container>
    );
  }

  return (
    <Container className="my-5 bg-dark rounded p-4 shadow-lg nomination-bg " style={{ minHeight: "100vh", width: "100%" }}>
      <Row>
        <Col md={5} className="d-flex flex-column align-items-center mb-4 mb-md-0">
          <div style={{ position: "relative", width: "100%", maxWidth: 320 }}>
            <img
              src={movie.image}
              alt={movie.title}
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
          <h2>{movie.title}</h2>
          <p>
            <strong>Anno:</strong> {movie.year || "N/A"} <br />
            <strong>Genere:</strong> {movie.genre || "N/A"} <br />
            <strong>Paese:</strong> {movie.country || "N/A"} <br />
            <strong>Awards:</strong> {movie.awards || "N/A"} <br />
            <strong>Lingua:</strong> {movie.language || "N/A"} <br />
            <strong>Durata:</strong> {movie.runtime || "N/A"}
          </p>
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
            </Form>
          </div>
        </Col>
      </Row>
    </Container>
  );
}
