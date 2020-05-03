import { NavigationProp, RouteProp } from '@react-navigation/native';
export interface NavigationProps {
    navigation: NavigationProp<any>
    route: RouteProp<any, any>
}

export interface Product {
    ID: number
    NAME: string
    PRICE: number
    IMAGE_URL: string
    DESCRIPTION: string
}

export interface CartItem extends Product {
    quantity: number
    totalPrice: number
}