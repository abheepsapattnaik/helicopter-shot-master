import {shallow} from "enzyme";
import React from "react";
import ScoreCard from "../../features/scoreCard/component/";
import MatchStats from "./MatchStats";

describe('MatchStats', () => {
  it('should render the ScoreCard', () => {
    const matchStatsTag = shallow(<MatchStats/>);
    const scoreCardTag = matchStatsTag.find(ScoreCard);
    expect(scoreCardTag.length).toBe(1);
  });
});