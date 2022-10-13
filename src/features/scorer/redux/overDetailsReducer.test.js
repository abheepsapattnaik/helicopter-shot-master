import overDetailsReducer, {
  bowlingStatsMap,
  getBowlingStats,
   ballPlayed, fourPlayed,
   getEachTeamBattingStats,
  outBatsmen,
  playBall, runsScored,
  setNextOverBowler, sixPlayed, updateBatsmanStats
} from "./overDetailsReducer";
import {BY, LEG_BY, NO_BALL, WIDE} from "./currentBallReducer";
import PLAYER_DETAILS from "../../scoreCard/redux/playerDetails";

describe('overDetailsReducer', () => {
  describe('initial action', () => {
    it('should return the initial state of the reducer when action is undefined', () => {
      const state = overDetailsReducer(undefined, "initialAction");
      expect(state).toEqual({
        team1: [
          {
            bowlerName: 'Player 2.1',
            balls: [],
          }
        ],
        team2: [],
      });
    });
  });

  describe('currentBallAction', () => {
    it('should add a new ball to the state  when action is CURRENT_BALL_ACTION', () => {
      const currentBall = {
        run: 2,
        extras: [],
        batsmanName: 'Virat'
      };
      const state = overDetailsReducer(undefined, playBall(currentBall, 'team1'));
      expect(state).toEqual({
        team1: [
          {
            bowlerName: 'Player 2.1',
            balls: [currentBall],
          }
        ],
        team2: [],
      });
    });
  });

  describe('nextBowlerAction', () => {
    it('should add new bowler name in the batting team details', () => {
      const oldState = {
        team1: [
          {
            bowlerName: PLAYER_DETAILS.team2[0].name,
            balls: [],
          }
        ],
        team2: [],
      };
      const newState = {
        team1: [
          {
            bowlerName: PLAYER_DETAILS.team2[0].name,
            balls: [],
          },
          {
            bowlerName: PLAYER_DETAILS.team2[1].name,
            balls: []
          }
        ],
        team2: [],
      };
      const bowlerName = PLAYER_DETAILS.team2[1].name;
      const teamName = 'team1';
      const state = overDetailsReducer(oldState, setNextOverBowler(bowlerName, teamName));
      expect(state).toEqual(newState);
    });
  });

  describe('outBatsmen', () => {
    it('should return list of out batsmen in an over', () => {
      const oldState = {
        team1: [
          {
            bowlerName: 'Player 2.1',
            balls: [
              {
                run: 3,
                extras: [],
                batsmanName: 'Virat',
                isOut: false
              },
              {
                run: 1,
                extras: [],
                batsmanName: 'Sehwag',
                isOut: true
              },
              {
                run: 1,
                extras: [],
                batsmanName: 'Virat',
                isOut: true
              }
            ],
          }
        ],
        team2: [],
      };
      const battingTeamName = 'team1';
      const outBatsmenList = outBatsmen(oldState, battingTeamName);
      expect(outBatsmenList).toEqual(['Sehwag', 'Virat']);
    });

    it('should return list of out batsmen in current inning', () => {
      const oldState = {
        team1: [
          {
            bowlerName: 'Player 2.1',
            balls: [
              {
                run: 3,
                extras: [],
                batsmanName: 'Virat',
                isOut: false
              },
              {
                run: 1,
                extras: [],
                batsmanName: 'Sehwag',
                isOut: true
              },
              {
                run: 1,
                extras: [],
                batsmanName: 'Virat',
                isOut: true
              }
            ],
          },
          {
            bowlerName: 'Player 2.2',
            balls: [
              {
                run: 3,
                extras: [],
                batsmanName: 'Dravid',
                isOut: false
              },
              {
                run: 1,
                extras: [],
                batsmanName: 'Rohit',
                isOut: true
              },
              {
                run: 1,
                extras: [],
                batsmanName: 'Dhawan',
                isOut: true
              }
            ],
          }
        ],
        team2: [],
      };
      const battingTeamName = 'team1';
      const outBatsmenList = outBatsmen(oldState, battingTeamName);
      expect(outBatsmenList).toEqual(['Sehwag', 'Virat', 'Rohit', 'Dhawan']);
    });
  });

  describe('bowlingStatsMap', () => {
    let over1, over2;
    beforeEach(() => {
      over1 = {
        bowlerName: 'Player 2.1',
        balls: [
          {
            run: 1,
            extras: [],
            batsmanName: 'Player 1.1'
          },
          {
            run: 2,
            extras: [],
            batsmanName: 'Player 1.1'
          },
          {
            run: 3,
            extras: [],
            batsmanName: 'Player 1.1'
          },
          {
            run: 4,
            extras: [],
            batsmanName: 'Player 1.1'
          },
          {
            run: 5,
            extras: [],
            batsmanName: 'Player 1.1'
          },
          {
            run: 6,
            extras: [],
            batsmanName: 'Player 1.1'
          },
        ],
      };
      over2 = {
        bowlerName: 'Player 2.2',
        balls: [
          {
            run: 1,
            extras: [],
            batsmanName: 'Player 1.1'
          },
          {
            run: 2,
            extras: [],
            batsmanName: 'Player 1.1'
          },
          {
            run: 3,
            extras: [],
            batsmanName: 'Player 1.1'
          },
        ]
      };
    });

    it('should return bowler stats with runs, maidens, overs and wickets', () => {
      const overDetails = {
        team1: [over1],
      };
      const bowlersStats = {
        'Player 2.1': {
          runs: 21,
          maidens: 0,
          overs: 1,
          wickets: 0
        }
      };
      expect(bowlingStatsMap(overDetails, 'team1')).toEqual(bowlersStats);
    });

    it('should return bowling stats when the ball number is 2 for the current over', () => {
      const overDetails = {
        team1: [over1, over2]
      };
      const bowlersStats = {
        'Player 2.1': {
          runs: 21,
          maidens: 0,
          overs: 1,
          wickets: 0
        },
        'Player 2.2': {
          runs: 6,
          wickets: 0,
          overs: 0.3,
          maidens: 0
        }
      };
      expect(bowlingStatsMap(overDetails, 'team1')).toEqual(bowlersStats);
    });

    it('should return bowling stats when the over contains extras', () => {
      over2.balls[0].extras = [NO_BALL];
      over2.balls[1].extras = [LEG_BY];
      const overDetails = {
        team1: [over1, over2]
      };
      const bowlersStats = {
        'Player 2.1': {
          runs: 21,
          maidens: 0,
          overs: 1,
          wickets: 0
        },
        'Player 2.2': {
          runs: 6,
          wickets: 0,
          overs: 0.2,
          maidens: 0
        }
      };
      expect(bowlingStatsMap(overDetails, 'team1')).toEqual(bowlersStats);
    });

    it('should return bowling stats when a wicket is taken in an over', () => {
      over2.balls[0].isOut = true;
      over2.balls[0].extras = [NO_BALL];
      const overDetails = {
        team1: [over1, over2]
      };
      const bowlersStats = {
        'Player 2.1': {
          runs: 21,
          maidens: 0,
          overs: 1,
          wickets: 0
        },
        'Player 2.2': {
          runs: 6,
          wickets: 1,
          overs: 0.2,
          maidens: 0
        }
      };
      expect(bowlingStatsMap(overDetails, 'team1')).toEqual(bowlersStats);
    });

    it('should return bowling stats when the over is maiden over', () => {
      over1.balls = over1.balls.map((ball) => ({...ball, run: 0}));
      over2.balls = over2.balls.map((ball) => ({...ball, run: 0}));
      over1.balls[0].isOut = true;
      const overDetails = {
        team1: [over1, over2]
      };
      const bowlersStats = {
        'Player 2.1': {
          runs: 0,
          maidens: 1,
          overs: 1,
          wickets: 1
        },
        'Player 2.2': {
          runs: 0,
          wickets: 0,
          overs: 0.3,
          maidens: 0
        }
      };
      expect(bowlingStatsMap(overDetails, 'team1')).toEqual(bowlersStats);
    });

    it('should return bowling stats when the same bowler bowls again', () => {
      const over3 = {...over1};
      over1.balls = over1.balls.map((ball) => ({...ball, run: 0}));
      const overDetails = {
        team1: [over1, over2, over3]
      };
      over3.balls[0].isOut = true;
      const bowlersStats = {
        'Player 2.1': {
          runs: 21,
          maidens: 1,
          overs: 2,
          wickets: 1
        },
        'Player 2.2': {
          runs: 6,
          wickets: 0,
          overs: 0.3,
          maidens: 0
        }
      };
      expect(bowlingStatsMap(overDetails, 'team1')).toEqual(bowlersStats);
    });
  });

  describe('getBowlingStats', () => {
    let over1, over2;
    beforeEach(() => {
      over1 = {
        bowlerName: 'Player 2.1',
        balls: [
          {
            run: 1,
            extras: [],
            batsmanName: 'Player 1.1'
          },
          {
            run: 2,
            extras: [],
            batsmanName: 'Player 1.1'
          },
          {
            run: 3,
            extras: [],
            batsmanName: 'Player 1.1'
          },
          {
            run: 4,
            extras: [],
            batsmanName: 'Player 1.1'
          },
          {
            run: 5,
            extras: [],
            batsmanName: 'Player 1.1'
          },
          {
            run: 6,
            extras: [],
            batsmanName: 'Player 1.1'
          },
        ],
      };
      over2 = {
        bowlerName: 'Player 2.2',
        balls: [
          {
            run: 1,
            extras: [],
            batsmanName: 'Player 1.1'
          },
          {
            run: 2,
            extras: [],
            batsmanName: 'Player 1.1'
          },
          {
            run: 3,
            extras: [],
            batsmanName: 'Player 1.1'
          },
        ]
      };
    });
    it('should return the list of objects from object', () => {
      const overDetails = {
        team1: [over1, over2]
      };
      const expectedBowlerStats = [
        {
          bowlerName: 'Player 2.1',
          runs: 21,
          maidens: 0,
          overs: 1,
          wickets: 0
        },
        {
          bowlerName: 'Player 2.2',
          runs: 6,
          wickets: 0,
          overs: 0.3,
          maidens: 0
        }
      ];
      const bowlersStats = getBowlingStats(overDetails, 'team1');
      expect(bowlersStats).toEqual(expectedBowlerStats);
    });
  });

  describe('updateBatsmanStats', () => {
    it('should return the playerStats', () => {
      const balls = {
        run: 3,
        extras: [],
        batsmanName: 'Virat',
        isOut: false
      };
      const battingStats = [];
      const result = updateBatsmanStats(battingStats, balls);
      expect(result).toEqual([{
        name: 'Virat',
        balls: 1,
        fours: 0,
        runs: 3,
        sixes: 0,
        strikeRate:300
      }]);
    });

    it('should return the playerStats', () => {
      const balls = {
        run: 4,
        extras: [],
        batsmanName: 'Virat',
        isOut: false
      };
      const battingStats = [
        {
          name: 'Virat',
          balls: 1,
          fours: 0,
          runs: 3,
          sixes: 0,
        }
      ];
      const result = updateBatsmanStats(battingStats, balls);
      expect(result).toEqual([{
        name: 'Virat',
        balls: 2,
        fours: 1,
        runs: 7,
        sixes: 0,
        strikeRate:350
      }]);
    });
    it('should not add runs for wide and noball runs to batsman run', () => {
      const balls = {
        run: 4,
        extras: [WIDE],
        batsmanName: 'Virat',
        isOut: false,
      };
      const battingStats = [
        {
          name: 'Virat',
          balls: 1,
          fours: 0,
          runs: 3,
          sixes: 0,
        }
      ];
      const result = updateBatsmanStats(battingStats, balls);
      expect(result).toEqual([{
        name: 'Virat',
        balls: 1,
        fours: 1,
        runs: 3,
        sixes: 0,
        strikeRate:300
      }]);
    });
  });

  describe('getEachTeamBattingStats', () => {
    it('should return the battingStats of a team', () => {
      const team = [
        {
          bowlerName: 'Player 2.1',
          balls: [
            {
              run: 3,
              extras: [],
              batsmanName: 'Virat',
              isOut: false
            },
            {
              run: 1,
              extras: [],
              batsmanName: 'Virat',
              isOut: true
            }
          ],
        },
        {
          bowlerName: 'Player 2.2',
          balls: [
            {
              run: 4,
              extras: [],
              batsmanName: 'Dravid',
              isOut: false
            },
            {
              run: 2,
              extras: [],
              batsmanName: 'Dravid',
              isOut: false
            }
          ]
        }
      ];
      const teamStats = getEachTeamBattingStats(team);
      expect(teamStats).toEqual([
        {
          name: 'Virat',
          balls: 2,
          fours: 0,
          runs: 4,
          sixes: 0,
          strikeRate:200
        },
        {
          name: 'Dravid',
          balls: 2,
          fours: 1,
          runs: 6,
          sixes: 0,
          strikeRate:300
        },
      ])
      ;
    });
  });

  describe('ballPlayed', function () {
    it('should return 1 when extras field of ball does not have no ball', function () {
      const ball = {
        run: 2,
        extras: [WIDE],
        batsmanName: 'Virat',
        isOut: false
      };
      expect(ballPlayed(ball)).toBe(0);
    });

    it('should return 0 when extras field of ball have no ball and by', function () {
      const ball = {
        run: 2,
        extras: [NO_BALL, BY],
        batsmanName: 'Virat',
        isOut: false
      };
      expect(ballPlayed(ball)).toBe(0);
    });
  });

  describe('runsScored', function () {
    it('should not score if there are extras', function () {
      const ball = {
        run: 2,
        extras: [WIDE, NO_BALL],
        batsmanName: 'Virat',
        isOut: false
      };
      expect(runsScored(ball)).toBe(0);
    });

    it('should score runs if there is no extra', function () {
      const ball = {
        run: 2,
        extras: [],
        batsmanName: 'Virat',
        isOut: false
      };
      expect(runsScored(ball)).toBe(2);
    });
  });

  describe('fourPlayed', function () {
    it('should return 1 if there is a four hit', function () {
      const ball = {
        run: 4,
        extras: [],
        batsmanName: 'Virat',
        isOut: false
      };
      expect(fourPlayed(ball)).toBe(1);
    });

    it('should return 0 if runs scored is not 4', function () {
      const ball = {
        run: 2,
        extras: [],
        batsmanName: 'Virat',
        isOut: false
      };
      expect(fourPlayed(ball)).toBe(0);
    });
  });

  describe('sixPlayed', function () {
    it('should return 1 if there is a six hit', function () {
      const ball = {
        run: 6,
        extras: [],
        batsmanName: 'Virat',
        isOut: false
      };
      expect(sixPlayed(ball)).toBe(1);
    });

    it('should return 0 if runs scored is not 6', function () {
      const ball = {
        run: 2,
        extras: [],
        batsmanName: 'Virat',
        isOut: false
      };
      expect(sixPlayed(ball)).toBe(0);
    });
  });
});