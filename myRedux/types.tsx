export interface IAction {
    type: string
    payload: any
}

export interface ICartItem {

}

export interface SingleMultiType<Single, Multi> {
    item: Single
    items: Multi
}
export interface IAppState {
    product: SingleMultiType<any, Array<any>>
    cart: {
        items: { [key: string]: ICartItem }
    }
    campaign: SingleMultiType<any, Array<any>>
    category: SingleMultiType<any, Array<any>>
}