import TableCell from "@material-ui/core/TableCell/";
import {withStyles} from "@material-ui/core";

export const CustomTableCell = withStyles(theme => ({
  head: {
    backgroundColor: theme.palette.primary.light,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);
