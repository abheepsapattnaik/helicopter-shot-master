import React from 'react';
import {OverRunsDetails} from "./OverRunsDetails";
import {mount} from "enzyme";
import Chip from "@material-ui/core/Chip/Chip";

describe('OverRunsDetails', () => {
  it('should render the details of current over which has 2 balls with extras', () => {
    const WIDE = "Wd";
    const NO_BALL = "Nb";
    const run = 2;
    const isOut = false;
    const extras = [WIDE, NO_BALL];
    const overRunDetailsTag = mount(<OverRunsDetails run={run} extras={extras} wicket={isOut} classes={{}}/>);
    const chipTags = overRunDetailsTag.find(Chip);
    expect(chipTags.length).toBe(1);
    expect(chipTags.text()).toBe('2 Wd Nb');
  });

  it('should render the details of current over with no extras', () => {
    const run = 3;
    const isOut = false;
    const overRunDetailsTag = mount(<OverRunsDetails run={run} extras={[]} wicket={isOut} classes={{}}/>);
    const chipTags = overRunDetailsTag.find(Chip);
    expect(chipTags.text()).toBe('3');
  });

  it('should render the details of current over with no extras', () => {
    const run = 3;
    const isOut = true;
    const overRunDetailsTag = mount(<OverRunsDetails run={run} extras={[]} wicket={isOut} classes={{}}/>);
    const chipTags = overRunDetailsTag.find(Chip);
    expect(chipTags.text()).toBe('3 W');
  });

  it('should render red color chip when wicket is taken', () => {
    const run = 3;
    const isOut = true;
    const overRunDetailsTag = mount(<OverRunsDetails run={run} extras={[]} wicket={isOut} classes={{}}/>);
    const chipTags = overRunDetailsTag.find(Chip);
    expect(chipTags.prop('color')).toBe('secondary');
  });
});