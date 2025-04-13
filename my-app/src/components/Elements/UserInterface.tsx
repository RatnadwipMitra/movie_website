
import React, { useState, useEffect } from "react";
import "./userinterface.css";
import { useNavigate } from "react-router-dom";

interface Movie {
  original_title: string;
  poster_path: string;
  release_date: string;
  id: string;
}

const UserInterface = () => {
  const [moviedata, setMoviedata] = useState<Movie[]>([]);
  const [topratedmovie, setTopratedmovie] = useState<Movie[]>([]);
  
  const [searchInput, setSearchInput] = useState<string>(""); // For search input
  const [searchResults, setSearchResults] = useState<Movie[]>([]); // For search results

  const navigate = useNavigate();

  useEffect(() => {
    const popularmovie = async () => {
      const url = "https://api.themoviedb.org/3/movie/popular?language=en-US&page=1";
      const options = {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization: "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiNWIzNjhjZDYxODE3MDcyNDkyMzliNjAzZjlhN2I0NyIsIm5iZiI6MTczMjk1Njc1OS42NDYwMDAxLCJzdWIiOiI2NzRhZDI1Nzk4N2Q4NmMwZWVhMDE2ZDMiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.MTYxgox1PZtHycLqDnFyKyHniEgrgcKFB3C1tlRgP8A",
        },
      };

      fetch(url, options)
        .then((res) => res.json())
        .then((data) =>{ 
          console.log(data.results)
          setMoviedata(data.results)
        })
        .catch((err) => console.error(err));
    };

    const topratedmovie = async () => {
      const url = "https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1";
      const options = {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization: "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiNWIzNjhjZDYxODE3MDcyNDkyMzliNjAzZjlhN2I0NyIsIm5iZiI6MTczMjk1Njc1OS42NDYwMDAxLCJzdWIiOiI2NzRhZDI1Nzk4N2Q4NmMwZWVhMDE2ZDMiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.MTYxgox1PZtHycLqDnFyKyHniEgrgcKFB3C1tlRgP8A",
        },
      };

      fetch(url, options)
        .then((res) => res.json())
        .then((data) => setTopratedmovie(data.results))
        .catch((err) => console.error(err));
    };

    

    popularmovie();
    topratedmovie();

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
        Authorization: "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiNWIzNjhjZDYxODE3MDcyNDkyMzliNjAzZjlhN2I0NyIsIm5iZiI6MTczMjk1Njc1OS42NDYwMDAxLCJzdWIiOiI2NzRhZDI1Nzk4N2Q4NmMwZWVhMDE2ZDMiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.MTYxgox1PZtHycLqDnFyKyHniEgrgcKFB3C1tlRgP8A",
      },
    };

    fetch(url, options)
      .then((res) => res.json())
      .then((data) =>{ setSearchResults(data.results)})
      .catch((err) => console.error(err));
  };

  return (
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

      

      {/* Render Search Results */}
      {searchResults.length > 0 && (
        <div style={{ color: "white", marginTop: "40px", marginBottom: "0px" }}>
          <h3>Search Results</h3>
          <div
            className="cards-container"
            style={{
              display: "flex",
              gap: "20px",
              overflowX: "auto",
              padding: "20px",
              whiteSpace: "nowrap",
              scrollBehavior: "smooth",
            }}
          >
            {searchResults.slice(0,8).map((item) => (
              <div
                key={item.id}
                className="card"
                style={{
                  display: "inline-block",
                  width: "200px",
                  flexShrink: 0,
                  margin: "10px",
                  border: "1px solid #ccc",
                  boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
                  cursor: "pointer",
                }}
                onClick={() => navigate(`/movie/${item.id}`)}
              >
                <div
                  className="card-header backgroundesign"
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
            ))}
          </div>
        </div>
      )}
      

      {/* Popular Movies */}
      <div style={{ color: "white", marginTop: "40px", marginBottom: "0px" }}>
        <h3>POPULAR MOVIES</h3>
      </div>
      <div
        className="cards-container"
        style={{
          display: "flex",
          gap: "5px",
          overflowX: "auto",
          padding: "20px",
          whiteSpace: "nowrap",
          scrollBehavior: "smooth",
        }}
      >
        {moviedata.slice(0, 20).map((item) => (
            <div
              className="card"
              style={{
                display: "inline-block",
                width: "150px",
                height:'250px',
                flexShrink: 0, // Prevent cards from shrinking
                margin: "10px",
                border: "1px solid #ccc",
                boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
                cursor: "pointer",
              }}
              onClick={() => navigate(`/movie/${item.id}`)}
            >
              <div
                className="card-header backgroundesign "
                style={{
                  padding: "10px",
                color:"white",
                
                  borderBottom: "1px solid #ccc",
                }}
              >
                <p
                  style={{
                    margin: 0,
                    fontWeight: "bold",
                    overflow:"hidden",
                  
                  }}
                >
                  {item.original_title}
                </p>
              </div>
              <div
                className="card-body"
                style={{
                  padding: "20px",
                  textAlign: "center",
                  textOverflow: "ellipsis"
                }}
              >
                <img
                  src={
                    `https://image.tmdb.org/t/p/w500${item.poster_path}`
                      
                  }
                  alt={item.original_title}
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
                  {item.release_date}
                </p>
              </div>
            </div>
          ))}
      </div>

      {/* Top Rated Movies */}
      <div style={{ color: "white", marginTop: "40px", marginBottom: "0px" }}>
        <h3>TOP RATED MOVIES</h3>
      </div>
      <div
        className="cards-container"
        style={{
          display: "flex",
          gap: "5px",
          overflowX: "auto",
          padding: "20px",
          whiteSpace: "nowrap",
          scrollBehavior: "smooth",
        }}
      >
         {topratedmovie.slice(0, 20).map((item) => (
              <div
                key={item.id}
                className="card"
                style={{
                  display: "inline-block",
                  width: "150px",
                  height:'250px',
                  flexShrink: 0, // Prevent cards from shrinking
                  margin: "10px",
                  border: "1px solid #ccc",
                  boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
                  cursor: "pointer",
                }}
                onClick={() => navigate(`/movie/${item.id}`)}
              >
                <div
                  className="card-header backgroundesign"
                  style={{
                    padding: "10px",
                    
                    color:"white",
                    borderBottom: "1px solid #ccc",
                  
                  }}
                >
                  <p
                    style={{
                      margin: 0,
                      fontWeight: "bold",
                      overflow:"hidden",
                    
                    }}
                  >
                    {item.original_title}
                  </p>
                </div>
                <div
                  className="card-body"
                  style={{
                    padding: "20px",
                    textAlign: "center",
                    textOverflow: "ellipsis"
                  }}
                >
                  <img
                    src={
                      `https://image.tmdb.org/t/p/w500${item.poster_path}`
                        
                    }
                    alt={item.original_title}
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
                    {item.release_date}
                  </p>
                </div>
              </div>
            ))}
      </div>
    </div>
    </div>
  );
};

export default UserInterface;

