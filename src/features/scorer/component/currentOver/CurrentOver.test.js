import React from "react";
import {mount} from "enzyme";
import {CurrentOver, getCurrentOver} from "./CurrentOver";
import {ThisOverDetails} from "./ThisOverDetails";

describe('Current Over', () => {
  it('should  render current overs runs and extras', () => {
    const overDetails = {
      team1: [
        {
          bowlerName: 'BretLee',
          balls: [
            {
              run: 1,
              extras: [],
              batsmanName: 'Player 1.1'
            },
          ],
        }
      ],
      team2: [],
    };
    const currentOverTag = mount(<CurrentOver overDetails={overDetails} classes={{}}/>);
    const overRunsDetailsTags = currentOverTag.find(ThisOverDetails);
    expect(overRunsDetailsTags.length).toBe(1);
    expect(overRunsDetailsTags.at(0).prop('runsAndExtrasInBalls')).toBe(overDetails.team1[overDetails.team1.length - 1].balls);
  });

  describe('getCurrentOver', () => {
    it('should return the current over object when team1 is currently batting', () => {
      const overDetails = {
        team1: [
          {
            bowlerName: 'Player 2.1',
            balls: [
              {
                run: 1,
                extras: [],
                batsmanName: 'Player 1.1'
              },
            ],
          },
          {
            bowlerName: 'Player 2.2',
            balls: [
              {
                run: 3,
                extras: [],
                batsmanName: 'Player 1.2'
              },
            ],
          }
        ],
        team2: [],
      };
      expect(getCurrentOver(overDetails)).toEqual(
        {
          bowlerName: 'Player 2.2',
          balls: [
            {
              run: 3,
              extras: [],
              batsmanName: 'Player 1.2'
            },
          ],
        });
    });
    it('should return the current over object when team2 is currently batting', () => {
      const overDetails = {
        team1: [
          {
            bowlerName: 'Player 2.1',
            balls: [
              {
                run: 1,
                extras: [],
                batsmanName: 'Player 1.1'
              },
            ],
          },
          {
            bowlerName: 'Player 2.2',
            balls: [
              {
                run: 3,
                extras: [],
                batsmanName: 'Player 1.2'
              },
            ],
          }
        ],
        team2: [
          {
            bowlerName: 'Player 1.3',
            balls: [
              {
                run: 4,
                extras: [],
                batsmanName: 'Player 2.1'
              },
            ],
          }
        ],
      };
      expect(getCurrentOver(overDetails)).toEqual(
        {
          bowlerName: 'Player 1.3',
          balls: [
            {
              run: 4,
              extras: [],
              batsmanName: 'Player 2.1'
            },
          ],
        });
    });
  });
});