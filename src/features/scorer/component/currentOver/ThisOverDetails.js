import React from "react";
import Typography from "@material-ui/core/Typography/Typography";
import Grid from "@material-ui/core/Grid/Grid";
import OverRunsDetails from "./OverRunsDetails";

export const ThisOverDetails = (props) =>
  <Grid container>
    <Grid item xs={3}>
      <Typography variant='subtitle1'>
        This Over:
      </Typography>
    </Grid>
    <Grid item xs={9}>
      {props.runsAndExtrasInBalls
        .map((runsAndExtrasInBall, index) => <OverRunsDetails key={index} run={runsAndExtrasInBall.run}
                                                              extras={runsAndExtrasInBall.extras}
                                                              wicket={runsAndExtrasInBall.isOut}/>)}
    </Grid>
  </Grid>;