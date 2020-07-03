import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';


import './styles/bootstrap/bootstrap.scss';

import store from './ducks';

import { App } from './components';

const app = <Provider store={store}> <App /></Provider>;

ReactDOM.render(app, document.getElementById('main-app'));
