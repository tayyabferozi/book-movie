import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import axios from "axios";

import Header from "./common/header/Header";
import Landing from "./screens/home/Landing";

function App() {
  axios.defaults.baseURL = "http://localhost:8085/api/v1";

  return (
    <div className="App">
      <Header />
      <Landing />
    </div>
  );
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
