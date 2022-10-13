import React from "react";
import NextPlayerSelectionModal from "./NextPlayerSelectionModal";

const BOWLER = 'Bowler';
const BATSMAN = 'Batsman';

export const NextPlayerSelection = (props) =>
  <div>
    <NextPlayerSelectionModal open={props.batsmanSelection}
                              players={props.batsmen}
                              onSelectHandler={props.onBatsmanSelection}
                              playerType={BATSMAN}
    />
    <NextPlayerSelectionModal open={props.bowlerSelection}
                              players={props.bowlers}
                              onSelectHandler={props.onBowlerSelection}
                              teamName={props.battingTeamName}
                              playerType={BOWLER}
    />
  </div>;
