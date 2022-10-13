import React from 'react';
import {Runs} from "./Runs";
import {mount} from "enzyme";
import {RunsOrExtrasButton} from "../RunsOrExtrasButton";


describe('Runs', () => {

  it('should create a set of 7 run buttons with unit increment values', () => {
    const props = {
      currentBall: {
        run: 1,
        extras: [],
        batsmanName: '1.1'
      }
    };
    const runsTag = mount(<Runs {...props}/>);
    const runsOrExtrasButtonTags = runsTag.find(RunsOrExtrasButton);
    expect(runsOrExtrasButtonTags.length).toBe(8);
    expect(runsOrExtrasButtonTags.at(4).prop("value")).toBe(4);
  });
});