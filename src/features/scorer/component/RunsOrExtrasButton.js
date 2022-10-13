import React from "react";
import Chip from "@material-ui/core/Chip";
import {withStyles} from '@material-ui/core/styles';

const styles = theme => ({
  chip: {
    margin: theme.spacing.unit / 2,
    padding: 0
  },
});

export const getChipColor = (value, currentBall) => {
  return (value === currentBall.run) ||
  (currentBall.extras.includes(value)) ?
    'primary' : 'default';
};

export const RunsOrExtrasButton = ({value, classes, currentBall, scoreUpdater}) => (
  <Chip
    label={value}
    onClick={() => scoreUpdater(value)}
    className={classes.chip}
    color={getChipColor(value, currentBall)}
  />
);

export default withStyles(styles)(RunsOrExtrasButton);