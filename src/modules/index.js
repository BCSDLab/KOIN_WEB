import { combineReducers } from 'redux';
import authReducer from './auth';
import circleReducer from './circle';
import roomReducer from './room';

const rootReducer = combineReducers({
  authReducer,
  circleReducer,
  roomReducer
});

export default rootReducer;