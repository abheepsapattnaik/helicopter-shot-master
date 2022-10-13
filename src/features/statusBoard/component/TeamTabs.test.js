import React from "react";
import {TeamTabs} from "./TeamTabs";
import {mount} from "enzyme";
import TeamStats from "./TeamStats";

describe('TeamTabs', () => {
  it('should get team stats as props for team1', () => {
    const props = {
      team1BowlingStats: [],
      theme: {},
      team1BattingStats: []
    };
    const teamTabsTag = mount(<TeamTabs {...props}/>);
    const teamStatsTag = teamTabsTag.find(TeamStats);
    expect(teamStatsTag.length).toEqual(1);
    expect(teamStatsTag.prop('bowlingStats')).toEqual(props.team1BowlingStats);
    expect(teamStatsTag.prop('battingStats')).toEqual(props.team1BattingStats);
  });

  it('should get team stats as props for team2', () => {
    const props = {
      team1BowlingStats: [{bowlerName: 'Player 2.1'}],
      team2BowlingStats: [{bowlerName: 'Player 1.1'}],
      theme: {},
      team2BattingStats: [{name: 'Virat',}],
      team1BattingStats: [{name: 'Rohit'}],
      playingBatsmen: []
    };
    const teamTabsTag = mount(<TeamTabs {...props}/>);
    teamTabsTag.setState({value: 1});
    const teamStatsTag = teamTabsTag.find(TeamStats);
    expect(teamStatsTag.length).toEqual(1);
    expect(teamStatsTag.prop('bowlingStats')).toEqual(props.team2BowlingStats);
    expect(teamStatsTag.prop('battingStats')).toEqual(props.team2BattingStats);
    expect(teamStatsTag.prop('bowlingStats')).not.toEqual(props.team1BowlingStats);
    expect(teamStatsTag.prop('battingStats')).not.toEqual(props.team1BattingStats);
  });
});