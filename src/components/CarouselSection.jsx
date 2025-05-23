import React, { useEffect, useState } from "react";
import { Carousel } from "react-bootstrap";
import CardImageWithLogo from "./CardImageWithLogo";

// Funzione per cercare film tramite parola chiave
const fetchMoviesBySearch = async (query) => {
  const apiKey = "fc9f1c61";
  const res = await fetch(`https://www.omdbapi.com/?apikey=${apiKey}&s=${query}&type=movie`);
  const data = await res.json();
  if (data.Response === "True") {
    const details = await Promise.all(
      data.Search.map((movie) => fetch(`https://www.omdbapi.com/?apikey=${apiKey}&i=${movie.imdbID}`).then((res) => res.json()))
    );
    return details
      .filter((movie) => movie.Response !== "False")
      .map((movie) => ({
        id: movie.imdbID,
        image: movie.Poster,
        title: movie.Title,
        year: movie.Year,
        genre: movie.Genre,
        country: movie.Country,
        awards: movie.Awards,
        language: movie.Language,
        runtime: movie.Runtime,
      }));
  }
  return [];
};

function SectionCarousel({ title, search, onCardClick }) {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    fetchMoviesBySearch(search).then(setMovies);
  }, [search]);

  const slides = [];
  for (let i = 0; i < movies.length; i += 5) {
    slides.push(movies.slice(i, i + 10));
  }

  return (
    <div className="mb-5">
      <h5 className="text-white">{title}</h5>
      <Carousel indicators={false} interval={4000}>
        {slides.map((group, idx) => (
          <Carousel.Item key={idx}>
            <div
              className="d-flex justify-content-center"
              style={{
                gap: "70px",
                flexWrap: "nowrap",
                overflow: "hidden",
                width: "100%",
              }}
            >
              {group.map((item) => (
                <div
                  key={item.id}
                  className="carousel-movie-card"
                  style={{
                    flex: "0 0 170px",
                    maxWidth: "170px",
                    minWidth: "170px",
                    cursor: "pointer",
                  }}
                  onClick={() => onCardClick(item, "carousel")}
                >
                  <CardImageWithLogo
                    src={item.image}
                    alt={item.title}
                    height={280}
                    style={{
                      width: "100%",
                      height: "280px",
                      objectFit: "cover",
                      borderRadius: 8,
                    }}
                  />
                </div>
              ))}
            </div>
          </Carousel.Item>
        ))}
      </Carousel>
    </div>
  );
}

export default function CarouselSection({ onCardClick }) {
  return (
    <div className="container-fluid px-4">
      <SectionCarousel title="Magic Movies" search="Harry Potter" onCardClick={onCardClick} />
      <SectionCarousel title="Fantasy Movies" search="Lord of the Rings" onCardClick={onCardClick} />
      <SectionCarousel title="Horror Movies" search="The Exorcist" onCardClick={onCardClick} />
    </div>
  );
}
