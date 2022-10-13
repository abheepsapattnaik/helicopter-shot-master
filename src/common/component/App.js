import React from 'react';
import {HashRouter, Route, Switch} from 'react-router-dom';
import {createMuiTheme} from '@material-ui/core/styles';
import ScoringPage from "../../displays/component/ScoringPage";
import MatchStats from "../../displays/component/MatchStats";
import MuiThemeProvider from "@material-ui/core/styles/MuiThemeProvider";

const theme = createMuiTheme({
    palette: {
      secondary: {
        main: '#C62828'
      }
    },
  })
;

const App = () => (
  <MuiThemeProvider theme={theme}>
    <HashRouter>
      <Switch>
        <Route exact path="/" component={ScoringPage}/>
        <Route exact path="/matchStats" component={MatchStats}/>
      </Switch>
    </HashRouter>
  </MuiThemeProvider>
);

export default App;