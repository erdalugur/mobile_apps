import React from 'react'
import { Feather, FontAwesome, Ionicons, AntDesign, MaterialCommunityIcons, FontAwesome5, MaterialIcons, Entypo } from '@expo/vector-icons'
import theme from 'theme'
import { TouchableOpacity, View } from 'react-native';

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

export function HeaderBack(props: IconProps) {
    return <View
        style={{ marginLeft: 15 }}>
        <Back size={40} /></View>
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

export function MoreOption(props: IconProps) {
    return <Feather name="more-vertical" onPress={props.onPress} size={props.size || 30} color={props.color} />
}
export function Phone(props: IconProps) {
    return <AntDesign name="phone" onPress={props.onPress} size={props.size || 30} color={props.color} />
}
export function CartIcon(props: IconProps) {
    return <AntDesign name="hearto" onPress={props.onPress} size={props.size || 30} color={props.color} />
}
export function Heart(props: IconProps) {
    return <AntDesign name="hearto" onPress={props.onPress} size={props.size || 30} color={props.color} />
}
export function Heat(props: IconProps) {
    return <FontAwesome5 name="temperature-high" onPress={props.onPress} size={props.size || 30} color={props.color} />
}
export function Fire(props: IconProps) {
    return <FontAwesome5 name="fire-alt" onPress={props.onPress} size={props.size || 30} color={props.color} />
}
export function Time(props: IconProps) {
    return <Ionicons name="ios-timer" onPress={props.onPress} size={props.size || 30} color={props.color} />
}
export function Pencil(props: IconProps) {
    return <FontAwesome name="pencil" onPress={props.onPress} size={props.size || 30} color={props.color} />
}
