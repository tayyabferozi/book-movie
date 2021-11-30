import { Grid } from "@material-ui/core";
import React from "react";
import "./MovieList.css";

const MovieList = () => {
  return (
    <Grid container spacing={3}>
      {[
        {
          img: "https://m.media-amazon.com/images/M/MV5BNTc0ZDk1YWItZDZiNi00NTdmLWE0MDctNTVhYTRhMDBmZjNjXkEyXkFqcGdeQXVyMjUzOTY1NTc@._V1_FMjpg_UX654_.jpg",
          name: "",
          date: "",
        },
        {
          img: "https://m.media-amazon.com/images/M/MV5BMTMxNTMwODM0NF5BMl5BanBnXkFtZTcwODAyMTk2Mw@@._V1_FMjpg_UY720_.jpg",
          name: "",
          date: "",
        },
        {
          img: "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_FMjpg_UX700_.jpg",
          name: "",
          date: "",
        },
        {
          img: "https://m.media-amazon.com/images/M/MV5BZjdkOTU3MDktN2IxOS00OGEyLWFmMjktY2FiMmZkNWIyODZiXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_FMjpg_UY720_.jpg",
          name: "",
          date: "",
        },
        {
          img: "https://upload.wikimedia.org/wikipedia/en/c/cd/Shahid_Poster_%282013%29.jpg",
          name: "",
          date: "",
        },
        {
          img: "https://m.media-amazon.com/images/M/MV5BMjA1MzIwMjMxNF5BMl5BanBnXkFtZTgwMDQ3NTc2MjI@._V1_FMjpg_UY720_.jpg",
          name: "",
          date: "",
        },
        {
          img: "https://m.media-amazon.com/images/M/MV5BMDE5OWMzM2QtOTU2ZS00NzAyLWI2MDEtOTRlYjIxZGM0OWRjXkEyXkFqcGdeQXVyODE5NzE3OTE@._V1_FMjpg_UY720_.jpg",
          name: "",
          date: "",
        },
      ].map((el) => {
        return (
          <Grid key={el.img} item md={4}>
            <div className="movie-card">
              <img src={el.img} alt={el.name} />
            </div>
          </Grid>
        );
      })}
    </Grid>
  );
};

export default MovieList;
