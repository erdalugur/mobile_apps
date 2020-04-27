import { IAction, IAppState, } from './types'


const InitialState: IAppState = {
    product: {
        item: null,
        items: []
    },
    cart: {
        items: {}
    },
    campaign: {
        item: null,
        items: []
    },
    category: {
        item: null,
        items: []
    }
}

export default function (state: IAppState = InitialState, action: IAction): IAppState {
    return state
}
