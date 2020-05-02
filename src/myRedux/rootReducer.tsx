import { IAction, IState, } from './types'


const InitialState: IState = {
    token: "",
    user: null,
    campaign: {
        item: null,
        items: []
    },
    cart: {
        item: null,
        items: []
    },
    product: {
        item: null,
        items: []
    },
    category: {
        item: null,
        items: []
    }
}

export default function (state: IState = InitialState, action: IAction): IState {
    switch (action.type) {
        case "SET_TOKEN":
            return setToken(state, action.payload);
        default:
            return state
    }
}

function setToken(state: IState = InitialState, payload: string) {
    return { ...state, token: payload };
}
