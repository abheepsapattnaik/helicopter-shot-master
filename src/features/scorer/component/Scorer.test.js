import {shallow} from "enzyme";
import React from "react";
import Scorer from "./Scorer";
import CurrentBall from "./currentBall";
import CurrentOver from "./currentOver";
import NextPlayerSelection from "./nextPlayerSelection";
import LinkToMatchStats from "./LinkToMatchStats";

describe('Scorer', () => {
  it('should render the components', () => {
    const scorerTag = shallow(<Scorer/>);
    const currentBallTag = scorerTag.find(CurrentBall);
    const currentOverTag = scorerTag.find(CurrentOver);
    const linkToMatchStatsTag = scorerTag.find(LinkToMatchStats);
    const nextPlayerSelectionTag = scorerTag.find(NextPlayerSelection);
    expect(currentBallTag.length).toBe(1);
    expect(currentOverTag.length).toBe(1);
    expect(nextPlayerSelectionTag.length).toBe(1);
    expect(linkToMatchStatsTag.length).toBe(1);
  });
});