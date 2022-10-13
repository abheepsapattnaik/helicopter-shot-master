import currentBallReducer, {
  assignStrikerAction,
  CURRENT_BALL_ACTION,
  extraScoredAction,
  runStoredAction,
  NO_BALL, WIDE,
  wicketTakenAction, removeExtra, getOnStrikeBatsman,
} from "./currentBallReducer";
import {NEXT_OVER_ACTION} from "../../scoreCard/redux/teamsScoreReducer";

describe('currentBallReducer', () => {
  describe('initial action', () => {
    it('should return initial state when the action is undefined', () => {
      const state = currentBallReducer(undefined, 'INITIAL STATE');
      expect(state).toEqual({
        extras: [],
        batsmanName: '',
      });
      expect(state.run).toBeUndefined();
    });
  });

  describe('runScoredAction', () => {
    it('should make an entry of the run scored as 2 when a currentBall is played', () => {
      const state = {
        extras: [],
        batsmanName: ''
      };
      const newState = currentBallReducer(state, runStoredAction(2));
      expect(newState).toEqual({
        run: 2,
        extras: [],
        batsmanName: '',
      })
    });

    it('should make an entry of the run scored as 3 when a currentBall is played', () => {
      const state = {
        extras: [],
        batsmanName: ''
      };
      const newState = currentBallReducer(state, runStoredAction(3));
      expect(newState).toEqual({
        run: 3,
        extras: [],
        batsmanName: '',
      })
    });
  });

  describe('current currentBall action', () => {
    it('should clear the state of current currentBall', () => {
      const state = {
        run: 2,
        extras: [],
        batsmanName: ''
      };
      const newState = currentBallReducer(state, {
        type: CURRENT_BALL_ACTION,
        data: {
          playingBatsmen: [
            {name: 'PLAYER 1.1', isPlaying: true},
            {name: 'PLAYER 1.2', isPlaying: true}
          ]
        }
      });
      expect(newState).toEqual({
        extras: [],
        batsmanName: '',
      });
    });

    it('should return the state with on strike batsman switched when the runs scored is odd', () => {
      const state = {
        run: 1,
        extras: [],
        batsmanName: 'PLAYER 1.1',
        isOut: false
      };
      const result = currentBallReducer(state, {
        type: CURRENT_BALL_ACTION,
        data: {
          playingBatsmen: [
            {name: 'PLAYER 1.1', isPlaying: true},
            {name: 'PLAYER 1.2', isPlaying: true}
          ]
        }
      });
      expect(result).toEqual({
        extras: [],
        batsmanName: 'PLAYER 1.2',
      })
    });

    it('should not change strike batsman when the runs scored is even', () => {
      const state = {
        run: 2,
        extras: [],
        batsmanName: 'PLAYER 1.1',
        isOut: false
      };
      const result = currentBallReducer(state, {
        type: CURRENT_BALL_ACTION,
        data: {
          playingBatsmen: [
            {name: 'PLAYER 1.1', isPlaying: true},
            {name: 'PLAYER 1.2', isPlaying: true}
          ]
        }
      });
      expect(result).toEqual({
        extras: [],
        batsmanName: 'PLAYER 1.1',
      })
    });

    it('should return the state with the onStrike batsman change on over completion', () => {
      const state = {
        run: 2,
        extras: [],
        batsmanName: 'PLAYER 1.1',
        isOut: false
      };
      const playingBatsmen = [
        {name: 'PLAYER 1.1', isPlaying: true},
        {name: 'PLAYER 1.2', isPlaying: true}
      ];
      const result = currentBallReducer(state, {
        type: NEXT_OVER_ACTION,
        data: {
          playingBatsmen, state
        }
      })
    });
  });

  describe('extraScoredAction', () => {
    it('should make an entry of the extra "WIDE" scored when a currentBall is played', () => {
      const state = {
        run: 2,
        extras: [],
        batsmanName: ''
      };
      const newState = currentBallReducer(state, extraScoredAction(WIDE));
      expect(newState).toEqual({
        run: 2,
        extras: [WIDE],
        batsmanName: '',
      })
    });

    it('should make an entry of the extra "NO BALL" scored when a currentBall is played which had WIDE before', () => {
      const state = {
        run: 6,
        extras: [WIDE],
        batsmanName: ''
      };
      const newState = currentBallReducer(state, extraScoredAction(NO_BALL));
      expect(newState).toEqual({
        run: 6,
        extras: [WIDE, NO_BALL],
        batsmanName: '',
      })
    });

    it('should remove an entry of the extra "NO BALL" if it is already there in the extra', () => {
      const state = {
        run: 6,
        extras: [NO_BALL],
        batsmanName: ''
      };
      const expectedState = {
        run: 6,
        extras: [],
        batsmanName: ''
      };
      const newState = currentBallReducer(state, extraScoredAction(NO_BALL));
      expect(newState).toEqual(expectedState);
    });

    it('should remove an entry of the extra "NO BALL" if it is already there in the extras', () => {
      const state = {
        run: 6,
        extras: [NO_BALL, WIDE],
        batsmanName: ''
      };
      const expectedState = {
        run: 6,
        extras: [WIDE],
        batsmanName: ''
      };
      const newState = currentBallReducer(state, extraScoredAction(NO_BALL));
      expect(newState).toEqual(expectedState);
    });

  });

  describe('assignCurrentBatsmanAction', () => {
    it('should assign batsman name as Player 1.1 to current currentBall', () => {
      const state = {
        run: 6,
        extras: [],
        batsmanName: ''
      };
      const newState = currentBallReducer(state, assignStrikerAction('Player 1.1'));
      expect(newState).toEqual({
        run: 6,
        extras: [],
        batsmanName: 'Player 1.1',
      });
    });
  });

  describe('wicketTakenAction', () => {
    it('should toggle the isOut state to true', () => {
      const state = {
        extras: [],
        batsmanName: '',
        isOut: false
      };
      const newState = currentBallReducer(state, wicketTakenAction());
      expect(newState).toEqual({
        extras: [],
        batsmanName: '',
        isOut: true
      })
    });

    it('should toggle the isOut state to false', () => {
      const state = {
        extras: [],
        batsmanName: '',
        isOut: true
      };
      const newState = currentBallReducer(state, wicketTakenAction());
      expect(newState).toEqual({
        extras: [],
        batsmanName: '',
        isOut: false
      })
    });
  });

  describe('removeExtra', () => {
    it('should return array of extras by removing NO_BALL', () => {
      const extras = [NO_BALL];
      expect(removeExtra(extras, NO_BALL).length).toBe(0);
    });
    it('should return extras array by removing WIDE', () => {
      const extras = [NO_BALL, WIDE];
      const newExtras = removeExtra(extras, WIDE);
      expect(newExtras.length).toBe(1);
      expect(newExtras).toContain(NO_BALL);
    });
  });

  describe('getOnStrikeBatsman', () => {
    it('should give the on Strike batsman on odd runs', () => {
      const state = {
        extras: [],
        run: 1,
        batsmanName: 'PLAYER 1.1',
        isOut: true
      };
      const playingBatsmen = [
        {name: 'PLAYER 1.1', isPlaying: true},
        {name: 'PLAYER 1.2', isPlaying: true}
      ];
      const result = getOnStrikeBatsman(state, playingBatsmen);
      expect('PLAYER 1.2').toEqual(result);
    });

    it('should give the on Strike batsman on even runs', () => {
      const state = {
        extras: [],
        run: 2,
        batsmanName: 'PLAYER 1.1',
        isOut: true
      };
      const playingBatsmen = [
        {name: 'PLAYER 1.1', isPlaying: true},
        {name: 'PLAYER 1.2', isPlaying: true}
      ];
      const result = getOnStrikeBatsman(state, playingBatsmen);
      expect('PLAYER 1.1').toEqual(result);
    });
  });
});