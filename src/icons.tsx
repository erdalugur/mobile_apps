import React from 'react'
import { Feather, FontAwesome, Ionicons, AntDesign, MaterialCommunityIcons, FontAwesome5, MaterialIcons, Entypo } from '@expo/vector-icons'
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
export function Cheff(props: IconProps) {
    return <MaterialCommunityIcons name="chef-hat" onPress={props.onPress} size={props.size || 30} color={props.color} />
}
export function Setting(props: IconProps) {
    return <Feather name="settings" onPress={props.onPress} size={props.size || 30} color={props.color} />
}
export function Menu(props: IconProps) {
    return <MaterialCommunityIcons name="food-fork-drink" onPress={props.onPress} size={props.size || 30} color={props.color} />
}

export function Bowtie(props: IconProps) {
    return <Ionicons name="ios-bowtie" onPress={props.onPress} size={props.size || 30} color={props.color} />
}
export function Money(props: IconProps) {
    return <FontAwesome5 name="money-bill-wave" onPress={props.onPress} size={props.size || 30} color={props.color} />
}

export function ReportFile(props: IconProps) {
    return <FontAwesome name="file-word-o" onPress={props.onPress} size={props.size || 30} color={props.color} />
}
export function Person(props: IconProps) {
    return <MaterialIcons name="person" onPress={props.onPress} size={props.size || 30} color={props.color} />
}
export function QRCode(props: IconProps) {
    return <AntDesign name="qrcode" onPress={props.onPress} size={props.size || 30} color={props.color} />
}
export function Table(props: IconProps) {
    return <AntDesign name="table" onPress={props.onPress} size={props.size || 30} color={props.color} />
}

export function EmojiNeutral(props: IconProps) {
    return <Entypo name="emoji-neutral" onPress={props.onPress} size={props.size || 30} color={props.color} />
}
