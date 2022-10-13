import {NEXT_OVER_ACTION} from "../../scoreCard/redux/teamsScoreReducer";
import {CURRENT_BALL_ACTION} from "./currentBallReducer";
import {playersSelectionReducer} from "./playersSelectionReducer";
import {NEXT_BOWLER_ACTION} from "./overDetailsReducer";

describe('playersSelectionReducer', () => {

  describe('initial state', () => {
    it('should return the initial state', () => {
      const state = playersSelectionReducer(undefined, {type: 'INITIAL_ACTION'});
      expect(state.bowlerSelection).toEqual(false);
    });
  });

  describe('nextOverAction', () => {
    it('should set the bowler selection state to true when initially the state is false', () => {
      const state = playersSelectionReducer(undefined, {type: NEXT_OVER_ACTION});
      expect(state.bowlerSelection).toEqual(true);
    });
  });

  describe('nextBowlerSelectionAction', () => {
    it('should set the bowler selection state to false when the state is true', () => {
      const state = playersSelectionReducer({bowlerSelection: true}, {type: NEXT_BOWLER_ACTION});
      expect(state.bowlerSelection).toEqual(false);
    });
  });

  describe('currentBallAction', () => {
    it('should set the batsman selection state to true when current ball has a wicket', () => {
      const currentBall = {
        run: 3,
        extras: [],
        batsmanName: "Player 1.2",
        isOut: true
      };
      const state = playersSelectionReducer(undefined, {type: CURRENT_BALL_ACTION, data: {currentBall}});
      expect(state.batsmanSelection).toEqual(true);
    });
  });
});