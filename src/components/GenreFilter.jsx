import React from "react";
import { Dropdown } from "react-bootstrap";

export default function GenreFilter({ genre, setGenre }) {
  const genres = ["All", "Drama", "Fantasy", "Comedy", "Action", "Horror", "Romance", "Thriller", "Adventure", "Crime", "Animation"];

  return (
    <div className="d-flex align-items-center">
      <Dropdown onSelect={(eventKey) => setGenre(eventKey)}>
        <Dropdown.Toggle
          variant="dark"
          id="genre-dropdown"
          className="ms-2 p-1"
          style={{
            backgroundColor: "transparent",
            border: "1px solid #ffffff",
            color: "#ffffff",
            borderRadius: 0,
          }}
        >
          <span style={{ color: "#ffffff" }}>
            {genre === "genre"
              ? "Drama"
              : genre === "comedy"
              ? "Comedy"
              : genre === "fantasy"
              ? "Fantasy"
              : genre === "action"
              ? "Action"
              : genre === "horror"
              ? "Horror"
              : genre === "romance"
              ? "Romance"
              : genre === "thriller"
              ? "Thriller"
              : genre === "adventure"
              ? "Adventure"
              : genre === "crime"
              ? "Crime"
              : genre === "animation"
              ? "Animation"
              : "Genere"}
          </span>
        </Dropdown.Toggle>
        <Dropdown.Menu>
          {genres.map((g) => (
            <Dropdown.Item key={g} eventKey={g} onClick={() => setGenre(g)}>
              {g}
            </Dropdown.Item>
          ))}
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
}
