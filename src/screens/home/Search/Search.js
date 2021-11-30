import React from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import { TextField } from "@material-ui/core";

const Search = () => {
  return (
    <Card>
      <CardContent>
        <h4>FIND MOVIES BY:</h4>

        <form>
          <TextField id="name" label="Movie Name" fullWidth />
        </form>
      </CardContent>
    </Card>
  );
};

export default Search;
