import React, { useState, useEffect } from "react";
import "./style.css";

const App = () => {
  return (
    <div>
      <br />
      <Search />
    </div>
  );
};

const Search = () => {
  const [input, setInput] = useState("");
  const [movie, setMovie] = useState([]);

  console.log(movie)

  const handleChange = e => {
    setInput(e.target.value);
  };
  const handleSubmit = e => {
    e.preventDefault();
    try {
      fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=3668439a9147b182588ab59a6de75706&language=en-US&query=${input}&page=1&include_adult=false`
      )
        .then(res => res.json())
        .then(data => {
          setMovie(data.results);
          setInput('')
        });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className='app'>
      <h1 className="title">Movie Search App!</h1>
      <form className="form" onSubmit={handleSubmit}>
        <label htmlFor="query" className="label">
          Movie search:{" "}
        </label>
        <input
          type="text"
          name="query"
          className="input"
          placeholder="e.g The one"
          onChange={handleChange}
          value={input}
        />
        <button className="button" type="submit">
          Search
        </button>
      </form>
      <div className="display">
        {movie      
          .map(item => (
            <CardDisplay item={item} key={item.id} />
          ))}
      </div>
    </div>
  );
};

const CardDisplay = ({ item }) => {
  return (
    <div className="card">
      <div className="image">
        <img
          className="card--image"
          src={`https://image.tmdb.org/t/p/w185_and_h278_bestv2/${item.poster_path
            }`}
          alt={item.title + " poster"}
        />
      </div>
      <div className="card--content">
        <h3 className="card--title">{item.title}</h3>
        <p>
          <small className="small">RELEASE DATE: {item.release_date}</small>
        </p>
        <p>
          <small className="small">RATING: {item.vote_average}</small>
        </p>
        <p className="card--desc">{item.overview}</p>
      </div>
    </div>
  );
};

export default App;
