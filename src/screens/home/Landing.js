import { Box, Grid } from "@material-ui/core";
import React from "react";
import MovieList from "./MovieList/MovieList";
import MovieListSlider from "./MovieListSlider/MovieListSlider";
import Search from "./Search/Search";

const Landing = () => {
  return (
    <>
      <MovieListSlider />
      <Box marginTop={5} padding={2}>
        <Grid container>
          <Grid item md={9}>
            <Box paddingRight={20}>
              <MovieList />
            </Box>
          </Grid>
          <Grid item md={3}>
            <Search />
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default Landing;
