const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const mysql = require("mysql");

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "3397998f",
  database: "cruddb",
  insecureAuth: true,
});
app.use(express.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));

app.post("/api/insert", (req, res) => {
  const movieName = req.body.movieName;
  const movieReview = req.body.movieReview;
  const sqlInsert =
    "INSERT INTO movie_reviews (movieName, movieReview) VALUES (?, ?)";
  db.query(sqlInsert, [movieName, movieReview], (err, result) => {
    console.log("error happened in POST");
  });
});
app.delete("/api/delete/:id", (req, res) => {
  const num = req.params.id;
  const sqldelete = `DELETE FROM movie_reviews WHERE id = ?`;

  db.query(sqldelete, num, (err, result) => {
    if (err) console.log(`error happened in DELETE ${num}`);
  });
});
app.put("/api/update", (req, res) => {
  const id = req.body.id;
  const review = req.body.movieReview;
  const sqlupdate = `UPDATE movie_reviews SET movieReview = ? WHERE id = ?`;
  db.query(sqlupdate, [review, id], (err, result) => {
    if (err) console.log("error happened in PUT");
  });
  console.log(id, review);
});

app.get("/api/get", (req, res) => {
  const sqlSelect = "SELECT * FROM movie_reviews;";
  db.query(sqlSelect, (err, result) => {
    // console.log(result);
    res.send(result);
  });
});
app.listen("3001", () => {
  console.log("running on port 3001 ");
});
