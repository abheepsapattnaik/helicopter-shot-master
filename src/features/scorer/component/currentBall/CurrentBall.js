import React from "react";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Runs from "./Runs";
import Batsmen from "./Batsmen";
import {Extras} from "./Extras";

export const isDisabled =
  (props) => !(props.currentBall.batsmanName && (props.currentBall.run !== undefined));

export const isOutButtonDisabled =
  (props) => !(props.currentBall.batsmanName);

export const getOutButtonColor = (props) => props.currentBall.isOut ? "secondary" : "default";

export const CurrentBall = (props) =>
  <div className={props.classes.container}>
    <Typography variant='subtitle1' align='center'>
      Current Ball
    </Typography>
    <Batsmen
      currentBall={props.currentBall}
      assignBatsman={props.assignBatsman}
      players={props.players}
    />
    <Runs
      currentBall={props.currentBall}
      scoreUpdater={props.scoreUpdater}
    />

    <Extras currentBall={props.currentBall}
            scoreUpdater={props.extraScoreUpdater}/>

    <Button
      variant="contained"
      size="small"
      onClick={() => props.wicketTaken()}
      className={props.classes.button}
      color={getOutButtonColor(props)}
      disabled={isOutButtonDisabled(props)}
    >
      Out
    </Button>

    <div className={props.classes.nextBall}>
      <Button
        variant="contained"
        size="small"
        color="primary"
        onClick={() => props.playBall(props.currentBall, props.teamName, props.players)}
        disabled={isDisabled(props)}
        className={props.classes.nextBall}
      >
        Next Ball
      </Button>
    </div>
  </div>;