import {CurrentBall, getOutButtonColor, isDisabled, isOutButtonDisabled} from "./CurrentBall";
import React from "react";
import {shallow} from "enzyme";
import Button from "@material-ui/core/Button";
import {Batsmen} from "./Batsmen";
import {Runs} from "./Runs";
import {Extras} from "./Extras";

describe('Current Ball ', () => {
  it('should call on click function when the next ball button is clicked', () => {
    const props = {
      playBall: jest.fn(),
      currentBall: {
        extras: [],
        batsmanName: 'Player 1.1'
      },
      teamName: 'team1',
      classes: {},
      players: []
    };
    const currentBallTag = shallow(<CurrentBall {...props}/>);
    const buttonTags = currentBallTag.find(Button);
    buttonTags.at(1).simulate('click');
    expect(props.playBall).toHaveBeenCalledWith(props.currentBall, props.teamName, props.players);
  });

  it('should contain Batsmen and run components', () => {
    const props = {
      playBall: jest.fn(),
      currentBall: {
        extras: [],
        batsmanName: 'Player 1.1'
      },
      teamName: 'team1',
      classes: {}
    };
    const currentBallTag = shallow(<CurrentBall {...props}/>);
    expect(currentBallTag.find(Batsmen)).not.toBeNull();
    expect(currentBallTag.find(Runs)).not.toBeNull();
    expect(currentBallTag.find(Extras)).not.toBeNull();
  });

  it('should call on click function when the out button is clicked', () => {
    const props = {
      wicketTaken: jest.fn(),
      currentBall: {
        extras: [],
        batsmanName: 'Player 1.1',
        isOut: false
      },
      teamName: 'team1',
      classes: {}
    };
    const currentBallTag = shallow(<CurrentBall {...props}/>);
    const buttonTags = currentBallTag.find(Button);
    buttonTags.at(0).simulate('click');
    expect(props.wicketTaken).toHaveBeenCalled();
    expect(props.wicketTaken).toHaveBeenCalledWith();
  });

  describe('Extras', () => {
    it('should current ball and the score updater as props', () => {
      const props = {
        extraScoreUpdater: jest.fn(),
        currentBall: {
          run: 2,
          extras: [],
          batsmanName: 'Player 1.1'
        },
        classes: {}
      };
      const currentBallTag = shallow(<CurrentBall {...props}/>);
      const extrasTags = currentBallTag.find(Extras);
      expect(extrasTags.prop('currentBall')).toBe(props.currentBall);
      expect(extrasTags.prop('scoreUpdater')).toBe(props.extraScoreUpdater);
    });
  });

  describe('isDisabled', () => {
    it('should return false when player and run is selected', () => {
      const props = {
        currentBall: {
          run: 2,
          extras: [],
          batsmanName: 'Player 1.1'
        },
      };
      expect(isDisabled(props)).toBeFalsy();
    });

    it('should return true when player and run is not selected', () => {
      const props = {
        currentBall: {
          extras: [],
          batsmanName: ''
        },
      };
      expect(isDisabled(props)).toBeTruthy();
    });

    it('should return true when player is selected and run is not selected', () => {
      const props = {
        currentBall: {
          extras: [],
          batsmanName: 'Player 1.1'
        },
      };
      expect(isDisabled(props)).toBeTruthy();
    });

    it('should return true when player is not selected and run is  selected', () => {
      const props = {
        currentBall: {
          run: 4,
          extras: [],
          batsmanName: ''
        },
      };
      expect(isDisabled(props)).toBeTruthy();
    });
  });

  describe('getOutButtonColor', () => {
    it('should return primary color when Out is selected', () => {
      const props = {
        currentBall: {
          extras: [],
          batsmanName: 'Player 1.1',
          isOut: true
        },
      };
      expect(getOutButtonColor(props)).toBe('secondary');
    });
    it('should return default color when Out is not selected', () => {
      const props = {
        currentBall: {
          extras: [],
          batsmanName: 'Player 1.1',
          isOut: false
        },
      };
      expect(getOutButtonColor(props)).toBe('default');
    });
  });

  describe('isOutButtonDisabled', () => {
    it('should be disabled when batsman is not selected', () => {
      const props = {
        currentBall: {
          extras: [],
          batsmanName: '',
          isOut: false
        },
      };
      expect(isOutButtonDisabled(props)).toBeTruthy();
    });
    it('should be enabled when batsman is selected', () => {
      const props = {
        currentBall: {
          extras: [],
          batsmanName: 'Player 1.1',
          isOut: false
        },
      };
      expect(isOutButtonDisabled(props)).toBeFalsy();
    });
  });
});