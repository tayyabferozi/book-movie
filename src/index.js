import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import axios from "axios";

import Header from "./common/header/Header";
import MovieListSlider from "./screens/MovieListSlider/MovieListSlider";

function App() {
  axios.defaults.baseURL = "http://localhost:8085/api/v1";

  return (
    <div className="App">
      <Header />
      <MovieListSlider />
    </div>
  );
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
