import { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import "./MovieListSlider.css";
import axios from "axios";
import withWidth, { isWidthUp } from "@material-ui/core/withWidth";
import { GridList, GridListTile } from "@material-ui/core";
import { GridListTileBar } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    overflow: "hidden",
    backgroundColor: theme.palette.background.paper,
  },
  imageList: {
    flexWrap: "nowrap",
    transform: "translateZ(0)",
    height: "282px",
    marginTop: "0 !important",
  },
  title: {
    color: "#fff",
  },
  titleBar: {
    background:
      // "linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)",
      "rgba(0,0,0, 0.7)",
  },
  img: {
    height: "100%",
  },
}));

function MovieListSlider(props) {
  const classes = useStyles();
  const [moviesState, setMoviesState] = useState([]);
  const getGridListCols = () => {
    if (isWidthUp("xl", props.width)) {
      return 6;
    }

    if (isWidthUp("lg", props.width)) {
      return 6;
    }

    if (isWidthUp("md", props.width)) {
      return 5;
    }

    if (isWidthUp("sm", props.width)) {
      return 4;
    }

    return 2;
  };

  useEffect(() => {
    axios.get("/movies").then((res) => {
      setMoviesState(res.data.movies);
    });
  }, []);

  return (
    <div className={classes.root} id="movie-list-slider">
      <div className="upcoming">Upcoming movies</div>
      <GridList
        className={classes.imageList}
        spacing={15}
        cellHeight={400}
        cols={getGridListCols()}
      >
        {moviesState.map((item) => (
          <GridListTile className={classes.img} key={item} cols={1}>
            <img
              className={classes.img}
              src={item.poster_url}
              alt={item.title}
            />
            <GridListTileBar title={item.title} />
          </GridListTile>
        ))}
      </GridList>
      {/* <ImageList className={classes.imageList} cols={getGridListCols()}>
        {moviesState.map((item, index) => (
          <ImageListItem key={index}>
            <img src={item.poster_url} alt={item.title} />
            <ImageListItemBar
              title={item.title}
              classes={{
                root: classes.titleBar,
                title: classes.title,
              }}
              actionIcon={
                <IconButton aria-label={`star ${item.title}`}></IconButton>
              }
            />
          </ImageListItem>
        ))}
      </ImageList> */}
    </div>
  );
}

export default withWidth()(MovieListSlider);
