import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import CardImageWithLogo from "./CardImageWithLogo";

export default function Nomination({ movies, onCardClick }) {
  return (
    <div style={{ minHeight: "100vh", width: "100%" }}>
      <Container
        className="my-5 pt-2 mt-3 rounded-0"
        style={{
          background: "rgba(0,0,0,0.7) url('src/assets/bg.info.netflix.jpg') center/cover no-repeat",
          borderRadius: 16,
          boxShadow: "0px 0px 9px 5px rgb(104, 1, 1)",
        }}
      >
        <h3 className="text-white mx-4">Nomination</h3>
        <hr className="border-secondary mb-5" />
        <Row>
          {movies.slice(0, 20).map((movie) => (
            <Col key={movie.id} xs={12} sm={6} md={4} lg={3} className="mb-4 d-flex">
              <Card
                bg="dark"
                text="light"
                className="h-100 w-100"
                style={{
                  cursor: "pointer",
                  position: "relative",
                  background: "rgba(30,30,30,1)",
                  border: "none",
                }}
                onClick={() => onCardClick(movie, "nomination")}
              >
                <CardImageWithLogo src={movie.image} alt={movie.title} height={300} />
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
        <hr className="border-secondary my-5" />
      </Container>
    </div>
  );
}
