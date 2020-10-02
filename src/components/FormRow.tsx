import React from 'react'
import { Text, View } from 'components'
import { StyleSheet, TextStyle, StyleProp, ViewStyle } from 'react-native'
import theme from 'theme'


interface Props {
    errorMessage?: string
    label?: string
    labelStyle?: StyleProp<TextStyle>
    rowStyle?: StyleProp<ViewStyle>
}
export class FormRow extends React.PureComponent<Props, any> {

    render() {
        return (
            <View style={[styles.infoRow, this.props.rowStyle]}>
                {this.props.label && <Text style={[styles.label, this.props.labelStyle]}>{this.props.label}</Text>}
                {this.props.children}
                {this.props.errorMessage && <Text style={{ marginLeft: 5, color: 'red' }}>{this.props.errorMessage}</Text>}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    infoRow: { borderColor: theme.colors.border, borderBottomWidth: 1, marginTop: 10 },
    button: {
        backgroundColor: theme.colors.primary,
        height: 50,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 10
    },
    text: {
        fontWeight: 'bold'
    },
    label: {
        color: theme.colors.text,
        marginHorizontal: 10
    }
})