import React, { useState } from "react";
import { Container, Row, Col, Button, Modal, Form } from "react-bootstrap";

export default function Settings({ show }) {
  const [showEmail, setShowEmail] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showPhone, setShowPhone] = useState(false);

  return (
    <div style={{ display: show ? "block" : "none", background: "white", minHeight: "100vh" }}>
      <main className="container mt-0 text-custom-color-gray">
        <Container style={{ maxWidth: 850 }}>
          <div className="mt-4 px-3">
            <h1 className="text-center text-md-start text-black fs-2">Account</h1>
            <div className="border-bottom border-setting mb-3 mt-3"></div>

            {/* Membership & Billing */}
            <Row>
              <Col md={4} className="d-flex justify-content-center flex-column d-md-block">
                <h3 className="setting-color text-center text-md-start fs-5">MEMBERSHIP & BILLING</h3>
                <Button className="px-4 bg-custom-color-btn border border-2 border-end-0 border-start-0 border-top-0 fs-6">Cancel Membership</Button>
              </Col>
              <Col md={8} className="d-flex flex-column flex-md-row justify-content-between border-bottom border-setting mt-4 mt-md-0">
                <div className="text-center text-md-start text-black">
                  <p className="fw-bold">student@mail.com</p>
                  <p className="text-custom-color-gray">Password: ***********</p>
                  <p className="text-custom-color-gray">Phone: 321 044 1279</p>
                </div>
                <div className="text-center text-md-end mt-3 mt-md-0">
                  <p>
                    <a href="#" className="text-decoration-none" onClick={() => setShowEmail(true)}>
                      Change account email
                    </a>
                  </p>
                  <p>
                    <a href="#" className="text-decoration-none" onClick={() => setShowPassword(true)}>
                      Change password
                    </a>
                  </p>
                  <p>
                    <a href="#" className="text-decoration-none" onClick={() => setShowPhone(true)}>
                      Change phone number
                    </a>
                  </p>
                </div>
              </Col>

              {/* Payment Info */}
              <Col md={{ span: 8, offset: 4 }} className="mt-3 d-flex flex-column flex-md-row justify-content-between border-bottom">
                <div className="text-center text-md-start d-flex flex-column align-items-center align-items-md-start mb-3 mb-md-0">
                  <div className="d-flex justify-content-center justify-content-md-start text-black">
                    <i className="bi bi-paypal fw-bold me-2"> PayPal</i>
                    <p className="mb-0 fw-bold">stive.paypal@gmail.com</p>
                  </div>
                </div>
                <div className="text-center text-md-end d-flex flex-column">
                  <a href="#" className="text-decoration-none mb-1">
                    Update payment info
                  </a>
                  <a href="#" className="text-decoration-none">
                    Billing details
                  </a>
                </div>
              </Col>

              {/* Gift Cards */}
              <Col md={{ span: 8, offset: 4 }} className="mt-3 d-flex flex-column flex-md-row justify-content-between">
                <div className="text-center text-md-end d-flex flex-column w-100">
                  <a href="#" className="text-decoration-none mb-1">
                    Redeem gift card or promo code
                  </a>
                  <a href="#" className="text-decoration-none">
                    Where to buy gift cards
                  </a>
                </div>
              </Col>
            </Row>

            {/* Plan Details */}
            <Row className="border-bottom">
              <div className="border-bottom border-setting mb-3 mt-3"></div>
              <Col md={4}>
                <h3 className="setting-color text-center text-md-start fs-5">PLAN DETAILS</h3>
              </Col>
              <Col md={8} className="d-flex flex-column flex-md-row justify-content-between">
                <div className="d-flex justify-content-center justify-content-md-start align-items-center mb-3 mb-md-0">
                  <p className="me-2 mb-2 text-black fw-bold">Premium</p>
                  <p className="border border-black rounded-1 text-black px-1 mb-1">
                    ULTRA <span className="fw-bold">HD</span>
                  </p>
                </div>
                <div className="text-center text-md-end d-flex flex-column mb-3">
                  <a href="#" className="text-decoration-none">
                    Change plan
                  </a>
                </div>
              </Col>
            </Row>

            {/* Settings */}
            <Row className="border-bottom">
              <div className="mt-3"></div>
              <Col md={4}>
                <h3 className="setting-color fs-5">SETTINGS</h3>
              </Col>
              <Col md={8} className="d-flex justify-content-between">
                <div className="d-flex justify-content-start align-items-start flex-column mb-3">
                  <a href="#" className="text-decoration-none mb-1">
                    Parental control
                  </a>
                  <a href="#" className="text-decoration-none mb-1">
                    Test participation
                  </a>
                  <a href="#" className="text-decoration-none mb-1">
                    Manage download devices
                  </a>
                  <a href="#" className="text-decoration-none mb-1">
                    Activate a device
                  </a>
                  <a href="#" className="text-decoration-none mb-1">
                    Recent device streaming activity
                  </a>
                  <a href="#" className="text-decoration-none mb-1">
                    Sign out of all devices
                  </a>
                </div>
              </Col>
            </Row>

            {/* My Profile */}
            <Row className="mt-3">
              <Col md={4}>
                <h3 className="setting-color text-center text-md-start fs-5">MY PROFILE</h3>
              </Col>
              <Col md={8} className="d-flex flex-column flex-md-row justify-content-between">
                <div className="d-flex flex-column align-items-center align-items-md-start">
                  <div className="d-flex align-items-center mb-3">
                    <img src="src/assets/avatar.png" alt="avatar" className="img-fluid" style={{ maxWidth: "3rem" }} />
                    <p className="ps-2 fw-bold m-0 text-black">Steve Jobs</p>
                  </div>
                  <Row className="w-100 mt-2">
                    <Col xs={6}>
                      <a href="#" className="text-decoration-none">
                        Language
                      </a>
                    </Col>
                    <Col xs={6}>
                      <a href="#" className="text-decoration-none">
                        Viewing activity
                      </a>
                    </Col>
                    <Col xs={6} className="mt-2">
                      <a href="#" className="text-decoration-none">
                        Playback settings
                      </a>
                    </Col>
                    <Col xs={6} className="mt-2">
                      <a href="#" className="text-decoration-none">
                        Ratings
                      </a>
                    </Col>
                    <Col xs={6} className="mt-2">
                      <a href="#" className="text-decoration-none">
                        Subtitle appearance
                      </a>
                    </Col>
                  </Row>
                </div>
                <div className="text-center text-md-end d-flex flex-column mt-4 mt-md-0">
                  <p>
                    <a href="#" className="text-decoration-none">
                      Manage profile
                    </a>
                  </p>
                  <p>
                    <a href="#" className="text-decoration-none">
                      Add profile email
                    </a>
                  </p>
                </div>
              </Col>
            </Row>
          </div>
        </Container>
      </main>

      {/* Modals */}
      <Modal show={showEmail} onHide={() => setShowEmail(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Change Email</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="newEmail">
              <Form.Label>New Email address</Form.Label>
              <Form.Control type="email" placeholder="Enter new email" />
            </Form.Group>
            <Button variant="dark" type="submit">
              Save Changes
            </Button>
          </Form>
        </Modal.Body>
      </Modal>

      <Modal show={showPassword} onHide={() => setShowPassword(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Change Password</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="newPassword">
              <Form.Label>New Password</Form.Label>
              <Form.Control type="password" placeholder="Enter new password" />
            </Form.Group>
            <Button variant="dark" type="submit">
              Save Changes
            </Button>
          </Form>
        </Modal.Body>
      </Modal>

      <Modal show={showPhone} onHide={() => setShowPhone(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Change Phone Number</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="newPhone">
              <Form.Label>New Phone Number</Form.Label>
              <Form.Control type="tel" placeholder="Enter new phone number" />
            </Form.Group>
            <Button variant="dark" type="submit">
              Save Changes
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
}
