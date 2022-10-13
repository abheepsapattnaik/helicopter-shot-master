import React from "react";
import {CurrentBowlerDetails} from "./CurrentBowlerDetails";
import {ThisOverDetails} from "./ThisOverDetails";

export const getCurrentOver = (teamsList) => {
  return (teamsList.team2.length > 0 ?
    teamsList.team2[teamsList.team2.length - 1]
    : teamsList.team1[teamsList.team1.length - 1])
};

export const CurrentOver = ({overDetails, classes}) => {
  const currentOver = getCurrentOver(overDetails);
  return (
    <div className={classes.container}>
      <ThisOverDetails runsAndExtrasInBalls={currentOver.balls}/>
      <CurrentBowlerDetails bowlerName={currentOver.bowlerName}/>
    </div>
  );
};
