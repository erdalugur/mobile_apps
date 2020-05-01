import React from 'react'
import { View, StyleProp, ViewStyle } from 'react-native'
import theme from 'theme'

interface CardProps {
    style?: StyleProp<ViewStyle>
    children: React.ReactNode
}
export function Card(props: CardProps) {
    return (
        <View style={[{
            backgroundColor: theme.colors.card
        }, props.style ? props.style : {}]}>
            {props.children}
        </View>
    )
}