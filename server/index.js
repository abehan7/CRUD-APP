const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const mysql = require("mysql");
const cors = require("cors");scroll
// const { default: App } = require("../client/src/App");

const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "",
  database: "cruddataBase",
});

app.use(cors());
app.use(express.json());
// app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.urlencoded({ extended: true }));
app.get("/api/get", (req, res) => {
  // console.log("In api/get");
  // res.send("hey");
  const sqlSelect = "SELECT * FROM movie_reviews";
  db.query(sqlSelect, (err, result) => {
    res.send(result);
  });
});

app.post("/api/insert", (req, res) => {
  // console.log("hi");

  const movieName = req.body.movieName;
  const movieReview = req.body.movieReview;
  // console.log(movieName);
  // console.log(movieReview);
  const sqlInsert =
    "INSERT INTO movie_reviews (movieName, movieReview) VALUES (?,?)";
  db.query(sqlInsert, [movieName, movieReview], (err, result) => {
    // console.log(result);
    res.send(result);
  });
});

app.delete("/api/delete/:movieName", (req, res) => {
  const name = req.params.movieName;
  console.log(name);

  const sqlDelete = "DELETE FROM movie_reviews WHERE movieNAme = ?";
  db.query(sqlDelete, name, (err, result) => {
    if (err) console.log(err);
  });
});

app.put("api/update", (req, res) => {
  const name = req.body.movieName;
  const review = req.body.movieReview;

  const sqlUpdate =
    "UPDATE SET movew_reviews movieReview = ? WHERE moviewName = ?";
  db.query(sqlUpdate, [review, name], (err, result) => {
    if (err) console.log(err);
  });
});

app.listen(3001, () => {
  console.log("running on port 3001");
});
