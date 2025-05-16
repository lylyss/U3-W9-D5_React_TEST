import React from "react";
import { Row, Col, Card, Container } from "react-bootstrap";

export default function GridSection({ data }) {
  return (
    <Container>
      <Row>
        {data.map((item) => (
          <Col md={6} lg={3} className="mb-4" key={item.id}>
            <Card className="border-0 rounded-0 bg-dark text-white">
              <Card.Img
                variant="top"
                src={item.image}
                style={{
                  width: "100%",
                  height: "460px",
                  objectFit: "cover",
                  objectPosition: "center",
                }}
              />
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}
