import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

import { authReducer } from '../Reducers/authReducer';
import { taskReducer } from '../Reducers/taskReducer';

const composeEnhancers = (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

const reducers = combineReducers({
  auth: authReducer,
  tasks: taskReducer
});

export const store = createStore(
  reducers,
  composeEnhancers(applyMiddleware(thunk))
);