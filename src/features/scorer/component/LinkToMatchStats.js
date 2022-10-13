import {Link} from "react-router-dom";
import React from "react";
import Grid from "@material-ui/core/Grid/";
import Typography from "@material-ui/core/Typography/";

const LinkToMatchStats = () =>
  <Grid container justify='space-evenly'>
    <Grid item>
      <Link to={'/matchStats'}>
        <Typography color='primary' variant='subtitle1'>
          Match Stats
        </Typography>
      </Link>
    </Grid>
  </Grid>;

export default LinkToMatchStats;