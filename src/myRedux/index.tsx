import { combineReducers, createStore } from 'redux'
import root from './rootReducer'
export { IAppState } from './types'

export const reducers = combineReducers({
    app: root
});

export const store = createStore(reducers);