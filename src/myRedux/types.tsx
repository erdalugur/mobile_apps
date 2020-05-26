import { CartItem, FetchAllModel, UserModel } from "types";

export interface IAction {
    type: string
    payload: any
}


export interface SingleMultiType<Single, Multi> {
    item: Single
    items: Multi
}
export interface IState {
    user: UserModel | null
    category: SingleMultiType<any, Array<any>>
    product: SingleMultiType<any, Array<any>>
    campaign: SingleMultiType<any, Array<any>>
    cart: SingleMultiType<any, { [key: string]: CartItem }>
    menu: FetchAllModel
}