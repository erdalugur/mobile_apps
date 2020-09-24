import { IState } from '../types'
import { CartItem } from 'types';
import { InitialState } from 'myRedux/rootReducer';

export function INCREMENT(state: IState = InitialState, payload: string) {
    let item = state.cart[payload]
    item.quantity++;
    item.totalPrice = getPrice(state.cart[payload]);
    return { ...state, cart: { ...state.cart, [payload]: { ...item } } }
}

export function DECREMENT(state: IState = InitialState, payload: string) {
    let item = state.cart[payload]
    let q = item.quantity
    if (q > 1) {
        item.quantity--;
        item.totalPrice = getPrice(state.cart[payload])
        return { ...state, cart: { ...state.cart, [payload]: { ...item } } }
    }
    else {
        delete state.cart[payload];
        return { ...state, cart: { ...state.cart } }
    }
}

export function ADD_TO_CART(state: IState = InitialState, _payload: CartItem) {
    let payload = Object.assign({}, _payload)
    const { ID } = payload;
    if (!state.cart[ID])
        payload.quantity = 1;
    else if (state.cart[ID])
        payload.quantity++;

    payload.totalPrice = getPrice(payload);
    state.cart = Object.assign({ ...state.cart, [ID]: Object.assign({}, payload) });
    return { ...state, cart: { ...state.cart } };
}

export function getPrice(payload: CartItem) {
    let price = payload.quantity * payload.PRICE
    let extras = Object.keys(payload.EXTRAS || {})
        .filter(x => payload.EXTRAS[x].QUANTITY > 0)
        .map(x => payload.EXTRAS[x])
    extras.forEach(x => {
        price += (x.PRICE * x.QUANTITY)
    });
    return price;
}

export function SET_NOTE(
    state: IState = InitialState,
    payload: { note: string, key: string }) {
    state.cart[payload.key].NOTES = payload.note
    return { ...state, cart: { ...state.cart } }
}

export function HANDLE_EXTRA(
    state: IState = InitialState,
    payload: CartItem
) {
    let item = { ...payload }
    item.totalPrice = getPrice(item);
    return { ...state, cart: { ...state.cart, [payload.ID]: { ...item } } }
}