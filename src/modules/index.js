import { combineReducers } from 'redux';
import authReducer from './auth';
import faqReducer from "./faq";

const rootReducer = combineReducers({
  authReducer,
  faqReducer
});

export default rootReducer;
