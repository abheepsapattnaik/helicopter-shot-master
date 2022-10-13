import React, {Component} from 'react';
import SwipeableViews from 'react-swipeable-views';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from "@material-ui/core/Typography";
import {withStyles} from "@material-ui/core/styles";
import TeamStats from "./TeamStats";

const INNINGS1 = 'FIRST INNINGS';
const INNINGS2 = 'SECOND INNINGS';
export const TabContainer = ({children, dir}) => {
  return (
    <Typography component="div" dir={dir}>
      {children}
    </Typography>
  );
};

const styles = () => ({});

export class TeamTabs extends Component {

  constructor(props) {
    super(props);
    this.state = {
      value: 0
    }
  }

  handleChange = (event, value) => {
    this.setState({value});
  };

  handleChangeIndex = index => {
    this.setState({value: index});
  };

  render() {
    const {
      theme, team1BowlingStats, team2BowlingStats,
      team1BattingStats, team2BattingStats, playingBatsmen
    } = this.props;
    const {value} = this.state;
    return (
      <div>
        <AppBar position="static" color="default">
          <Tabs
            value={value}
            onChange={this.handleChange}
            indicatorColor="primary"
            textColor="primary"
            fullWidth
          >
            <Tab label={INNINGS1}/>
            <Tab label={INNINGS2}/>
          </Tabs>
        </AppBar>
        <SwipeableViews
          axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
          index={value}
          onChangeIndex={this.handleChangeIndex}
        >
          <TabContainer dir={theme.direction}>
            <TeamStats bowlingStats={team1BowlingStats} battingStats={team1BattingStats}
                       playingBatsmen={playingBatsmen}/>
          </TabContainer>
          <TabContainer dir={theme.direction}>
            <TeamStats bowlingStats={team2BowlingStats} battingStats={team2BattingStats}
                       playingBatsmen={playingBatsmen}/>
          </TabContainer>
        </SwipeableViews>
      </div>
    );
  }
}

export default withStyles(styles, {withTheme: true})(TeamTabs);