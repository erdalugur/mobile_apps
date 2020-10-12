import React from 'react'
import { Button, Input } from 'components'
import { StyleSheet, ScrollView, Dimensions } from 'react-native'
import theme from 'theme'
import { ContactRequestProps } from 'types'
import { FormRow } from './FormRow'
import { validationManager } from 'utils'
import { PhoneInput, DateInput } from './Input'
const { height } = Dimensions.get('window')
interface State extends ContactRequestProps {
    error: { [key: string]: string }
}

interface Props {
    submit: (data: State) => void
    loading: boolean
    resetForm: boolean
}
export class ContactRequestForm extends React.PureComponent<Props, State> {

    state: State = {
        REQUESTID: 0,
        FIRST_NAME: '',
        LAST_NAME: '',
        NOTE: '',
        PAX: '',
        PHONE: '',
        REQUEST_DATE: '',
        REQUEST_TIME: '',
        REQUEST_TYPE: '',
        error: {}
    }

    makeRequestAsync = async () => {
        let { FIRST_NAME, LAST_NAME, REQUEST_DATE, PAX, REQUEST_TIME, PHONE } = this.state, error = {} as { [key: string]: string }
        PHONE ? validationManager.checkPhone(PHONE) ? null : error['PHONE'] = '10 Hane giriniz' : error['PHONE'] = 'Boş geçilemez'
        FIRST_NAME ? null : error['FIRST_NAME'] = 'Boş geçilemez'
        LAST_NAME ? null : error['LAST_NAME'] = 'Boş geçilemez'
        PAX ? null : error['PAX'] = 'Boş geçilemez'
        REQUEST_DATE ? null : error['REQUEST_DATE'] = 'Boş geçilemez'
        REQUEST_TIME ? null : error['REQUEST_TIME'] = 'Boş geçilemez'
        this.setState({ error })
        if (Object.keys(error).length > 0) {
            return
        }
        PHONE = `0${validationManager.makePhone(PHONE)}`
        this.props.submit({
            ...this.state, PHONE
        })
    }

    componentDidUpdate = (prevProps: Props) => {
        if (prevProps.resetForm !== this.props.resetForm) {
            this.setState({
                FIRST_NAME: '',
                LAST_NAME: '',
                NOTE: '',
                PAX: '',
                PHONE: '',
                REQUESTID: 0,
                REQUEST_DATE: '',
                REQUEST_TIME: '',
                REQUEST_TYPE: '',
                error: {}
            })
        }
    }

    onDateChange = (value: string) => {
        this.setState({ REQUEST_DATE: value })
    }

    render() {
        return (
            <ScrollView style={{ height: height - 70 }}>
                <FormRow
                    label="Tarih"
                    errorMessage={this.state.error['REQUEST_DATE']}>
                    {/* <Input
                        placeholder="dd.mm.yyyy"
                        value={this.state.REQUEST_DATE}
                        onChangeText={REQUEST_DATE => this.onDateChange(REQUEST_DATE)} /> */}

                    <DateInput
                        minYear={0}
                        value={this.state.REQUEST_DATE}
                        onChange={this.onDateChange} />
                </FormRow>
                <FormRow label="Saat" errorMessage={this.state.error['REQUEST_TIME']}>
                    <Input
                        placeholder="mm:hh"
                        value={this.state.REQUEST_TIME}
                        onChangeText={REQUEST_TIME => this.setState({ REQUEST_TIME })} />
                </FormRow>
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
                <FormRow label="Kişi Sayısı" errorMessage={this.state.error['PAX']}>
                    <Input
                        placeholder="Kişi Sayısı"
                        value={this.state.PAX}
                        keyboardType="number-pad"
                        onChangeText={PAX => this.setState({ PAX })} />
                </FormRow>
                <FormRow label="Ekstra Not">
                    <Input
                        placeholder="Ekstra Not"
                        value={this.state.NOTE}
                        multiline
                        numberOfLines={4}
                        onChangeText={NOTE => this.setState({ NOTE })} />
                </FormRow>
                <Button
                    loading={this.props.loading}
                    style={[styles.button]}
                    textStyle={[styles.text]}
                    onPress={this.makeRequestAsync}>
                    Gönder
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