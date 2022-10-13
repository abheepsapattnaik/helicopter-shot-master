import {connect} from "react-redux";
import {compose} from "redux";
import {withStyles} from "@material-ui/core";
import {ScoreCard} from "./ScoreCard";
import {getMaxOvers} from "../../gameSetup/redux/gameSetupReducer";

const styles = theme => ({
  container: {
    marginTop: theme.spacing.unit,
    padding: theme.spacing.unit * 1
  }
});

const mapStateToPropsForConnectedScoreCard = (state) => ({
  teams: state.teams,
  maxOvers: getMaxOvers(state.gameSetup)
});

export default compose(withStyles(styles), connect(mapStateToPropsForConnectedScoreCard))(ScoreCard);