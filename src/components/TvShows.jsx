import { useEffect, useState } from "react";
import { Container, Carousel, Spinner } from "react-bootstrap";
import CardMoveInfo from "./CardMoveInfo";
import FirstFiveShows from "./FirstFiveShows";
import SecondFiveShows from "./SecondFiveShows";

export default function TvShows() {
  const [filteredShows, setFilteredShows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedShow, setSelectedShow] = useState(null); // Stato per la serie selezionata
  const apiKey = "fc9f1c61";
  const COMMENTS_API_URL = "https://striveschool-api.herokuapp.com/api/comments/";
  const AUTH_TOKEN =
    "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2ODJkYmNlZjVhYjJjNDAwMTVlMjJhMTAiLCJpYXQiOjE3NDc4Mjc5NTEsImV4cCI6MTc0OTAzNzU1MX0.TrAkdj4Im2XwRwQbHrNU_TbOFL1iXCU4tXIiUcLZT7Q";

  // Funzione per recuperare le serie TV dall'API OMDb
  const fetchTvShows = async () => {
    try {
      const res = await fetch(`https://www.omdbapi.com/?apikey=${apiKey}&s=series&type=series`);
      const data = await res.json();
      if (data.Response === "True") {
        const shows = data.Search.map((movie) => ({
          id: movie.imdbID,
          title: movie.Title,
          image: movie.Poster !== "N/A" ? movie.Poster : "https://via.placeholder.com/150",
        }));

        const response = await fetch(COMMENTS_API_URL, {
          headers: {
            Authorization: AUTH_TOKEN,
          },
        });
        const comments = await response.json();

        const ratingsMap = comments.reduce((acc, comment) => {
          if (!acc[comment.elementId]) {
            acc[comment.elementId] = { total: 0, count: 0 };
          }
          acc[comment.elementId].total += comment.rate;
          acc[comment.elementId].count += 1;
          return acc;
        }, {});

        const showsWithRatings = shows.map((show) => {
          const averageRating =
            ratingsMap[show.id] && ratingsMap[show.id].count > 0 ? (ratingsMap[show.id].total / ratingsMap[show.id].count).toFixed(1) : "N/A";
          return { ...show, rating: averageRating };
        });

        setFilteredShows(showsWithRatings.slice(0, 20)); // Limita a 20 risultati
      } else {
        console.error("Errore API OMDb:", data.Error);
        setFilteredShows([]);
      }
    } catch (error) {
      console.error("Errore durante la chiamata API OMDb:", error);
      setFilteredShows([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTvShows();
  }, []);

  const chunkArray = (array, size) => {
    const chunks = [];
    for (let i = 0; i < array.length; i += size) {
      chunks.push(array.slice(i, i + size));
    }
    return chunks;
  };

  if (loading) {
    return (
      <div className="text-center my-5">
        <Spinner animation="border" variant="light" />
        <p className="text-white mt-3">Caricamento in corso...</p>
      </div>
    );
  }

  if (!filteredShows || filteredShows.length === 0) {
    return <div className="text-white text-center">Nessuna serie TV disponibile</div>;
  }

  const groupedShows = chunkArray(filteredShows.slice(0, 15), 5); // Gruppi di 5 per il carosello
  const firstFive = filteredShows.slice(0, 5); // Primi 5 contenuti
  const secondFive = filteredShows.slice(5, 10); // Secondi 5 contenuti

  return (
    <div className="page-container bg-serie">
      {selectedShow ? (
        <CardMoveInfo movie={selectedShow} onCardClick={() => setSelectedShow(null)} />
      ) : (
        <>
          <Container className="my-5">
            <h2 className="text-white mb-4">Serie TV Consigliate</h2>
            <hr className="my-5 border-secondary border-3" />
            <Carousel indicators={false} interval={5000}>
              {groupedShows.map((group, index) => (
                <Carousel.Item key={index}>
                  <div className="d-flex flex-wrap justify-content-center gap-3">
                    {group.map((show) => (
                      <div
                        key={show.id}
                        style={{
                          flex: "0 0 18%",
                          maxWidth: "18%",
                          minWidth: "18%",
                          cursor: "pointer",
                        }}
                        onClick={() => setSelectedShow(show)}
                      >
                        <img
                          src={show.image}
                          alt={show.title}
                          style={{
                            width: "100%",
                            height: "240px",
                            objectFit: "cover",
                            borderRadius: "8px",
                          }}
                        />
                        <div className="text-white text-center mt-2" style={{ fontSize: "14px" }}>
                          {show.title}
                        </div>
                        <div className="text-warning text-center" style={{ fontSize: "12px" }}>
                          ⭐ {show.rating}
                        </div>
                      </div>
                    ))}
                  </div>
                </Carousel.Item>
              ))}
            </Carousel>
          </Container>
          <hr className="my-5 border-secondary" />
          <Container className="my-5">
            <h3 className="text-white mb-4">Azione</h3>
            <FirstFiveShows shows={firstFive} onShowClick={setSelectedShow} />
          </Container>

          <Container className="my-5">
            <h3 className="text-white mb-4">Aventure</h3>
            <SecondFiveShows shows={secondFive} onShowClick={setSelectedShow} />
          </Container>
        </>
      )}
    </div>
  );
}
