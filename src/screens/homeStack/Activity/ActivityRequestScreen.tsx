import React from 'react'
import { Button, ContactRequestForm, Input, Layout, Text, View, FormRow, PhoneInput } from 'components'
import { StyleSheet, TouchableOpacity, ScrollView, Dimensions } from 'react-native'
import theme from 'theme'
import { messageBox, validationManager } from 'utils'
import { ContactRequestProps, NavigationProps } from 'types'
import { dataManager } from 'api'

const { height } = Dimensions.get('window')
interface Props extends NavigationProps<{
    ID: number
    NAME: string
}, any> { }

interface State extends ContactRequestProps {
    loading: boolean
    error: any
}
export class ActivityRequestScreen extends React.PureComponent<Props, State> {

    state: State = {
        loading: false,
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
        let { FIRST_NAME, LAST_NAME, REQUEST_DATE, PAX, REQUEST_TIME, PHONE, NOTE } = this.state, error = {} as { [key: string]: string }
        PHONE ? validationManager.checkPhone(PHONE) ? null : error['PHONE'] = '11 hane giriniz' : error['PHONE'] = 'Boş geçilemez'
        FIRST_NAME ? null : error['FIRST_NAME'] = 'Boş geçilemez'
        LAST_NAME ? null : error['LAST_NAME'] = 'Boş geçilemez'
        PAX ? null : error['PAX'] = 'Boş geçilemez'
        this.setState({ error })
        if (Object.keys(error).length > 0) {
            return
        }
        this.setState({ loading: true });
        const result = await dataManager.makeRequest({
            FIRST_NAME,
            LAST_NAME,
            NOTE,
            PAX,
            PHONE,
            REQUESTID: this.props.route.params.ID,
            REQUEST_TYPE: '2',
            REQUEST_DATE: '',
            REQUEST_TIME: ''
        });
        if (result.statusCode === 200) {
            messageBox('Talebiliniz alınmıştır en kısa sürede sizinle iletişime geçilecektir.')
            this.setState({ loading: false })
        } else {
            this.setState({ loading: false })
        }
    }

    render() {
        return (
            <Layout style={[styles.container]}>
                <ScrollView>
                    <FormRow errorMessage={this.state.error['FIRST_NAME']} label="Ad">
                        <Input
                            placeholder="Ad"
                            value={this.state.FIRST_NAME}
                            onChangeText={FIRST_NAME => this.setState({ FIRST_NAME })} />
                    </FormRow>
                    <FormRow errorMessage={this.state.error['LAST_NAME']} label="Soyad">
                        <Input
                            placeholder="Soyad"
                            value={this.state.LAST_NAME}
                            onChangeText={LAST_NAME => this.setState({ LAST_NAME })} />
                    </FormRow>
                    <FormRow errorMessage={this.state.error['PHONE']} label="Telefon">
                        {/* <Input
                            placeholder="Telefon"
                            value={this.state.PHONE}
                            onChangeText={PHONE => this.setState({ PHONE })} /> */}
                        <PhoneInput
                            placeholder="Telefon"
                            value={this.state.PHONE}
                            onChange={e => this.setState({ PHONE: e.target.value })}
                        />
                    </FormRow>
                    <FormRow errorMessage={this.state.error['PAX']} label="Kişi Sayısı">
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
                        loading={this.state.loading}
                        style={[styles.button]}
                        textStyle={[styles.text]}
                        onPress={this.makeRequestAsync}>
                        Gönder
                </Button>
                </ScrollView>
            </Layout>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.colors.card,
        height: height - 80,
        paddingHorizontal: 10
    },
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
    title: {
        marginHorizontal: 10
    }
})