import { useEffect, useState } from "react";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import { TextField } from "@material-ui/core";
import FormControl from "@material-ui/core/FormControl";
import Typography from "@material-ui/core/Typography";
import InputLabel from "@material-ui/core/InputLabel";
import Input from "@material-ui/core/Input";
import MenuItem from "@material-ui/core/MenuItem";
import Checkbox from "@material-ui/core/Checkbox";
import Select from "@material-ui/core/Select";
import ListItemText from "@material-ui/core/ListItemText";
import axios from "axios";

const styles = (theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 240,
    maxWidth: 240,
  },
  title: {
    color: theme.palette.primary.light,
  },
});

const Search = ({ classes, setReleasedMovies }) => {
  const [MovieName, setMovieName] = useState("");
  const [GenreList, setGenreList] = useState([]);
  const [ArtistList, setArtistList] = useState([]);
  const [SelectedGenres, setSelectedGenres] = useState([]);
  const [SelectedArtists, setSelectedArtists] = useState([]);
  const [StartReleasedDate, setStartReleasedDate] = useState("");
  const [EndReleasedDate, setEndReleasedDate] = useState("");

  const applyFilterHandler = () => {
    let initialQueryString = "?status=RELEASED";

    if (MovieName !== "") {
      initialQueryString += "&title=" + MovieName;
    }
    if (SelectedGenres.length > 0) {
      initialQueryString += "&genres=" + SelectedGenres.toString();
    }
    if (SelectedArtists.length > 0) {
      initialQueryString += "&artists=" + SelectedArtists.toString();
    }
    if (StartReleasedDate !== "") {
      initialQueryString += "&start_date=" + StartReleasedDate;
    }
    if (EndReleasedDate !== "") {
      initialQueryString += "&end_date=" + EndReleasedDate;
    }

    console.log("/movies" + encodeURI(initialQueryString));

    axios.get("/movies" + encodeURI(initialQueryString)).then((res) => {
      setReleasedMovies(res.data.movies);
    });
  };

  useEffect(() => {
    axios.get("/genres").then((res) => {
      setGenreList(res.data.genres);
    });

    axios.get("/artists").then((res) => {
      setArtistList(res.data.artists);
    });
  }, []);

  return (
    <Card>
      <CardContent>
        <FormControl className={classes.formControl}>
          <Typography className={classes.title} color="textSecondary">
            FIND MOVIES BY:
          </Typography>
        </FormControl>

        <FormControl className={classes.formControl}>
          <InputLabel htmlFor="movieName">Movie Name</InputLabel>
          <Input
            id="movieName"
            onChange={(e) => setMovieName(e.target.value)}
          />
        </FormControl>

        <FormControl className={classes.formControl}>
          <InputLabel htmlFor="select-multiple-checkbox">Genres</InputLabel>
          <Select
            multiple
            input={<Input id="select-multiple-checkbox-genre" />}
            renderValue={(selected) => selected.join(",")}
            value={SelectedGenres}
            onChange={(e) => setSelectedGenres(e.target.value)}
          >
            {GenreList.map((genre) => (
              <MenuItem key={genre.id} value={genre.genre}>
                <Checkbox checked={SelectedGenres.indexOf(genre.genre) > -1} />
                <ListItemText primary={genre.genre} />
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl className={classes.formControl}>
          <InputLabel htmlFor="select-multiple-checkbox">Artists</InputLabel>
          <Select
            multiple
            input={<Input id="select-multiple-checkbox" />}
            renderValue={(selected) => selected.join(",")}
            value={SelectedArtists}
            onChange={(e) => setSelectedArtists(e.target.value)}
          >
            {ArtistList.map((artist) => (
              <MenuItem
                key={artist.id}
                value={artist.first_name + " " + artist.last_name}
              >
                <Checkbox
                  checked={
                    SelectedArtists.indexOf(
                      artist.first_name + " " + artist.last_name
                    ) > -1
                  }
                />
                <ListItemText
                  primary={artist.first_name + " " + artist.last_name}
                />
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl className={classes.formControl}>
          <TextField
            id="releaseDateStart"
            label="Release Date Start"
            type="date"
            defaultValue=""
            InputLabelProps={{ shrink: true }}
            onChange={(e) => setStartReleasedDate(e.target.value)}
          />
        </FormControl>

        <FormControl className={classes.formControl}>
          <TextField
            id="releaseDateEnd"
            label="Release Date End"
            type="date"
            defaultValue=""
            InputLabelProps={{ shrink: true }}
            onChange={(e) => setEndReleasedDate(e.target.value)}
          />
        </FormControl>
        <br />
        <br />
        <FormControl className={classes.formControl}>
          <Button
            onClick={() => applyFilterHandler()}
            variant="contained"
            color="primary"
          >
            APPLY
          </Button>
        </FormControl>
      </CardContent>
    </Card>
  );
};

export default withStyles(styles)(Search);
