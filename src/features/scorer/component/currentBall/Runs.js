import React from 'react';
import Typography from "@material-ui/core/Typography";
import RunsOrExtrasButton from "../RunsOrExtrasButton";

const RUNS = [...Array.from(Array(8).keys())];

export const Runs = (props) =>
  <div>
    <Typography variant='subtitle1'>
      Runs
    </Typography>
    {RUNS.map((run, index) => <RunsOrExtrasButton value={run}
                                                  key={index}
                                                  {...props}/>)}
  </div>;

export default Runs;
