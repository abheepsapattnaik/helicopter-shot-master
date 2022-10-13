import React from "react";
import {shallow} from "enzyme";
import {NextPlayerSelection} from "./NextPlayerSelection";
import NextPlayerSelectionModal from "./NextPlayerSelectionModal";

describe('NextPlayerSelection', () => {
  it('should find NextPlayerSelectionModal', () => {
    const nextPlayerSelectionTag = shallow(<NextPlayerSelection/>);
    const nextPlayerSelectionModalTag = nextPlayerSelectionTag.find(NextPlayerSelectionModal);
    expect(nextPlayerSelectionModalTag).not.toBeNull();
  });

  it('should have props for bowler selection', () => {
    const props = {
      bowlerSelection: true,
      bowlers: [
        {
          "name": "Player 2.1",
          "isPlaying": false
        },
        {
          "name": "Player 2.2",
          "isPlaying": false
        },
      ],
      onBowlerSelection: jest.fn(),
      battingTeamName: 'team1',
    };
    const nextPlayerSelectionTag = shallow(<NextPlayerSelection {...props}/>);
    const nextPlayerSelectionModalTags = nextPlayerSelectionTag.find(NextPlayerSelectionModal);
    expect(nextPlayerSelectionModalTags.at(1).prop('open')).toBe(props.bowlerSelection);
    expect(nextPlayerSelectionModalTags.at(1).prop('players')).toBe(props.bowlers);
    expect(nextPlayerSelectionModalTags.at(1).prop('teamName')).toBe(props.battingTeamName);
    expect(nextPlayerSelectionModalTags.at(1).prop('onSelectHandler')).toBe(props.onBowlerSelection);
  });

  it('should have props for batsman selection', () => {
    const props = {
      batsmanSelection: true,
      batsmen: [
        {
          "name": "Player 1.2",
          "isPlaying": false
        },
        {
          "name": "Player 1.3",
          "isPlaying": false
        },
      ]
    };
    const nextPlayerSelectionTag = shallow(<NextPlayerSelection {...props}/>);
    const nextPlayerSelectionModalTags = nextPlayerSelectionTag.find(NextPlayerSelectionModal);
    expect(nextPlayerSelectionModalTags.at(0).prop('open')).toBe(props.batsmanSelection);
    expect(nextPlayerSelectionModalTags.at(0).prop('players')).toBe(props.batsmen);
  });
});