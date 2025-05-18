import React from "react";
import { Dropdown } from "react-bootstrap";

export default function GenreFilter({ genre, setGenre }) {
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
          <Dropdown.Item eventKey="star">Drama</Dropdown.Item>
          <Dropdown.Item eventKey="comedy">Comedy</Dropdown.Item>
          <Dropdown.Item eventKey="fantasy">Fantasy</Dropdown.Item>
          <Dropdown.Item eventKey="action">Action</Dropdown.Item>
          <Dropdown.Item eventKey="horror">Horror</Dropdown.Item>
          <Dropdown.Item eventKey="romance">Romance</Dropdown.Item>
          <Dropdown.Item eventKey="thriller">Thriller</Dropdown.Item>
          <Dropdown.Item eventKey="adventure">Adventure</Dropdown.Item>
          <Dropdown.Item eventKey="crime">Crime</Dropdown.Item>
          <Dropdown.Item eventKey="animation">Animation</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
}
