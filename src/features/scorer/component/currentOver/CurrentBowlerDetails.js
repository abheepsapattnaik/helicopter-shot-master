import Typography from "@material-ui/core/Typography/Typography";
import Grid from "@material-ui/core/Grid/Grid";
import React from "react";

export const CurrentBowlerDetails = (props) => (
  <Grid container>
    <Grid item xs={3}>
      <Typography variant='subtitle1'>
        Bowler:
      </Typography>
    </Grid>
    <Grid item xs={9}>
      <Typography variant='subtitle1'>
        {props.bowlerName}
      </Typography>
    </Grid>
  </Grid>
);