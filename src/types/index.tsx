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
    STAR: number
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
    MIN_PRICE_FOR_PACKAGE_ORDER: number
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
    FROM_GUEST: boolean
    EXTRAS: Array<{
        ID: number
        QUANTITY: number
        PRODUCTID: number
        PRICE: number
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

export interface TicketItemProps {
    THEME_NO: number
    ID: number
    NAME: string
    IMAGE_URL: string
    DESCRIPTION: string
    PRICE: number
}

export interface RegisterGuestProps {
    FIRST_NAME: string
    LAST_NAME: string
    PHONE: string
    ADDRESS: string
    PASSWORD: string
}

export interface UpdateUserDetailProps {
    ADDRESS: string
    PHONE: string
    EMAIL: string
    FIRST_NAME: string
    LAST_NAME: string
}

export interface TransactionExtra extends IExtra {
    TRANSACTIONID: number
}
export type TransactionStatusType = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8
export const TransactionStatus: { [key: string]: number } = {
    'start': 1,
    'confirm': 2,
    'ok': 3,
    'deliver': 4,
    'close': 5,
    'cancel': 6,
    'lost': 7,
    'gift': 8
}
export const TransactionStatusText: { [key: number]: string } = {
    1: "Sipariş",
    2: "Onay",
    3: "Hazır",
    4: "Teslim",
    5: "Kapatıldı",
    6: "İptal",
    7: "Zayi",
    8: "İkram"
}