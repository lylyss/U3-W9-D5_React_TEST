import React, { useEffect, useState } from "react";
import { Carousel } from "react-bootstrap";

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
      }));
  }
  return [];
};

function SectionCarousel({ title, search }) {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    fetchMoviesBySearch(search).then(setMovies);
  }, [search]);

  const slides = [];
  for (let i = 0; i < movies.length; i += 8) {
    slides.push(movies.slice(i, i + 10));
  }

  return (
    <div className="mb-5">
      <h5 className="text-white">{title}</h5>
      <Carousel indicators={false} interval={2000}>
        {slides.map((group, idx) => (
          <Carousel.Item key={idx}>
            <div className="d-flex gap-2">
              {group.map((item) => (
                <img key={item.id} src={item.image} className="img-fluid" alt={item.title} style={{ maxHeight: "300px" }} />
              ))}
            </div>
          </Carousel.Item>
        ))}
      </Carousel>
    </div>
  );
}

export default function CarouselSection() {
  return (
    <div className="container-fluid px-4">
      <SectionCarousel title="Star Movies" search="star" />
      <SectionCarousel title="Love Movies" search="love" />
      <SectionCarousel title="Man Movies" search="man" />
    </div>
  );
}
