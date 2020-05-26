import React from 'react'
import { Feather, FontAwesome, Ionicons } from '@expo/vector-icons'
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
    return <TouchableOpacity style={{ marginLeft: 5 }}><Back /></TouchableOpacity>
}