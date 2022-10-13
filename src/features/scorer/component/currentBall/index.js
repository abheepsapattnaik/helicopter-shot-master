import {connect} from "react-redux";
import {compose} from "redux";
import {withStyles} from '@material-ui/core/styles';
import {playBall} from "../../redux/overDetailsReducer";
import {getTeamName, getPlayingBatsmen} from "../../../scoreCard/redux/teamsScoreReducer";
import {
  assignStrikerAction,
  extraScoredAction,
  runStoredAction,
  wicketTakenAction
} from "../../redux/currentBallReducer";
import {CurrentBall} from "./CurrentBall";

const styles = theme => ({
  container: {
    marginTop: theme.spacing.unit,
    padding: theme.spacing.unit * 1
  },
  button: {
    margin: theme.spacing.unit,
    padding: theme.spacing.unit
  },
  nextBall: {
    display: 'flex',
    justifyContent:'center'
  }
});

const mapStateToProps = (state) => ({
  currentBall: state.currentBall,
  teamName: getTeamName(state.teams, true),
  players: getPlayingBatsmen(state.teams),
});

const mapDispatchToProps = (dispatch) => ({
  wicketTaken: () => dispatch(wicketTakenAction()),
  playBall: (currentBall, teamName, players) => dispatch(playBall(currentBall, teamName, players)),
  assignBatsman: (name) => dispatch(assignStrikerAction(name)),
  scoreUpdater: (runs) => dispatch(runStoredAction(runs)),
  extraScoreUpdater: (extra) => dispatch(extraScoredAction(extra))
});

export default compose(withStyles(styles), connect(mapStateToProps, mapDispatchToProps))(CurrentBall);