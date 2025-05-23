export default function SecondFiveShows({ shows, onShowClick }) {
  return (
    <div className="d-flex flex-wrap justify-content-between">
      {shows.map((show) => (
        <div
          key={show.id}
          style={{
            flex: "0 0 18%",
            maxWidth: "18%",
            minWidth: "18%",
            cursor: "pointer",
          }}
          onClick={() => onShowClick(show)}
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
  );
}
