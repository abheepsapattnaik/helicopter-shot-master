import {Batsmen, getButtonColor} from "./Batsmen";
import Button from "@material-ui/core/Button";
import {mount} from "enzyme";
import React from "react";

describe('Batsmen', () => {

  it('should get two batsmen buttons one as striker and other non striker', () => {
    const props = {
      classes: {},
      players: [
        {
          name: 'Player 1.1'
        },
        {
          name: 'Player 1.2'
        }
      ],
      currentBall: {
        run: 1,
        extras: [],
        batsmanName: 'Player 1.1'
      }
    };
    const batsmenTag = mount(<Batsmen {...props}/>);
    const buttonsTag = batsmenTag.find(Button);
    expect(buttonsTag.length).toBe(2);
    expect(buttonsTag.at(0).text()).toBe('Player 1.1');
    expect(buttonsTag.at(1).text()).toBe('Player 1.2');
  });

  it('should assign the current ball batsmen when a batsmen is selected', () => {
    const props = {
      classes: {},
      assignBatsman: jest.fn(),
      players: [
        {
          name: 'Player 1.1'
        },
        {
          name: 'Player 1.2'
        }
      ],
      currentBall: {
        run: 1,
        extras: [],
        batsmanName: 'Player 1.1'
      }
    };
    const batsmenTag = mount(<Batsmen {...props}/>);
    const buttonsTag = batsmenTag.find(Button);
    buttonsTag.at(0).simulate('click');
    buttonsTag.at(1).simulate('click');
    expect(buttonsTag.length).toBe(2);
    expect(buttonsTag.at(0).text()).toBe('Player 1.1');
    expect(props.assignBatsman).toHaveBeenCalledWith(props.players[0].name);
    expect(buttonsTag.at(1).text()).toBe('Player 1.2');
    expect(props.assignBatsman).toHaveBeenCalledWith(props.players[1].name);
  });

  describe('getButtonColor', () => {

    it('should return the color of batsman button as primary when it is selected', () => {
      const props = {
        currentBall: {
          run: 1,
          extras: [],
          batsmanName: 'Player 1.1'
        }
      };
      const player = {
        name: 'Player 1.1'
      };
      expect(getButtonColor(props.currentBall, player)).toBe('primary');
    });

    it('should return the color of batsman button as default when it is not selected', () => {
      const props = {
        currentBall: {
          run: 1,
          extras: [],
          batsmanName: ''
        }
      };
      const player = {
        name: 'Player 1.1'
      };
      expect(getButtonColor(props.currentBall, player)).toBe('default');
    });
  });
});