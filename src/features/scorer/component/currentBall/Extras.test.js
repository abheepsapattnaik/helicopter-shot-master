import {Extras} from "./Extras";
import {RunsOrExtrasButton} from "../RunsOrExtrasButton";
import {mount} from "enzyme";
import React from "react";
import {WIDE, NO_BALL, BY, LEG_BY} from "../../redux/currentBallReducer";

describe('Extras', () => {
  it('should create a set of 4 extras button and set their values as Wb,Nb,B,Lb', () => {
    const props = {
      currentBall: {
        run: 1,
        extras: [],
        batsmanName: 'Player 1.1'
      }
    };
    const extrasTag = mount(<Extras {...props}/>);
    const buttonTags = extrasTag.find(RunsOrExtrasButton);
    expect(buttonTags.length).toBe(4);
    expect(buttonTags.at(0).prop('value')).toBe(WIDE);
    expect(buttonTags.at(1).prop('value')).toBe(NO_BALL);
    expect(buttonTags.at(3).prop('value')).toBe(BY);
    expect(buttonTags.at(2).prop('value')).toBe(LEG_BY);
  });
});