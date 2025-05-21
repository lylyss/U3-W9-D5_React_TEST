import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import GenreFilter from "./GenreFilter";

export default function MainHeaderBot({ genre, setGenre, setView, pageTitle }) {
  return (
    <Container fluid className="px-4 py-3">
      <Row className="align-items-center">
        <Col xs={12} md="auto" className="d-flex align-items-center mb-3 mb-md-0">
          <h2 className="mb-0 me-3 text-white">{pageTitle}</h2>
          <GenreFilter genre={genre} setGenre={setGenre} />
        </Col>
        <Col xs={12} md className="d-flex justify-content-end">
          <button className="btn btn-outline-light me-2" onClick={() => setView("carousel")}>
            Carousel
          </button>
          <button className="btn btn-outline-light" onClick={() => setView("grid")}>
            Grid
          </button>
        </Col>
      </Row>
    </Container>
  );
}
