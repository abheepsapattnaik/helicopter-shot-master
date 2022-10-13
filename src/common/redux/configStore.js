import rootReducer from './rootReducer';
import {applyMiddleware, createStore} from 'redux';
import {createLogger} from 'redux-logger';
import {composeWithDevTools} from 'redux-devtools-extension';
import {interceptNextBall} from "../../features/scorer/redux/interceptNextBallMiddleware";

export default function configStore() {
  let storeEnhancer = undefined;
  if (process.env.NODE_ENV !== 'PRODUCTION') {
    storeEnhancer = composeWithDevTools(
      applyMiddleware(
        createLogger({collapsed: true}),
        interceptNextBall)
    )
  }

  return createStore(rootReducer, storeEnhancer);
}
