import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebookF, faInstagram, faTwitter, faYoutube } from "@fortawesome/free-brands-svg-icons";

export default function MainFooter() {
  return (
    <footer className="container-fluid text-secondary px-5 py-5" style={{ backgroundColor: "#1a1919" }}>
      <Container>
        <Row className="text-left px-5">
          <Col md={3} className="my-3 d-flex align-items-center">
            <a className="text-secondary me-3" href="https://www.facebook.com">
              <FontAwesomeIcon icon={faFacebookF} style={{ fontSize: "2rem" }} />
            </a>
            <a className="text-secondary mx-3" href="https://www.instagram.com">
              <FontAwesomeIcon icon={faInstagram} style={{ fontSize: "2rem" }} />
            </a>
            <a className="text-secondary mx-3" href="https://x.com">
              <FontAwesomeIcon icon={faTwitter} style={{ fontSize: "2rem" }} />
            </a>
            <a className="text-secondary mx-3" href="https://www.youtube.com">
              <FontAwesomeIcon icon={faYoutube} style={{ fontSize: "2rem" }} />
            </a>
          </Col>
        </Row>
        <Row className="text-left px-5">
          <Col md={3}>
            <p>Audio and Subtitles</p>
            <p>Media Center</p>
            <p>Privacy</p>
            <p>Contact Us</p>
          </Col>
          <Col md={3}>
            <p>Audio Description</p>
            <p>Investor Relations</p>
            <p>Legal Notices</p>
          </Col>
          <Col md={3}>
            <p>Help Center</p>
            <p>Jobs</p>
            <p>Cookie Preferences</p>
          </Col>
          <Col md={3}>
            <p>Gift Cards</p>
            <p>Terms of Use</p>
            <p>Corporate Information</p>
          </Col>
        </Row>
        <Row className="px-5">
          <Col md={9} className="d-flex flex-column align-items-start justify-content-end">
            <Button variant="outline-secondary" className="w-auto mb-2">
              Service Code
            </Button>
            <p className="p-0 m-0">&copy; 1997-2019 Netflix, Inc.</p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}
