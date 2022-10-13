import React from "react";
import {mount} from "enzyme";
import Typography from "@material-ui/core/Typography";
import NoStatsAvailable from "./NoStatsAvailable";

describe('No stats available', () => {
  it('should render the string "No Stats Available"', () => {
    const noStatsAvailableTag = mount(<NoStatsAvailable/>);
    expect(noStatsAvailableTag.find(Typography).text()).toEqual('No Stats Available');
  });
});