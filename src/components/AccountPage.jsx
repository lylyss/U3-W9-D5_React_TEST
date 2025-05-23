import { useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil } from "@fortawesome/free-solid-svg-icons";
import netflixLogo from "../assets/netflix_logo.png";
import kidsIcon from "../assets/kids_icon.png";
import { Container, Row, Col, Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export default function AccountPage() {
  const inputRef = useRef();
  const previewRef = useRef();
  const navigate = useNavigate();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file && previewRef.current) {
      const reader = new FileReader();
      reader.onload = function (ev) {
        previewRef.current.src = ev.target.result;
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div
      style={{
        background: "#141414",
        color: "white",
        minHeight: "100vh",
        width: "100vw",
        position: "fixed",
        top: 0,
        left: 0,
        zIndex: 9999,
        overflowY: "auto",
      }}
    >
      <nav
        className="navbar px-3 py-0"
        style={{
          background: "linear-gradient(180deg,rgba(3,3,3,1) 72%,rgba(4,4,4,0.87) 88%,rgba(4,4,4,0.57) 91%,rgba(3,3,3,0.29) 96%,rgba(3,3,3,0) 100%)",
        }}
      >
        {/* Logo Netflix con funzionalità di navigazione alla homepage */}
        <a
          className="navbar-brand"
          href="#"
          onClick={(e) => {
            e.preventDefault();
            navigate("/");
          }}
        >
          <img src={netflixLogo} alt="Netflix Logo" height="50" />
        </a>
      </nav>
      <main className="d-flex justify-content-center align-items-center">
        <Container className="px-3" style={{ maxWidth: 600 }}>
          <Container className="mt-4 px-3">
            <h1 className="m-0" style={{ fontFamily: "Arial, sans-serif" }}>
              Edit Profile
            </h1>
            <hr className="border-secondary m-0 mb-3" />
            <Row className="mb-4">
              {/* Immagine profilo */}
              <Col xs={12} md={3} className="text-center mb-3">
                <div className="profile-img-wrapper position-relative mx-auto" style={{ width: 100, height: 100 }}>
                  <Form.Label htmlFor="profileImageInput" style={{ cursor: "pointer" }}>
                    <img
                      ref={previewRef}
                      id="profilePreview"
                      src={kidsIcon}
                      alt="Profile img"
                      className="profile-img"
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        borderRadius: 10,
                      }}
                    />
                    <div
                      className="edit-icon"
                      style={{
                        position: "absolute",
                        bottom: 5,
                        left: 5,
                        backgroundColor: "#000",
                        border: "1px solid white",
                        borderRadius: "50%",
                        width: 20,
                        height: 20,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        cursor: "pointer",
                      }}
                    >
                      <FontAwesomeIcon icon={faPencil} style={{ fontSize: 10, color: "#fff" }} />
                    </div>
                  </Form.Label>
                  <Form.Control type="file" id="profileImageInput" className="d-none" ref={inputRef} onChange={handleImageChange} />
                </div>
              </Col>

              {/* Form di modifica profilo */}
              <Col xs={12} md={9}>
                <Form.Control
                  type="text"
                  className="mb-3 bg-secondary text-light border-0 rounded-0 fw-bold"
                  placeholder="Profile Name"
                  defaultValue="Strive Student"
                />

                <Row>
                  <Col className="mb-3 align-items-center">
                    <Form.Label className="mb-0" htmlFor="languageSelect">
                      Language:
                    </Form.Label>
                    <Form.Select id="languageSelect" className="text-white border rounded-0 py-0 bg-secondary " style={{ width: "auto", minWidth: 150 }}>
                      <option>English</option>
                      <option>Italiano</option>
                      <option>Espanol</option>
                    </Form.Select>
                  </Col>
                </Row>

                <hr className="border-secondary my-3" />

                {/* Maturity Settings */}
                <div className="mb-3">
                  <Form.Label>Maturity Settings:</Form.Label>
                  <div className="d-flex mb-1">
                    <Button variant="dark" size="sm" className="me-2 rounded-0">
                      ALL MATURITY RATINGS
                    </Button>
                  </div>
                  <p>
                    <small>
                      Show titles of <strong>all maturity ratings</strong> for this profile.
                    </small>
                  </p>
                  <Button variant="outline-secondary" size="sm" className="rounded-0 px-4">
                    EDIT
                  </Button>
                </div>

                <hr className="border-secondary my-3" />

                {/* Autoplay Controls */}
                <div className="mb-4">
                  <Form.Label>Autoplay controls</Form.Label>

                  <Form.Check
                    type="checkbox"
                    id="autoplayEpisodes"
                    className="custom-checkbox mb-2"
                    label="Autoplay next episode in a series on all devices."
                    defaultChecked
                    style={{ color: "#ccc" }}
                  />
                  <Form.Check
                    type="checkbox"
                    id="autoplayPreviews"
                    className="custom-checkbox"
                    label="Autoplay previews while browsing on all devices."
                    defaultChecked
                    style={{ color: "#ccc" }}
                  />
                </div>
              </Col>
            </Row>
            <hr className="border-secondary m-0 mb-3" />

            {/* Bottoni finali */}
            <div className="d-flex flex-wrap p-0 gap-2">
              <Button variant="outline-secondary" className="fw-bold px-4 rounded-0">
                SAVE
              </Button>
              <Button variant="outline-secondary" className="fw-bold px-4 rounded-0">
                CANCEL
              </Button>
              <Button variant="outline-secondary" className="fw-bold px-4 rounded-0">
                DELETE PROFILE
              </Button>
            </div>
          </Container>
        </Container>
      </main>
    </div>
  );
}
