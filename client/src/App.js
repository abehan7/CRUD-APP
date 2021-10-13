import "./App.css";
import React, { useEffect, useState } from "react";
import Axios from "axios";

function App() {
  const [movieName, setMovieName] = useState("");
  const [review, setReview] = useState("");
  const [movieReviewList, setMovieList] = useState([]);

  useEffect(() => {
    Axios.get("http://localhost:3001/api/get").then((response) => {
      console.log(response.data);
      console.log(response.data[0].movieNAme);
      setMovieList(response.data);
    });
  }, []);

  const submitReview = () => {
    Axios.post("http://localhost:3001/api/insert", {
      movieName: movieName,
      movieReview: review,
    }).then(() => {
      alert("successful insert");
      setMovieName("");
      setReview("");
    });
  };

  const deleteReview = (movie) => {
    Axios.delete(`http://localhost:3001/api/delete/${movie}`);
  };
  return (
    <div className="App">
      <h1>CRUD APPLICATION</h1>
      <div className="form">
        <label>Movie Name:</label>
        <input
          type="text"
          name="movieName"
          onChange={(e) => {
            setMovieName(e.target.value);
            console.log(movieName);
          }}
          value={movieName}
        />
        <input
          type="text"
          name="review"
          onChange={(e) => {
            setReview(e.target.value);
            console.log(review);
          }}
          value={review}
        />

        <button onClick={submitReview}>submit</button>

        {movieReviewList.map((val) => {
          return (
            <div className="card">
              <h1>MovieName:{val.movieNAme}</h1>
              <p>| Movie Review:{val.movieReview}</p>

              <button
                onClick={() => {
                  deleteReview(val.movieNAme);
                }}
              >
                delete
              </button>
              <input type="text" id="updateInput" />
              <button>update</button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
