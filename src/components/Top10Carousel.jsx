import React, { useEffect, useState } from "react";
import { Carousel, Spinner } from "react-bootstrap";
import CardImageWithLogo from "./CardImageWithLogo";
import CardMoveInfo from "./CardMoveInfo"; // Importa il componente CardMoveInfo

const OMDB_API_KEY = "8ec72378";
const COMMENTS_API_URL = "https://striveschool-api.herokuapp.com/api/comments/";

export default function Top10Carousel() {
  const [topMovies, setTopMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [randomMovie, setRandomMovie] = useState(null);
  const [selectedMovie, setSelectedMovie] = useState(null); // Stato per il film selezionato

  const fetchMovieById = async (imdbID) => {
    try {
      const res = await fetch(`https://www.omdbapi.com/?i=${imdbID}&apikey=${OMDB_API_KEY}`);
      const data = await res.json();
      if (data.Response === "True") {
        return {
          id: data.imdbID,
          title: data.Title || "Titolo non disponibile",
          image: data.Poster || "https://via.placeholder.com/150",
          year: data.Year || "N/A",
          genre: data.Genre || "N/A",
          director: data.Director || "N/A",
          plot: data.Plot || "N/A",
        };
      } else {
        console.error("Errore OMDb API:", data.Error);
        return {
          id: imdbID,
          title: "Titolo non disponibile",
          image: "https://via.placeholder.com/150",
          year: "N/A",
          genre: "N/A",
          director: "N/A",
          plot: "N/A",
        };
      }
    } catch (error) {
      console.error("Errore nel recupero dei dettagli del film:", error);
      return {
        id: imdbID,
        title: "Titolo non disponibile",
        image: "https://via.placeholder.com/150",
        year: "N/A",
        genre: "N/A",
        director: "N/A",
        plot: "N/A",
      };
    }
  };

  const fetchCommentsAndMovies = async () => {
    try {
      const response = await fetch(COMMENTS_API_URL, {
        headers: {
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2ODJkYmNlZjVhYjJjNDAwMTVlMjJhMTAiLCJpYXQiOjE3NDc4Mjc5NTEsImV4cCI6MTc0OTAzNzU1MX0.TrAkdj4Im2XwRwQbHrNU_TbOFL1iXCU4tXIiUcLZT7Q",
        },
      });
      const comments = await response.json();
      console.log("Comments API Response:", comments);

      const ratingsMap = comments.reduce((acc, comment) => {
        if (!acc[comment.elementId]) {
          acc[comment.elementId] = { total: 0, count: 0 };
        }
        acc[comment.elementId].total += comment.rate;
        acc[comment.elementId].count += 1;
        return acc;
      }, {});

      const uniqueMovieIds = [...new Set(comments.map((comment) => comment.elementId))].filter((id) => id && id.startsWith("tt"));
      console.log("Valid IMDb IDs:", uniqueMovieIds);

      if (uniqueMovieIds.length === 0) {
        console.error("Nessun ID IMDb valido trovato.");
        setTopMovies([]);
        setLoading(false);
        return;
      }

      const moviesDetails = await Promise.all(
        uniqueMovieIds.map(async (id) => {
          const details = await fetchMovieById(id);
          const averageRating = ratingsMap[id] && ratingsMap[id].count > 0 ? (ratingsMap[id].total / ratingsMap[id].count).toFixed(1) : "N/A";
          return {
            ...details,
            averageRating,
          };
        })
      );

      console.log("Movies Details with Ratings:", moviesDetails);
      setTopMovies(moviesDetails);

      const randomIndex = Math.floor(Math.random() * moviesDetails.length);
      setRandomMovie(moviesDetails[randomIndex]);
    } catch (error) {
      console.error("Errore nel recupero dei dati:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      await fetchCommentsAndMovies();
    };
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const groupMovies = (movies, groupSize) => {
    const groups = [];
    for (let i = 0; i < movies.length; i += groupSize) {
      groups.push(movies.slice(i, i + groupSize));
    }
    return groups;
  };

  const truncateTitle = (title, maxLength) => {
    if (title.length > maxLength) {
      return title.substring(0, maxLength) + "...";
    }
    return title;
  };

  if (loading) {
    return (
      <div className="text-center my-5">
        <Spinner animation="border" variant="light" />
        <p className="text-white mt-3">Caricamento in corso...</p>
      </div>
    );
  }

  const groupedMovies = groupMovies(topMovies, 5);

  if (selectedMovie) {
    return <CardMoveInfo movie={selectedMovie} onCardClick={() => setSelectedMovie(null)} />;
  }

  return (
    <div className="my-5">
      <h3 className="text-white mb-4">Top 10 Film</h3>
      <Carousel indicators={false} interval={5000}>
        {groupedMovies.map((group, groupIndex) => (
          <Carousel.Item key={groupIndex}>
            <div className="d-flex justify-content-center gap-4">
              {group.map((movie) => (
                <div key={movie.id} className="text-center" style={{ cursor: "pointer" }} onClick={() => setSelectedMovie(movie)}>
                  <CardImageWithLogo src={movie.image} alt={movie.title} height={450} />
                  <h6 className="text-white mt-2">{truncateTitle(movie.title, 20)}</h6>
                  <p className="text-warning">⭐ {movie.averageRating}</p>
                </div>
              ))}
            </div>
          </Carousel.Item>
        ))}
      </Carousel>

      <hr className="my-5 border-secondary" />

      <h1 className="text-white mb-4 text-start">Film in Tendenza</h1>

      {randomMovie && (
        <div className="d-flex align-items-center justify-content-center gap-4">
          <CardImageWithLogo src={randomMovie.image} alt={randomMovie.title} height={450} />
          <div className="text-white">
            <h2>{randomMovie.title}</h2>
            <p>
              <strong>Anno:</strong> {randomMovie.year}
            </p>
            <p>
              <strong>Genere:</strong> {randomMovie.genre}
            </p>
            <p>
              <strong>Regista:</strong> {randomMovie.director}
            </p>
            <p>
              <strong>Trama:</strong> {randomMovie.plot}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
