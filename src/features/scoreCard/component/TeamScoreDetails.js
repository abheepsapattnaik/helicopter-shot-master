import Grid from "@material-ui/core/Grid/Grid";
import React from "react";
import Typography from "@material-ui/core/Typography/Typography";
import {TEAM1} from "../redux/teamsScoreReducer";

export const getVariant = (isTeamCurrent) => {
  return isTeamCurrent ? 'h5' : 'subtitle1';
};

export const displayTeamScore = ({isBatting, score, name}, maxOvers) =>
  isBatting ?
    `${score.runs}/${score.wickets} in ${score.overNumber}.${score.ballNumber}/${maxOvers}`
    :
    name === TEAM1 ?
      `scored ${score.runs}/${score.wickets} in ${maxOvers} overs`
      :
      'yet to bat';

export const TeamScoreDetails = ({teamScoreDetails, maxOvers}) => (
  <Grid container spacing={8} justify='space-between'>
    <Grid item>
      <Typography variant={getVariant(teamScoreDetails.isBatting)}>
        {teamScoreDetails.name}
      </Typography>
    </Grid>
    <Grid item>
      <Typography variant={getVariant(teamScoreDetails.isBatting)}>
        {displayTeamScore(teamScoreDetails, maxOvers)}
      </Typography>
    </Grid>
  </Grid>
);