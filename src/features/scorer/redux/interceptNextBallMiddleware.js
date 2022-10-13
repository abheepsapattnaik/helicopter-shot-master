import {CURRENT_BALL_ACTION} from "./currentBallReducer";
import {
  getTeam,
  SET_NEW_INNINGS,
  setNewOver,
  getPlayingBatsmen
} from "../../scoreCard/redux/teamsScoreReducer";

const NO_OF_BALLS = 6;

const isNextOver = (state) => getTeam(state.teams, true).score.ballNumber === NO_OF_BALLS;
const isNextInnings = (state) => getTeam(state.teams, true).score.overNumber === state.gameSetup.maxOvers;

export const interceptNextBall = store => next => action => {
  const result = next(action);
  const newState = store.getState();
  if (isNextOver(newState) && action.type === CURRENT_BALL_ACTION) {
    const nextResult = next(setNewOver(newState.currentBall, getPlayingBatsmen(newState.teams)));
    const nextState = store.getState();
    if (isNextInnings(nextState)) {
      return next(SET_NEW_INNINGS);
    }
    return nextResult;
  }
  return result;
};