export interface IAction {
    type: string
    payload: any
}


export interface SingleMultiType<Single, Multi> {
    item: Single
    items: Multi
}
export interface IAppState {
    user: any
    transactions: any[]
    balance: number
}