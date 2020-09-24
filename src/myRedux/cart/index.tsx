import { IState } from '../types'
import { CartItem } from 'types';
import { InitialState } from 'myRedux/rootReducer';

export function INCREMENT(state: IState = InitialState, payload: string) {
    state.cart[payload].quantity++;
    state.cart[payload].totalPrice = getPrice(state.cart[payload]);
    return { ...state, cart: { ...state.cart } }
}

export function DECREMENT(state: IState = InitialState, payload: string) {
    let q = state.cart[payload].quantity
    if (q > 1) {
        state.cart[payload].quantity--;
        state.cart[payload].totalPrice = getPrice(state.cart[payload])
    }
    else
        delete state.cart[payload];
    return { ...state, cart: { ...state.cart } }
}

export function ADD_TO_CART(state: IState = InitialState, _payload: CartItem) {
    let payload = { ..._payload }
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
    let extras = payload.EXTRAS || []
    extras.forEach(x => {
        price += (x.PRICE * (x.QUANTITY || 1))
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
    payload: { ID: number, QUANTITY: number, key: string }
) {
    const { key, ID, QUANTITY } = payload
    let item = Object.assign({}, state.cart[key]);
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
        item.totalPrice = getPrice(item)
        state.cart = Object.assign({}, { ...state.cart, [key]: { ...item } });
        return Object.assign({}, { ...state, cart: { ...state.cart } });
    }
    return state
}