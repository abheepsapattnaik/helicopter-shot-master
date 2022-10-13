import React from "react";
import Typography from "@material-ui/core/Typography";
import NoStatsAvailable from "./NoStatsAvailable";
import BowlingStatsList from "./BowlingStatsList";

const isNewGame = (bowlingStats) => {
  return (bowlingStats[0].runs === 0 &&
    bowlingStats[0].wickets === 0 &&
    bowlingStats[0].overs === 0 &&
    bowlingStats[0].maidens === 0);
};

const BowlingStats = ({bowlingStats, classes}) => {
  const isBattingStatsAvailable = bowlingStats.length > 0 && !isNewGame(bowlingStats);

  return (
    <div className={classes.container}>
      <Typography variant='subtitle1'>Bowling Stats</Typography>
      {isBattingStatsAvailable ? <BowlingStatsList bowlingStats={bowlingStats} classes={classes}/> : <NoStatsAvailable/>}
    </div>
  )
};

export default BowlingStats;