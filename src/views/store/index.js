import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import createReducer from './reducers';

const store = createStore(createReducer(), applyMiddleware(thunk));

store.asyncReducers = {};

export default store;
