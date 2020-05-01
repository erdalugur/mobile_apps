import React from 'react'
import { Text as TextBase } from 'react-native'
import theme from '../theme'

const { colors } = theme;

interface Props {
    children: string
    color?: string
    component?: "p" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6"
}
export function Text({ color, children, component = "p" }: Props) {
    let fontSize: number = 20;
    let _color = color || colors.text
    switch (component) {
        case "h1":
            fontSize = 30;
            break;
        case "h2":
            fontSize = 26;
            break;
        case "h3":
            fontSize = 22;
            break;
        case "h4":
            fontSize = 20;
            break;
        case "h5":
            fontSize = 16;
            break;
        case "h6":
            fontSize = 14;
            break;
        default:
            fontSize = 12;
            break;
    }
    return (
        <TextBase style={{
            color: _color,
            fontSize
        }}>
            {children}
        </TextBase>
    )
}