import { NavigationProp, RouteProp } from '@react-navigation/native';
export interface NavigationProps {
    navigation: NavigationProp<any>
    route: RouteProp<any, any>
}

export interface Product {
    ID: number
    NAME: string
    PRICE: number
    PREVIEW: string
    DESCRIPTION: string
    STOREID: string
    CATEGORYID: string
    ALLERGENS: string
}

export interface CartItem extends Product {
    quantity: number
    totalPrice: number
}


export interface CacheResponse {
    name: string
    value: string
    expiryDate: number
}

export interface UserModel {
    token: string
    ID: string
    USERNAME: string
    PASSWORD: string
}

export interface FetchAllModel {
    domain: DomainSettingModel
    tree: ProductTreeModel[]
    status: "success" | "error" | "fetching"
}

export interface DomainSettingModel {
    ID: number,
    NAME: string,
    IS_DISABLED: boolean,
    CREATED_DATE: string,
    USE_POS: boolean,
    USE_KITCHEN: boolean,
    USE_CACHIER: boolean,
    USE_GUEST_COMPLETE: boolean,
    DOMAIN: string,
    USE_REPORT: boolean,
    USE_MENU: boolean
}

export interface ProductTreeModel {
    ID: number,
    NAME: string,
    PRODUCTS: Product[]
}