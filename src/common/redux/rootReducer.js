import {combineReducers} from 'redux';
import currentBallReducer from "../../features/scorer/redux/currentBallReducer";
import overDetailsReducer from "../../features/scorer/redux/overDetailsReducer";
import teamsScoreReducer from "../../features/scoreCard/redux/teamsScoreReducer";
import {playersSelectionReducer} from "../../features/scorer/redux/playersSelectionReducer";
import {gameSetupReducer} from "../../features/gameSetup/redux/gameSetupReducer";

const reducerMap = {
  teams: teamsScoreReducer,
  currentBall: currentBallReducer,
  overDetails: overDetailsReducer,
  playersSelection: playersSelectionReducer,
  gameSetup : gameSetupReducer,
};

export default combineReducers(reducerMap);