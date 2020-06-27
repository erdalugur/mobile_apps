import React from 'react'
import { TextInput, TextInputProps, StyleSheet } from 'react-native'
import theme from 'theme';

interface Props extends TextInputProps {

}
export class Input extends React.PureComponent<Props, any> {
    static defaultProps = {
        underlineColorAndroid: false
    }
    render() {
        return (
            <TextInput
                {...this.props}
                style={[styles.container, this.props.style]}
                placeholderTextColor={styles.placeholder.color}
            />
        )
    }
}

const styles = StyleSheet.create({
    container: {
        height: 45,
        color: theme.colors.text,
        paddingHorizontal: 10
    },
    placeholder: { color: "#ddd" }
});