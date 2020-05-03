import React from 'react'
import { Feather, FontAwesome } from '@expo/vector-icons'
import theme from 'theme'

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