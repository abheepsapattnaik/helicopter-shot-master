import Table from "@material-ui/core/Table/";
import TableHead from "@material-ui/core/TableHead/";
import TableRow from "@material-ui/core/TableRow/";
import React from "react";
import {CustomTableCell} from "./CustomTableCell";
import TableCell from "@material-ui/core/TableCell/TableCell";
import TableBody from "@material-ui/core/TableBody/TableBody";

const BowlingStatsList = ({bowlingStats,classes}) => (
  <Table>
    <TableHead>
      <TableRow>
        <CustomTableCell>Bowler</CustomTableCell>
        <CustomTableCell numeric>Overs</CustomTableCell>
        <CustomTableCell numeric>Maiden</CustomTableCell>
        <CustomTableCell numeric>Runs</CustomTableCell>
        <CustomTableCell numeric>Wickets</CustomTableCell>
      </TableRow>
    </TableHead>
    <TableBody>
      {bowlingStats.map((bowlerDetails, index) =>
        <TableRow key={index} className={classes.row}>
          <TableCell>{bowlerDetails.bowlerName}</TableCell>
          <TableCell>{bowlerDetails.overs}</TableCell>
          <TableCell>{bowlerDetails.maidens}</TableCell>
          <TableCell>{bowlerDetails.runs}</TableCell>
          <TableCell>{bowlerDetails.wickets}</TableCell>
        </TableRow>
      )}
    </TableBody>
  </Table>
);

export default BowlingStatsList;