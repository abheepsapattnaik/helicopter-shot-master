import {mount} from "enzyme";
import React from "react";
import {ThisOverDetails} from "./ThisOverDetails";
import Typography from "@material-ui/core/Typography/Typography";
import {OverRunsDetails} from "./OverRunsDetails";

describe('ThisOverDetails', () => {
  it('should render "This Over"', () => {
    const WIDE = "Wd";
    const balls = [
      {
        run: 1,
        extras: [],
        batsmanName: '1.1'
      },
      {
        run: 4,
        extras: [WIDE],
        batsmanName: '1.1'
      },
    ];
    const thisOverDetailsTag = mount(<ThisOverDetails runsAndExtrasInBalls={balls}/>);
    const typographyTag = thisOverDetailsTag.find(Typography);
    const overRunsDetailsTags = thisOverDetailsTag.find(OverRunsDetails);
    expect(thisOverDetailsTag.length).toBe(1);
    expect(typographyTag.at(0).text()).toBe('This Over:');
    expect(overRunsDetailsTags.length).toBe(2);
  });
});