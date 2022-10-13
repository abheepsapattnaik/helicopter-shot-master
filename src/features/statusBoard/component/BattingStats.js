import Typography from "@material-ui/core/Typography/Typography";
import BattingStatsList from "./BattingStatsList";
import React from "react";
import NoStatsAvailable from "./NoStatsAvailable";

const BattingStats = ({battingStats, playingBatsmen, classes}) => {
  const isBattingStatsAvailable = battingStats.length > 0;
  return (
    <div className={classes.container}>
      <Typography variant='subtitle1'>Batting Stats</Typography>
      {isBattingStatsAvailable ?
        <BattingStatsList
          battingStats={battingStats}
          playingBatsmen={playingBatsmen}
          classes = {classes}
        />
        : <NoStatsAvailable/>
      }
    </div>
  );
};


export default BattingStats;