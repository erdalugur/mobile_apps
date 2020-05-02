import * as React from 'react';
import { View, StyleSheet, StyleProp, ViewStyle } from 'react-native';
import theme from 'theme';
import { Text } from './Text';

interface FormRowProps {
    style?: StyleProp<ViewStyle>
    children: React.ReactNode
    errorMessage?: string
}

export function FormRow(props: FormRowProps) {
    return (
        <>
            <View
                style={[styles.container, props.errorMessage ? styles.errorMessage : styles.default, props.style]}>
                {props.children}
            </View>
            {props.errorMessage &&
                <View style={{ marginTop: -10 }}>
                    <Text color="red">{props.errorMessage}</Text>
                </View>
            }
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        marginBottom: 5,
        borderRadius: 2,
    },
    errorMessage: {
        borderColor: 'red',
        borderWidth: 1
    },
    default: {
        borderWidth: 1,
        borderColor: theme.colors.border
    }
});
