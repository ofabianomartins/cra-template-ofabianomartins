import { combineReducers } from "redux";

import CounterDuck from './ducks/CounterDuck';

export default combineReducers({
  [CounterDuck.store]: CounterDuck.reducer
});
