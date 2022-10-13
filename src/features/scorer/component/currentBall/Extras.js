import React from "react";
import Typography from "@material-ui/core/Typography";
import RunsOrExtrasButton from "../RunsOrExtrasButton";
import {WIDE, NO_BALL, LEG_BY, BY} from "../../redux/currentBallReducer";

const EXTRAS = [WIDE, NO_BALL, LEG_BY, BY];

export const Extras = (props) =>
  <div>
    <Typography variant='subtitle1'>
      Extras
    </Typography>
    {EXTRAS.map((extra, index) =>
      <RunsOrExtrasButton value={extra} key={index}  {...props}/>)}
  </div>;