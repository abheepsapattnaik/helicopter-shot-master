import React from "react";
import {mount} from "enzyme";
import BattingStatsList, {appendAsterisk} from "./BattingStatsList";
import {CustomTableCell} from "./CustomTableCell";
import TableCell from "@material-ui/core/TableCell/";

describe('BattingStatsList', () => {
  describe('get data', () => {
    it('should render Table with custom table header cells batsman,runs,balls,4s,6s,sr', () => {
      const props = {
        battingStats: [
          {
            balls: 2,
            fours: 0,
            name: 'Virat',
            runs: 4,
            sixes: 0
          },
          {
            balls: 1,
            fours: 0,
            name: 'Rohit',
            runs: 1,
            sixes: 0
          }
        ],
        playingBatsmen: [
          {isPlaying: true, name: "Virat"},
          {isPlaying: true, name: "Player 1.1"}
        ],
        classes: {}
      };
      const battingStatusListTag = mount(<BattingStatsList {...props}/>);
      const tableCellTags = battingStatusListTag.find(CustomTableCell);
      expect(tableCellTags.length).toBe(6);
      expect(tableCellTags.at(0).text()).toBe('Batsman');
      expect(tableCellTags.at(1).text()).toBe('Runs');
      expect(tableCellTags.at(2).text()).toBe('Balls');
      expect(tableCellTags.at(3).text()).toBe('Fours');
      expect(tableCellTags.at(4).text()).toBe('Sixes');
      expect(tableCellTags.at(5).text()).toBe('Strike Rate');
    });

    it('should render the batsmanStats ', () => {
      const props = {
        battingStats: [
          {
            balls: 2,
            fours: 0,
            name: 'Virat',
            runs: 4,
            sixes: 0,
            strikeRate: 200
          },
          {
            balls: 1,
            fours: 0,
            name: 'Rohit',
            runs: 1,
            sixes: 0,
            strikeRate: 100
          }
        ],
        playingBatsmen: [
          {isPlaying: true, name: "Virat"},
          {isPlaying: true, name: "Player 1.1"}
        ],
        classes: {}
      };
      const battingStatusListTag = mount(<BattingStatsList {...props}/>);
      const tableCellTags = battingStatusListTag.find(TableCell);
      expect(tableCellTags.at(6).text()).toBe('Virat*');
      expect(tableCellTags.at(7).text()).toBe('4');
      expect(tableCellTags.at(8).text()).toBe('2');
      expect(tableCellTags.at(9).text()).toBe('0');
      expect(tableCellTags.at(10).text()).toBe('0');
      expect(tableCellTags.at(11).text()).toBe('200');
      expect(tableCellTags.length).toBe(18);
    });
  });

  describe('appendAsterisk', () => {
    it('should add asterisk to the current playing batsmen', () => {
      const batsmanName = 'Virat';
      const playingBatsmanList = [
        {isPlaying: true, name: "Virat"},
        {isPlaying: true, name: "Player 1.1"}
      ];
      expect(appendAsterisk(playingBatsmanList, batsmanName)).toBe('*');
    });

    it('should not add asterisk to the not currently playing batsmen', () => {
      const batsmanName = 'Rohit';
      const playingBatsmanList = [
        {isPlaying: true, name: "Virat"},
        {isPlaying: true, name: "Player 1.1"}
      ];
      expect(appendAsterisk(playingBatsmanList, batsmanName)).toBe('');
    });
  });
});