import React from "react";
import {mount, shallow} from "enzyme";
import BowlingStats from "./BowlingStats";
import NoStatsAvailable from "./NoStatsAvailable";
import BowlingStatsList from "./BowlingStatsList";

describe('BowlingStats', () => {
  it('should render BowlingStats table', () => {
    const props = {
      bowlingStats: [{
        bowlerName: 'Player 2.1',
        runs: 1,
        maidens: 0,
        overs: 0,
        wickets: 0
      }],
      classes:{}
    };
    const bowlingStatsTag = shallow(<BowlingStats {...props}/>);
    expect(bowlingStatsTag.find(BowlingStatsList).length).toBe(1);
  });

  it('should render noStatsAvailable', () => {
    const props = {
      bowlingStats: [],
      classes:{}
    };
    const bowlingStatsTag = shallow(<BowlingStats {...props}/>);
    expect(bowlingStatsTag.find(NoStatsAvailable).length).toBe(1);
  });

  it('should render noStatsAvailable when game has just started', () => {
    const props = {
      bowlingStats: [
        {
          bowlerName: 'Player 2.1',
          runs: 0,
          maidens: 0,
          overs: 0,
          wickets: 0
        }],
      classes:{}
    };
    const bowlingStatsTag = mount(<BowlingStats {...props}/>);
    expect(bowlingStatsTag.find(NoStatsAvailable).length).toBe(1);
  });
});