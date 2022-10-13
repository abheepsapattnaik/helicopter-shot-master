import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import App from './common/component/App';
import configStore from './common/redux/configStore';

const store = configStore();

const Root = () => (
  <Provider store={store}>
    <App/>
  </Provider>
);

ReactDOM.render(<Root/>, document.getElementById('root'));