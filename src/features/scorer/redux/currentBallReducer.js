import immutable from 'object-path-immutable';
import {NEXT_OVER_ACTION} from "../../scoreCard/redux/teamsScoreReducer";

const RUN_STORED_ACTION = "RUN_STORED_ACTION";
const EXTRA_SCORED_ACTION = "EXTRA_SCORED_ACTION";
export const CURRENT_BALL_ACTION = 'CURRENT_BALL_ACTION';
const ASSIGN_CURRENT_BATSMAN_ACTION = 'ASSIGN_CURRENT_BATSMAN_ACTION';
const WICKET_TAKEN_ACTION = 'WICKET_TAKEN_ACTION';

export const WIDE = "Wd";
export const NO_BALL = "Nb";
export const BY = "B";
export const LEG_BY = "Lb";

const initialState = {
  extras: [],
  batsmanName: ''
};

export const extraScoredAction = (extraValue) => ({
  type: EXTRA_SCORED_ACTION,
  data: {
    extraValue
  }
});

export const runStoredAction = (runValue) => ({
  type: RUN_STORED_ACTION,
  data: {runValue}
});

export const assignStrikerAction = (batsmanName) => ({
  type: ASSIGN_CURRENT_BATSMAN_ACTION,
  data: {batsmanName}
});

export const getOnStrikeBatsman = (ball, playingBatsmen) => {
  return (ball.run % 2 !== 0 ?
    switchStrike(ball, playingBatsmen)
    : ball.batsmanName);
};

export const switchStrike = (ball, playingBatsmen) => {
  return (playingBatsmen.filter((batsman) => batsman.name !== ball.batsmanName))[0].name;
};

export const wicketTakenAction = () => ({
  type: WICKET_TAKEN_ACTION,
});

export const removeExtra = (extras, extraValue) =>
  extras.filter((extra) => extra !== extraValue);

const getExtras = (extras, extraValue) =>
  extras.includes(extraValue) ?
    removeExtra(extras, extraValue) : [...extras, extraValue];

const currentBallReducer = (state = initialState, action) => {
  switch (action.type) {
    case RUN_STORED_ACTION:
      return {...state, run: action.data.runValue};

    case CURRENT_BALL_ACTION:
      return {
        ...initialState,
        batsmanName: getOnStrikeBatsman(state, action.data.playingBatsmen)
      };

    case EXTRA_SCORED_ACTION:
      return immutable.set(state, 'extras', getExtras(state.extras, action.data.extraValue));

    case ASSIGN_CURRENT_BATSMAN_ACTION:
      return {
        ...state,
        batsmanName: action.data.batsmanName
      };

    case WICKET_TAKEN_ACTION:
      return {...state, isOut: !state.isOut};

    case NEXT_OVER_ACTION:
      return {
        ...initialState,
        batsmanName: switchStrike(state, action.data.playingBatsmen)
      };

    default:
      return state;
  }
};

export default currentBallReducer;