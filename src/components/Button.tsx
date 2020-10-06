import * as React from 'react';
import { StyleSheet, TouchableOpacity, StyleProp, ViewStyle, ActivityIndicator, TextStyle } from 'react-native';
import { Text } from './Text'
import theme from 'theme'

const { colors } = theme
interface ButtonProps {
    size?: "full" | "small"
    onPress?: () => void
    style?: StyleProp<ViewStyle>
    nativeProps?: ButtonProps
    children: string
    activeOpacity?: number
    loading?: boolean
    textColor?: string
    spinnerColor?: string
    spinnerSize?: number
    textStyle?: StyleProp<TextStyle>
    className?: 'primary' | 'default'
    bold?: boolean
}

export function Button(props: ButtonProps) {
    const style = props.className === 'default' ? styles.default : styles.full

    return (
        <TouchableOpacity
            disabled={props.loading}
            activeOpacity={props.activeOpacity || 0.9}
            onPress={props.onPress}
            {...props.nativeProps}
            style={[styles[props.size || "full"], style, props.style]}>
            {props.loading ? (
                <ActivityIndicator
                    color={props.spinnerColor || theme.colors.white}
                    size={props.spinnerSize || 30} />
            ) : (
                    <Text
                        style={[props.textStyle, props.bold ? { fontWeight: 'bold' } : {}]}
                        color={props.textColor}>{props.children}</Text>
                )}
        </TouchableOpacity>
    );
};


const styles = StyleSheet.create({
    default: {
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: theme.colors.border,
        paddingHorizontal: 10,
        borderRadius: 2
    },
    full: {
        width: '100%',
        padding: 12,
        backgroundColor: colors.primary,
        justifyContent: 'center',
        alignItems: 'center',
        height: 45,
        borderRadius: 2
    },
    small: {
        // justifyContent: 'center',
        // alignItems: 'center',

    }
});

export function SmallButton(props: ButtonProps) {
    return (
        <TouchableOpacity
            disabled={props.loading}
            activeOpacity={props.activeOpacity || 0.9}
            onPress={props.onPress}
            {...props.nativeProps}
            style={[styles["small"], props.style]}>
            <Text>{props.children}</Text>
        </TouchableOpacity>
    )
}