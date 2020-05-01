import * as React from 'react';
import { StyleSheet, TouchableOpacity, StyleProp, ViewStyle, ActivityIndicator } from 'react-native';
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
}

export function Button(props: ButtonProps) {
    return (
        <TouchableOpacity
            disabled={props.loading}
            activeOpacity={props.activeOpacity || 0.9}
            onPress={props.onPress}
            {...props.nativeProps}
            style={[styles[props.size || "full"], props.style]}>
            {props.loading ? <ActivityIndicator /> :
                <Text>{props.children}</Text>
            }
        </TouchableOpacity>
    );
};


const styles = StyleSheet.create({
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
        justifyContent: 'center',
        alignItems: 'center',
        height: 45
    }
});
