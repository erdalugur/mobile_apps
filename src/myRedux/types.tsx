import { CartItem, FetchAllModel, UserModel } from "types";

export interface IAction<T> {
    type: string
    payload: T
}


export interface SingleMultiType<Single, Multi> {
    item: Single
    items: Multi
}
export interface IState {
    screen: string
    token: string
    category: SingleMultiType<any, Array<any>>
    product: SingleMultiType<any, Array<any>>
    campaign: SingleMultiType<any, Array<any>>
    cart: SingleMultiType<any, { [key: string]: CartItem }>
    menu: FetchAllModel
    sliderItems: Array<any>
}

export const actionTypes = {
    FETCH_ALL: 'FETCH_ALL',
    SET_TOKEN: 'SET_TOKEN',
    ADD_TO_CART: 'ADD_TO_CART',
    REMOVE_CART: 'REMOVE_CART',
    INCREMENT: 'INCREMENT',
    DECREMENT: 'DECREMENT',
    SET_SCREEN: 'SET_SCREEN',
    SET_NOTE: 'SET_NOTE',
    HANDLE_EXTRA: 'HANDLE_EXTRA'
}