
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./userinterface.css"
interface MovieDetailsType {
    original_title: string;
    poster_path: string;
    release_date: string;
    overview: string;
}

interface ImageType {
    file_path: string;
}

const Moviedetails = () => {
    const { id } = useParams(); // Get the movie ID from route params
    const [movieDetails, setMovieDetails] = useState<MovieDetailsType | null>(null); // Movie details state
    const [images, setImages] = useState<ImageType[]>(); // Movie images state

    const [movievideos, setMovievideos] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(true); // Loading state
    const [error, setError] = useState<string>(); // Error state

    useEffect(() => {
        const fetchMovieDetails = async () => {
            const movieUrl = `https://api.themoviedb.org/3/movie/${id}`;
            const options = {
                method: "GET",
                headers: {
                    accept: "application/json",
                    Authorization: "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiNWIzNjhjZDYxODE3MDcyNDkyMzliNjAzZjlhN2I0NyIsIm5iZiI6MTczMjk1Njc1OS42NDYwMDAxLCJzdWIiOiI2NzRhZDI1Nzk4N2Q4NmMwZWVhMDE2ZDMiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.MTYxgox1PZtHycLqDnFyKyHniEgrgcKFB3C1tlRgP8A",
                },
            };

            try {
                const res = await fetch(movieUrl, options);
                if (!res.ok) throw new Error("Failed to fetch movie details.");
                const data = await res.json();
                console.log(data)
                setMovieDetails(data);
            } catch (err) {
                setError("Could not load movie details. Please try again later.");
            } finally {
                setLoading(false);
            }
        };

        const fetchMovieImages = async () => {
            const imageUrl = `https://api.themoviedb.org/3/movie/${id}/images`;
            const options = {
                method: "GET",
                headers: {
                    accept: "application/json",
                    Authorization: "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiNWIzNjhjZDYxODE3MDcyNDkyMzliNjAzZjlhN2I0NyIsIm5iZiI6MTczMjk1Njc1OS42NDYwMDAxLCJzdWIiOiI2NzRhZDI1Nzk4N2Q4NmMwZWVhMDE2ZDMiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.MTYxgox1PZtHycLqDnFyKyHniEgrgcKFB3C1tlRgP8A",
                },
            };

            try {
                const res = await fetch(imageUrl, options);
                if (!res.ok) throw new Error("Failed to fetch movie images.");
                const data = await res.json();
                setImages(data.backdrops);
            } catch (err) {
                console.error("Error fetching images:", err);
            }
        };

        const fetchmovieVideos = async () => {
            const url = `https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`; // Fixed the URL to use dynamic showId
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
              console.log(data)
              setMovievideos(data.results); // Store videos in state
            } catch (error) {
              console.error("Error fetching videos:", error);
            }
          };

          


        fetchMovieDetails();
        fetchMovieImages();
        // fetchPersonDetails();
        fetchmovieVideos()
        
    }, [id]);

    if (loading) {
        return <div style={{ textAlign: "center" }}>Loading movie details...</div>;
    }

    if (error) {
        return <div style={{ textAlign: "center", color: "red" }}>{error}</div>;
    }

    if (!movieDetails) {
        return <div style={{ textAlign: "center" }}>No movie details available.</div>;
    }

    return (
        <div style={{ background: "linear-gradient(to bottom, #0d253f, #1c3b57)", color: "#fff", fontFamily: "Arial, sans-serif", padding: "40px" }}>
        <div style={{ maxWidth: "1300px", margin: "auto", display: "flex", gap: "20px", flexWrap: "wrap" }}>
        <div
  style={{
    background: `linear-gradient(to bottom, rgba(13, 37, 63, 0.8), rgba(132, 136, 52, 0.8)), url(https://image.tmdb.org/t/p/original${movieDetails.poster_path})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",   // Prevents tiling
  height: "70vh",                 // Sets the height to the full viewport
  width: "100vw",
    color: "#fff",
    fontFamily: "Arial, sans-serif",
    padding: "30px",
  }}>
      <div
    style={{
      maxWidth: "1300px",
      margin: "auto",
      display: "flex",
      gap: "20px",
      flexWrap: "wrap",
    }}
  >
            
            <div style={{ textAlign: "center" }}>
                <img
                    src={`https://image.tmdb.org/t/p/w500${movieDetails.poster_path}`}
                    alt={movieDetails.original_title}
                    style={{ width: "100%", maxWidth: "300px", borderRadius: "8px" }}
                />
            </div>
            <div style={{ flex: "2 1 800px" }}>
                    <h1 style={{ marginBottom: "40px",marginTop:"80px" }} >{movieDetails.original_title}</h1>
                    <p><strong>Release Date:</strong> {movieDetails.release_date}</p>
                    <p><strong>Overview:</strong> {movieDetails.overview}</p>
            </div>
            </div>
            </div>


            {images && images.length > 0 && (


                
                <div style={{ marginTop: "40px" }}>
                    <h2 style={{marginBottom:"40px"}}>ADDITINAL IMAGE</h2>
                    <div style={{ display: "flex", gap: "10px", flexWrap: "wrap", justifyContent: "center" }}>
                        {images.slice(0, 6).map((img, index) => (
                            <img
                                key={index}
                                src={`https://image.tmdb.org/t/p/w500${img.file_path}`}
                                alt="Additional scene"
                                style={{ width: "240px", height: "240px", borderRadius: "4px" }}
                            />
                        ))}
                    </div>
                </div>

            )}
            <div style={{marginTop:"40px"}}>
      <h2 >REVIEW VIDEO</h2>
      <div style={{display:"flex", justifyContent: "center",gap:"20px"}}>
      {movievideos.slice(0,5).map((video) => (
        <div style={{ marginBottom: "40px",marginTop:"40px"}}>

          <a
            href={`https://www.youtube.com/watch?v=${video.key}`}
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "blue",textDecoration:"none" }}
          >
            <img
                src={`https://img.youtube.com/vi/${video.key}/mqdefault.jpg`} // YouTube thumbnail URL
                alt={video.name}
                style={{
                
                  width: "245px",
                  height: "245px",
                  display: "block",
                  borderBottom: "1px solid #ddd",
                }}
              />
              <p style={{color:"white",textDecoration:"none"}}>Watch On Youtube</p>
          </a>
        </div>
      ))}
      </div>
    </div>
        </div>
        
        </div>
        
    );
};

export default Moviedetails;

