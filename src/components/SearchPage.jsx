import React, { useState } from "react";

export default function SearchPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState([]);

  const handleSearch = () => {
    const mockData = [
      { id: 1, title: "Inception" },
      { id: 2, title: "Interstellar" },
      { id: 3, title: "The Dark Knight" },
    ];
    const filteredResults = mockData.filter((movie) => movie.title.toLowerCase().includes(searchTerm.toLowerCase()));
    setResults(filteredResults);
  };

  return (
    <div className="page-container">
      <h1>Search Page</h1>
      <div className="search-bar">
        <input type="text" placeholder="Cerca un film..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
        <button onClick={handleSearch}>Cerca</button>
      </div>
      <div className="search-results">
        {results.length > 0 ? (
          results.map((movie) => (
            <div key={movie.id} className="search-result-item">
              {movie.title}
            </div>
          ))
        ) : (
          <p>Nessun risultato trovato.</p>
        )}
      </div>
    </div>
  );
}
