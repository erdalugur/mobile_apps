import * as React from 'react';
import { StyleSheet, TouchableOpacity, StyleProp, ViewStyle } from 'react-native';
import { Text } from './Text'
import theme from 'theme'

const { colors } = theme
interface ButtonProps {
    size?: "full" | "small"
    onPress: () => void
    style?: StyleProp<ViewStyle>
    nativeProps?: ButtonProps
    children: string
    activeOpacity?: number
}

export function Button(props: ButtonProps) {
    return (
        <TouchableOpacity
            activeOpacity={props.activeOpacity || 0.9}
            onPress={props.onPress}
            {...props.nativeProps}
            style={[styles[props.size || "full"], props.style]}>
            <Text>{props.children}</Text>
        </TouchableOpacity>
    );
};


const styles = StyleSheet.create({
    full: {
        width: '100%',
        padding: 10,
        backgroundColor: colors.primary
    },
    small: {

    }
});
