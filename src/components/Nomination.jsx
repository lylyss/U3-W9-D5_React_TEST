import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";

export default function Nomination({ movies }) {
  return (
    <Container className="my-5">
      <h3 className="text-white mb-4">Nomination</h3>
      <Row>
        {movies.slice(0, 5).map((movie) => (
          <Col key={movie.id} md={2} className="mb-4">
            <Card bg="dark" text="light" className="h-100">
              <Card.Img
                variant="top"
                src={movie.image}
                alt={movie.title}
                style={{ height: "300px", objectFit: "cover" }}
              />
              <Card.Body>
                <Card.Title>{movie.title}</Card.Title>
                <Card.Text>
                  <strong>Anno:</strong> {movie.year || "N/A"} <br />
                  <strong>Genere:</strong> {movie.genre || "N/A"} <br />
                  <strong>Paese:</strong> {movie.country || "N/A"} <br />
                  <strong>Awards:</strong> {movie.awards || "N/A"} <br />
                  <strong>Lingua:</strong> {movie.language || "N/A"} <br />
                  <strong>Durata:</strong> {movie.runtime || "N/A"}
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}