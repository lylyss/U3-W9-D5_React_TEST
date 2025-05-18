import { useState } from "react";
import { Form, FormControl, Button, InputGroup } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

export default function SearchBar({ onSearchClick, onSearchKeyword }) {
  const [searchInput, setSearchInput] = useState("");

  const handleInputChange = (e) => {
    setSearchInput(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (onSearchKeyword) {
      onSearchKeyword(searchInput);
    }
    if (onSearchClick) {
      onSearchClick();
    }
  };

  return (
    <Form className="d-flex" onSubmit={handleSearchSubmit}>
      <InputGroup>
        <FormControl
          type="search"
          placeholder="Cerca film..."
          className="me-2 bg-dark text-white border border-secondary rounded-0"
          aria-label="Search"
          value={searchInput}
          onChange={handleInputChange}
          style={{ width: 180 }}
        />
        <Button variant="outline-secondary" type="submit" className="d-flex align-items-center" style={{ border: "none", background: "none", color: "white" }}>
          <FontAwesomeIcon icon={faMagnifyingGlass} />
        </Button>
      </InputGroup>
    </Form>
  );
}
