import { useState } from "react";
import { Form, FormControl, Button, InputGroup } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

export default function SearchBar({ movies, onSearchResults }) {
  const [searchInput, setSearchInput] = useState("");

  const handleInputChange = (e) => {
    setSearchInput(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchInput.trim() === "") {
      // Se il campo di ricerca è vuoto, mostra tutti i film
      onSearchResults(movies);
    } else {
      // Filtra i film in base alla parola chiave
      const filteredMovies = movies.filter((movie) => movie.title.toLowerCase().includes(searchInput.toLowerCase()));
      onSearchResults(filteredMovies);
    }
  };

  return (
    <Form className="d-flex mb-4" onSubmit={handleSearchSubmit}>
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
