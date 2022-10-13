import {shallow} from "enzyme";
import {ScoreCard} from "./ScoreCard";
import React from "react";
import {TEAM1, TEAM2} from "../redux/teamsScoreReducer";
import {TeamScoreDetails} from "./TeamScoreDetails";

describe('ScoreCard ', () => {
  it('should render total score,wickets,current over and current ball as 100/4 in 10.4/20 for team1 to TeamDetail', () => {
    const teams = [
      {
        name: TEAM1,
        isBatting: true,
        score: {
          runs: 100,
          wickets: 4,
          overNumber: 10,
          ballNumber: 4,
        }
      },
      {
        name: TEAM2,
        isBatting: false,
        score: {
          runs: 0,
          wickets: 0,
          overNumber: 0,
          ballNumber: 0,
        }
      }
    ];
    const scoreCardTag = shallow(<ScoreCard teams={teams} maxOvers={2} classes={{}}/>);
    const teamDetailsTags = scoreCardTag.find(TeamScoreDetails);
    expect(teamDetailsTags.at(0).prop('teamScoreDetails')).toBe(teams[0]);
    expect(teamDetailsTags.at(1).prop('teamScoreDetails')).toBe(teams[1]);
    expect(teamDetailsTags.at(0).prop('maxOvers')).toBe(2);
    expect(teamDetailsTags.at(1).prop('maxOvers')).toBe(2);
  });

  it('should render total score,wickets,current over and current ball as 90/1 in 7.5/20 for team 2' +
    'and 143/6 in 20 overs for team 1', () => {
    const teams = [
      {
        name: TEAM1,
        isBatting: false,
        score: {
          runs: 143,
          wickets: 6,
          overNumber: 20,
          ballNumber: 0,
        }
      },
      {
        name: TEAM2,
        isBatting: true,
        score: {
          runs: 90,
          wickets: 1,
          overNumber: 7,
          ballNumber: 5,
        }
      }
    ];
    const scoreCardTag = shallow(<ScoreCard teams={teams} maxOvers={3} classes={{}}/>);
    const teamDetailsTags = scoreCardTag.find(TeamScoreDetails);
    expect(teamDetailsTags.at(0).prop('teamScoreDetails')).toBe(teams[1]);
    expect(teamDetailsTags.at(1).prop('teamScoreDetails')).toBe(teams[0]);
    expect(teamDetailsTags.at(0).prop('maxOvers')).toBe(3);
    expect(teamDetailsTags.at(1).prop('maxOvers')).toBe(3);
  });
});