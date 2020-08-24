import auth from './login.reducer';
import { combineReducers } from 'redux';

const createReducer = asyncReducers =>
	combineReducers({
		auth,
		...asyncReducers
	});

export default createReducer;
