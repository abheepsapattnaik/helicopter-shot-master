import React from "react";
import {withStyles} from "@material-ui/core";
import BattingStats from "./BattingStats";
import BowlingStats from "./BowlingStats";

const styles = theme => ({
  container: {
    marginTop: theme.spacing.unit,
    marginBottom: theme.spacing.unit * 2
  },
  row: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.background.default,
    },
  },
});

export const TeamStats = ({battingStats, bowlingStats, playingBatsmen, classes}) =>
  <div>
    <BattingStats battingStats={battingStats}
                  playingBatsmen={playingBatsmen}
                  classes={classes}
    />
    <BowlingStats bowlingStats={bowlingStats}
                  classes={classes}
    />
  </div>;

export default withStyles(styles)(TeamStats);