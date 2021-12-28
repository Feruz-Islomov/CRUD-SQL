import "./App.css";
import React, { useEffect, useState } from "react";
import Axios from "axios";
function App() {
  const [movieName, setMovieName] = useState("");
  const [review, setReview] = useState("");
  const [mList, setMlist] = useState([]);
  const [newReview, setNewreview] = useState("");
  useEffect(() => {
    Axios.get("http://localhost:3001/api/get").then((res) => {
      // console.log(res.data);
      setMlist(res.data);
    });
  }, []);
  const SubmitReview = () => {
    Axios.post("http://localhost:3001/api/insert", {
      movieName: movieName,
      movieReview: review,
    });
    setMlist([...mList, { movieName: movieName, movieReview: review }]);
  };

  const deleteReview = (id) => {
    Axios.delete(`http://localhost:3001/api/delete/${id}`);
  };

  const updateReview = (id) => {
    Axios.put("http://localhost:3001/api/update", {
      id: id,
      movieReview: newReview,
    });
    console.log(id);
    // setNewreview("");
    console.log(newReview);
  };
  return (
    <div className="App">
      <h1>CRUD APPLICATION</h1>
      <div className="form">
        <label>Movie Name:</label>
        <input
          type="text"
          name="movieName"
          onChange={(e) => setMovieName(e.target.value)}
        />
        <label>Review:</label>
        <input
          type="text"
          name="review"
          onChange={(e) => setReview(e.target.value)}
        />
        <button onClick={SubmitReview}>Submit</button>
        {mList.map((x) => {
          return (
            <div className="card">
              <h3>{x.movieName}</h3>
              <p>{x.movieReview}</p>

              <button onClick={() => deleteReview(x.id)}>delete</button>
              <input
                id="updatinput"
                type="text"
                onChange={(e) => setNewreview(e.target.value)}
              />
              <button onClick={() => updateReview(x.id)}>update</button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
