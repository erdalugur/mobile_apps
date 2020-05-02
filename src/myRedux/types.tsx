export interface IAction {
    type: string
    payload: any
}


export interface SingleMultiType<Single, Multi> {
    item: Single
    items: Multi
}
export interface IState {
    token: string
    user: any
    category: SingleMultiType<any, Array<any>>
    product: SingleMultiType<any, Array<any>>
    campaign: SingleMultiType<any, Array<any>>
    cart: SingleMultiType<any, Array<any>>
}