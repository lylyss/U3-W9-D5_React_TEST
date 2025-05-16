import React from "react";
import { Container } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebookF, faInstagram, faTwitter, faYoutube } from "@fortawesome/free-brands-svg-icons";

export default function MainFooter() {
  return (
    <footer className="container-fluid text-secondary px-5 py-5 bg-black">
      <Container>
        <div className="row text-left px-5">
          <div className="d-flex align-items-center">
            <div className="col-md-3 my-3">
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
            </div>
          </div>
          <div className="col-md-3">
            <p>Audio and Subtitles</p>
            <p>Media Center</p>
            <p>Privacy</p>
            <p>Contact Us</p>
          </div>

          <div className="col-md-3">
            <p>Audio Description</p>
            <p>Investor Relations</p>
            <p>Legal Notices</p>
          </div>

          <div className="col-md-3">
            <p>Help Center</p>
            <p>Jobs</p>
            <p>Cookie Preferences</p>
          </div>

          <div className="col-md-3">
            <p>Gift Cards</p>
            <p>Terms of Use</p>
            <p>Corporate Information</p>
          </div>

          <div className="container">
            <div>
              <p className="btn btn-outline-secondary w-auto">Service Code</p>
              <p className="p-0">&copy; 1997-2019 Netflix, Inc.</p>
            </div>
          </div>
        </div>
      </Container>
    </footer>
  );
}
