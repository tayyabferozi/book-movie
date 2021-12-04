import { Grid } from "@material-ui/core";
import React from "react";
import { GridList, GridListTile } from "@material-ui/core";
import { GridListTileBar } from "@material-ui/core";
import { Link } from "react-router-dom";

import "./MovieList.css";

const MovieList = (props) => {
  return (
    <Grid container spacing={3}>
      <GridList
        className="movie-gridlist"
        spacing={15}
        cellHeight={400}
        cols={3}
      >
        {props.movies.map((item) => (
          <GridListTile className="movie-gridlist__item" key={item}>
            <Link to={`/movie/${item.id}`}>
              <img
                className="MuiGridListTile-imgFullHeight"
                src={item.poster_url}
                alt={item.title}
              />
            </Link>
            <GridListTileBar
              title={item.title}
              subtitle={
                <span>
                  Release Date: {new Date(item.release_date).toDateString()}
                </span>
              }
            />
          </GridListTile>
        ))}
      </GridList>
    </Grid>
  );
};

export default MovieList;
