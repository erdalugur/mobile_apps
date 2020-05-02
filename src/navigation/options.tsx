import React from 'react'
import { StackNavigationOptions } from '@react-navigation/stack'
import { Ionicons } from '@expo/vector-icons';
import { Header } from 'components';

interface IScreenOptions extends StackNavigationOptions {

}

export const HomeOptions: IScreenOptions = {
    title: "Anasayfa"
}

export const CartOptions: IScreenOptions = {
    title: "Sepetim"
}

export const ProfileOptions: IScreenOptions = {
    title: "Hesabım",
    header: ({ navigation, mode, styleInterpolator }) => (
        <Header navigation={navigation} title="Hesabım" />
    )
}

export const NotificationOptions: IScreenOptions = {
    title: "Kampanyalar"
}

export const SearchOptions: IScreenOptions = {
    title: "Ara",
    header: ({ navigation, mode, styleInterpolator }) => (
        <Header navigation={navigation} title="Ürün Ara" />
    )
}