import React from 'react';
import ReactDOM from 'react-dom';

import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';

import './styles/bootstrap/bootstrap.scss';

import reducers from './reducers';

import MainApp from './components/MainApp/MainApp.jsx';

const store = createStore(reducers, applyMiddleware(thunk));

const app = <Provider store={store}> <MainApp /></Provider>;

ReactDOM.render(app, document.getElementById('main-app'));


