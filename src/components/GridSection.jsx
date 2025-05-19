import React from "react";
import { Row, Col, Card, Container } from "react-bootstrap";
import CardImageWithLogo from "./CardImageWithLogo";

export default function GridSection({ data, onCardClick }) {
  return (
    <Container>
      <h3 className="text-white my-4">Tutti i Film</h3>
      <Row>
        {data.map((item) => (
          <Col xs={12} sm={6} md={4} lg={3} className="mb-4 d-flex" key={item.id}>
            <Card
              className="border-0 rounded-0 bg-dark text-white h-100 w-100"
              style={{
                minHeight: "480px",
                maxHeight: "480px",
                display: "flex",
                flexDirection: "column",
                cursor: "pointer",
              }}
              onClick={() => onCardClick(item)}
            >
              <div
                style={{
                  flex: "0 0 340px",
                  height: "340px",
                  overflow: "hidden",
                }}
              >
                <CardImageWithLogo
                  src={item.image}
                  alt={item.title}
                  height={340}
                  style={{
                    width: "100%",
                    height: "340px",
                    objectFit: "cover",
                    objectPosition: "center",
                  }}
                />
              </div>
              <Card.Body className="d-flex align-items-end" style={{ flex: "1 1 auto" }}>
                <Card.Title className="w-100 text-truncate">{item.title}</Card.Title>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}
