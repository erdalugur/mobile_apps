import { IAction, IState, } from './types'
import { Product, CartItem } from 'types';


const InitialState: IState = {
    token: "",
    user: null,
    campaign: {
        item: null,
        items: []
    },
    cart: {
        item: null,
        items: {}
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
        case "ADD_TO_CART":
            return addToCart(state, action.payload);
        default:
            return state
    }
}

function setToken(state: IState = InitialState, payload: string) {
    return { ...state, token: payload };
}

function addToCart(state: IState = InitialState, payload: CartItem) {
    const { ID } = payload;
    if (!state.cart.items[ID])
        payload.quantity = 1;
    else if (state.cart.items[ID])
        payload.quantity++;

    payload.totalPrice = payload.quantity * payload.PRICE;
    state.cart.items[ID] = payload;
    return { ...state };
}

