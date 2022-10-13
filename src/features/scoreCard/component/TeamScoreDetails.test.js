import React from "react";
import {TEAM1, TEAM2} from "../redux/teamsScoreReducer";
import {mount} from "enzyme";
import {displayTeamScore, getVariant, TeamScoreDetails} from "./TeamScoreDetails";
import Typography from "@material-ui/core/Typography/Typography";
import PLAYER_DETAILS from "../redux/playerDetails";

describe('TeamScoreDetails', () => {
  describe('Component', () => {
    it('should render total score,wickets,current over and current ball as 100/4 in 10.4/20 for team1', () => {
      const props = {
        teamScoreDetails: {
          name: TEAM1,
          isBatting: true,
          score: {
            runs: 100,
            wickets: 4,
            overNumber: 10,
            ballNumber: 4,
          }
        },
        maxOvers: 2
      };
      const scoreCardTag = mount(<TeamScoreDetails {...props}/>);
      const typographyTags = scoreCardTag.find(Typography);
      expect(typographyTags.at(0).text()).toBe("Team 1");
      expect(typographyTags.at(1).text()).toBe("100/4 in 10.4/2")
    });

    it('should render "yet to bat" for team2', () => {
      const teamScoreDetails =
        {
          name: TEAM2,
          isBatting: false,
          score: {
            runs: 0,
            wickets: 0,
            overNumber: 0,
            ballNumber: 0,
          }
        };
      const scoreCardTag = mount(<TeamScoreDetails teamScoreDetails={teamScoreDetails}/>);
      const typographyTags = scoreCardTag.find(Typography);
      expect(typographyTags.at(0).text()).toBe("Team 2");
      expect(typographyTags.at(1).text()).toBe("yet to bat")
    });
  });

  describe('Helper Functions', () => {
    describe('Get Variant', () => {
      it('should return variant as "h5" when isBatting is true', () => {
        const variant = getVariant(true);
        expect(variant).toBe('h5');
      });
      it('should return variant as "subtitle1" when isBatting is false', () => {
        const variant = getVariant(false);
        expect(variant).toBe('subtitle1');
      });
    });

    describe('Display Team Score Details', () => {
      it('should be 0/0 in 0.0/2 for team1 when team1 is playing currently', () => {
        const teams = [
          {
            name: TEAM1,
            isBatting: true,
            score: {
              runs: 0,
              wickets: 0,
              overNumber: 0,
              ballNumber: 0,
            },
            players: PLAYER_DETAILS.team1
          }
        ];
        const maxOvers = 2;
        const message = displayTeamScore(teams[0], maxOvers);
        expect(message).toBe('0/0 in 0.0/2');
      });
      it('should be 0/0 in 0.0/2 for team1 when team1 is playing currently', () => {
        const teams = [
          {
            name: TEAM2,
            isBatting: true,
            score: {
              runs: 0,
              wickets: 0,
              overNumber: 0,
              ballNumber: 0,
            },
            players: PLAYER_DETAILS.team2
          }
        ];
        const maxOvers = 2;
        const message = displayTeamScore(teams[0], maxOvers);
        expect(message).toBe('0/0 in 0.0/2');
      });
    });
  });
});