import { NavigationProp, RouteProp } from '@react-navigation/native';
export interface NavigationProps {
    navigation: NavigationProp<any>
    route?: RouteProp<any, any>
}