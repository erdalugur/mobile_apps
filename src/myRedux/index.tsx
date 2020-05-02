import { combineReducers, createStore } from 'redux'
import root from './rootReducer'
export { IState } from './types'

export const reducers = combineReducers({
    app: root
});

export type AppState = ReturnType<typeof reducers>;

export const store = createStore(reducers);