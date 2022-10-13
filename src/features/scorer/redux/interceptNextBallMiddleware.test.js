import {interceptNextBall} from "./interceptNextBallMiddleware";
import PLAYER_DETAILS from "../../scoreCard/redux/playerDetails";
import {NEXT_OVER_ACTION, TEAM1} from "../../scoreCard/redux/teamsScoreReducer";
import {CURRENT_BALL_ACTION} from "./currentBallReducer";

describe('interceptNextBall', () => {
  describe('nextOverAction', () => {
    let newState;
    beforeEach(() => {
      newState = {
        teams: [
          {
            name: TEAM1,
            isBatting: true,
            score: {
              runs: 0,
              wickets: 0,
              overNumber: 0,
              ballNumber: 6,
            },
            players: PLAYER_DETAILS.team1
          }
        ],
        gameSetup: {maxOvers: 2}
      };
    });

    it('should invoke next function with CURRENT_BALL_ACTION only', () => {
      newState.teams[0].score.ballNumber = 3;
      const store = {
        getState: jest.fn().mockReturnValue(newState)
      };
      const next = jest.fn();
      const currentBallAction = {type: CURRENT_BALL_ACTION, data: {}};
      interceptNextBall(store)(next)(currentBallAction);
      expect(next).toHaveBeenCalledTimes(1);
      expect(next).toHaveBeenCalledWith(currentBallAction);
    });

    it('should invoke NEXT_OVER_ACTION when ball number of playing team is 6 ' +
      'and the dispatch action is CURRENT_BALL_ACTION', () => {
      const store = {
        getState: jest.fn(() => newState)
      };
      const state = {
        data: {
          ball: undefined,
          playingBatsmen: [
            {
              name: 'Player 1.1',
              isPlaying: true
            },
            {
              name: 'Player 1.2',
              isPlaying: true
            }]
        },
        type: NEXT_OVER_ACTION
      };
      const next = jest.fn();
      const currentBallAction = {type: CURRENT_BALL_ACTION, data: {}};
      interceptNextBall(store)(next)(currentBallAction);
      expect(next).toHaveBeenCalledTimes(2);
      expect(next).toHaveBeenLastCalledWith({...state});
    });

    it('should not invoke NEXT_OVER_ACTION when ball number of playing team is 6 ' +
      'and the dispatch action is not CURRENT_BALL_ACTION', () => {
      const store = {
        getState: jest.fn(() => newState)
      };
      const next = jest.fn();
      const anyAction = {type: 'ANY_ACTION', data: {}};
      interceptNextBall(store)(next)(anyAction);
      expect(next).toHaveBeenCalledTimes(1);
      expect(next).toHaveBeenLastCalledWith(anyAction);
    });
  });

  describe('nextInningsAction', () => {
    let newState;
    beforeEach(() => {
      newState = {
        teams: [
          {
            name: TEAM1,
            isBatting: true,
            score: {
              runs: 0,
              wickets: 0,
              overNumber: 2,
              ballNumber: 6,
            },
            players: PLAYER_DETAILS.team1
          }
        ],
        gameSetup: {
          maxOvers: 2
        }
      };
    });

    it('should invoke NEXT_INNINGS_ACTION action when max over limit is reached', () => {
      const store = {
        getState: jest.fn(() => newState)
      };
      const next = jest.fn();
      const currentBallAction = {type: CURRENT_BALL_ACTION, data: {}};
      interceptNextBall(store)(next)(currentBallAction);
      expect(next).toHaveBeenCalledTimes(3);
    });

    it('should not invoke NEXT_INNINGS_ACTION action', () => {
      newState.teams[0].score.overNumber = 1;
      const store = {
        getState: jest.fn(() => newState)
      };
      const state = {
        data: {
          ball: undefined,
          playingBatsmen: [
            {
              name: 'Player 1.1',
              isPlaying: true
            },
            {
              name: 'Player 1.2',
              isPlaying: true
            }]
        },
        type: NEXT_OVER_ACTION
      };
      const next = jest.fn();
      const currentBallAction = {type: CURRENT_BALL_ACTION, data: {}};
      interceptNextBall(store)(next)(currentBallAction);
      expect(next).toHaveBeenCalledTimes(2);
      expect(next).toHaveBeenLastCalledWith({...state});
    });
  });
});