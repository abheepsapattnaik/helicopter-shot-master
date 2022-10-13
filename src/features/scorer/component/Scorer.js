import React from 'react';
import CurrentBall from "./currentBall/";
import CurrentOver from "./currentOver/";
import NextPlayerSelection from "./nextPlayerSelection";
import LinkToMatchStats from "./LinkToMatchStats";

const Scorer = () => (
  <div>
    <CurrentOver/>
    <LinkToMatchStats/>
    <CurrentBall/>
    <NextPlayerSelection/>
  </div>
);

export default Scorer;
