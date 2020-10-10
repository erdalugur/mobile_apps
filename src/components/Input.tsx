import React from 'react'
import { TextInput, TextInputProps, StyleSheet, Platform, View } from 'react-native'
import theme from 'theme';
import InputMasked, { MaskedInputProps } from 'react-text-mask'
import { Datepicker } from '@ui-kitten/components'
import { TouchableOpacity } from 'react-native-gesture-handler';
import { EyeOff, EyeOn } from 'icons';
interface Props extends TextInputProps {

}
export class Input extends React.PureComponent<Props, any> {
    static defaultProps = {
        underlineColorAndroid: undefined
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

interface MaskedProps extends MaskedInputProps {
    value: string
}

export class MaskedInput extends React.PureComponent<MaskedProps, any>{
    render() {
        let styles = Object.assign({}, {
            background: 'none',
            border: 'none',
            height: 45,
            color: 'rgb(229, 229, 231)',
            paddingLeft: 10,
            paddingRight: 10
        }, this.props.style)

        return (
            <InputMasked
                {...this.props}
                style={{ ...styles }}
                value={this.props.value}
                onChange={this.props.onChange}
            />
        )
    }
}

export class PhoneInput extends React.PureComponent<MaskedProps, any>{

    onChange = (value: string) => {
        let callback = this.props.onChange as any
        callback({ target: { value } })
    }
    render() {
        if (Platform.OS === 'web') {
            return (
                <MaskedInput
                    {...this.props}
                    placeholder="0(5xx) xxx xxxx"
                    mask={['0', '(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]}
                />
            )
        } else {
            return (
                <Input

                    placeholder="0(5xx) xxx xxxx"
                    onChangeText={value => this.onChange(value)}
                />
            )
        }
    }
}
export class DateInput extends React.PureComponent<MaskedProps, any>{
    render() {
        return null
        return (
            <MaskedInput
                {...this.props}
                placeholder="DD-MM-YYYY"
                type="date"
            />
        )
    }
}

interface PasswordState {
    visible: boolean
}

export class PasswordInput extends React.PureComponent<Props, PasswordState>{
    state: PasswordState = {
        visible: false
    }
    render() {
        return (
            <View style={{ flexDirection: 'row' }}>
                <Input
                    {...this.props}
                    secureTextEntry={this.state.visible}
                    style={[this.props.style, { width: '100%' }]} />
                <View style={{ width: 40, position: 'absolute', right: 10, justifyContent: 'center', alignItems: 'center' }}>
                    <TouchableOpacity
                        style={[]}
                        onPress={() => this.setState((state: PasswordState) => ({ visible: !state.visible }))}>
                        {this.state.visible ? <EyeOn size={25} /> : <EyeOff size={25} />}
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        height: 45,
        color: theme.colors.text,
        paddingHorizontal: 10
    },
    placeholder: { color: "#ddd" },
    maskedInput: {

    }
});