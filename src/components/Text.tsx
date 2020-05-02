import React from 'react'
import { Text as TextBase, StyleProp, TextStyle } from 'react-native'
import theme from '../theme'

const { colors } = theme;

interface Props {
    children: string
    color?: string
    component?: "p" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6"
    style?: StyleProp<TextStyle>
}
export function Text({ color, children, component = "p", style }: Props) {
    let fontSize: number = 20;
    let _color = color || colors.text
    switch (component) {
        case "h1":
            fontSize = 46;
            break;
        case "h2":
            fontSize = 38;
            break;
        case "h3":
            fontSize = 30;
            break;
        case "h4":
            fontSize = 24;
            break;
        case "h5":
            fontSize = 20;
            break;
        case "h6":
            fontSize = 18;
            break;
        default:
            fontSize = 14;
            break;
    }
    return (
        <TextBase style={[{
            color: _color,
            fontSize
        }, style]}>
            {children}
        </TextBase>
    )
}