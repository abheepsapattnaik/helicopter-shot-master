import immutable from "object-path-immutable";
import PLAYER_DETAILS from './playerDetails';
import {CURRENT_BALL_ACTION, NO_BALL, WIDE} from "../../scorer/redux/currentBallReducer";

export const NEXT_BATSMAN_ACTION = 'NEXT_BATSMAN_ACTION';
export const TEAM1 = "Team 1";
export const TEAM2 = "Team 2";
export const NEXT_OVER_ACTION = "NEXT_OVER_ACTION";
export const NEXT_INNINGS_ACTION = "NEXT_INNINGS_ACTION";

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
];

export const getBowlers = (teams) => (
  teams.find((team) => !team.isBatting).players
);

export const getTeam = (teams, isBatting) =>
  teams.find((team) => isBatting ? team.isBatting : !team.isBatting);

export const getPlayingBatsmen = (teams) => {
  return getTeam(teams, true).players
    .filter((player) => player.isPlaying);
};

export const getTeamName = (teams, isBatting) => {
  return getTeam(teams, isBatting).name.toLowerCase().replace(' ', '');
};

export const isInvalidBall = (extra) => {
  return [WIDE, NO_BALL].includes(extra);
};

export const getTeamIndex = (state, teamName) => {
  return state.findIndex((team) => team.name === teamName);
};

export const runsUpdater = (currentBall) => (oldRuns) => {
  return oldRuns + currentBall.run;
};

export const wicketsUpdater = (currentBall) => (oldWickets) => {
  return oldWickets + (currentBall.isOut ? 1 : 0);
};

export const ballNumberUpdater = (currentBall) => (oldBallNumber) => {
  return oldBallNumber + (currentBall.extras.some(isInvalidBall) ? 0 : 1);
};

export const playersListUpdaterOnWicket = (currentBall) => (oldPlayers) => {
  if (!currentBall.isOut) {
    return oldPlayers;
  }

  return oldPlayers.map((player) => {
    if (player.name === currentBall.batsmanName) {
      return {...player, isPlaying: false};
    }
    return player;
  });
};

const updateEndOfOver = (score) => {
  return {
    ...score,
    ballNumber: 0,
    overNumber: score.overNumber + 1
  }
};

const resetPlayingStatus = (players) => {
  return players.map((player) => ({...player, isPlaying: false}))
};

const assignNextInningsBatsmen = (players) => {
  return players.map((player, index) => index < 2 ? {...player, isPlaying: true} : player)
};

export const yetToPlayBatsmen = (battingTeam, outPlayers) => {
  return battingTeam.players.reduce((accumulator, player) => {
    if (!outPlayers.includes(player.name) && !player.isPlaying) {
      accumulator.push(player);
    }
    return accumulator;
  }, []);
};

export const playersListUpdaterOnSelection = (batsmanName) => (players) => {
  return players.map((player) => {
    if (player.name === batsmanName) {
      player.isPlaying = true;
    }
    return player;
  });
};

export const setNextBatsman = (batsmanName) => ({
  type: NEXT_BATSMAN_ACTION,
  data: {
    batsmanName
  }
});

export const setNewOver = (ball, playingBatsmen) => ({
  type: NEXT_OVER_ACTION,
  data: {
    playingBatsmen, ball
  }
});

export const SET_NEW_INNINGS = {
  type: NEXT_INNINGS_ACTION
};

const teamsScoreReducer = (state = initialState, action) => {
  switch (action.type) {
    case CURRENT_BALL_ACTION: {
      const battingTeam = getTeam(state, true);
      const teamIndex = getTeamIndex(state, battingTeam.name);
      const {currentBall} = action.data;
      return immutable(state)
        .update(`${teamIndex}.score.runs`, runsUpdater(currentBall))
        .update(`${teamIndex}.score.wickets`, wicketsUpdater(currentBall))
        .update(`${teamIndex}.score.ballNumber`, ballNumberUpdater(currentBall))
        .update(`${teamIndex}.players`, playersListUpdaterOnWicket(currentBall))
        .value();
    }

    case NEXT_OVER_ACTION:
      const battingTeam = getTeam(state, true);
      return immutable
        .update(state,
          `${getTeamIndex(state, battingTeam.name)}.score`, updateEndOfOver);

    case NEXT_BATSMAN_ACTION:
      return immutable.update(state,
        `${getTeamIndex(state, getTeam(state, true).name)}.players`,
        playersListUpdaterOnSelection(action.data.batsmanName));

    case NEXT_INNINGS_ACTION:
      const battingTeamIndex = getTeamIndex(state, getTeam(state, true).name);
      const bowlingTeamIndex = getTeamIndex(state, getTeam(state, false).name);
      return immutable(state)
        .set(`${battingTeamIndex}.isBatting`, false)
        .set(`${bowlingTeamIndex}.isBatting`, true)
        .update(`${battingTeamIndex}.players`, resetPlayingStatus)
        .update(`${bowlingTeamIndex}.players`, assignNextInningsBatsmen)
        .value();

    default:
      return state;
  }
};

export default teamsScoreReducer;