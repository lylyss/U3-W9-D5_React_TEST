import { Navbar, Nav, Dropdown } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";

export default function MainHeader() {
  const navigate = useNavigate(); // Hook per navigare tra le pagine

  return (
    <Navbar bg="black" variant="dark" expand="lg" className="px-4 py-0">
      <Navbar.Brand as={Link} to="/">
        <img src="src/assets/netflix_logo.png" height="40" alt="Netflix Logo" />
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="navbarContent" />
      <Navbar.Collapse id="navbarContent">
        <Nav className="ms-3">
          <Nav.Link as={Link} to="/">
            Home
          </Nav.Link>
          <Nav.Link as={Link} to="/tv-shows">
            TV Shows
          </Nav.Link>
          <Nav.Link as={Link} to="/movies">
            Movies
          </Nav.Link>
          <Nav.Link as={Link} to="/my-list">
            My List
          </Nav.Link>
        </Nav>
        <div className="d-flex align-items-center ms-auto gap-3">
          {/* Bottone ricerca */}
          <Link to="/search" className="btn btn-link p-0 m-0" style={{ color: "#ffffff" }} aria-label="Cerca">
            <FontAwesomeIcon icon={faMagnifyingGlass} size="lg" />
          </Link>
          <span className="text-white">KIDS</span>
          <FontAwesomeIcon icon={faBell} style={{ color: "#ffffff" }} />
          <Dropdown align="end">
            <Dropdown.Toggle variant="black" id="profileDropdown" className="d-flex align-items-center border-0 ">
              <img src="src/assets/avatar.png" width="32" height="32" alt="Profile" />
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item onClick={() => navigate("/account")}>Account</Dropdown.Item>
              <Dropdown.Item onClick={() => navigate("/settings")}>Settings</Dropdown.Item>
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
  );
}
