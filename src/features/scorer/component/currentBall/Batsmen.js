import React from "react";
import Button from "@material-ui/core/Button/Button";
import {withStyles} from '@material-ui/core/styles';

const styles = theme => ({
  button: {
    marginTop: theme.spacing.unit,
    marginBottom: theme.spacing.unit,
    marginLeft: theme.spacing.unit,
    padding: theme.spacing.unit
  },
  container: {
    display: 'flex',
    justifyContent: 'center',
  }
});

export const getButtonColor = (currentBall, player) => currentBall.batsmanName === player.name ? 'primary' : 'default';

export const Batsmen = ({classes, assignBatsman, currentBall, players}) =>
  <div className={classes.container}>
    {players.map((player, index) =>
      <Button
        variant="contained"
        size="small"
        className={classes.button}
        onClick={() => assignBatsman(player.name)}
        key={index}
        color={getButtonColor(currentBall, player)}
      >
        {player.name}
      </Button>)}
  </div>;

export default withStyles(styles)(Batsmen);

