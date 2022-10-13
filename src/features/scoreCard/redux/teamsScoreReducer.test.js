import {
  ballNumberUpdater,
  getTeam,
  getTeamName,
  getBowlers,
  getPlayingBatsmen,
  getTeamIndex,
  isInvalidBall,
  playersListUpdaterOnWicket,
  runsUpdater,
  SET_NEW_OVER,
  TEAM1,
  TEAM2,
  wicketsUpdater,
  yetToPlayBatsmen,
  NEXT_BATSMAN_ACTION,
  playersListUpdaterOnSelection, SET_NEW_INNINGS, NEXT_OVER_ACTION,
} from "./teamsScoreReducer";
import teamsScoreReducer from "./teamsScoreReducer";
import {CURRENT_BALL_ACTION} from "../../scorer/redux/currentBallReducer";
import PLAYER_DETAILS from "./playerDetails";

describe('teamsScoreReducer', () => {
  describe('start game', () => {
    it('should return the initial state of the teams', () => {
      const state = teamsScoreReducer(undefined, 'INITIAL');
      expect(state).toEqual(
        [
          {
            name: TEAM1,
            isBatting: true,
            score: {
              runs: 0,
              wickets: 0,
              overNumber: 0,
              ballNumber: 0,
            },
            players: PLAYER_DETAILS.team1
          },
          {
            name: TEAM2,
            isBatting: false,
            score: {
              runs: 0,
              wickets: 0,
              overNumber: 0,
              ballNumber: 0,
            },
            players: PLAYER_DETAILS.team2
          }
        ]);
    });
  });

  describe('current ball action', () => {
    it('should update the runs, wickets and ball number', () => {
      const currentBall = {
        run: 3,
        extras: [],
        batsmanName: "Player 1.1",
        isOut: true
      };
      const initialState = [
        {
          name: TEAM1,
          isBatting: true,
          score: {
            runs: 0,
            wickets: 0,
            overNumber: 0,
            ballNumber: 0,
          },
          players: [
            {
              name: "Player 1.1",
              isPlaying: true
            },
            {
              name: "Player 1.2",
              isPlaying: true
            }]
        },
      ];
      const state = teamsScoreReducer(initialState, {type: CURRENT_BALL_ACTION, data: {currentBall}});
      expect(state[0].score).toEqual({
        runs: 3,
        wickets: 1,
        overNumber: 0,
        ballNumber: 1,
      });
      expect(state[0].players).toEqual([
        {
          name: "Player 1.1",
          isPlaying: false
        },
        {
          name: "Player 1.2",
          isPlaying: true
        }]);
    });
  });

  describe('getPlayingBatsmen', () => {
    it('should return team1 playing batsmen 1.1 and 1.2', () => {
      const state = [
        {
          name: TEAM1,
          isBatting: true,
          score: {
            runs: 0,
            wickets: 0,
            overNumber: 0,
            ballNumber: 0,
          },
          players: PLAYER_DETAILS.team1
        },
      ];
      const batsmen = getPlayingBatsmen(state);
      expect(batsmen.length).toBe(2);
      expect(batsmen[0]).toEqual({isPlaying: true, name: "Player 1.1"});
      expect(batsmen[1]).toEqual({isPlaying: true, name: "Player 1.2"});
    });

    describe('test', function () {
      it('should update the score to 2 from initial state for team1', () => {
        const currentBall = {
          run: 3,
          extras: [],
          batsmanName: "Player 1.1"
        };
        const initialState = [
          {
            name: TEAM1,
            isBatting: true,
            score: {
              runs: 2,
              wickets: 0,
              overNumber: 0,
              ballNumber: 1,
            },
            players: PLAYER_DETAILS.team1
          },
        ];
        const newState = teamsScoreReducer(initialState, {type: CURRENT_BALL_ACTION, data: {currentBall}});
        expect(newState[0].score.runs).toBe(5);
        expect(newState[0].score.ballNumber).toBe(2);
      });
    });

    describe('currentBallAction', () => {
      it('should update the score to 2 from initial state for team1', () => {
        const currentBall = {
          run: 2,
          extras: [],
          batsmanName: "Player 1.1",
          isOut: false
        };
        const state = teamsScoreReducer(undefined, {type: CURRENT_BALL_ACTION, data: {currentBall}});
        expect(state[0].score.runs).toBe(2);
        expect(state[0].score.ballNumber).toBe(1);
      });

      it('should not increase the ball numbers for WIDE extras', () => {
        const currentBall = {
          run: 3,
          extras: ['Wd'],
          batsmanName: "Player 1.1"
        };
        const initialState = [
          {
            name: TEAM1,
            isBatting: true,
            score: {
              runs: 0,
              wickets: 0,
              overNumber: 0,
              ballNumber: 0,
            },
            players: PLAYER_DETAILS.team1
          },
        ];
        const newState = teamsScoreReducer(initialState, {type: CURRENT_BALL_ACTION, data: {currentBall}});
        expect(newState[0].score.ballNumber).toBe(0);
        expect(newState[0].score.runs).toBe(3);
      });

      it('should increase the ball numbers for LEG_BY extras', () => {
        const currentBall = {
          run: 3,
          extras: ['Lb'],
          batsmanName: "Player 1.1"
        };
        const initialState = [
          {
            name: TEAM1,
            isBatting: true,
            score: {
              runs: 0,
              wickets: 0,
              overNumber: 0,
              ballNumber: 0,
            },
            players: PLAYER_DETAILS.team1
          },
        ];
        const newState = teamsScoreReducer(initialState, {type: CURRENT_BALL_ACTION, data: {currentBall}});
        expect(newState[0].score.ballNumber).toBe(1);
        expect(newState[0].score.runs).toBe(3);
      });

      it('should not increase the ball numbers for NO_BALL and WIDE extras', () => {
        const currentBall = {
          run: 3,
          extras: ['Lb', 'Nb'],
          batsmanName: "Player 1.1"
        };
        const initialState = [
          {
            name: TEAM1,
            isBatting: true,
            score: {
              runs: 0,
              wickets: 0,
              overNumber: 0,
              ballNumber: 0,
            },
            players: PLAYER_DETAILS.team1
          },
        ];
        const newState = teamsScoreReducer(initialState, {type: CURRENT_BALL_ACTION, data: {currentBall}});
        expect(newState[0].score.ballNumber).toBe(0);
        expect(newState[0].score.runs).toBe(3);
      })
    });
  });

  describe('getTeamName', () => {
    it('should return the batting team name in lower case', () => {
      const teams = [
        {
          name: TEAM1,
          isBatting: true,
          score: {
            runs: 0,
            wickets: 0,
            overNumber: 0,
            ballNumber: 0,
          },
          players: PLAYER_DETAILS.team1
        },
      ];
      expect(getTeamName(teams, true)).toBe('team1');
    });

    it('should return the bowling team name in lower case', () => {
      const teams = [
        {
          name: TEAM1,
          isBatting: false,
          score: {
            runs: 0,
            wickets: 0,
            overNumber: 0,
            ballNumber: 0,
          },
          players: PLAYER_DETAILS.team1
        },
      ];
      expect(getTeamName(teams, false)).toBe('team1');
    });
  });

  describe('isInvalidBall', () => {
    it('should return true for WIDE ball', () => {
      const extra = 'Wd';
      const ballValidity = isInvalidBall(extra);
      expect(ballValidity).toBeTruthy();
    });

    it('should return false for LEG_BY ball', () => {
      const extra = 'Lb';
      const ballValidity = isInvalidBall(extra);
      expect(ballValidity).toBeFalsy();
    });
  });

  describe('getTeamIndex', function () {
    it('should return the index of a team with a given team name', function () {
      const initialState = [
        {
          name: TEAM1,
          isBatting: true,
          score: {
            runs: 0,
            wickets: 0,
            overNumber: 0,
            ballNumber: 0,
          },
          players: [
            {
              name: "Player 1.1",
              isPlaying: true
            },
            {
              name: "Player 1.2",
              isPlaying: true
            }]
        },
        {
          name: TEAM2,
          isBatting: false,
          score: {
            runs: 0,
            wickets: 0,
            overNumber: 0,
            ballNumber: 0,
          },
          players: [{
            name: "Player 2.1",
            isPlaying: true
          }]
        }
      ];
      const battingTeamName = TEAM1;
      expect(getTeamIndex(initialState, battingTeamName)).toBe(0);
    });
  });

  describe('Player Out action', function () {
    it('should set the player isPlaying to false', function () {
      const currentBall = {
        run: 3,
        extras: [],
        batsmanName: "Player 1.1",
        isOut: true
      };
      const initialState = [
        {
          name: TEAM1,
          isBatting: true,
          score: {
            runs: 0,
            wickets: 0,
            overNumber: 0,
            ballNumber: 0,
          },
          players: PLAYER_DETAILS.team1
        },
      ];
      const state = teamsScoreReducer(initialState, {type: CURRENT_BALL_ACTION, data: {currentBall}});
      expect(state[0].players[0].isPlaying).toBeFalsy();
    });
  });

  describe('getTeam', () => {
    it('should return the team which is batting', () => {
      const battingTeam = {
        name: TEAM1,
        isBatting: true,
        score: {
          runs: 0,
          wickets: 0,
          overNumber: 0,
          ballNumber: 0,
        },
        players: PLAYER_DETAILS.team1
      };
      const teams = [
        battingTeam,
      ];
      expect(getTeam(teams, true)).toBe(battingTeam);
    });

    it('should return the team which is bowling', () => {
      const bowlingTeam = {
        name: TEAM1,
        isBatting: false,
        score: {
          runs: 0,
          wickets: 0,
          overNumber: 0,
          ballNumber: 0,
        },
        players: PLAYER_DETAILS.team1
      };
      const teams = [
        bowlingTeam,
      ];
      expect(getTeam(teams, false)).toBe(bowlingTeam);
    });
  });

  describe('Next over action', () => {
    it('should update the over number from 0 to 1 and the ballNumber to 0 when the over end', () => {
      const battingTeam = {
        name: TEAM1,
        isBatting: true,
        score: {
          runs: 0,
          wickets: 0,
          overNumber: 0,
          ballNumber: 6,
        },
        players: PLAYER_DETAILS.team1
      };
      const teams = [
        battingTeam,
      ];
      const expectedState = [
        {
          name: TEAM1,
          isBatting: true,
          score: {
            runs: 0,
            wickets: 0,
            overNumber: 1,
            ballNumber: 0,
          },
          players: PLAYER_DETAILS.team1
        },
      ];
      expect(teamsScoreReducer(teams, {type: NEXT_OVER_ACTION})).toEqual(expectedState);
    });

    it('should update the over number from 3 to 4 and the ballNumber to 0 when the over end', () => {
      const battingTeam = {
        name: TEAM1,
        isBatting: true,
        score: {
          runs: 0,
          wickets: 0,
          overNumber: 3,
          ballNumber: 6,
        },
        players: PLAYER_DETAILS.team1
      };
      const teams = [
        battingTeam,
      ];
      const expectedState = [
        {
          name: TEAM1,
          isBatting: true,
          score: {
            runs: 0,
            wickets: 0,
            overNumber: 4,
            ballNumber: 0,
          },
          players: PLAYER_DETAILS.team1
        },
      ];
      expect(teamsScoreReducer(teams, {type: NEXT_OVER_ACTION})).toEqual(expectedState);
    });
  });

  describe('runsUpdater', () => {
    it('should return the updated runs to be 3', () => {
      const oldRuns = 0;
      const currentBall = {
        run: 3,
        extras: [],
        batsmanName: "Player 1.1",
        isOut: false
      };
      expect(runsUpdater(currentBall)(oldRuns)).toEqual(3);
    });
    it('should return the updated runs to be 5', () => {
      const oldRuns = 2;
      const currentBall = {
        run: 3,
        extras: [],
        batsmanName: "Player 1.1",
        isOut: false
      };
      expect(runsUpdater(currentBall)(oldRuns)).toEqual(5);
    });
  });

  describe('wicketsUpdater', () => {
    it('should return the updated wickets to be 1', () => {
      const oldWickets = 0;
      const currentBall = {
        run: 3,
        extras: [],
        batsmanName: "Player 1.1",
        isOut: true
      };
      expect(wicketsUpdater(currentBall)(oldWickets)).toEqual(1);
    });

    it('should return the updated wickets to be 2', () => {
      const oldWickets = 1;
      const currentBall = {
        run: 3,
        extras: [],
        batsmanName: "Player 1.1",
        isOut: true
      };
      expect(wicketsUpdater(currentBall)(oldWickets)).toEqual(2);
    });
  });

  describe('ballNumberUpdater', () => {
    it('should return the updated ball number to be 1', () => {
      const oldBallNumber = 0;
      const currentBall = {
        run: 3,
        extras: [],
        batsmanName: "Player 1.1",
        isOut: true
      };
      expect(ballNumberUpdater(currentBall)(oldBallNumber)).toEqual(1);
    });

    it('should return the updated ball number to be 2', () => {
      const oldBallNumber = 1;
      const currentBall = {
        run: 3,
        extras: [],
        batsmanName: "Player 1.1",
        isOut: true
      };
      expect(ballNumberUpdater(currentBall)(oldBallNumber)).toEqual(2);
    });
  });

  describe('playersListUpdaterOnWicket', () => {
    it('should return the updated players list to be false for player who is Out', () => {
      const oldPlayers = [
        {
          name: "Player 1.1",
          isPlaying: true
        },
        {
          name: "Player 1.2",
          isPlaying: true
        }];
      const currentBall = {
        run: 3,
        extras: [],
        batsmanName: "Player 1.1",
        isOut: true
      };
      expect(playersListUpdaterOnWicket(currentBall)(oldPlayers)).toEqual([
        {
          name: "Player 1.1",
          isPlaying: false
        },
        {
          name: "Player 1.2",
          isPlaying: true
        }]);
    });

    it('should return the updated ball number to be 2', () => {
      const oldPlayers = [
        {
          name: "Player 1.1",
          isPlaying: true
        },
        {
          name: "Player 1.2",
          isPlaying: true
        }];
      const currentBall = {
        run: 3,
        extras: [],
        batsmanName: "Player 1.2",
        isOut: true
      };
      expect(playersListUpdaterOnWicket(currentBall)(oldPlayers)).toEqual([
        {
          name: "Player 1.1",
          isPlaying: true
        },
        {
          name: "Player 1.2",
          isPlaying: false
        }]);
    });
  });

  describe('yetToPlayBatsmen', () => {
    it('should return the list of players who are yet to bat when team size is 4', () => {
      const outPlayersList = ['Virat', 'Sehwag'];
      const battingTeam = {
        name: TEAM1,
        isBatting: true,
        score: {
          runs: 0,
          wickets: 0,
          overNumber: 4,
          ballNumber: 0,
        },
        players: [
          {
            name: "Virat",
            isPlaying: false
          },
          {
            name: "Sehwag",
            isPlaying: false
          },
          {
            name: "Dhawan",
            isPlaying: false
          },
          {
            name: "Dravid",
            isPlaying: false
          }
        ]
      };
      const yetToPlayBatsmenList = yetToPlayBatsmen(battingTeam, outPlayersList);
      expect(yetToPlayBatsmenList).toEqual([
        {
          name: "Dhawan",
          isPlaying: false
        },
        {
          name: "Dravid",
          isPlaying: false
        }]);
    });

    it('should return the list of players who are yet to bat when team size is 5', () => {
      const outPlayersList = ['Dravid', 'Dhawan'];
      const battingTeam = {
        name: TEAM1,
        isBatting: true,
        score: {
          runs: 0,
          wickets: 0,
          overNumber: 4,
          ballNumber: 0,
        },
        players: [
          {
            name: "Virat",
            isPlaying: false
          },
          {
            name: "Sehwag",
            isPlaying: false
          },
          {
            name: "Dhawan",
            isPlaying: false
          },
          {
            name: "Dravid",
            isPlaying: false
          },
          {
            name: "Rohit",
            isPlaying: true
          }
        ]
      };
      const yetToPlayBatsmenList = yetToPlayBatsmen(battingTeam, outPlayersList);
      expect(yetToPlayBatsmenList).toEqual([
        {
          name: "Virat",
          isPlaying: false
        },
        {
          name: "Sehwag",
          isPlaying: false
        }
      ]);
    });
  });

  describe('getBowlers', () => {
    it('should give the list of bowling team players', () => {
      const teams = [{
        name: TEAM1,
        isBatting: true,
        players: PLAYER_DETAILS.team1
      },
        {
          name: TEAM2,
          isBatting: false,
          players: PLAYER_DETAILS.team2
        }];
      const bowlers = getBowlers(teams);
      expect(bowlers).toEqual(PLAYER_DETAILS.team2);
    });
  });

  describe('playersListUpdaterOnSelection', () => {
    it('should set isPlaying to true for selected player, Player 1.4', () => {
      const players = [
        {
          name: "Player 1.1",
          isPlaying: true
        },
        {
          name: "Player 1.2",
          isPlaying: false
        },
        {
          name: "Player 1.3",
          isPlaying: false
        },
        {
          name: "Player 1.4",
          isPlaying: false
        },];
      const selectedBatsmanName = 'Player 1.4';
      expect(playersListUpdaterOnSelection(selectedBatsmanName)(players)[3].isPlaying).toEqual(true);
    });

    it('should set isPlaying to true for selected player, Player 1.2', () => {
      const players = [
        {
          name: "Player 1.1",
          isPlaying: true
        },
        {
          name: "Player 1.2",
          isPlaying: false
        },
        {
          name: "Player 1.3",
          isPlaying: false
        },
        {
          name: "Player 1.4",
          isPlaying: false
        },];
      const selectedBatsmanName = 'Player 1.2';
      expect(playersListUpdaterOnSelection(selectedBatsmanName)(players)[1].isPlaying).toEqual(true);
    });

  });

  describe('set Batsman Action', () => {
    it('should return state with the updated players list', () => {
      const initialState = [
        {
          name: TEAM1,
          isBatting: true,
          score: {
            runs: 0,
            wickets: 0,
            overNumber: 0,
            ballNumber: 0,
          },
          players: [
            {
              name: "Player 1.1",
              isPlaying: true
            },
            {
              name: "Player 1.2",
              isPlaying: false
            },
            {
              name: "Player 1.3",
              isPlaying: false
            },
            {
              name: "Player 1.4",
              isPlaying: false
            },]
        },
        {
          name: TEAM2,
          isBatting: false,
          score: {
            runs: 0,
            wickets: 0,
            overNumber: 0,
            ballNumber: 0,
          },
          players: [{
            name: "Player 2.1",
            isPlaying: true
          }]
        }
      ];
      const batsmanName = 'Player 1.2';
      const state = teamsScoreReducer(initialState, {type: NEXT_BATSMAN_ACTION, data: {batsmanName}});
      expect(state[0].players[1].isPlaying).toBeTruthy();
    });
  });

  describe('Next Innings Action', () => {
    let initialState;
    beforeEach(() => {
      initialState = [
        {
          name: TEAM1,
          isBatting: true,
          score: {
            runs: 0,
            wickets: 0,
            overNumber: 0,
            ballNumber: 0,
          },
          players: [
            {
              name: "Player 1.1",
              isPlaying: true
            },
            {
              name: "Player 1.2",
              isPlaying: true
            },
            {
              name: "Player 1.3",
              isPlaying: false
            },
            {
              name: "Player 1.4",
              isPlaying: false
            },]
        },
        {
          name: TEAM2,
          isBatting: false,
          score: {
            runs: 0,
            wickets: 0,
            overNumber: 0,
            ballNumber: 0,
          },
          players: [
            {
              name: "Player 2.1",
              isPlaying: false
            },
            {
              name: "Player 2.2",
              isPlaying: false
            },
            {
              name: "Player 2.3",
              isPlaying: false
            }]
        }];
    });

    it('should change the batting team from team1 to team2, and set the batsmen from team2', () => {
      const state = teamsScoreReducer(initialState, SET_NEW_INNINGS);
      expect(state[1].isBatting).toBeTruthy();
      expect(state[0].isBatting).toBeFalsy();
      state[0].players.map((player) => expect(player.isPlaying).toBeFalsy());
      expect(state[1].players[0].isPlaying).toBeTruthy();
      expect(state[1].players[1].isPlaying).toBeTruthy();
      expect(state[1].players[2].isPlaying).toBeFalsy();
    });
  });
});