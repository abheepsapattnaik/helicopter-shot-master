import {BY, CURRENT_BALL_ACTION, LEG_BY, NO_BALL, WIDE} from "./currentBallReducer";
import PLAYER_DETAILS from '../../scoreCard/redux/playerDetails';
import immutable from 'object-path-immutable';
import {isInvalidBall} from "../../scoreCard/redux/teamsScoreReducer";

export const NEXT_BOWLER_ACTION = 'NEXT_BOWLER_ACTION';

const INVALID_BALLS_FOR_BATSMAN = [WIDE, NO_BALL, LEG_BY, BY];

const initialState = {
  team1: [
    {
      bowlerName: PLAYER_DETAILS.team2[0].name,
      balls: [],
    }
  ],
  team2: [],
};

const getInvalidBallCount = (balls) => {
  return balls.reduce((accumulator, ball) => {
    accumulator += (ball.extras.some(isInvalidBall) ? 1 : 0);
    return accumulator;
  }, 0);
};

const overContainsRuns = (balls) => {
  return balls.some((ball) => ball.run > 0) ? 0 : 1;
};

const computeRuns = (balls) => {
  return balls.reduce((accumulator, ball) => {
    accumulator += ball.run;
    return accumulator;
  }, 0)
};

const computeOvers = (balls) => {
  const validBallNumber = balls.length - getInvalidBallCount(balls);
  return validBallNumber === 6 ? 1 : validBallNumber / 10;
};

const computeWickets = (balls) => {
  return balls.reduce((accumulator, ball) => {
    accumulator += ball.isOut ? 1 : 0;
    return accumulator;
  }, 0);
};

const isMaidenOver = (balls) => {
  const isOverComplete = computeOvers(balls) === 1;
  return isOverComplete ? overContainsRuns(balls) : 0;
};

export const bowlingStatsMap = (overDetails, teamName) => (
  overDetails[teamName].reduce((accumulator, {bowlerName, balls}) => {
    if (!accumulator[bowlerName]) {
      accumulator[bowlerName] = {
        runs: 0,
        wickets: 0,
        maidens: 0,
        overs: 0
      }
    }
    accumulator[bowlerName].runs += computeRuns(balls);
    accumulator[bowlerName].overs += computeOvers(balls);
    accumulator[bowlerName].wickets += computeWickets(balls);
    accumulator[bowlerName].maidens += isMaidenOver(balls);
    return accumulator;
  }, {})
);

export const getBowlingStats = (overDetails, teamName) => {
  const result = bowlingStatsMap(overDetails, teamName);
  return Object.keys(result).reduce((accumulator, bowlerName) => {
    accumulator = [...accumulator,
      {
        bowlerName: bowlerName,
        runs: result[bowlerName].runs,
        wickets: result[bowlerName].wickets,
        maidens: result[bowlerName].maidens,
        overs: result[bowlerName].overs
      }];
    return accumulator;
  }, []);
};

export const playBall = (currentBall, teamName, playingBatsmen) => ({
  type: CURRENT_BALL_ACTION,
  data: {
    currentBall, teamName, playingBatsmen
  }
});

export const setNextOverBowler = (bowlerName, teamName) => ({
  type: NEXT_BOWLER_ACTION,
  data: {
    bowlerName,
    teamName
  }
});


export const outBatsmen = (state, battingTeamName) => {
  return state[battingTeamName].reduce((accumulator, over) => {
    return [...accumulator, ...over.balls.reduce((anOverAccumulator, ball) => {
      if (ball.isOut) {
        anOverAccumulator.push(ball.batsmanName);
      }
      return anOverAccumulator
    }, [])];
  }, []);
};

export const getEachTeamBattingStats = (team) => {
  let teamBattingStats = [];
  team.map((over) =>
    over.balls.map((ball) =>
      teamBattingStats = updateBatsmanStats(teamBattingStats, ball)
    )
  );
  return teamBattingStats;
};

export const isInvalidBallForBatsman = (extra) => {
  return INVALID_BALLS_FOR_BATSMAN.includes(extra);
};

export const ballPlayed = (ball) => {
  return (ball.extras.some(isInvalidBallForBatsman) ? 0 : 1);
};

export const runsScored = (ball) => {
  return ball.extras.length > 0 ? 0 : ball.run;
};

export const fourPlayed = (ball) => {
  return ball.run === 4 ? 1 : 0;
};

export const sixPlayed = (ball) => {
  return ball.run === 6 ? 1 : 0;
};

export const strikeRate = (batsmanStats, ball) => {
  const batsmanStrikeRate = (batsmanStats.runs + runsScored(ball)) / (batsmanStats.balls + ballPlayed(ball)) * 100;
  return batsmanStrikeRate ? parseInt(batsmanStrikeRate.toFixed(0)) : 0;
};

export const batsmanStatsIndex = (teamBattingStats, ball) => {
  return teamBattingStats.findIndex((eachBatsman) =>
    eachBatsman.name === ball.batsmanName
  )
};

export const updateBatsmanStats = (teamBattingStats, ball) => {
  let batsmanIndex = batsmanStatsIndex(teamBattingStats, ball);
  if (batsmanIndex < 0) {
    teamBattingStats.push({
      name: ball.batsmanName,
      runs: 0,
      balls: 0,
      fours: 0,
      sixes: 0,
      strikeRate: 0
    });
    batsmanIndex = batsmanStatsIndex(teamBattingStats, ball);
  }
  teamBattingStats[batsmanIndex] = {
    ...teamBattingStats[batsmanIndex],
    runs: teamBattingStats[batsmanIndex].runs + runsScored(ball),
    balls: teamBattingStats[batsmanIndex].balls + ballPlayed(ball),
    fours: teamBattingStats[batsmanIndex].fours + fourPlayed(ball),
    sixes: teamBattingStats[batsmanIndex].sixes + sixPlayed(ball),
    strikeRate: strikeRate(teamBattingStats[batsmanIndex], ball)
  };
  return teamBattingStats
};

const overDetailsReducer = (state = initialState, action) => {
  switch (action.type) {
    case CURRENT_BALL_ACTION:
      const {teamName, currentBall} = action.data;
      const numberOfOversPlayed = state[teamName].length;
      return immutable.push(state,
        `${teamName}.${numberOfOversPlayed - 1}.balls`,
        {...currentBall});

    case NEXT_BOWLER_ACTION:
      return immutable.push(state, `${action.data.teamName}`, {
        bowlerName: action.data.bowlerName,
        balls: []
      });

    default:
      return state;
  }
};

export default overDetailsReducer;