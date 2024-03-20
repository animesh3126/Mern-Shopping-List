import { combineReducers } from 'redux';
import itemReducer from './itemReducer';
// import your reducers here

export default combineReducers({
  item: itemReducer
});