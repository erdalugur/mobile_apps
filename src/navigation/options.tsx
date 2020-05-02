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
    title: "Hesabım"
}

export const NotificationOptions: IScreenOptions = {
    title: "Kampanyalar"
}

export const SearchOptions: IScreenOptions = {
    title: "Ara",
    headerShown: true
    // headerShown: false
}