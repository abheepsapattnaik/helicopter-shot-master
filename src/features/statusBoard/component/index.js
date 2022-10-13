import {getEachTeamBattingStats, getBowlingStats} from "../../scorer/redux/overDetailsReducer";
import StatusBoard from "./StatusBoard";
import {connect} from "react-redux";
import {getPlayingBatsmen} from "../../scoreCard/redux/teamsScoreReducer";

const TEAM1 = 'team1';
const TEAM2 = 'team2';

const mapStateToProps = (state) => ({
  team1BattingStats: getEachTeamBattingStats(state.overDetails.team1),
  team2BattingStats: getEachTeamBattingStats(state.overDetails.team2),
  team1BowlingStats: getBowlingStats(state.overDetails, TEAM1),
  team2BowlingStats: getBowlingStats(state.overDetails, TEAM2),
  playingBatsmen: getPlayingBatsmen(state.teams)
});
export default connect(mapStateToProps)(StatusBoard);