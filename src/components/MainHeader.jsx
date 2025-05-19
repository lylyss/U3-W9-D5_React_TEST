import React from "react";
import { Navbar, Nav, Dropdown, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

export default function MainHeader({ onAccountClick, onSearchClick, onSettingsClick }) {
  return (
    <>
      <Navbar bg="black" variant="dark" expand="lg" className="px-4 py-0">
        <Navbar.Brand href="#">
          <img src="src/assets/netflix_logo.png" height="40" alt="Netflix Logo" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarContent" />
        <Navbar.Collapse id="navbarContent">
          <Nav className="ms-3">
            <Nav.Link href="#">Home</Nav.Link>
            <Nav.Link href="#">TV Shows</Nav.Link>
            <Nav.Link href="#">Movies</Nav.Link>
            <Nav.Link href="#">My List</Nav.Link>
          </Nav>
          <div className="d-flex align-items-center ms-auto gap-3">
            {/* Bottone ricerca */}
            <Button variant="link" className="p-0 m-0" style={{ color: "#ffffff" }} onClick={onSearchClick} aria-label="Cerca">
              <FontAwesomeIcon icon={faMagnifyingGlass} size="lg" />
            </Button>
            <span className="text-white">KIDS</span>
            <FontAwesomeIcon icon={faBell} style={{ color: "#ffffff" }} />
            <Dropdown align="end">
              <Dropdown.Toggle variant="black" id="profileDropdown" className="d-flex align-items-center border-0 ">
                <img src="src/assets/avatar.png" width="32" height="32" alt="Profile" />
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item onClick={onAccountClick}>Account</Dropdown.Item>
                <Dropdown.Item onClick={onSettingsClick}>Settings</Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item
                  href="#"
                  onClick={() => {
                    window.location.reload();
                  }}
                >
                  Log out
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
        </Navbar.Collapse>
      </Navbar>
    </>
  );
}
