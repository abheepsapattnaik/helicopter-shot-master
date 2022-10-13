import React from "react";
import Chip from "@material-ui/core/Chip/Chip";
import {withStyles} from "@material-ui/core";

const styles = theme => ({
  chip: {
    margin: theme.spacing.unit / 2,
    padding: 0
  },
});

export const OverRunsDetails = ({run, extras, wicket, classes}) =>
  <Chip
    color={wicket ? 'secondary' : 'default'}
    label={[run, ...extras].join(' ') + (wicket ? ' W' : '')}
    className={classes.chip}
  />;

export default withStyles(styles)(OverRunsDetails);