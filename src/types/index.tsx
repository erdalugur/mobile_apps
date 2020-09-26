import { NavigationProp } from '@react-navigation/native';
export interface NavigationProps<TRoute, TNavigation> {
    navigation: NavigationProp<any>
    route: RouteProps<TRoute>
}

export interface RouteProps<T> {
    key: string
    name: string
    params: T
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
    CALORI: string
    PREPARATION_TIME: string
    EXTRAS: { [key: string]: IExtra }
    NOTES: string
    PRIORITY: number
    VIDEO_URL: string
}

export interface IExtra {
    ID: number
    NAME: string
    PRICE: number
    CHECKED: boolean
    QUANTITY: number
    TOTAL_PRICE: number
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
    STOREID: string
}

export interface FetchAllModel {
    domain: DomainSettingModel
    tree: ProductTreeModel[]
    status: "success" | "error" | "fetching"
}

export interface PlaceModel {
    ID: string,
    NAME: string,
    USE_POS: boolean,
    USE_KITCHEN: boolean,
    USE_CACHIER: boolean,
    USE_GUEST_COMPLETE: boolean,
    DOMAIN: string,
    USE_REPORT: boolean,
    USE_MENU: boolean
    DEFAULT_CLIENT_ID: string
    LOCAL_IP: string
    PHONE: string
    PACKAGE_ORDER: boolean
    CATEGORY_THEME_N0: string
    USE_GUEST_MODULE: boolean,
    USE_CAMPAIGN_MODULE: boolean,
    USE_ORGANIZATION_MODULE: boolean,
    USE_SURVEY_MODULE: boolean,
    USE_ACTIVITY_MODULE: boolean,
    USE_RESERVATION_MODULE: boolean
}

export interface DomainSettingModel extends PlaceModel { }

export interface ProductTreeModel {
    ID: number,
    NAME: string,
    PRODUCTS: Product[]
    THEME_NO: string
    PREVIEW: string
}

export interface SetCartRequest {
    TABLEID: string
    JSON: Array<{
        PRODUCTID: string
        QUANTITY: string
    }>
}

export interface AuthContextProps {
    context: {
        signIn: (user: UserModel) => Promise<void>,
        signUp: (user: UserModel) => Promise<void>
        signOut: () => Promise<void>
    }
}

export interface ContactRequestProps {
    PHONE: string
    FIRST_NAME: string,
    LAST_NAME: string
    PAX: string
    REQUEST_DATE: string
    REQUEST_TIME: string
    NOTE: string
    REQUEST_TYPE: string
    REQUESTID: number
}