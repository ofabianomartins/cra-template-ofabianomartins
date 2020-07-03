import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from "redux-thunk"
import promise from "redux-promise"
import { createLogger } from "redux-logger"

import CounterDuck from './CounterDuck';

const reducers = combineReducers({
  [CounterDuck.store]: CounterDuck.reducer
});

const logger = createLogger()
const createStoreWithMiddleware = applyMiddleware(thunk, promise, logger)(createStore);

export default createStoreWithMiddleware(reducers);
