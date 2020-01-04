import { combineReducers } from 'redux';
import authReducer from './auth';
import circleReducer from './circle';

const rootReducer = combineReducers({
  authReducer,
  circleReducer
});

export default rootReducer;