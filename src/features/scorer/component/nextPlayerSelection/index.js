import {connect} from "react-redux";
import {NextPlayerSelection} from "./NextPlayerSelection";
import {
  getBowlers,
  getTeam,
  getTeamName,
  setNextBatsman,
  yetToPlayBatsmen
} from "../../../scoreCard/redux/teamsScoreReducer";
import {outBatsmen, setNextOverBowler} from "../../redux/overDetailsReducer";

const mapPropsToState = (state) => ({
  bowlerSelection: state.playersSelection.bowlerSelection,
  batsmanSelection: state.playersSelection.batsmanSelection,
  batsmen: yetToPlayBatsmen(
    getTeam(state.teams, true),
    outBatsmen(
      state.overDetails,
      getTeamName(state.teams, true))),
  bowlers: getBowlers(state.teams),
  battingTeamName: getTeamName(state.teams, true),
});

const mapDispatchToProps = (dispatch) => ({
  onBatsmanSelection: (batsmanName) => dispatch(setNextBatsman(batsmanName)),
  onBowlerSelection: (bowlerName, teamName) => dispatch(setNextOverBowler(bowlerName, teamName)),
});

export default connect(mapPropsToState, mapDispatchToProps)(NextPlayerSelection)