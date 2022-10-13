import React from "react";
import {shallow} from "enzyme";
import {TeamStats} from "./TeamStats";
import BattingStats from "./BattingStats";
import BowlingStats from "./BowlingStats";

describe('TeamStats', () => {
  it('should render batting and bowling stats', () => {
    const props = {
      battingStats: [],
      bowlingStats: []
    };
    const teamStatsTag = shallow(<TeamStats {...props}/>);
    const battingStatsTag = teamStatsTag.find(BattingStats);
    const bowlingStatsTag = teamStatsTag.find(BowlingStats);

    expect(battingStatsTag.length).toBe(1);
    expect(bowlingStatsTag.length).toBe(1);
    expect(battingStatsTag.prop('battingStats')).toEqual(props.battingStats);
    expect(bowlingStatsTag.prop('bowlingStats')).toEqual(props.bowlingStats);
  });

  it('should render teams and the batsmen status list', () => {
    const props = {
      battingStats: [
        {
          name: 'Virat',
          runs: 4,
          balls: 2,
          fours: 0,
          sixes: 0,
        },
        {
          name: 'Dravid',
          runs: 4,
          balls: 1,
          fours: 1,
          sixes: 0,
        }
      ],
      bowlingStats: []
    };
    const statusBoardTag = shallow(<TeamStats {...props}/>);
    const battingStatsTag = statusBoardTag.find(BattingStats);
    expect(battingStatsTag.length).toBe(1);
    expect(battingStatsTag.prop('battingStats')).toBe(props.battingStats);
  });
});
