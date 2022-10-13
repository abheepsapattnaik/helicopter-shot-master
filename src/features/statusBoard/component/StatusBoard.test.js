import React from "react";
import {shallow} from "enzyme";

import TeamTabs from "./TeamTabs";
import StatusBoard from "./StatusBoard";

describe('StatusBoard', () => {
  it('should render team tabs', () => {
    const statusBoardTag = shallow(<StatusBoard/>);
    const teamTabsTag = statusBoardTag.find(TeamTabs);
    expect(teamTabsTag.length).toBe(1);
  });
});