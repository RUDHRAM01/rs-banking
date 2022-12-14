import {combineReducers} from 'redux';
import appSlice from './appSlice';
import signSlice from './frontend/signSlice';
import transactionSlice from './frontend/transactionSlice';
export default combineReducers(
  {
  'applications': appSlice,
  'signIn': signSlice,
  'transaction':transactionSlice,
  },
);