import LinkToMatchStats from "./LinkToMatchStats";
import Typography from "@material-ui/core/Typography/";
import {HashRouter} from 'react-router-dom';
import {mount} from "enzyme";
import React from "react";

describe('LinkToMatchStats', () => {
  it('should render the Link', () => {
    const linkToMatchStatsTag = mount(<HashRouter><LinkToMatchStats/></HashRouter>);
    const typographyTags = linkToMatchStatsTag.find(Typography);
    expect(typographyTags.length).toBe(1);
    expect(typographyTags.text()).toBe('Match Stats');
  });
});