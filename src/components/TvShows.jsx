import React from "react";
import { Carousel, Container } from "react-bootstrap";

export default function TvShows({ tvShows }) {
  const chunkedTvShows = [];
  for (let i = 0; i < tvShows.length; i += 8) {
    chunkedTvShows.push(tvShows.slice(i, i + 8));
  }

  return (
    <Container className="my-5">
      <h2 className="text-white mb-4">TV Shows</h2>
      <Carousel indicators={false} interval={5000}>
        {chunkedTvShows.map((group, index) => (
          <Carousel.Item key={index}>
            <div className="d-flex flex-wrap justify-content-center gap-3">
              {group.map((show) => (
                <div
                  key={show.id}
                  style={{
                    flex: "0 0 22%",
                    maxWidth: "22%",
                    minWidth: "22%",
                    cursor: "pointer",
                  }}
                >
                  <img
                    src={show.image || "path/to/fallback-image.jpg"}
                    alt={show.title}
                    style={{
                      width: "100%",
                      height: "200px",
                      objectFit: "cover",
                      borderRadius: "8px",
                    }}
                  />
                  <div className="text-white text-center mt-2" style={{ fontSize: "14px" }}>
                    {show.title}
                  </div>
                </div>
              ))}
            </div>
          </Carousel.Item>
        ))}
      </Carousel>
    </Container>
  );
}
