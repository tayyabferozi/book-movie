import { useEffect, useState } from "react";
import { Box } from "@material-ui/core";
import React from "react";
import MovieList from "./MovieList/MovieList";
import MovieListSlider from "./MovieListSlider/MovieListSlider";
import Search from "./Search/Search";
import axios from "axios";

import "./Landing.css";
import Header from "../../common/header/Header";

const Landing = () => {
  const [upcomingMoviesState, setUpcomingMoviesState] = useState([]);
  const [releasedMoviesState, setReleasedMoviesState] = useState([]);

  useEffect(() => {
    axios.get("/movies?status=PUBLISHED").then((res) => {
      setUpcomingMoviesState(res.data.movies);
    });

    axios.get("/movies?status=RELEASED").then((res) => {
      setReleasedMoviesState(res.data.movies);
    });
  }, []);
  return (
    <>
      <Header />
      <MovieListSlider movies={upcomingMoviesState} />
      <Box marginTop={5} padding={2}>
        <div className="main-movies">
          <div className="movies">
            <Box paddingRight={30}>
              <MovieList movies={releasedMoviesState} />
            </Box>
          </div>
          <div className="filter">
            <Search
              setReleasedMovies={(movies) => {
                setReleasedMoviesState(movies);
              }}
            />
          </div>
        </div>
      </Box>
    </>
  );
};

export default Landing;
