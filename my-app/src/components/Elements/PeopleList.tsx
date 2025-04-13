
import React, { useState, useEffect } from "react";

const PeopleList = () => {
  const [people, setPeople] = useState<any[]>([]);

  useEffect(() => {
    const url = "https://api.themoviedb.org/3/person/popular?language=en-US&page=1";
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiNWIzNjhjZDYxODE3MDcyNDkyMzliNjAzZjlhN2I0NyIsIm5iZiI6MTczMjk1Njc1OS42NDYwMDAxLCJzdWIiOiI2NzRhZDI1Nzk4N2Q4NmMwZWVhMDE2ZDMiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.MTYxgox1PZtHycLqDnFyKyHniEgrgcKFB3C1tlRgP8A",
      },
    };

    fetch(url, options)
      .then((res) => res.json())
      .then((json) => {
        setPeople(json.results);
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <>
      <div style={{ marginBottom: "20px",marginTop: "30px", textAlign:"center" }}>
        <h1 style={{fontSize:"30px"}}>POPULAR PEOPLE</h1>
      </div>
      <div
        style={{
          padding: "20px",
          maxWidth: "1500px",
          margin: "auto",
          display: "flex",
          flexWrap: "wrap",
          gap: "20px",
          justifyContent: "center",
        }}
      >
        {people.slice(0,18).map((person) => (
          <div
            className="card"
            style={{
              width: "200px",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
              borderRadius: "8px",
              overflow: "hidden",
              textAlign: "center",
              backgroundColor: "#fff",
              padding: "10px",
            }}
          >
            <img
              src={`https://image.tmdb.org/t/p/w500${person.profile_path}`}
              alt={person.name}
              style={{
                width: "100%",
                height: "auto",
                borderRadius: "8px",
              }}
            />
            <div
              className="card-body"
              style={{
                marginTop: "10px",
              }}
            >
              <p style={{ fontWeight: "bold", fontSize: "16px", margin: "0" }}>
                {person.name}
              </p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default PeopleList;

