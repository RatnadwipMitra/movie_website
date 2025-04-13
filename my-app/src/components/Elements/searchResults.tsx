import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const SearchResults = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Retrieve search results passed via state
  const { searchResults, searchInput } = location.state || { searchResults: [], searchInput: "" };

  return (
    <div style={{ padding: "20px" }}>
      <h1 style={{ color: "white" }}>Search Results for "{searchInput}"</h1>
      <div
        className="cards-container"
        style={{
          display: "flex",
          gap: "20px",
          flexWrap: "wrap",
        }}
      >
        {searchResults.length > 0 ? (
          searchResults.map((item: any) => (
            <div
              key={item.id}
              className="card"
              style={{
                width: "200px",
                margin: "10px",
                border: "1px solid #ccc",
                boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
                cursor: "pointer",
              }}
              onClick={() => navigate(`/movie/${item.id}`)}
            >
              <div
                className="card-header"
                style={{
                  padding: "10px",
                  color: "white",
                  borderBottom: "1px solid #ccc",
                }}
              >
                <p style={{ margin: 0, fontWeight: "bold", overflow: "hidden" }}>
                  {item.original_title}
                </p>
              </div>
              <div
                className="card-body"
                style={{
                  padding: "20px",
                  textAlign: "center",
                }}
              >
                <img
                  src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
                  alt={item.original_title}
                  style={{
                    width: "160px",
                    height: "200px",
                    objectFit: "cover",
                    borderRadius: "8px",
                  }}
                />
                <p style={{ marginTop: "10px", fontSize: "14px", color: "#555" }}>
                  {item.release_date}
                </p>
              </div>
            </div>
          ))
        ) : (
          <p style={{ color: "white" }}>No results found.</p>
        )}
      </div>
    </div>
  );
};

export default SearchResults;
