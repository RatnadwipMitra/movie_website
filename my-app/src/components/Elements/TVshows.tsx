import React, { useEffect, useState } from "react";
import "./userinterface.css";
import { useNavigate } from "react-router-dom";
import Searchdata from './searchResults'

const TVshows = () => {
  interface Movie {
    original_title: string;
    poster_path: string;
    release_date: string;
    id: string;
  }
  const [tvShows, setTvShows] = useState<any[]>([]);
    const [searchInput, setSearchInput] = useState<string>(""); // For search input
    const [searchResults, setSearchResults] = useState<Movie[]>([]); // For search results
 
  const navigate = useNavigate();

  // Fetch popular TV shows
  useEffect(() => {
    const fetchTvShows = async () => {
      const url = "https://api.themoviedb.org/3/tv/popular?language=en-US&page=1";
      const options = {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiNWIzNjhjZDYxODE3MDcyNDkyMzliNjAzZjlhN2I0NyIsIm5iZiI6MTczMjk1Njc1OS42NDYwMDAxLCJzdWIiOiI2NzRhZDI1Nzk4N2Q4NmMwZWVhMDE2ZDMiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.MTYxgox1PZtHycLqDnFyKyHniEgrgcKFB3C1tlRgP8A",
        },
      };

      try {
        const response = await fetch(url, options);
        const data = await response.json();
        setTvShows(data.results);
      } catch (error) {
        console.error("Error fetching TV shows:", error);
      }
    };

    fetchTvShows();

    
  }, []);

  const handleSearch = async () => {
    if (!searchInput.trim()) return;
  
    const url = `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(
      searchInput
    )}&include_adult=false&language=en-US&page=1`;
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiNWIzNjhjZDYxODE3MDcyNDkyMzliNjAzZjlhN2I0NyIsIm5iZiI6MTczMjk1Njc1OS42NDYwMDAxLCJzdWIiOiI2NzRhZDI1Nzk4N2Q4NmMwZWVhMDE2ZDMiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.MTYxgox1PZtHycLqDnFyKyHniEgrgcKFB3C1tlRgP8A",
      },
    };
  
    try {
      const response = await fetch(url, options);
      const data = await response.json();
      setSearchResults(data.results);
  
      // Navigate to the SearchResults page
      navigate("/search-results", {
        state: { searchResults: data.results, searchInput },
      });
    } catch (error) {
      console.error("Error fetching search results:", error);
    }
  };
  

  return (
    <>
    
      <div className="populardesign">
      <div className="container">
        <div className="form-group">
          <div className="row">
            <div className="col">
              <div style={{ display: "flex", gap: "30px", marginTop: "40px" }}>
                <input
                  type="text"
                  className="form-control"
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.currentTarget.value)}
                  placeholder="Search any movie..."
                />
                <button className="btn btn-primary" onClick={handleSearch}>
                  Search
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div style={{ maxWidth:"1360px",marginLeft:"70px"}}>
      <div style={{ marginBottom: "0px" ,marginTop:"40px"}}>
        <h3 style={{color: "white"}}>TV SHOWS</h3>
      </div>
      <div
        className="cards-container populardesign"
        style={{
          display: "flex",
          gap: "5px",
          overflowX: "auto",
          padding: "20px",
          whiteSpace: "nowrap",
          scrollBehavior: "smooth",
          // backgroundColor: "black",
        }}
      >
        {tvShows.slice(5, 20).map((item) => (
          <div
            key={item.id} // Added key prop
            className="card"
            style={{
              display: "inline-block",
              width: "150px",
              height:'250px',
              flexShrink: 0,
              margin: "10px",
              border: "1px solid #ccc",
              boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
              cursor: "pointer",
            }}
            onClick={() => navigate(`/movie/${item.id}`)} 
            // Fetch videos when card is clicked
          >
            <div
              className="card-header backgroundesign"
              style={{
                padding: "10px",
                color: "white",
                borderBottom: "1px solid #ccc",
              }}
            >
              <p
                style={{
                  margin: 0,
                  fontWeight: "bold",
                  overflow: "hidden",
                }}
              >
                {item.name}
              </p>
            </div>
            <div
              className="card-body"
              style={{
                padding: "20px",
                textAlign: "center",
                textOverflow: "ellipsis",
              }}
            >
              <img
                src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
                alt={item.name}
                style={{
                  width: "100px",
                  height: "140px",
                  objectFit: "cover",
                  borderRadius: "8px",
                }}
              />
              <p
                style={{
                  marginTop: "10px",
                  fontSize: "14px",
                  color: "#555",
                }}
              >
                {item.first_air_date}
              </p>
            </div>
          </div>
        ))}
      </div>
      </div>
      </div>

      
    </>
  );
};

export default TVshows;
