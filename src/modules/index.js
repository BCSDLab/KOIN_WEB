import { combineReducers } from 'redux';
import authReducer from './auth';
import circleReducer from './circle';
import cafeteriaMenuReducer from "./cafeteriaMenu";

const rootReducer = combineReducers({
  authReducer,
  circleReducer,
  cafeteriaMenuReducer
});

export default rootReducer;
