import {connect} from "react-redux";
import {compose} from "redux";
import {withStyles} from "@material-ui/core";
import {CurrentOver} from "./CurrentOver";

const styles = theme => ({
  container: {
    padding: theme.spacing.unit * 1
  }
});

const mapStateToPropsForConnectedCurrentOver = (state) => ({
    overDetails: state.overDetails
  }
);
export default compose(withStyles(styles), connect(mapStateToPropsForConnectedCurrentOver))(CurrentOver);