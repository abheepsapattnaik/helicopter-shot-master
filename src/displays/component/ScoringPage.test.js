import {shallow} from "enzyme/build";
import ScoreCard from "../../features/scoreCard/component/";
import React from "react";
import Scorer from "../../features/scorer/component/Scorer";
import ScoringPage from "./ScoringPage";

describe('Scoring Page', () => {
  it('should render the ScoreCard,Scorer components', () => {
    const scoringPageTag = shallow(<ScoringPage/>);
    const connectedScoreCardTag = scoringPageTag.find(ScoreCard);
    const scorerTag = scoringPageTag.find(Scorer);
    expect(connectedScoreCardTag.length).toBe(1);
    expect(scorerTag.length).toBe(1);
  });
});