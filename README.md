# Cricket Scorer
The latest successful build is deployed [here](https://chetankothari.gitlab.io/helicopter-shot/)

## Pipeline Status
[![pipeline status](https://gitlab.com/chetankothari/helicopter-shot/badges/master/pipeline.svg)](https://gitlab.com/chetankothari/helicopter-shot/commits/master)

## Coverage Report
[![coverage report](https://gitlab.com/chetankothari/helicopter-shot/badges/master/coverage.svg)](https://gitlab.com/chetankothari/helicopter-shot/commits/master)

## Project Details

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

This web app has been designed to run on a mobile phone size screen only. 

It has the following additional notable installations:

 - [Material UI](https://material-ui.com/) - For the UI
 - [Object Path Immutable](https://github.com/mariocasciaro/object-path-immutable) - To allow deep state changes without mutating the existing state.
 

## Directory structure:

<pre>
src /
    common/
        component/
        redux/
    features/
        feature 1/
            components/
            redux/
        feature 2/
            components/
            redux/
            
</pre>

## Object path immutable: 

Allows you to change the state in redux without mutating the existing state. If you look at the overDetailsReducer, there is an example in the comments, which is reproduced here:

__Instead of this horrible unreadable deep clones__
```$javascript 1.6
case NEXT_BALL_BUTTON_CLICKED:
      const currentBall = action.payload.currentBall;
      const numberOfOversPlayed = state.battingTeam.overs.length;
      return {
        ...state,
        battingTeam: {
          ...state.battingTeam,
          overs: [
            ...state.battingTeam.overs.slice(0, numberOfOversPlayed - 2),
            {
              ...state.battingTeam.overs[numberOfOversPlayed - 1],
              balls: [
                ...state.battingTeam.overs[numberOfOversPlayed - 1].balls,
                {...currentBall}
              ]
            }
          ]
        }
      };
```  

__We get this cleaner one liner which does the same thing__
```javascript 1.6
case NEXT_BALL_BUTTON_CLICKED:
      const currentBall = action.payload.currentBall;
      const numberOfOversPlayed = state.battingTeam.overs.length;
      return immutable.push(state,
        `battingTeam.overs.${numberOfOversPlayed - 1}.balls`,
        {...currentBall});

```
