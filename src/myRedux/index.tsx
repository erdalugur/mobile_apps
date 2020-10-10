import { combineReducers, createStore } from 'redux'
import root from './rootReducer'
import { IAction } from './types';
import { userReducer } from './user';
export { IState } from './types'


export const reducers = combineReducers({
    app: root,
    user: userReducer
});

export type AppState = ReturnType<typeof reducers>;

export const store = createStore(reducers);