import React from "react";
import {mount} from "enzyme";
import {CustomTableCell} from "./CustomTableCell";
import TableCell from "@material-ui/core/TableCell/";
import BowlingStatsList from "./BowlingStatsList";

describe('BowlingStatsList', () => {
  it('should render Table with custom table header cells bowler,runs,overs,maiden,wickets', () => {
    const props = {
      bowlingStats: [],
      classes: {}
    };
    const bowlingStatsListTag = mount(<BowlingStatsList {...props}/>);
    const tableCellTags = bowlingStatsListTag.find(CustomTableCell);
    expect(tableCellTags.length).toBe(5);
    expect(tableCellTags.at(0).text()).toBe('Bowler');
    expect(tableCellTags.at(1).text()).toBe('Overs');
    expect(tableCellTags.at(2).text()).toBe('Maiden');
    expect(tableCellTags.at(3).text()).toBe('Runs');
    expect(tableCellTags.at(4).text()).toBe('Wickets');
  });

  it('should render the batsmanStats ', () => {
    const props = {
      bowlingStats: [
        {
          bowlerName: 'Player 2.1',
          runs: 21,
          maidens: 0,
          overs: 1,
          wickets: 0
        },
        {
          bowlerName: 'Player 2.2',
          runs: 6,
          wickets: 0,
          overs: 0.3,
          maidens: 0
        }
      ],
      classes: {}
    };
    const bowlingStatusListTag = mount(<BowlingStatsList {...props}/>);
    const tableCellTags = bowlingStatusListTag.find(TableCell);
    expect(tableCellTags.at(5).text()).toBe('Player 2.1');
    expect(tableCellTags.at(6).text()).toBe('1');
    expect(tableCellTags.at(7).text()).toBe('0');
    expect(tableCellTags.at(8).text()).toBe('21');
    expect(tableCellTags.at(9).text()).toBe('0');
    expect(tableCellTags.length).toBe(15);
  });
});