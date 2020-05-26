import { IAction, IState, actionTypes } from './types'
import { CartItem } from 'types';


const InitialState: IState = getInitialState({});

export default function (state: IState = InitialState, action: IAction): IState {
    switch (action.type) {
        case actionTypes.FETCH_ALL:
            return { ...state, menu: { ...action.payload } }
        case actionTypes.SET_TOKEN:
            return SET_TOKEN(state, action.payload);
        case actionTypes.ADD_TO_CART:
            return ADD_TO_CART(state, action.payload);
        case actionTypes.INCREMENT:
            return INCREMENT(state, action.payload);
        case actionTypes.DECREMENT:
            return DECREMENT(state, action.payload);
        default:
            return state
    }
}

function INCREMENT(state: IState = InitialState, payload: string) {
    state.cart.items[payload].quantity++;
    state.cart.items[payload].totalPrice = state.cart.items[payload].quantity * state.cart.items[payload].PRICE
    return { ...state, cart: { ...state.cart } }
}

function DECREMENT(state: IState = InitialState, payload: string) {
    let q = state.cart.items[payload].quantity
    if (q > 1) {
        state.cart.items[payload].quantity--;
        state.cart.items[payload].totalPrice = state.cart.items[payload].quantity * state.cart.items[payload].PRICE

    }
    else
        delete state.cart.items[payload];
    return { ...state, cart: { ...state.cart } }
}

function SET_TOKEN(state: IState = InitialState, payload: string) {
    return { ...state, token: payload };
}

function ADD_TO_CART(state: IState = InitialState, payload: CartItem) {
    const { ID } = payload;
    if (!state.cart.items[ID])
        payload.quantity = 1;
    else if (state.cart.items[ID])
        payload.quantity++;

    payload.totalPrice = payload.quantity * payload.PRICE;
    state.cart.items[ID] = payload;
    return { ...state };
}

export function getInitialState(__data__: any): IState {
    return {
        user: __data__.USER || null,
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
        },
        menu: {
            domain: __data__.DOMAIN && JSON.parse(__data__.DOMAIN) || {},
            tree: __data__.JSON && JSON.parse(__data__.JSON) || [],
            status: "fetching"
        }
    }
}