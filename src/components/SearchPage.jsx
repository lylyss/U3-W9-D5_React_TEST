import React, { useState, useEffect } from "react";

export default function SearchPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState([]);
  const apiKey = "fc9f1c61";

  const fetchContentByTitle = async (title) => {
    const res = await fetch(`https://www.omdbapi.com/?apikey=${apiKey}&s=${encodeURIComponent(title)}`);
    const data = await res.json();
    if (data.Response === "True") {
      setResults(data.Search);
    } else {
      console.error("Errore API:", data.Error);
      setResults([]);
    }
  };

  useEffect(() => {
    fetchContentByTitle();
  }, []);

  const handleSearch = () => {
    if (searchTerm.trim() === "") {
      fetchContentByTitle(" ");
    } else {
      fetchContentByTitle(searchTerm);
    }
  };

  return (
    <div className="page-container">
      <h1 className="text-white mb-4">Tutti i Contenuti Disponibili</h1>
      <div className="search-bar mb-4">
        <input
          type="text"
          placeholder="Cerca un contenuto..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="form-control bg-dark text-white border-secondary"
        />
        <button onClick={handleSearch} className="btn btn-secondary mt-2">
          Cerca
        </button>
      </div>
      <div className="search-results">
        {results.length > 0 ? (
          <div className="row">
            {results.map((item) => (
              <div key={item.imdbID} className="col-6 col-md-3 col-lg-2 mb-4">
                <div className="text-center">
                  <img
                    src={item.Poster !== "N/A" ? item.Poster : "src/assets/netflix-logo-icon.svg"}
                    alt={item.Title}
                    style={{
                      width: "100%",
                      height: "280px",
                      objectFit: "cover",
                      borderRadius: "8px",
                    }}
                  />
                  <h6 className="text-white mt-2">{item.Title}</h6>
                  <p className="text-secondary">{item.Type}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-white">Nessun risultato trovato.</p>
        )}
      </div>
    </div>
  );
}
