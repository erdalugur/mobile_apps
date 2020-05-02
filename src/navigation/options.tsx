import { StackNavigationOptions } from '@react-navigation/stack'
interface IScreenOptions extends StackNavigationOptions {

}

export const HomeOptions: IScreenOptions = {
    title: "Anasayfa"
}

export const CartOptions: IScreenOptions = {
    title: "Sepetim"
}

export const ProfileOptions: IScreenOptions = {
    title: "Hesabım"
}

export const NotificationOptions: IScreenOptions = {
    title: "Kampanyalar"
}