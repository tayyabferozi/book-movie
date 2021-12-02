import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import axios from "axios";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Landing from "./screens/home/Landing";
import Details from "./screens/details/Details";
import BookShow from "./screens/bookshow/BookShow";
import Confirmation from "./screens/confirmation/Confirmation";

function App() {
  axios.defaults.baseURL = "http://localhost:8085/api/v1";

  return (
    <div className="App">
      <Routes>
        <Route exact path="/" element={<Landing />} />
        <Route exact path="/movie/:id" element={<Details />} />
        <Route exact path="/bookshow/:id" element={<BookShow />} />
        <Route
          exact
          path="/confirm/:id/:location/:theatre/:language/:showDate/:tickets/:unitPrice/:availableTickets/:reqLocation/:reqTheatre/:reqLanguage/:reqShowDate/:reqTickets/:locations/:languages/:theatres/:showDates/:originalShows/:showId"
          element={<Confirmation />}
        />
      </Routes>
    </div>
  );
}

ReactDOM.render(
  <Router>
    <App />
  </Router>,
  document.getElementById("root")
);
