import {mount} from "enzyme";
import React from "react";
import {CurrentBowlerDetails} from './CurrentBowlerDetails'
import Typography from "@material-ui/core/Typography/Typography";

describe('Current Bowler Details', () => {
  it('should render BretLee as a component', () => {
    const overDetails = {
      team1: [
        {
          bowlerName: 'BretLee',
          balls: [{
            run: 1,
            extras: [],
            batsmanName: 'Player 1.1'
          }],
        }
      ],
      team2: [],
    };
    const currentBowlerDetailsTags = mount(<CurrentBowlerDetails bowlerName={overDetails.team1[0].bowlerName}/>);
    const typographyTags = currentBowlerDetailsTags.find(Typography);
    expect(typographyTags.length).toBe(2);
    expect(typographyTags.at(1).text()).toBe('BretLee');
  });

  it('should render Malinga as a component', () => {
    const overDetails = {
      team1: [
        {
          bowlerName: 'Malinga',
          balls: [{
            run: 1,
            extras: [],
            batsmanName: 'Player 1.1'
          }],
        }
      ],
      team2: [],
    };
    const currentBowlerDetailsTags = mount(<CurrentBowlerDetails bowlerName={overDetails.team1[0].bowlerName}/>);
    const typographyTags = currentBowlerDetailsTags.find(Typography);
    expect(typographyTags.length).toBe(2);
    expect(typographyTags.at(1).text()).toBe('Malinga');
  });
});