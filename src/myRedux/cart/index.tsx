import { IState } from '../types'
import { CartItem } from 'types';
import { InitialState } from 'myRedux/rootReducer';

export function INCREMENT(state: IState = InitialState, payload: string) {
    state.cart.items[payload].quantity++;
    state.cart.items[payload].totalPrice = getPrice(state.cart.items[payload]);
    return { ...state, cart: { ...state.cart } }
}

export function DECREMENT(state: IState = InitialState, payload: string) {
    let q = state.cart.items[payload].quantity
    if (q > 1) {
        state.cart.items[payload].quantity--;
        state.cart.items[payload].totalPrice = getPrice(state.cart.items[payload])
    }
    else
        delete state.cart.items[payload];
    return { ...state, cart: { ...state.cart } }
}

export function ADD_TO_CART(state: IState = InitialState, payload: CartItem) {
    const { ID } = payload;
    if (!state.cart.items[ID])
        payload.quantity = 1;
    else if (state.cart.items[ID])
        payload.quantity++;

    payload.totalPrice = getPrice(payload);
    state.cart.items = { ...state.cart.items, [ID]: { ...payload } };
    return { ...state, cart: { ...state.cart } };
}

export function getPrice(payload: CartItem) {
    let price = payload.quantity * payload.PRICE
    let extras = payload.EXTRAS || []
    extras.filter(x => x.CHECKED).forEach(x => {
        price += (x.PRICE * (x.QUANTITY || 1))
    });
    return price;
}

export function SET_NOTE(
    state: IState = InitialState,
    payload: { note: string, key: string }) {
    state.cart.items[payload.key].NOTES = payload.note
    return { ...state, cart: { ...state.cart } }
}

export function HANDLE_EXTRA(
    state: IState = InitialState,
    payload: { ID: number, QUANTITY: number, key: string }
) {
    const { key, ID, QUANTITY } = payload
    let item = Object.assign({}, state.cart.items[key]);
    let index = item.EXTRAS.findIndex(x => x.ID == ID)
    let extra = Object.assign({}, item.EXTRAS[index]);
    if (extra) {
        if (QUANTITY === 0) {
            item.EXTRAS.splice(index, 1)
        } else {
            extra.QUANTITY = QUANTITY
            extra.TOTAL_PRICE = QUANTITY * extra.PRICE
            item.EXTRAS[index] = { ...extra }
        }
        state.cart.items = Object.assign({}, { ...state.cart.items, [key]: { ...item } });
        return Object.assign({}, { ...state, cart: { ...state.cart } });
    }
    return state
}