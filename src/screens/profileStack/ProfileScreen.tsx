import React from 'react'
import { Button, Input } from 'components'
import { StyleSheet, ScrollView, Dimensions } from 'react-native'
import theme from 'theme'
import { ContactRequestProps } from 'types'
import { FormRow, PhoneInput, DateInput } from 'components'
import { validationManager } from 'utils'
const { height } = Dimensions.get('window')
interface State {
    error: { [key: string]: string }
    loading: boolean
    FIRST_NAME: string,
    LAST_NAME: string,
    PHONE: string
    ADDRESS: string
    EMAIL: string
}

interface Props {

}
export class ProfileScreen extends React.PureComponent<Props, State> {

    state: State = {
        FIRST_NAME: '',
        LAST_NAME: '',
        PHONE: '',
        ADDRESS: '',
        EMAIL: '',
        loading: false,
        error: {}
    }

    makeRequestAsync = async () => {
        let { FIRST_NAME, LAST_NAME, EMAIL, ADDRESS, PHONE } = this.state, error = {} as { [key: string]: string }
        PHONE ? validationManager.checkPhone(PHONE) ? null : error['PHONE'] = '10 Hane giriniz' : error['PHONE'] = 'Boş geçilemez'
        FIRST_NAME ? null : error['FIRST_NAME'] = 'Boş geçilemez'
        LAST_NAME ? null : error['LAST_NAME'] = 'Boş geçilemez'
        this.setState({ error })
        if (Object.keys(error).length > 0) {
            return
        }
        PHONE = `0${validationManager.makePhone(PHONE)}`
    }

    render() {
        return (
            <ScrollView style={{ height: height - 70 }}>
                <FormRow label="Ad" errorMessage={this.state.error['FIRST_NAME']}>
                    <Input
                        placeholder="Ad"
                        value={this.state.FIRST_NAME}
                        onChangeText={FIRST_NAME => this.setState({ FIRST_NAME })} />
                </FormRow>
                <FormRow label="Soyad" errorMessage={this.state.error['LAST_NAME']}>
                    <Input
                        placeholder="Soyad"
                        value={this.state.LAST_NAME}
                        onChangeText={LAST_NAME => this.setState({ LAST_NAME })} />
                </FormRow>
                <FormRow label="Telefon" errorMessage={this.state.error['PHONE']}>
                    <PhoneInput
                        value={this.state.PHONE}
                        onChange={e => this.setState({ PHONE: e.target.value })}
                    />
                </FormRow>
                <FormRow label="Email" errorMessage={this.state.error['PAX']}>
                    <Input
                        placeholder="Email"
                        value={this.state.EMAIL}
                        keyboardType="email-address"
                        onChangeText={EMAIL => this.setState({ EMAIL })} />
                </FormRow>
                <FormRow label="Adres">
                    <Input
                        placeholder="Adres"
                        value={this.state.ADDRESS}
                        multiline
                        numberOfLines={4}
                        onChangeText={ADDRESS => this.setState({ ADDRESS })} />
                </FormRow>
                <Button
                    loading={this.state.loading}
                    style={[styles.button]}
                    textStyle={[styles.text]}
                    onPress={() => null}>
                    Güncelle
                </Button>
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
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