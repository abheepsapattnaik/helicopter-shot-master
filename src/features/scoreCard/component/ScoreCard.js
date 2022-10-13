import React from 'react';
import {TeamScoreDetails} from "./TeamScoreDetails";

export const ScoreCard = ({teams, maxOvers, classes}) => (
  <div className={classes.container}>
    <TeamScoreDetails
      teamScoreDetails={teams[0].isBatting ? teams[0] : teams[1]}
      maxOvers={maxOvers}
    />
    <TeamScoreDetails
      teamScoreDetails={teams[0].isBatting ? teams[1] : teams[0]}
      maxOvers={maxOvers}
    />
  </div>
);