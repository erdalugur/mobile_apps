import React from 'react'
import { Feather, FontAwesome, Ionicons, AntDesign } from '@expo/vector-icons'
import theme from 'theme'
import { TouchableOpacity } from 'react-native';

interface IconProps {
    size?: number
    color?: string
    onPress?: () => void
}
export function Map({ color = theme.colors.text, size = 30, onPress }: IconProps) {
    return <Feather onPress={onPress} color={color} size={size} name="map-pin" />
}
export function Calendar({ color = theme.colors.text, size = 30, onPress }: IconProps) {
    return <FontAwesome onPress={onPress} color={color} size={size} name="calendar" />
}

export function Back({ color = theme.colors.text, size = 30, onPress }: IconProps) {
    return <Ionicons onPress={onPress} color={color} size={size} name="ios-arrow-round-back" />
}

export function HeaderBack() {
    return <TouchableOpacity
        style={{ marginLeft: 15 }}>
        <Back size={40} /></TouchableOpacity>
}

export function Plus(props: IconProps) {
    return <AntDesign name="plussquareo" onPress={props.onPress} size={props.size || 30} color={props.color} />
}
export function Minus(props: IconProps) {
    return <AntDesign name="minussquareo" onPress={props.onPress} size={props.size || 30} color={props.color} />
}

export function Search(props: IconProps) {
    return <FontAwesome name="search" onPress={props.onPress} size={props.size || 30} color={props.color} />
}