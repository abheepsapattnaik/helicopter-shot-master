import BattingStats from "./BattingStats";
import React from "react";
import {shallow} from "enzyme";
import BattingStatsList from "./BattingStatsList";
import NoStatsAvailable from "./NoStatsAvailable";

describe('BattingStats', () => {
  it('should render battingStats table', () => {
    const props = {
      battingStats: [{}],
      playingBatsmen: [],
      classes:{}
    };
    const battingStatsTag = shallow(<BattingStats {...props}/>);
    expect(battingStatsTag.find(BattingStatsList).length).toBe(1);
  });

  it('should render noStatsAvailable', () => {
    const props = {
      battingStats: [],
      playingBatsmen: [],
      classes:{}
    };
    const battingStatsTag = shallow(<BattingStats {...props}/>);
    expect(battingStatsTag.find(NoStatsAvailable).length).toBe(1);
  });
});