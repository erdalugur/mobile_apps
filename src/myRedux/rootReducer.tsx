import { IAction, IAppState, } from './types'


const InitialState: IAppState = {
    user: null,
    balance: 0,
    transactions: []
}

export default function (state: IAppState = InitialState, action: IAction): IAppState {
    return state
}
