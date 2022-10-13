import Table from "@material-ui/core/Table/";
import TableHead from "@material-ui/core/TableHead/";
import TableRow from "@material-ui/core/TableRow/";
import React from "react";
import {CustomTableCell} from "./CustomTableCell";
import TableCell from "@material-ui/core/TableCell/";
import TableBody from "@material-ui/core/TableBody/";

export const appendAsterisk = (playingBatsmen, batsmanName) => {
  return playingBatsmen.filter((playingBatsman) =>
    playingBatsman.name === batsmanName).length > 0 ? '*' : ''
};

const BattingStatsList = ({battingStats, playingBatsmen, classes}) =>
  <Table>
    <TableHead>
      <TableRow>
        <CustomTableCell>Batsman</CustomTableCell>
        <CustomTableCell>Runs</CustomTableCell>
        <CustomTableCell>Balls</CustomTableCell>
        <CustomTableCell>Fours</CustomTableCell>
        <CustomTableCell>Sixes</CustomTableCell>
        <CustomTableCell>Strike Rate</CustomTableCell>
      </TableRow>
    </TableHead>
    <TableBody>
      {battingStats.map((batsmanStats, index) =>
        <TableRow key={index} className={classes.row}>
          <TableCell>{batsmanStats.name + (appendAsterisk(playingBatsmen, batsmanStats.name))}</TableCell>
          <TableCell>{batsmanStats.runs}</TableCell>
          <TableCell>{batsmanStats.balls}</TableCell>
          <TableCell>{batsmanStats.fours}</TableCell>
          <TableCell>{batsmanStats.sixes}</TableCell>
          <TableCell>{batsmanStats.strikeRate}</TableCell>
        </TableRow>)
      }
    </TableBody>
  </Table>;

export default BattingStatsList;