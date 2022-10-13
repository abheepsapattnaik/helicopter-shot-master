import {NEXT_BATSMAN_ACTION, NEXT_OVER_ACTION} from "../../scoreCard/redux/teamsScoreReducer";
import {CURRENT_BALL_ACTION} from "./currentBallReducer";
import {NEXT_BOWLER_ACTION} from "./overDetailsReducer";

const initialState = {
  bowlerSelection: false,
  batsmanSelection: false
};

export const playersSelectionReducer = (state = initialState, action) => {
  switch (action.type) {
    case CURRENT_BALL_ACTION: {
      if (action.data.currentBall.isOut) {
        return {...state, batsmanSelection: true};
      }
      return {...state};
    }
    case NEXT_BATSMAN_ACTION:
      return {...state, batsmanSelection: false};

    case NEXT_OVER_ACTION:
      return {...state, bowlerSelection: true};

    case NEXT_BOWLER_ACTION:
      return {...state, bowlerSelection: false};

    default :
      return state;
  }
};