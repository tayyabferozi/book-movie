import { makeStyles } from "@material-ui/core/styles";
import "./MovieListSlider.css";
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
    margin: "0 !important",
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
    background: "rgba(0,0,0, 0.7)",
  },
  img: {
    height: "100%",
    padding: "2px !important",
  },
}));

function MovieListSlider(props) {
  const classes = useStyles();
  const getGridListCols = () => {
    if (isWidthUp("xl", props.width)) {
      return 6;
    }

    if (isWidthUp("lg", props.width)) {
      return 6;
    }

    if (isWidthUp("md", props.width)) {
      return 6;
    }

    if (isWidthUp("sm", props.width)) {
      return 4;
    }

    return 2;
  };

  return (
    <div className={classes.root} id="movie-list-slider">
      <div className="upcoming">Upcoming movies</div>
      <GridList
        className={classes.imageList}
        spacing={15}
        cellHeight={400}
        cols={getGridListCols()}
      >
        {props.movies.map((item) => (
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
    </div>
  );
}

export default withWidth()(MovieListSlider);
